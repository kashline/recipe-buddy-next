import Image from "next/image"
import Link from "next/link"

export default function Welcome(){
    return (
        <>
            <div className="items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            <h1>You after eating all the great food RecipeBuddy helps you cook</h1>
                <Image
                    src="/hobbes-chair.jpg"
                    width={1000}
                    height={760}
                    className="hidden md:block"
                    alt="Images of the best food you could imagine"
                    />
                <Image
                    src="/hobbes-chair.jpg"
                    width={620}
                    height={560}
                    className="block md:hidden"
                    alt="Screenshots of the dashboard project showing mobile version"
                    />
                <Link href={`/cat`}><span>See more</span></Link>
            </div>
        </>

    )
}