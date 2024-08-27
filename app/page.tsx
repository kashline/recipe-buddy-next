"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main className="is-preload">
      <div id="wrapper" className="fade-in" data-testid="wrapper">
        <div
          style={{
            paddingBottom: "25%",
            backgroundRepeat: "no-repeat",
          }}
          id="intro"
          data-testid="intro"
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
        <div
          id="main"
          data-testid="main"
          style={{
            backgroundColor: "white",
          }}
        >
          <h2>Your recipes. Your life. Your.... RecipeBuddy</h2>
          <div>
            <p>
              All your recipes in one place. No more looking for recipes for
              hours on every other website. Gone are the days of searching each
              website to see if it has recipe management features.
            </p>
            <h2>
              <strong>Finally, your recipes woes are solved</strong>
            </h2>
            <Link href={"/recipes"}>Get started</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
