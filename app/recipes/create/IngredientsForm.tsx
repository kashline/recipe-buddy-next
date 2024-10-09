"use client";

import React, { ChangeEvent } from "react";
import {
  selectCreateRecipe,
  setIngredientField,
} from "@/app/lib/features/recipe/createRecipeSlice";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { Button } from "@mui/base";
import { Menu, MenuItem, Typeahead } from "react-bootstrap-typeahead";
import Trashcan from "@/app/ui/icons/trashcan";
import AnimatedLoading from "@/app/ui/loading/animatedloading";

import "./styles.scss";

export default function IngredientsForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [ingredients, setIngredients] = React.useState<String[]>([]);
  const typaheadRef = React.useRef(null);

  const selectRecipe = useAppSelector(selectCreateRecipe);
  const dispatch = useAppDispatch();

  const handleChange = (query: string, index: number) => {
    dispatch(
      setIngredientField({
        type: "setName",
        index: index,
        value: query,
      }),
    );
    setIsLoading(true);
    fetch(`/api/recipes/ingredients?name=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data);
        setIsLoading(false);
      });
  };
  if (selectRecipe.status === "loading")
    return <AnimatedLoading name="Ingredient"></AnimatedLoading>;
  return (
    <div
      style={{
        padding: 10,
        borderRadius: 10,
        maxWidth: "fit-content",
        marginInline: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "99%",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            maxWidth: "fit-content",
            alignContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ color: "white", marginRight: "20%" }}>Name</p>
            <p style={{ color: "white", marginLeft: "20%" }}>Quantity</p>
          </div>
          {selectRecipe.Ingredients.map((ingredient, index) => {
            return (
              <div
                key={`ingredient-container-${index}`}
                style={{
                  // backgroundColor: "inherit",
                  display: "flex",
                  borderRadius: "25px",
                  maxWidth: "fit-content",
                  height: "35px",
                  marginBottom: "10px",
                  zIndex: 1,
                }}
              >
                <div
                  key={`ingredient-typeahead-${index}`}
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    borderRadius: "20px",
                    width: "53%",
                  }}
                >
                  {/* Ingredient Typeahead */}
                  <Typeahead
                    placeholder={"Ingredient..."}
                    options={ingredients !== undefined ? ingredients : [""]}
                    isLoading={isLoading}
                    ref={typaheadRef}
                    defaultSelected={[ingredient.name]}
                    onInputChange={(query) => handleChange(query, index)}
                    emptyLabel={"Start typing to search"}
                    allowNew={true}
                    inputProps={{
                      style: {
                        height: "35px",
                        borderRadius: "25px",
                        width: "100%",
                        borderColor: "#EEE5E9",
                        color: "white",
                      },
                    }}
                    renderMenu={(results, menuProps) =>
                      (
                        // These props are being passed down to other elements causing react errors in the console
                        delete menuProps.renderMenuItemChildren,
                        delete menuProps.paginationText,
                        delete menuProps.newSelectionPrefix,
                        (
                          <Menu style={{}} {...menuProps}>
                            {results.map(
                              (result, index) => (
                                console.log(typeof result),
                                (
                                  <div
                                    style={{ width: "100%" }}
                                    key={`ingredient-menuitem-${index}`}
                                  >
                                    <MenuItem
                                      style={{}}
                                      option={result}
                                      position={index}
                                    >
                                      {typeof result === "string"
                                        ? String(result)
                                        : String(result.label)}
                                    </MenuItem>
                                  </div>
                                )
                              ),
                            )}
                          </Menu>
                        )
                      )
                    }
                  />
                </div>
                {/* Very stylish dividing bar */}
                <div
                  key={`stylish-bar-${index}`}
                  style={{
                    height: "100%",
                    width: "1px",
                    backgroundColor: "gray",
                  }}
                />
                {/* Quantity input */}
                <div
                  key={`quantity-input-${index}`}
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    display: "flex",
                    borderColor: "white",
                    width: "44%",
                  }}
                >
                  <input
                    className="quantity-input"
                    type="text"
                    style={{
                      textAlign: "right",
                      borderRadius: "25px",
                      width: "100%",
                      paddingRight: "20px",
                      backgroundColor: "inherit",
                      color: "white",
                      border: "solid",
                      borderColor: "#EEE5E9",
                      height: "35px",
                    }}
                    value={
                      selectRecipe.Ingredients[index].RecipeIngredient.quantity
                    }
                    placeholder="Quantity"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setIngredientField({
                          type: "setQuantity",
                          index: index,
                          value: (e.target as HTMLInputElement).value,
                        }),
                      );
                    }}
                  />
                </div>
                <div
                  key={`delete-button-${index}`}
                  style={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    key={`${index}-delete`}
                    style={{
                      boxShadow: "none",
                      paddingLeft: 0,
                      paddingRight: 10,
                    }}
                    onClick={() => {
                      dispatch(
                        setIngredientField({
                          type: "removeAtIndex",
                          index: index,
                        }),
                      );
                    }}
                  >
                    <Trashcan style={{ stroke: "white" }}></Trashcan>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        style={{ marginTop: 22, boxShadow: "none", color: "whitesmoke" }}
        onClick={() => {
          dispatch(setIngredientField({ type: "add" }));
        }}
      >
        Add Ingredient
      </Button>
    </div>
  );
}
