import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export const GET = async function ProfileServer(request: NextRequest) {
    const session = await getSession();
    const user = session?.user
    const referer = request.nextUrl.searchParams.get("referer") as string
    const baseUrl = process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'
    if (user !== undefined){
        const asdf = await fetch(
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
        console.log(asdf.status)
    }
    redirect(referer)
}
