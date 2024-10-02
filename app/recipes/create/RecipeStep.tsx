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
    <div
      ref={setNodeRef}
      style={style}
      key={recipe.step_number}
      {...attributes}
      {...listeners}
    >
      <div>
        <textarea
          className="rounded-md"
          placeholder="Description"
          value={recipe.step}
          key={`${recipe.step_number}-text`}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(
              setStepField({
                type: "setStep",
                index: index,
                value: e.target.value,
              })
            );
          }}
        ></textarea>
        <Button
          style={{ boxShadow: "none" }}
          key={`${recipe.step_number}-delete`}
          onClick={() => {
            dispatch(setStepField({ type: "removeAtIndex", index: index }));
          }}
        >
          <Trashcan></Trashcan>
        </Button>
      </div>
    </div>
  );
}
