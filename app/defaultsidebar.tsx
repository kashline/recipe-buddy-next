import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { lusitana } from "./ui/fonts"

export default function DefaultSidebar(){
    return(
        <>
            <div>
                <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                    <strong>Welcome to RecipeBuddy!</strong>
                </p>
                <p className={`${lusitana.className} text-xl text-gray-800 md:text-2xl md:leading-normal`}>
                    Here you can create, save, and manage your recipes in one place.  Create an account to get started, or log in if you already have an account.
                </p>
            <div className="flex">
            <Link
                href="/api/auth/login"
                className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
                <span>Login</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
            <Link 
                href={"/user"}>
            </Link>
            </div>
            <div>
                <p>
                    Or feel free to browse recipes anonymously
                    <Link
                    href="/recipes"
                    className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base px-5"
                    >
                    <span>Continue</span>
                    </Link>
                </p>
            </div>
        </div>
      </>
    )
}