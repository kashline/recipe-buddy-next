"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter()
  return (
    <main className="is-preload">
      <div
        id="wrapper"
        className="fade-in"
      >
        <div
          style={{
            paddingBottom: "25%",
            backgroundRepeat: 'no-repeat'
          }}
          id="intro"
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              width: 10000,
            }}
          >
            <h1
              style={{
                color: "black",
              }}
            >
              Welcome to RecipeBuddy
            </h1>
            <h2
              style={{
                color: "black",
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "white",
              }}
            >
              Your new cooking assistant
            </h2>

          </div>
        </div>
        <div id="main" style={{
          backgroundColor: 'white'
        }}>
              <h1>Your recipes. Your life. Your.... RecipeBuddy</h1>
              <div>
                <p>
                  All your recipes in one place.  No more looking for recipes for hours on every other website.  Gone are the days of searching each website to see if it has recipe management features.
                </p>
                <h1><strong>Finally, your recipes woes are solved</strong></h1>
                <Link href={'/recipes'}>Get started</Link>
              </div>
        </div>
        {/* <nav id={"nav"}>
            <ul className="links">
              <li className="active">
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/recipes">Recipes</a>
              </li>
              <li>
                <a href="elements.html">Elements Reference</a>
              </li>
            </ul>
          </nav> */}
      </div>
      {/* <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
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
      </div> */}
    </main>
  );
}
