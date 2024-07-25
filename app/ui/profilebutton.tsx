import ProfileDropdown from "./profiledropdown"
import Image from "next/image"
import React from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { selectProfileSlice, setToggle } from "../lib/features/profile/profileSlice";
import { useAppSelector, useAppDispatch } from "../lib/hooks";


export default function ProfileButton(){
    const profileSlice = useAppSelector(selectProfileSlice)
    const dispatch = useAppDispatch()
    const { user, error, isLoading } = useUser()
    const [profileDropdown, setProfileDropdown] = React.useState(false)
    const contextValue = {
        profileDropdown,
        setProfileDropdown
    }
    return (
        <>
            {profileSlice.toggle && <ProfileDropdown></ProfileDropdown>}
            <button style={{
                float: 'right',
                width: 40,
                height: 40,
                alignContent: 'center',
                padding: 0,
                marginRight: 2,
                marginTop: 2
            }} onClick={() => {dispatch(setToggle())}}>
                {user && 
                    <Image
                        src={`${user?.picture}` || '/chef-icon.png'}
                        style={{
                            height: 40,
                            maxWidth: 40,
                            width: 40,
                        }}
                        width={40}
                        height={40}
                        alt={`Profile picture`}
            />}{!user && 
                <svg style={{
                    height: 40,
                    width: 40,
                    backgroundColor: 'black'
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            }</button>
        </>
    )
}