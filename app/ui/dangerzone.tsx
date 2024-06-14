'use client'

import React from "react"
import Button from "./button"
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import DeleteRecipe from "./popups/deleterecipe"

export default function DangerZone({recipeName, recipeID}:{recipeName: string, recipeID: number}){
    const [toggle, setToggle] = React.useState(false)
    if (!toggle){
        return(
            <div>
                    <button style={{ width: '100%', height: 4 }} onClick={() => {setToggle(!toggle)}}>
                        <div style={{ display: 'flex'}}>
                            <ChevronRightIcon
                                style={{ height: 16}}
                            />
                            <p className="pl-4" style={{paddingLeft: '4px',}}>Danger Zone</p>
                        </div>
                        <hr className=" h-px border-none bg-gray-400"></hr>
                    </button>
            </div>
        )
    }
    return(
        <div>
            <button style={{ width: '100%', height: 4 }} onClick={() => {setToggle(!toggle)}}>
                <div style={{ display: 'flex'}}>
                    <ChevronDownIcon
                        style={{ height: 16}}
                    />
                    <p className="pl-4" style={{paddingLeft: '4px',}}>Danger Zone</p>
                </div>
                <hr className=" h-px border-none bg-gray-400"></hr>
            </button>
            <div style={{ display: 'flex', borderWidth: 3, borderColor: 'red'}}>
                <p style={{ marginLeft: '1%', marginTop: '2%', marginRight: '70%'}}>Delete Recipe</p>
                <DeleteRecipe recipeName={recipeName} recipeID={recipeID}></DeleteRecipe>
            </div>
        </div>
    )

}