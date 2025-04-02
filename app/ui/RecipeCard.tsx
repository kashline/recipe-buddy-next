"use client";

import { CardActionArea, CardContent, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import chefImage from "../../public/chef-icon.png";
import { useState } from "react";
import { RecipeZype } from "../lib/data/zodels/Recipe";
import FavoriteButton from "./FavoriteButton";
import friendifyWords from "../lib/utils/wordfriendifier";
import { Session } from "next-auth";

export default function RecipeCard({
  data,
  session,
  props,
}: {
  data: RecipeZype;
  session: Session | null;
  props?: any;
}) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const favorited =
    "UserRecipes" in data && data.UserRecipes?.length === 1 ? true : false;
  return (
    <div className="border" {...props}>
      <Card
        sx={{
          width: "20rem",
          height: "25rem",
          verticalAlign: "top",
          backgroundColor: "black",
        }}
      >
        <CardActionArea
          sx={{
            height: "80%",
            width: "20rem",
            border: "none",
          }}
          onClick={() => {
            router.push(`/recipes/${data.id}`);
          }}
        >
          <Image
            height={0}
            width={0}
            src={
              data.image === "undefined" || data.image === null
                ? chefImage
                : data.image
            }
            alt="tasty food"
            sizes="100vw"
            data-cy={`imagebutton`}
            priority
            onLoad={() => {
              setImageLoaded(true);
            }}
            style={{
              padding: 0,
              height: "100%",
              width: "99%",
              marginLeft: "auto",
              marginRight: "auto",
              opacity: imageLoaded ? 1 : 0,
            }}
          />
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) !important",
              opacity: !imageLoaded ? 1 : 0,
              transitionDuration: "500ms",
              transitionProperty: "opacity",
              transitionTimingFunction: "ease-out",
            }}
          ></CircularProgress>
        </CardActionArea>
        <CardContent
          sx={{
            textAlign: "center",
            fontSize: "100%",
            lineHeight: "99%",
            height: "20%",
          }}
        >
          <div
            className="line-clamp-2"
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-line",
              textAlign: "center",
              width: "100%",
              height: "80%",
              wordSpacing: "normal",
              letterSpacing: "normal",
              color: "white",
            }}
          >
            {friendifyWords(data.title)}
          </div>
          <FavoriteButton
            recipeId={data.id!}
            recipeName={data.title}
            size="25px"
            session={session}
          />
        </CardContent>
      </Card>
    </div>
  );
}
