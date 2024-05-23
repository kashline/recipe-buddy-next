'use client'

import styles from "@/app/ui/home.module.css"
import Logo from "./ui/logo";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoginLoading from "./ui/loginloading";
import Welcome from "./welcome";
import DefaultSidebar from "./defaultsidebar";
import LoggedinSidebar from "./loggedinsidebar";
import Link from "next/link";
import Image from "next/image";
import HomeTopbar from "./ui/hometopbar";

export default function Page() {
  const { user, error, isLoading } = useUser()
  return (
    <main className="flex min-h-screen flex-col p-6">
      <HomeTopbar></HomeTopbar>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
         <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <div
          className={styles.shape}
        />
        {!user && <DefaultSidebar></DefaultSidebar>}
        {user &&
          <LoggedinSidebar></LoggedinSidebar>
        }
        </div>
        <Welcome></Welcome>
      </div>
    </main>
  );
}
