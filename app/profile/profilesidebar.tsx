import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useUser } from "@auth0/nextjs-auth0/client"
import { lusitana } from "../ui/fonts"

export default function ProfileSidebar(){
    const { user, error, isLoading } = useUser()
    if (error) {
      return(
        <div>
          {error.message}
        </div>
      )
    }
    return (
        <>
            <div>
                    <p 
                    style={{
                        fontSize: '1.25rem',
                        lineHeight: '1.75rem',
                        color: 'rgb(31 41 55)',
                    }}>
                    {/* // className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`} */}
                    
                        <strong>Welcome {user!.name}!</strong>
                    </p>
                    <p>
                        Here you can create, save, and manage your recipes in one place.
                    </p>
                <div style={{ 
                    display: 'flex'
                     }}>
                <Link
                    href="/api/auth/logout"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        alignSelf: 'flex-start',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgb(59 130 246)',
                        paddingLeft: '1.5rem',
                        paddingRight: '1.5rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        fontWeight: 500,
                        color: 'white',
                    }}
                >
                    <span>Logout</span> <ArrowRightIcon className="w-5 md:w-6" />
                </Link>
                </div>
                <p>
                    Click &quot;Continue&quot; to get started
                    <Link
                    href="/recipes"
                    style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        alignSelf: 'start',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgb(59 130 246)',
                        paddingLeft: '1.5rem',
                        paddingRight: '1.5rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        fontWeight: 500,
                        color: 'rgb(255 255 255)',
                    }}
                    // className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                    <span>Continue</span>
                    </Link>
                </p>
            </div>
        </>
    )
}