import Trashcan from "@/app/ui/icons/trashcan";
import { Button } from "@mui/base";
import React, { forwardRef } from "react";

// This should probably be the same component being rendered by RecipeStepsForm
const DraggableStep = forwardRef(
  ({ recipe, ...props }: { recipe: any }, ref: any) => {
    return (
      <div key={recipe.step_number} style={{ background: "white" }}>
        <div>
          <textarea
            className="rounded-md"
            placeholder="Description"
            value={recipe.step}
            key={`${recipe.step_number}-text`}
            readOnly={true}
          ></textarea>
          <Button
            style={{ boxShadow: "none" }}
            key={`${recipe.step_number}-delete`}
          >
            <Trashcan></Trashcan>
          </Button>
        </div>
      </div>
    );
  }
);

DraggableStep.displayName = "DraggableStep"

export default DraggableStep
