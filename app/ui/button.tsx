import React from 'react'
import './styles/Button.css'

export default function Button(props: any){
    return(
        <button className="button" {...props}>{props.children}</button>
    )
}