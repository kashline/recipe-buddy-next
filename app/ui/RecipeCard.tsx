"use client";

import { CardActionArea, CardContent, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import chefImage from "../../public/chef-icon.png";
import { useState } from "react";

export default function RecipeCard({ data }: { data: any }) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
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
          height: "100%",
          width: "20rem",
          border: "none",
        }}
        onClick={() => {
          router.push(`/recipes/${data.name}`);
        }}
      >
        <Image
          height={0}
          width={0}
          src={data.image || chefImage}
          alt="tasty food"
          sizes="100vw"
          onLoad={() => {
            setImageLoaded(true);
          }}
          style={{
            padding: 0,
            height: "80%",
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
        <CardContent
          sx={{
            textAlign: "center",
            fontSize: "100%",
            lineHeight: "99%",
            height: "20%",
          }}
        >
          <span
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-line",
              textAlign: "center",
              width: "100%",
              wordSpacing: "normal",
              letterSpacing: "normal",
              color: "white",
            }}
          >
            {data.name}
          </span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
