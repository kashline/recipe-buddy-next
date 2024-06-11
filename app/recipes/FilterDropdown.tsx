'use client'

import React from "react";
import Search from "../ui/search";
import { MenuItem } from "@mui/base";
import Cloud from "@mui/icons-material/Cloud";
import { Paper, MenuList, ListItemText, Divider, ListItemIcon, Typography } from "@mui/material";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";

export default function FilterDropdown(){
    const [toggle, setToggle] = React.useState(false)
    if (!toggle){
        return(
            <div className="">
                <div className="flex">
                    <button style={{ width: '100%', height: 4 }} onClick={() => {setToggle(!toggle)}}>
                        <div style={{ display: 'flex'}}>
                            <ChevronRightIcon
                                className=" h-4"
                            />
                            <p className="pl-4" style={{paddingLeft: '4px'}}>Filters...</p>
                        </div>
                        <hr className=" h-px border-none bg-gray-400"></hr>
                    </button>
                </div>
            </div>
        )
    }
    return(
        <div className='overflow-hidden'>
                <button style={{ width: '100%', height: 4 }} onClick={() => {setToggle(!toggle)}}>
                    <div style={{ display: 'flex'}}>
                        <ChevronDownIcon
                            className=" h-4"
                        />
                        <p className="pl-4" style={{paddingLeft: '4px'}}>Filters...</p>
                    </div>
                </button>
            <hr className="h-px border-none bg-gray-400"></hr>
            <div className="flex">
                <p className="mt-auto mb-auto mr-2">Name</p>
                <Search placeholder="Begin typing a recipe name" param="name"></Search>
            </div>
            <div className="flex">
                <p className="mt-auto mb-auto mr-2">Ingredients</p>
                <Search placeholder="Begin typing an ingredient" param="ingredients"></Search>
            </div>
        </div>
    )
}