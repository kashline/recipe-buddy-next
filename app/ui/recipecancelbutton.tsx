import { Button } from "@mui/base";
import Link from "next/link";
import React from "react";
// import createRecipe from "../lib/data/recipes/createRecipe";

export default function recipeCancelButton(name: string){
    const [cancelled, setCancelled] = React.useState(false)
    
    if (cancelled){
        return(
            <div>

            </div>
        )
    } else {
        return(
            <Button onClick={() => {setCancelled(!cancelled)}}>Cancel</Button>
        )
    }
}