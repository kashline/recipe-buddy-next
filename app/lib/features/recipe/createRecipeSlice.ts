import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import Ingredient from "@/app/data/models/Ingredient";
import { arrayMove } from "@dnd-kit/sortable";

export interface CreateRecipeState {
  title: string;
  difficulty: string;
  description: string;
  preparationTime: number;
  cookingTime: number;
  tags: string[];
  servings: number;
  owner: string;
  aigenerated: boolean;
  video: string;
  image: string;
  id?: number;
  Ingredients: {
    id: number | null;
    name: string;
    RecipeIngredient: RecipeIngredient;
  }[];
  RecipeSteps: {
    step_number: number;
    description: string;
    ingredients: string[];
  }[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface RecipeIngredient {
  quantity: string;
}

const initialState: CreateRecipeState = {
  title: "",
  difficulty: "very short",
  description: "",
  preparationTime: 0,
  cookingTime: 0,
  tags: [],
  servings: 0,
  owner: "",
  aigenerated: false,
  video: "",
  image: "",
  Ingredients: [{ id: null, name: "", RecipeIngredient: { quantity: "" } }],
  RecipeSteps: [{ step_number: 1, description: "", ingredients: [] }],
  status: "idle",
  error: null,
};

export const createRecipeSlice = createSlice({
  name: "createRecipe",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<string>) => {
      state.difficulty = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setPreparationTime: (state, action: PayloadAction<string>) => {
      state.preparationTime = parseFloat(action.payload);
    },
    setCookingTime: (state, action: PayloadAction<string>) => {
      state.cookingTime = parseFloat(action.payload);
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setServings: (state, action: PayloadAction<string>) => {
      state.servings = parseFloat(action.payload);
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload;
    },
    setAIGenerated: (state, action: PayloadAction<boolean>) => {
      state.aigenerated = action.payload;
    },
    setVideo: (state, action: PayloadAction<string>) => {
      state.video = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setIngredientField: (
      state,
      action: PayloadAction<{
        type: string;
        index?: number;
        value?: string | any;
      }>
    ) => {
      switch (action.payload.type) {
        case "add":
          state.Ingredients.push({
            id: null,
            name: "",
            RecipeIngredient: { quantity: "" },
          });
          break;
        case "removeAtIndex":
          state.Ingredients = state.Ingredients.filter((val, index) => {
            if (
              index !== action.payload.index ||
              (index === 0 && state.Ingredients.length === 1)
            ) {
              return val;
            }
          });
          break;
        case "setIngredient":
          state.Ingredients[action.payload.index!].name =
            action.payload.value!.name;
          state.Ingredients[action.payload.index!].id =
            action.payload.value!.id;
          break;
        case "setName":
          state.Ingredients[action.payload.index!].name = action.payload.value!;
          break;
        case "setQuantity":
          state.Ingredients[action.payload.index!].RecipeIngredient.quantity =
            action.payload.value!;
          break;
        default:
          console.error(
            new Error("Invalid payload type for setIngredientField")
          );
          break;
      }
    },
    setStepField: (
      state,
      action: PayloadAction<{ type: string; index?: number; value?: string }>
    ) => {
      switch (action.payload.type) {
        case "add":
          state.RecipeSteps = [
            ...state.RecipeSteps,
            {
              step_number: state.RecipeSteps.length + 1,
              description: "",
              ingredients: [],
            },
          ];
          break;
        case "removeAtIndex":
          state.RecipeSteps = state.RecipeSteps.filter((val, index) => {
            if (
              index !== action.payload.index ||
              (index === 0 && state.RecipeSteps.length === 1)
            ) {
              return val;
            }
          });
          validateStepNumbers(state);
          break;
        case "setStep":
          state.RecipeSteps[action.payload.index!].description =
            action.payload.value!;
          break;
        default:
          console.error(new Error("Invalid payload type for setStepField"));
          break;
      }
    },
    setStepNumbers: (state, action) => {
      state.RecipeSteps = action.payload.items.map(
        (step: any, index: number) => {
          if (step.step_number !== index + 1) {
            return { step: step.step, step_number: index + 1 };
          }
          return { step: step.step, step_number: step.step_number };
        }
      );
    },
    rearrangeSteps: (state, action) => {
      const movedArray = arrayMove(
        action.payload.items,
        action.payload.oldIndex,
        action.payload.newIndex
      );
      state.RecipeSteps = movedArray.map((step: any, index: number) => {
        if (step.step_number !== index + 1) {
          return {
            description: step.description,
            step_number: index + 1,
            ingredients: step.ingredients,
          };
        }
        return {
          description: step.description,
          step_number: step.step_number,
          ingredients: step.ingredients,
        };
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecipe.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(fetchGeneratedRecipe.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      });
  },
});

export const {
  setDifficulty,
  setTitle,
  setPreparationTime,
  setCookingTime,
  setAIGenerated,
  setOwner,
  setServings,
  setTags,
  setDescription,
  setIngredientField,
  setStepField,
  setVideo,
  setImage,
  setStepNumbers,
  rearrangeSteps,
} = createRecipeSlice.actions;

//Thunks
export const fetchRecipe = createAsyncThunk(
  "recipes/fetchRecipe",
  async (query: string) => {
    const res = await (await fetch(`/api/recipes/${query}`)).json();
    return res.data;
  }
);

export const fetchGeneratedRecipe = createAsyncThunk(
  "recipes/generatedRecipe",
  async (recipe: Object[]) => {
    return await fetch(`/api/buddy/generateRecipe`, {
      method: "POST",
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Take this partially completed recipe and fill in the blanks.  Only add to it do not remove anything.`,
          },
        ],
        recipe: recipe,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }
);

export const selectCreateRecipe = (state: RootState) => state.createRecipe;

export const createRecipeRecuder = createRecipeSlice.reducer;

function validateStepNumbers(state: CreateRecipeState) {
  state.RecipeSteps.map((step, index) => {
    if (step.step_number !== index + 1) {
      step.step_number = index + 1;
    }
  });
}
