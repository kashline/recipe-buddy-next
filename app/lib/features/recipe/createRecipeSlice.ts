import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export interface CreateRecipeState {
    name: string,
    difficulty: string,
    length: string
}

const initialState: CreateRecipeState = {
    name: 'null',
    difficulty: 'null',
    length: 'null'
}

export const createRecipeSlice = createSlice({
    name: 'createRecipe',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
      setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload
      },
      setDifficulty: (state, action: PayloadAction<string>) => {
        state.difficulty = action.payload
      },
      setLength: (state, action: PayloadAction<string>) => {
        state.length = action.payload
      }
    }
  })

export const { setDifficulty, setName, setLength } = createRecipeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCreateRecipe = (state: RootState) => state.createRecipe

export const createRecipeRecuder = createRecipeSlice.reducer
