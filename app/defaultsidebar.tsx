import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { lusitana } from "./ui/fonts"
import Login from "./ui/login"

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
            <Login></Login>
            <Link 
                href={"/user"}>
            </Link>
            </div>
            <div>
                <p>
                    Or feel free to browse recipes.
                    <Link
                    href="/recipes"
                    className="flex items-center gap-5 self-start rounded-lg bg-blue-500 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base px-5"
                    >
                    <span>Continue</span>
                    </Link>
                </p>
            </div>
        </div>
      </>
    )
}