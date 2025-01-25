'use client'

import React from "react";
import './ingredientstable.css'

export default function IngredientsTable({ data }: { data: string[] }) {
  return (
    <div className="text-lavendar-blush w-1/5 max-w-1/5 max-h-full text-sm mx-auto my-auto">
      {data.length === 0 ? (
        <p>None</p>
      ) : (
        data.map((ingredient: any, index: number) => {
          return (
            <div key={index} className="ingredient-tooltip">
              <span className="text-ellipsis overflow-hidden whitespace-nowrap w-24">{`${ingredient.name}`}</span>
              <span>{`|`}</span>
              <span className="flex text-ellipsis overflow-hidden whitespace-nowrap">{`${ingredient.quantity} ${ingredient.unit}`}</span>
              <span className="ingredient-tooltip-text">{`${ingredient.name} | ${ingredient.quantity} ${ingredient.unit}`}</span>
            </div>
          );
        })
      )}
    </div>
  );
}
