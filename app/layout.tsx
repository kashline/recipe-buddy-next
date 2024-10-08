import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/assets/css/main.css";
import "../styles/assets/css/noscript.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { StoreProvider } from "./StoreProvider";
import DefaultTopbar from "./ui/defaulttopbar";
import TopNav from "./ui/topnav";
import * as React from "react";
import UserMetadata from "./UserMetadata";
import { ToastContainer } from "react-toastify";
// import '../styles/assets/css/fontawesome-all.min.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecipeBuddy",
  description: "Recipe management software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <StoreProvider>
          <UserMetadata>
            <SpeedInsights></SpeedInsights>
            <Analytics></Analytics>
            <body className={inter.className}>
              <div>
                <DefaultTopbar />
                <TopNav></TopNav>
              </div>
              <div
                style={{
                  height: "100vh",
                  paddingLeft: "5%",
                  paddingTop: "2%",
                  paddingRight: "4%",
                }}
              >
                {children}
              </div>
              <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                // transition="Bounce"
              />
            </body>
          </UserMetadata>
        </StoreProvider>
      </UserProvider>
    </html>
  );
}
