"use server";

import friendifyWords from "@/app/lib/utils/wordfriendifier";
import "./styles.css";
import { RecipeStepZype, RecipeZype } from "@/app/lib/data/zodels/Recipe";
import IngredientsTable from "@/app/ui/ingredientstable";
import RecipeQuickInfo from "@/app/ui/recipequickinfo";
import React from "react";
import { env } from "process";
import { auth } from "@/auth";
import CommentWindow from "@/app/ui/commentwindow";
import AddCommentForm from "@/app/ui/addcommentform";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = Number(params.id);
    const session = await auth();
    const user = session?.user;
    const { data } = await (
      await fetch(
        `${env.APP_URL}/api/recipes/${id}${user !== undefined ? `?userSub=${user!.email}` : ``}`
      )
    ).json();
    const recipe: RecipeZype = data;
    const friendlyName = friendifyWords(recipe.title);
    return (
      <div style={{ color: "white" }} className="w-[70%] mx-auto">
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
        <div className="flex justify-center">
          <div
            style={{
              marginRight: 20,
              width: "100%",
              maxWidth: 1200,
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
                {/* Comments */}
                <div className="pb-10 mx-auto">
                  <h1 className="text-lavendar-blush text-center text-2xl pb-10 pt-10 mx-auto">
                    Comments
                  </h1>
                  <div className="mb-16">
                    {user && <AddCommentForm user={user} recipeId={id} />}
                  </div>

                  <div className="text-center pb-5">
                    {recipe.RecipeComments?.length === 0 && (
                      <p className="text-lavendar-blush">There are no comments here... yet. Start the discussion!</p>
                    )}
                    {recipe.RecipeComments &&
                      recipe.RecipeComments.map((comment, index) => {
                        return <CommentWindow key={index} data={comment} />;
                      })}
                  </div>
                </div>
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
