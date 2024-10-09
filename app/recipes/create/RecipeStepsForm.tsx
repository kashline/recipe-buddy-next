import { Button } from "@mui/base";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import {
  setStepField,
  selectCreateRecipe,
  rearrangeSteps,
} from "@/app/lib/features/recipe/createRecipeSlice";
import "./styles.scss";
import RecipeStep from "./RecipeStep";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function RecipeStepsForm() {
  const createRecipe = useAppSelector(selectCreateRecipe);
  // Need a local state of the redux store state to ensure the sortable library can do animations smoothly
  const [items, setItems] = React.useState(createRecipe.RecipeSteps);
  const itemIds = React.useMemo(() => {
    return items.map((item) => item.step_number);
  }, [items]);
  const sensors = useSensors(useSensor(PointerSensor));
  const dispatch = useAppDispatch();
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const activeIndex = items.findIndex((s) => s.step_number === active.id);
      const overIndex = items.findIndex((s) => s.step_number === over.id);
      // Set local items array so we can have a smooth transition
      setItems(arrayMove(items, activeIndex, overIndex));
      // Update redux state so its not divergent from the local state
      dispatch(
        rearrangeSteps({
          items: items,
          oldIndex: items.findIndex((i) => active.id === i.step_number),
          newIndex: items.findIndex((i) => over.id === i.step_number),
        }),
      );
    }
  };
  // Update local state whenever the redux state changes
  React.useEffect(() => {
    setItems(createRecipe.RecipeSteps);
  }, [createRecipe.RecipeSteps]);
  return (
    <div className="steps-form">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {items.map((id, index) => {
            return (
              <RecipeStep
                key={index}
                index={index}
                recipe={id}
                createRecipe={createRecipe}
                setStepField={setStepField}
                dispatch={dispatch}
              />
            );
          })}
        </SortableContext>
      </DndContext>
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
