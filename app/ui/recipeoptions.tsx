"use client";

import FavoriteButton from "@/app/ui/FavoriteButton";
import EditIcon from "@/app/ui/icons/editicon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { RecipeZype } from "../lib/data/zodels/Recipe";
import useResponsiveBreakpoints from "../lib/utils/useResponsiveBreakpoints";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  fetchRecipe,
  selectCreateRecipe,
} from "../lib/features/recipe/createRecipeSlice";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import RecipeRating from "@/app/ui/reciperatingbutton";

export default function RecipeOptions({
  recipe,
  session,
}: {
  recipe: RecipeZype;
  session: Session | null;
}) {
  const user = session?.user;
  const path = usePathname();
  const body =
    "I wanted to share this awesome recipe with you. You can find full details below along with thousands of other recipes on recipebuddy.us!";
  const subject = "Check out this recipe I found on RecipeBuddy!";
  const [isMobile] = useResponsiveBreakpoints();
  const shareSize = isMobile ? 50 : 75;
  const iconSize = isMobile ? 25 : 50;
  const [url, setUrl] = React.useState("");
  const selectRecipe = useAppSelector(selectCreateRecipe);
  const dispatch = useAppDispatch();

  const fetchStatus = useAppSelector((state: any) => state.status);
  React.useEffect(() => {
    if (selectRecipe.status === "idle") {
      dispatch(fetchRecipe(String(recipe.id)));
    }
  }, [fetchStatus, dispatch, recipe.id, selectRecipe.status]);
  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);
  if (!user) {
    return (
      <button onClick={() => signIn()} className="relative flex mx-auto items-center text-lavendar-blush hover:text-non-photo-blue">
        Please log in to edit and favorite recipies!
      </button>
    );
  }

  return (
    <div className="">
      <div
        style={{
          display: "grid",
          gridAutoColumns: "minmax(0, 1fr)",
          gridAutoFlow: `${isMobile ? 'row' : 'column'}`,
        }}
        className=" mx-auto"
      >
        {user!.email === recipe.owner && (
          <Link
            className="h-fit justify-center align-middle mx-auto"
            data-cy="editbutton"
            href={`${path}/edit`}
          >
            <EditIcon style={{ width: iconSize }} />
          </Link>
        )}
        <div className="relative flex justify-center items-center">
          <FavoriteButton
            recipeId={recipe.id!}
            session={session}
            recipeName={recipe.title}
          />
        </div>
        <div className="my-auto">
          <RecipeRating userEmail={user.email!} recipeId={recipe.id!}/>
        </div>
      </div>
      <div className={`mx-auto justify-center items-center flex h-32`}>
        <EmailShareButton url={`${url}`} subject={subject} body={body}>
          <EmailIcon size={shareSize} className="pb-0" />
        </EmailShareButton>
        <FacebookShareButton url={`${url}`} hashtag={`#recipebuddy.us`}>
          <FacebookIcon size={shareSize} />
        </FacebookShareButton>
        <TwitterShareButton url={`${url}`}>
          <TwitterIcon size={shareSize} />
        </TwitterShareButton>
      </div>
    </div>
  );
}
