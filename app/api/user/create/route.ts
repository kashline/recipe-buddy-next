import User from "@/app/data/models/User"

export const POST = async (request: Request) => {
    try {
        await User.sync()
        const user = await request.json()
        const res = await User.findOrCreate({
            where: {
                auth0Id: user.sub
            },
            defaults: {
                firstName: user.given_name,
                lastName: user.family_name,
                auth0Id: user.sub
            }
        })
        return Response.json({success: true, user: res[0].dataValues}, {status: 200})
    } catch (error) {
        console.log(`There was an error during profile-server callback user creation: ${error}`)
        return Response.json({success: false}, {status: 500})
    }
}
