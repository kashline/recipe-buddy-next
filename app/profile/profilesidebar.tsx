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
                    <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                        <strong>Welcome {user!.name}!</strong>
                    </p>
                    <p>
                        Here you can create, save, and manage your recipes in one place.
                    </p>
                <div className="flex">
                <Link
                    href="/api/auth/logout"
                    className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                >
                    <span>Logout</span> <ArrowRightIcon className="w-5 md:w-6" />
                </Link>
                </div>
                <p>
                    Click &quot;Continue&quot; to get started
                    <Link
                    href="/recipes"
                    className="flex items-center gap-5 self-start rounded-lg bg-blue-500 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base px-5"
                    >
                    <span>Continue</span>
                    </Link>
                </p>
            </div>
        </>
    )
}