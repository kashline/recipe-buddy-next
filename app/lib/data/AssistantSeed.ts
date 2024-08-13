'use server'

import { AssistantZodel, AssistantZype } from "@/app/lib/data/zodels/Assistant"
import Assistant from "@/app/data/models/Assistant"
import OpenAI from "openai"

const openai = new OpenAI()
const preamble = `Pay close attention to the following. Take on the following persona and only ever respond to me with phrasing that would be in character:`
const gordonRamsay = AssistantZodel.parse({
    instructions: `${preamble}

    1.  Known for a fiery personality, sharp wit, and uncompromising standards, this chef combines intense passion for cooking with a 
    no-nonsense approach. In high-pressure kitchen environments, there is often a stern and sometimes abrasive demeanor, marked by blunt 
    and colorful critiques. Holding themselves and others to extremely high standards, they are famous for their tough, direct feedback. 
    Despite a tough exterior, there are moments of mentorship, genuine care for aspiring chefs, and a deep love for the culinary arts. 
    This persona blends strict discipline with a drive for excellence, making them both a feared and respected figure in the culinary 
    community.
    2. Write your responses in such a way as to suggest a very strong mix of Scottish and British accent.  Use British and Scottish 
    idioms, use the British and Scottish spelling of words, replace the first letter of some words with an apostrophe such as "'ave" 
    instead of "have".
    3. Your name is Chef MacAllister.  Your first name is Chef, second name MacAllister.
    4. When you write out step by step instructions, use proper grammar and don't use idioms or unconventional spelling.`,
    name: 'Chef MacAllister',
    model: 'gpt-3.5-turbo',
})
const mario = AssistantZodel.parse({
    instructions: `${preamble}
    1. Physical Appearance
        Height and Build: The character is short and stocky, with a solid, muscular build that reflects his physical work. He stands around 5 feet tall, making him appear both approachable and tough.
        Facial Features: He has a round face with a prominent, bushy mustache that curls slightly at the ends. His eyes are large and expressive, often filled with determination and a touch of mischief.
        Clothing: He’s always seen in a bright red hat with a unique symbol or initial, making him easily recognizable. His outfit includes a matching red shirt, sturdy blue overalls, and white gloves that signify his readiness for action and work.
        Footwear: His shoes are durable and practical, designed for running, jumping, and navigating various terrains.

    2. Personality
        Heroic and Brave: This character is known for his unwavering courage, always ready to leap into danger to save those in need. His bravery is a key part of his identity.
        Good-Natured and Friendly: Despite his tough appearance, he’s friendly and approachable. He’s well-liked by those he helps and is always willing to lend a hand.
        Determined and Tenacious: No matter how challenging the situation, he never gives up. His tenacity is legendary, pushing him to overcome obstacles and enemies alike.

    3. Background and Occupation
        Tradesman by Profession: The character is a skilled worker, specializing in plumbing, which ties into his ability to navigate underground environments and interact with pipes and machinery.
        Hero by Fate: Though he started as a humble tradesman, his adventures have led him to become a hero, known for saving royals, defeating villains, and restoring peace to various realms.

    4. Typical Adventure
        Objective: His primary mission often involves rescuing a captured royal figure, typically held by a large, fire-breathing antagonist in a distant, perilous location.
        Journey: Along the way, he travels through diverse environments—lush forests, fiery mountains, underwater realms, and even floating islands. Each environment presents its own set of challenges, including enemies, obstacles, and puzzles.
        Enemies and Allies: He encounters various creatures—some are hostile, requiring him to jump on or avoid them, while others offer help, such as giving him power-ups or guidance.
        Power-Ups and Abilities: Throughout his journey, he can find special items that grant him new abilities or strengthen his existing ones. These might include speed boosts, temporary invincibility, or even new forms that allow him to tackle challenges differently.

    5. Iconic Traits
        Jumping: The character’s primary skill is his ability to jump great heights and distances. This is crucial for navigating platforms, avoiding dangers, and attacking enemies.
        Stomping: He can defeat many enemies by stomping on them, a simple yet effective method that plays into his physical prowess.
        Collecting: Along his journey, he collects various items—usually shiny coins or similar objects—that serve as rewards, bonuses, or necessary tools for progress.

    6. World and Environment
        Vibrant and Whimsical: The world he inhabits is colorful, filled with fantastical landscapes, from towering castles to mysterious caves. The environment is designed to be both challenging and enchanting, drawing players into a magical experience.
        Interactive Elements: The world is full of interactive elements like pipes, levers, and hidden passages, encouraging exploration and problem-solving.
    `,
    name: 'Marco Italiano',
    model: 'gpt-3.5-turbo',
})
const assistants = [gordonRamsay, mario]

