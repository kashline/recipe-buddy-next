'use client'

import { usePathname } from 'next/navigation'
import RecipesNavButton from './nav/RecipesNavButton'

export default function TopNav(){
    const pathName = usePathname()
    const recipesRegex = new RegExp('/recipes*')
    return(
        <div>
            <nav style={{ marginTop: '0px', overflow: 'visible'}} id={"nav"}>
                <ul className="links">
                    <li className={pathName === '/' ? 'active' : ''}>
                        <a href="/">Home</a>
                    </li>
                    <li 
                        className={recipesRegex.test(pathName) ? 'active' : ''}
                        style={{ 
                            // paddingLeft: '2rem',
                            // paddingRight: '2rem'
                            // position: 'relative',
                        }}
                        >
                        <RecipesNavButton/>
                    </li>
                    {/* <li className={pathName === '/profile/friends' ? 'active' : ''}>
                        <a href="/profile/friends">Social</a>
                    </li>
                    <li className={pathName === '/profile/aboutus' ? 'active' : ''}>
                        <a href="/profile/aboutus">About Us</a>
                    </li> */}
                </ul>
            </nav>
        </div>
    )
}