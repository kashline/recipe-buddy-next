"use client";

export default function Page() {
  return (
    <main className="is-preload">
      <div
        className="h-svh"
        style={{
          background: `url(${process.env.NEXT_PUBLIC_BASE_URL}/burger.png)`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: ".65",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            maxWidth: "100vw",
          }}
          className="flex justify-center my-auto mx-auto"
        >
          <h1 className="text-8xl text-gunmetal">Welcome to RecipeBuddy</h1>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          maxWidth: "100vw",
        }}
        className="flex h-28 bg-gradient-to-br from-black via-gunmetal to-black"
      >
        <h1 className="text-4xl text-gray-400 mx-auto my-auto justify-center">
          Browse, edit, and save your favorite recipes
        </h1>
        <div></div>
      </div>

      <div
        className="h-svh"
        style={{
          background: `url(${process.env.NEXT_PUBLIC_BASE_URL}/browse-with-favorite.png)`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: ".65",
        }}
      >
        <div className="w-fit bg-gunmetal opacity-85 ml-[15%] pt-[10%] bg-clip-content">
          <div className="border-4 px-2 py-2 rounded-md border-black">
            <h1 className="text-non-photo-blue text-8xl">
              Search <br /> easy
            </h1>
            <span className="text-lavendar-blush text-2xl">
              Search by regions, <br /> tags, ingredients and more
            </span>
          </div>
        </div>
        <div className="w-fit bg-gunmetal opacity-85 ml-[55%] bg-clip-content">
          <div className="border-4 px-2 py-2 rounded-md border-black">
            <h1 className="text-non-photo-blue text-8xl">
              Your <br /> recipes
            </h1>
            <span className="text-lavendar-blush text-2xl">
              Quickly favorite any recipe <br /> to browse your own curated list
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          maxWidth: "100vw",
        }}
        className="flex h-28 bg-gradient-to-br from-black via-gunmetal to-black"
      >
        <p className="text-4xl text-gray-400 mx-auto my-auto justify-center">
          Create and share with friends!
        </p>
      </div>
      <div
        style={{
          background: `url(${process.env.NEXT_PUBLIC_BASE_URL}/fb-share.png)`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: ".65",
        }}
        className="h-svh"
      >
        <div className="w-full h-full flex opacity-85 justify-center ">
          <div className="border-4 bg-gunmetal px-2 py-2 rounded-md border-black my-auto">
            <h1 className="text-non-photo-blue text-8xl">
              Share <br /> everything
            </h1>
            <span className="text-lavendar-blush text-2xl">
              Share your creations with friends and family
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
