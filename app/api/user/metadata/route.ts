import User from "@/app/data/models/User"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

export const GET = withApiAuthRequired(async (request: Request) => {
    try {
        const user = await getSession()
        const userMetadata = await User.findAll({
            where: {
                auth0Id: user?.user.sub
            }
        })
        return Response.json({success: true, user: userMetadata[0].dataValues}, {status: 200})
    } catch (error) {
        console.log(`There was an error gathering user metadata: ${error}`)
        return Response.json({success: false}, {status: 500})
    }
})
