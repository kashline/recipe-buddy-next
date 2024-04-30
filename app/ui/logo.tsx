import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { lusitana } from "./fonts"
import Image from "next/image"

export default function Logo(){
    return (
    <div
    className={`${lusitana.className} flex-column items-center leading-none text-white`}>
        <Image
            src={"/chef-icon.png"}
            width={100}
            height={760}
            alt="Amazing cartoon chef that insipires you to cook."
            // className="bg-black"
        />
        <p className="text-[19px] text-black">RecipeBuddy</p>
    </div>
    )
}