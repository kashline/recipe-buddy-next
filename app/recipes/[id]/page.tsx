"use server";

import friendifyWords from "@/app/lib/utils/wordfriendifier";
import "./styles.css";
import { RecipeStepZype, RecipeZype } from "@/app/lib/data/zodels/Recipe";
import IngredientsTable from "@/app/ui/ingredientstable";
import RecipeQuickInfo from "@/app/ui/recipequickinfo";
import React from "react";
import Head from "next/head";
import { getSession } from "@auth0/nextjs-auth0";
import { env } from "process";

export default async function Page({ params }: { params: { id: string } }) {
  // noStore();
  // const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

  // const [url, setUrl] = React.useState("");
  // React.useEffect(() => {
  //   setUrl(window.location.href);
  // }, []);
  // const data = await fetch(`/api/recipes/${id}`);
  try {
    const id = Number(params.id);
    const user = await getSession();
    const attributes: string[] = [
      "title",
      "difficulty",
      "preparationTime",
      "cookingTime",
      "image",
      "video",
      "id",
      "description",
      "owner",
      "aigenerated",
    ];
    // const slug =  params;
    const { data } = await (
      await fetch(
        `${env.APP_URL}/api/recipes/${id}${user !== null ? `?userSub=${user!.user.sub}` : ``}`
      )
    ).json();

    const recipe: RecipeZype = data;
    const friendlyName = friendifyWords(recipe.title);
    const favorited =
      "UserRecipes" in recipe && recipe.UserRecipes.length === 1 ? true : false;
    // console.log(favorited)
    return (
      // <></>
      <div style={{ color: "white" }}>
        <Head>
          <meta property="og:url" content={`${env.APP_URL}/recipes/${id}`} key={`url`} />
          <meta property="og:type" content="article" key={`type`} />
          <meta property="og:title" content={`${recipe.title}`} key={`title`} />
          <meta
            property="og:description"
            content={`${recipe.description}`}
            key={`description`}
          />
          <meta property="og:image" content={`${recipe.image}`} key={`image`} />
        </Head>
        <div
          style={{
            textAlign: "center",
            fontSize: "2.25rem",
            lineHeight: "2.5rem",
            paddingBottom: "1rem",
          }}
          className="text-lavendar-blush"
        >
          <strong className="text-lavendar-blush">{friendlyName}</strong>
        </div>
        <div>
          <p className="mx-auto text-center">Submitted by: {recipe.owner}</p>
          {recipe.aigenerated && (
            <p className="mx-auto text-center border-non-photo-blue border-solid border-2 w-fit px-2">
              Some or all of this recipe was created using AI
            </p>
          )}
        </div>
        <RecipeQuickInfo recipe={recipe} favorited={favorited} />
        <div className="flex">
          <div
            style={{
              marginRight: 20,
              width: "100%",
            }}
          >
            <div>
              <div
                style={{
                  paddingTop: 20,
                }}
              >
                <p style={{ textAlign: "center", paddingBottom: 2 }}>
                  <strong style={{ color: "white" }}>Instructions</strong>
                </p>
                {/* Recipe Steps */}
                {recipe.RecipeSteps.map(
                  (step: RecipeStepZype, index: number) => {
                    return (
                      <div key={index}>
                        <div style={{ display: "flex" }} key={index}>
                          <p
                            style={{
                              paddingLeft: 15,
                              paddingRight: 15,
                            }}
                            className="pb-0 my-auto"
                            key={index}
                          >
                            <strong style={{ color: "white" }}>
                              {step.step_number}
                            </strong>
                          </p>
                          <div className="flex w-full">
                            <div className="w-full flex my-auto">
                              {step.description}
                            </div>
                            <IngredientsTable
                              data={step.ingredients!}
                            ></IngredientsTable>
                          </div>
                        </div>
                        <hr
                          style={{
                            height: "1px",
                            border: "none",
                            backgroundColor: "gray",
                            width: "100%",
                          }}
                          className="py-0 my-0"
                        ></hr>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // return parseResponse(recipe);
  } catch (error) {
    return <>There was an error</>;
  }
  // const res = await data.json()
  // if (error)
  //   return <div style={{ color: "white" }}>ERROR {JSON.stringify(error)}</div>;
  // if (isLoading) return <AnimatedLoading name="recipe" />;
}
