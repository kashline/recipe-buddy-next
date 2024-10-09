import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  selectCreateRecipe,
  CreateRecipeState,
} from "../lib/features/recipe/createRecipeSlice";
import "./styles/Input.scss";

export default function Input({
  label,
  setFunction,
  required,
  props,
}: {
  label: string;
  setFunction: Function;
  required: boolean;
  props?: any;
}) {
  const dispatch = useAppDispatch();
  const createRecipe = useAppSelector(selectCreateRecipe);
  const friendlyLabel = `${label[0].toUpperCase()}${label.substring(1)}`;
  return (
    <div
      style={{
        display: "flex",
        paddingBottom: "1rem",
        whiteSpace: "nowrap",
      }}
    >
      <label
        style={{
          marginTop: "1rem",
          width: "auto",
          paddingRight: "1rem",
          color: "#EEE5E9",
        }}
      >
        {required ? `${friendlyLabel}` : friendlyLabel}
      </label>
      <input
        type="text"
        name={label}
        style={{
          border: "solid",
          borderWidth: "2",
          borderColor: "#EEE5E9",
          borderRadius: "10px",
          color: "white",
        }}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          dispatch(setFunction((e.target as HTMLInputElement).value));
        }}
        onClick={(e: React.FormEvent<HTMLInputElement>) => {
          if (createRecipe[label as keyof CreateRecipeState] === "") {
            dispatch(setFunction(""));
          }
        }}
        value={createRecipe[label as keyof CreateRecipeState]}
        placeholder={friendlyLabel}
        {...props}
      />
    </div>
  );
}
