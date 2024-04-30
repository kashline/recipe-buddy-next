import { Action, combineSlices, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createRecipeRecuder, createRecipeSlice } from './features/recipe/createRecipeSlice'

export const store = configureStore({
    reducer: {
        createRecipe: createRecipeRecuder
    }
})

const rootReducer = combineSlices(createRecipeSlice)

export const makeStore = () => {
    return configureStore({
      reducer: rootReducer,
    });
  };

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
