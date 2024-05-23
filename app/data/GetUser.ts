import { getSession } from '@auth0/nextjs-auth0';
import User from '@/app/data/models/User';
import sequelize from '@/app/data/connection';
import { redirect } from 'next/navigation';

export default async function GetUser() {
    const session = await getSession();
    const user = session?.user
    if (user !== undefined){
        await sequelize.sync()
        const res = await User.findOrCreate({
            where: {
                auth0Id: user.sub
            },
            defaults: {
                firstName: user.given_name,
                lastName: user.family_name,
                auth0Id: user.sub,
            }
        })
    }
    redirect('/')
}
