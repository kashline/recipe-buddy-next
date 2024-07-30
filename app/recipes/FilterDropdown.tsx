'use client'

import React from "react";
import Search from "../ui/search";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function FilterDropdown(){
    const [toggle, setToggle] = React.useState(false)
    return(
        <div >
                <button style={{ width: '100%', height: '2rem'}} onClick={() => {setToggle(!toggle)}}>
                    <div style={{ display: 'flex', color: 'white', height: '100%'}}>
                        {toggle 
                        && <ChevronDownIcon style={{ height: 16, marginTop: 4 }}/> 
                        || <ChevronRightIcon style={{ height: 16, marginTop: 4 }}/>}
                        <p style={{ paddingBottom: '10rem'}}>Filters...</p>
                    </div>
                </button>
            <hr style={{ height: '1px', border: 'none', backgroundColor: 'white', margin: 'auto' }}></hr>
            {toggle && 
                <form style={{ 
                    paddingTop: '1rem'
                }}>
                    <div style={{ 
                        display: 'flex',
                        marginBottom: '1rem'
                    }}>
                        <p style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: '0.5rem', color: 'white' }}>Name</p>
                        <Search placeholder="Begin typing a recipe name" param="name"></Search>
                    </div>
                    <div style={{
                        display: 'flex'
                    }}>
                        <p style={{ 
                            marginTop: 'auto', 
                            marginBottom: 'auto', 
                            marginRight: '0.5rem', 
                            color: 'white' }}>Ingredients</p>
                        <Search placeholder="Begin typing an ingredient" param="ingredients"></Search>
                    </div>
                </form>
            }
        </div>
    )
}