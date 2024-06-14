import Link from "next/link";

export default function Page(){
    return(
        <div>
            <p>
                Recipe delete successfully.
            </p>
            <Link href={'/recipes'}>Return</Link>
        </div>
    )
}