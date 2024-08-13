import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import AssistantSeed from "@/app/lib/data/AssistantSeed";

// Instrumentation doesn't seem to be working well with sequelize.  This api method is the assistant seeder until instrumentation is stable
export const GET = 
withApiAuthRequired(
        async (request: Request) => {
        try {
            const asdf = await AssistantSeed()
            return Response.json(asdf)
        } catch (error) {
            console.log(error)
            return Response.json(({success: false, message: error}), {status: 500})
        }
    }
)