import { Button } from "@mui/base";
import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import {
  setStepField,
  selectCreateRecipe,
} from "@/app/lib/features/recipe/createRecipeSlice";
import "./styles.scss";
import Trashcan from "@/app/ui/icons/trashcan";

export default function RecipeStepsForm() {
  const createRecipe = useAppSelector(selectCreateRecipe);
  const dispatch = useAppDispatch();
  return (
    <div className="steps-form">
      <table>
        <thead>
          <tr>
            <th scope="col" className="">
              Step No.
            </th>
            <th scope="col" className="">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {createRecipe.RecipeSteps.map((_, index) => {
            return (
              <tr key={index}>
                <td key={`${index}-step_number`} className="pr-5 w-1">
                  <p className="rounded-md">{index + 1}</p>
                </td>
                <td key={`${index}-step`} style={{ paddingLeft: "1.25rem" }}>
                  <textarea
                    className="rounded-md"
                    placeholder="Description"
                    value={createRecipe.RecipeSteps[index].step}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      dispatch(
                        setStepField({
                          type: "setStep",
                          index: index,
                          value: e.target.value,
                        }),
                      );
                    }}
                  ></textarea>
                </td>
                <td>
                  <Button
                    style={{ boxShadow: "none" }}
                    key={`${index}-delete`}
                    onClick={() => {
                      dispatch(
                        setStepField({ type: "removeAtIndex", index: index }),
                      );
                    }}
                  >
                    <Trashcan></Trashcan>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        style={{ boxShadow: "none" }}
        onClick={() => {
          dispatch(setStepField({ type: "add" }));
        }}
      >
        Add Step
      </Button>
    </div>
  );
}
