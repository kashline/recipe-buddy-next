"use server";

import friendifyWords from "@/app/lib/utils/wordfriendifier";
import "./styles.css";
import { RecipeStepZype, RecipeZype } from "@/app/lib/data/zodels/Recipe";
import IngredientsTable from "@/app/ui/ingredientstable";
import RecipeQuickInfo from "@/app/ui/recipequickinfo";
import React from "react";
import { env } from "process";
import type { Metadata, ResolvingMetadata } from "next";
import { auth } from "@/auth";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const { data } = await fetch(`${env.APP_URL}/api/recipes/${id}`).then((res) =>
    res.json()
  );
  const recipe: RecipeZype = data;

  // optionally access and extend (rather than replace) parent metadata
  return {
    title: recipe.title,
    openGraph: {
      images: [recipe.image!],
      description: recipe.description,
      url: `${env.APP_URL}/recipes/${id}`,
      type: "article",
      title: `${friendifyWords(recipe.title)}`,
    },
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = Number(params.id);
    const session = await auth();
    const user = session?.user;
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
    const { data } = await (
      await fetch(
        `${env.APP_URL}/api/recipes/${id}${user !== undefined ? `?userSub=${user!.email}` : ``}`
      )
    ).json();
    
    const recipe: RecipeZype = data;
    const friendlyName = friendifyWords(recipe.title);
    const favorited =
      "UserRecipes" in recipe && recipe.UserRecipes?.length === 1
        ? true
        : false;
    return (
      <div style={{ color: "white" }}>
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
        <RecipeQuickInfo recipe={recipe} session={session} />
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
                {recipe.RecipeSteps!.map(
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
                            <IngredientsTable data={step.ingredients!} />
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
  } catch (error) {
    return (
      <p className="text-lavendar-blush">There was an error: {`${error}`}</p>
    );
  }
}
