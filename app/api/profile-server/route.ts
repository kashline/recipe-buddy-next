import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export const GET = async function ProfileServer(request: NextRequest) {
    const session = await getSession();
    const user = session?.user
    const referer = request.nextUrl.searchParams.get("referer") as string
    const baseUrl = process.env.BASEURL ? 'https://' + process.env.BASEURL : 'http://localhost:3000'
    if (user !== undefined){
        const res = await fetch(
            `${baseUrl}/api/user/create`,
            {
                body:JSON.stringify(user),
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.status === 200){
            redirect(referer)
        } else {
            redirect(`${baseUrl}/error/userCreateError`)
        }
    }
}
