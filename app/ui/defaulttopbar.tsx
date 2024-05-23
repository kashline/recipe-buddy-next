'use client'

import { lusitana } from "./fonts";
import ProfileButton from "./profilebutton";

export default function DefaultTopbar(){
    return(
        <div style={{display: 'flex'}}>
            <div style={{
                display: 'flex',
                width: "100%",
                border: "none", 
                backgroundColor: "",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <p style={{fontSize: "100%", ...lusitana.style}}>Recipe Buddy</p>
                {/* <hr style={{height: "20px", width: "100%", border: "none", borderColor: "gray", backgroundColor: "gray"}}></hr> */}
            </div>
            <div style={{ paddingLeft: ""}}>
                <ProfileButton></ProfileButton>
            </div>
        </div>

    )
}