import type { Metadata } from "next";
import "./globals.css";
// import "../styles/assets/css/main.css";
// import "../styles/assets/css/noscript.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { StoreProvider } from "./StoreProvider";
import DefaultTopbar from "./ui/defaulttopbar";
import TopNav from "./ui/topnav";
import * as React from "react";
import UserMetadata from "./UserMetadata";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gunmetal">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <UserProvider>
        <StoreProvider>
          <UserMetadata>
            <SpeedInsights></SpeedInsights>
            <body className="">
              {/* <Script src="../node_modules/flowbite/dist/flowbite.min.js"></Script> */}
              <DefaultTopbar />
              {/* <TopNav></TopNav> */}
              <div
                style={{
                  // height: "100vh",
                  paddingLeft: "4%",
                  paddingTop: "2%",
                  paddingRight: "4%",
                }}
              >
                {children}
                <Analytics />
              </div>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </body>
          </UserMetadata>
        </StoreProvider>
      </UserProvider>
    </html>
  );
}
