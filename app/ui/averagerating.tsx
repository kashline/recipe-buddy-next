"use client";

import RatingIcon from "@/app/ui/icons/ratingicon";
import * as React from "react";

export default function AverageRating({ rating }: { rating: number }) {
  let val = -1;
  let remainder = 0;
  if (Math.floor(rating) < Math.ceil(rating)) {
    val = Math.floor(rating);
    remainder = (Math.round((rating % val) * 10) / 10);
  }
  return (
    <div className="flex w-fit mx-auto">
      {Array.from({ length: 5 }).map((_, index) => {
        let fill = "";
        if (rating! > index) {
          fill = "yellow";
          if (index === val) {
            fill = "none";
          }
        } else {
          fill = "none";
        }
        return (
          <div key={index}>
            {index !== val && (
              <RatingIcon
                style={{
                  height: `${"15px"}`,
                  width: `${"15px"}`,
                  fill: `${rating! > index ? "yellow" : "none"}`,
                }}
              />
            )}
            {index === val && (
              <RatingIcon
                style={{
                  height: `${"15px"}`,
                  width: `${"15px"}`,
                }}
                fillpercent={remainder*100}
              />
            )}
          </div>
        );
      })}
      <p className="text-lavendar-blush text-xs ml-1">
        {!Number.isNaN(rating) ? Math.floor(rating) + remainder : 0}
      </p>
    </div>
  );
}