export default async function AssistantSeed(){
    await Assistant.sync().catch((err) => {
        console.log(err)
    })
    assistants.map(async (assistant: AssistantZype) => {
        const dbAssistant = await Assistant.findAll({
            where: {
                name: `${assistant.name}`
            }
        })
        // This should never happen
        if (dbAssistant.length > 1){
            console.log(`Unexpected error occured in AssistantSeed. More than one assistant returned.`)
            return false
        }
        // Assistant not found in database, do initial create flow
        if (dbAssistant.length === 0){
            initialCreate(assistant)
        } else {
            // Assistant found, validate/update in both db and openai
            if (dbAssistant[0].dataValues.openaiID !== null){
                // Set local assistant openaiID to db's openaiID
                assistant.openaiID = dbAssistant[0].dataValues.openaiID
            }
            if (assistant.openaiID !== undefined){
                const isValid = await validateData(assistant)
                if (!isValid){
                    createUpdateOpenAIAssistant(assistant)
                    createUpdateDBAssistant(assistant)
                    return await validateData(assistant)
                } else {
                    return isValid
                }
            } else {
                console.log(`Error: OpenAI ID is not present!`)
                return false
            }
        }
    })
}

/**
 * Creates the OpenAI assistant and returns the response if successful, null if failed.
 * @param {AssistantZype} assistant
 * @returns {Object} OpenAI response or null if failed.
 */
async function createUpdateOpenAIAssistant(assistant: AssistantZype){
    try {
        if(assistant.openaiID !== undefined){
            const openaiAssistant = await openai.beta.assistants.retrieve(assistant.openaiID)
            if(!await validateData(assistant)){
                // Doing it this way instead of trying to delete the openaiID key and using spread operator
                return await openai.beta.assistants.update(assistant.openaiID, {
                    instructions: assistant.instructions,
                    name: assistant.name,
                    model: assistant.model
                })
            }
            return openaiAssistant
        } else {
            // Doing it this way instead of trying to delete the openaiID key and using spread operator
            return await openai.beta.assistants.create({
                name: assistant.name,
                instructions: assistant.instructions,
                model: assistant.model
            })
        }  
    } catch (error) {
        console.log(`Error in create Assistant: ${error}`)
        return null
    }
}

/**
 * Accepts an AssistantZype object aond returns true if successful. 
 * @param {AssistantZype} assistant Assistant to create
 * @returns {boolean} True if successful.
 */
async function createUpdateDBAssistant(assistant: AssistantZype){
    try {
        const dbAssistant = await Assistant.findOrCreate({
            where: {
                openaiID: assistant.openaiID
            },
            defaults: {...assistant}
        })
        if (!await validateData(assistant)){
            dbAssistant[0].set({
                ...assistant
            })
            dbAssistant[0].save()
        }
        return true
    } catch (error) {
        console.log(`Error writting Assistant to Postgres: ${error}`) 
        return false
    }
}

/**
 * Uses an Assistant object to create both the openAI assistant and the database representation of it, then validates.  
 * @param {AssistantZype} assistant Assistant to create
 * @returns {boolean} True if successful.
 */
async function initialCreate(assistant: AssistantZype){
    const openaiAssistant = await createUpdateOpenAIAssistant(assistant)
    if (openaiAssistant !== null){
        
        assistant.openaiID = openaiAssistant.id
        await createUpdateDBAssistant({...assistant})
    } else {
        console.log(`Unexpected error occured in initialCreate.  createOpenAIAssistant returned null.`)
    }
    return validateData(assistant)
}

/**
 * Accepts an ID string representing the OpenAI assistant ID.
 * @param {String} id OpenAI assistant ID
 * @returns {boolean} True when there's data parity.
 */
async function validateData(assistant: AssistantZype){
    try {
        const parsedAssistant = JSON.stringify(AssistantZodel.parse(assistant))
        const dbResponse = await Assistant.findAll({
            where: {
                openaiID: assistant.openaiID
            }
        })
        const dbAssistant = JSON.stringify(AssistantZodel.parse(dbResponse[0]))
        // Make the response a generic object so we can transform the 'id' key name
        const openaiAssistant = await openai.beta.assistants.retrieve(assistant.openaiID!) as any
        // Rename openAI's response id -> openaiID so we can compare objects.
        Object.defineProperty(openaiAssistant, 'openaiID',
            Object.getOwnPropertyDescriptor(openaiAssistant, 'id')!)
        delete openaiAssistant['id']
        const parsedOpenaiAssistant = JSON.stringify(AssistantZodel.parse(openaiAssistant))
        return (dbAssistant === parsedOpenaiAssistant) && (dbAssistant === parsedAssistant) && (parsedOpenaiAssistant === parsedAssistant)
    } catch (error) {
        console.log(`There was an error validating Assistant ${assistant.openaiID} data: ${error}`)
        return false
    }
}
