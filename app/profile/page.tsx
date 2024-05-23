'use client'

import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image"
import ProfileSidebar from "./profilesidebar"
import Login from "../ui/login"

export default function Page(){
    const { user, error, isLoading } = useUser()
    if (!user){
        return(
            <>
                Please login to view this page
                <Login></Login>
            </>
        )
    }
    if (isLoading) return(
      <div>
        Logging you in...
      </div>
    )
    if (error) {
      return(
        <div>
          {error.message}
        </div>
      )
    }
    return (
        <div className=" text-center">
            <p>
                Welcome {user?.name}
            </p>
            <div className="">
                <Image                       
                src={`${user?.picture}` || '/chef-icon.png'}
                className="ml-auto mr-0 mt-0 mb-auto"
                width={100}
                height={100}
                alt={`Profile picture`}
                />
            </div>
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <ProfileSidebar></ProfileSidebar>
            </div>
        </div>
    )
}