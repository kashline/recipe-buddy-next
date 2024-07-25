'use client'

import { lusitana } from "./fonts";
import ProfileButton from "./profilebutton";
import { useRouter } from 'next/navigation';

export default function DefaultTopbar(){
    const router = useRouter()
    return(
        <div style={{display: 'flex'}}>
            <div style={{
                display: 'flex',
                width: "100%",
                border: "none",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <button 
                onClick={() => {router.push('/')}}>
                    <p style={{fontSize: "100%", color: 'white', ...lusitana.style}}>Recipe Buddy</p>
                </button>
                
            </div>
            <div style={{ paddingLeft: ""}}>
                <ProfileButton></ProfileButton>
            </div>
        </div>

    )
}