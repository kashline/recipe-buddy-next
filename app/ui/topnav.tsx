'use client'

import { usePathname } from 'next/navigation'

export default function TopNav(){
    const pathName = usePathname()
    const recipesRegex = new RegExp('/recipes*')
    return(
        <div>
            <nav style={{ marginTop: '0px'}} id={"nav"}>
                <ul className="links">
                    <li className={pathName === '/' ? 'active' : ''}>
                        <a href="/">Home</a>
                    </li>
                    <li className={pathName === '/recipes' ? 'active' : ''} style={{}}>
                        <a href='/recipes'>Browse Recipes</a>
                    </li>
                    <li className={pathName === '/recipes/create' ? 'active' : ''}>
                        <a href="/recipes/create">Create New Recipe</a>
                    </li>
                    <li className={pathName === '/recipes/buddy' ? 'active' : ''}>
                        <a href='/buddy'>Buddy</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}