"use client";

import FavoriteButton from "@/app/ui/FavoriteButton";
import EditIcon from "@/app/ui/icons/editicon";
import { useUser } from "@auth0/nextjs-auth0/client";
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

export default function RecipeOptions({
  recipe,
  favorited,
}: {
  recipe: RecipeZype;
  favorited: boolean;
}) {
  const path = usePathname();
  const body =
    "I wanted to share this awesome recipe with you. You can find full details below along with thousands of other recipes on recipebuddy.us!";
  const subject = "Check out this recipe I found on RecipeBuddy!";
  const { user, error, isLoading } = useUser();
  const [isMobile] = useResponsiveBreakpoints();
  const shareSize = isMobile ? 50 : 75;
  const [url, setUrl] = React.useState("");
  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);
  if (isLoading) return <h1>Loading...</h1>;
  if (error)
    return <Link href={`/api/auth/login`}>Error! Please try again</Link>;
  if (!user)
    return (
      <Link href={`/api/auth/login`} style={{ color: "white" }}>
        Please log in to edit and favorite recipies!
      </Link>
    );
  return (
    <div className="">
      <div
        style={{
          display: "grid",
          gridAutoColumns: "minmax(0, 1fr)",
          gridAutoFlow: "column",
        }}
        className="w-1/2 mx-auto"
      >
        {/* <Link
          className="h-fit justify-center align-middle mx-auto"
          href={`${path}/edit`}
        >
          <EditIcon style={{ width: "25px", height: '25px' }} />
        </Link> */}
        <FavoriteButton
          recipeId={recipe.id!}
          favorited={favorited}
          recipeName={recipe.title}
        />
      </div>
      <div className={`mx-auto justify-center items-center flex h-32`}>
        <EmailShareButton url={`${url}`} subject={subject} body={body}>
          <EmailIcon size={shareSize} className="pb-0" />
        </EmailShareButton>
        <FacebookShareButton url={`${url}`} hashtag={`#recipebuddy.us`}>
          <FacebookIcon size={shareSize} />
        </FacebookShareButton>
        <TwitterShareButton url={`${path}`}>
          <TwitterIcon size={shareSize} />
        </TwitterShareButton>
      </div>
    </div>
  );
}
