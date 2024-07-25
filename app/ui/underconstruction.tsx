import Link from "next/link";

export default function UnderConstruction(){
    return(
        <main className="flex min-h-screen flex-col p-6">
            <div style={{minHeight: 'screen', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                <h1><strong style={{ color: 'white' }}>Under construction</strong></h1>
                <Link
                    href="/"
                    className="max-w-36 flex items-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
                    <span>Take me home</span>
                </Link>
            </div>
        </main>
    )
}