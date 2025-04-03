"use client";

import React, { ChangeEvent } from "react";
import {
  selectCreateRecipe,
  setIngredientField,
} from "@/app/lib/features/recipe/createRecipeSlice";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import Button from "@/app/ui/button";
import { Menu, MenuItem, Typeahead } from "react-bootstrap-typeahead";
import Trashcan from "@/app/ui/icons/trashcan";
import AnimatedLoading from "@/app/ui/loading/animatedloading";
import "./typeahead.css";
import Ingredient from "@/app/data/models/Ingredient";

export default function IngredientsForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [ingredients, setIngredients] = React.useState<
    { id: number; name: string }[]
  >([]);
  const typaheadRef = React.useRef(null);
  const selectRecipe = useAppSelector(selectCreateRecipe);
  const dispatch = useAppDispatch();
  const handleChange = (query: string, index: number) => {
    dispatch(
      setIngredientField({
        type: "setName",
        index: index,
        value: query,
      })
    );
    setIsLoading(true);
    fetch(`/api/recipes/ingredients?name=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data.data.length !== 0 ? data.data : []);
        setIsLoading(false);
      });
  };
  const handleMenuClick = async (
    query: string,
    ingredientIndex: number,
    menuIndex: number
  ) => {
    const res = await (
      await fetch(`/api/recipes/ingredients?name=${query}`)
    ).json();
      dispatch(
        setIngredientField({
          type: "setName",
          index: ingredientIndex,
          value: query,
        })
      );
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
                  <Typeahead
                    placeholder={"Ingredient..."}
                    options={ingredients.map(
                      (ingredient: { id: number; name: string }) => {
                        return ingredient.name;
                      }
                    )}
                    isLoading={isLoading}
                    ref={typaheadRef}
                    defaultSelected={[ingredient.name]}
                    onInputChange={(query) => handleChange(query, index)}
                    emptyLabel={"Start typing to search"}
                    allowNew={true}
                    selected={[ingredient.name]}
                    inputProps={{
                      className:
                        "text-lavendar-blush bg-gunmetal rounded-md w-full",
                      style: {
                        height: "35px",
                        width: "100%",
                      },
                      // "data-cy": "ingredient"
                    }}
                    renderMenu={(results, menuProps) =>
                      (
                        // These props are being passed down to other elements causing react errors in the console
                        delete menuProps.renderMenuItemChildren,
                        delete menuProps.paginationText,
                        delete menuProps.newSelectionPrefix,
                        (
                          <Menu className="h-28 z-10" style={{}} {...menuProps}>
                            {results.map((result, menuIndex) => (
                              <div
                                className="bg-lavendar-blush"
                                style={{ width: "100%" }}
                                key={`ingredient-menuitem-${menuIndex}`}
                              >
                                <MenuItem
                                  style={{}}
                                  option={result}
                                  position={menuIndex}
                                  data-cy={`ingredientchoice${menuIndex}`}
                                  onClick={(
                                    item: React.MouseEvent<
                                      HTMLAnchorElement,
                                      MouseEvent
                                    >
                                  ) => {
                                    const target = item.target as HTMLElement;
                                    handleMenuClick(
                                      target.innerText,
                                      index,
                                      menuIndex
                                    );
                                  }}
                                >
                                  {typeof result === "string"
                                    ? String(result)
                                    : String(result.label)}
                                </MenuItem>
                              </div>
                            ))}
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
                    className="w-full text-right rounded-md bg-gunmetal text-lavendar-blush"
                    type="text"
                    data-cy="quantityfield"
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
                        })
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
                    type={"button"}
                    data-cy={"deleteingredientbutton"}
                    onClick={() => {
                      dispatch(
                        setIngredientField({
                          type: "removeAtIndex",
                          index: index,
                        })
                      );
                    }}
                  >
                    <Trashcan style={{ stroke: "#eee5e9" }} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        className="text-lavendar-blush hover:text-non-photo-blue"
        style={{ marginTop: 22, boxShadow: "none", color: "whitesmoke" }}
        onClick={() => {
          dispatch(setIngredientField({ type: "add" }));
        }}
        type={"button"}
      >
        Add Ingredient
      </Button>
    </div>
  );
}
