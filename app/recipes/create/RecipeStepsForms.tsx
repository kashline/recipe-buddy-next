import { Button } from "@mui/base";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import {
  setStepField,
  selectCreateRecipe,
  setStepNumbers,
} from "@/app/lib/features/recipe/createRecipeSlice";
import "./styles.scss";
import RecipeStep from "./RecipeStep";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableStep from "./DraggableStep";

export default function RecipeStepsForm() {
  const createRecipe = useAppSelector(selectCreateRecipe);
  const [activeId, setActiveId] = React.useState({ step_number: 0, step: "" });
  // Things get a little wonky with the sortable library if we don't use a local copy of the recipe steps
  const [items, setItems] = React.useState(createRecipe.RecipeSteps);
  const itemIds = React.useMemo(() => {
    return items.map((item) => String(item.step_number));
  }, [items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const dispatch = useAppDispatch();
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => active.id === i.step_number);
        const newIndex = items.findIndex((i) => over.id === i.step_number);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  React.useEffect(() => {
    dispatch(setStepNumbers({ items: items }));
  }, [items]);
  const handleDragStart = (event: any) => {
    const { active } = event;
    const recipe = items[items.findIndex((i) => active.id === i.step_number)];
    setActiveId(recipe);
  };
  return (
    <div className="steps-form">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {items.map((id, index) => {
            return (
              <div key={String(id.step_number)}>
                <p>{`${index + 1}`}</p>
                <RecipeStep
                  index={id.step_number}
                  recipe={id}
                  createRecipe={createRecipe}
                  setStepField={setStepField}
                  dispatch={dispatch}
                />
              </div>
            );
          })}
        </SortableContext>
        <DragOverlay>
          {activeId ? <DraggableStep recipe={activeId} /> : null}
        </DragOverlay>
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
