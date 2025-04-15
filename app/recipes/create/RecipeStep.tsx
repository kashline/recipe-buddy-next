import { ChangeEvent } from "react";
import Trashcan from "@/app/ui/icons/trashcan";
import Button from "@/app/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/**
 * Form for sorting redux object RecipeSteps.  Handles sorting updates only
 * @param param0
 * @returns React.JSX.Element
 */
export default function RecipeStep({
  index,
  dispatch,
  setStepField,
  recipe,
}: {
  index: number;
  createRecipe: any;
  dispatch: Function;
  setStepField: Function;
  recipe: any;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: recipe.step_number });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div className="flex gap-2 justify-center pt-4">
      <p className="my-auto" style={{ color: "white" }}>{`${index + 1}`}</p>
      <div
        ref={setNodeRef}
        className="w-full"
        style={style}
        key={recipe.step_number}
        {...attributes}
        {...listeners}
        id={String(recipe.step_number)}
      >
        <div className="w-full">
          <textarea
            className="rounded-md bg-gunmetal text-lavendar-blush w-full"
            placeholder="Description"
            data-cy="stepdescription"
            value={recipe.description}
            key={`${recipe.step_number}-text`}
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
        </div>
      </div>
      <Button
        style={{ boxShadow: "none" }}
        key={`${recipe.step_number}-delete`}
        onClick={() => {
          dispatch(setStepField({ type: "removeAtIndex", index: index }));
        }}
        type={"button"}
      >
        <Trashcan style={{ stroke: "#eee5e9" }}></Trashcan>
      </Button>
    </div>
  );
}
