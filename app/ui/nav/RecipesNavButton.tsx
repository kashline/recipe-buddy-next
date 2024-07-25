import { usePathname } from 'next/navigation';
import * as React from 'react'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

export default function RecipesNavButton(){
    const [state, setState] = React.useState(false)
    const pathName = usePathname()

    return(
        <ClickAwayListener onClickAway={() => setState(false)}>
            <a style={{
                cursor: 'pointer',
                height: '100%'
            }}
            onClick={() => {setState(!state)}}
            >Recipes
                {state && 
                    <div style={{ 
                        position: 'absolute',
                        }}>
                        <div className="dropdown-content" style={{
                            backgroundColor: "gray",
                            display: 'grid',
                            marginLeft: '-2rem',
                        }}>
                            <li className={pathName === '/recipes' ? 'active' : ''} style={{}}>
                                <a href='/recipes'>Browse All</a>
                            </li>
                            <li className={pathName === '/recipes/categories' ? 'active' : ''}>
                                <a href="/recipes/categories">Recipe Categories</a>
                            </li>
                            <li className={pathName === '/recipes/create' ? 'active' : ''}>
                                <a href="/recipes/create">New Recipe</a>
                            </li>
                        </div>
                    </div>
                }
            </a>
        </ClickAwayListener>
    )
}