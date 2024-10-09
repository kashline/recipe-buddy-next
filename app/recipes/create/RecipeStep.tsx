import { ChangeEvent } from "react";
import Trashcan from "@/app/ui/icons/trashcan";
import { Button } from "@mui/base";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
    <div>
      <p style={{ color: "white" }}>{`${index + 1}`}</p>
      <div
        ref={setNodeRef}
        style={style}
        key={recipe.step_number}
        {...attributes}
        {...listeners}
        id={String(recipe.step_number)}
      >
        <div>
          <textarea
            className="rounded-md"
            placeholder="Description"
            style={{ color: "white", backgroundColor: "#1e252d" }}
            value={recipe.step}
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
      >
        <Trashcan style={{ stroke: "white" }}></Trashcan>
      </Button>
    </div>
  );
}
