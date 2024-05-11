import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export interface CreateRecipeState {
    name: string,
    difficulty: string,
    length: string,
    video: string,
    ingredients: {name: string, quantity: string}[],
    steps: {step_number: number, step: string}[]
}

const initialState: CreateRecipeState = {
    name: '',
    difficulty: '',
    length: '',
    video: '',
    ingredients: [{name: '', quantity: ''}],
    steps: [{step_number: 1, step: ''}]
}

export const createRecipeSlice = createSlice({
    name: 'createRecipe',
    initialState,
    reducers: {
      setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload
      },
      setDifficulty: (state, action: PayloadAction<string>) => {
        state.difficulty = action.payload
      },
      setLength: (state, action: PayloadAction<string>) => {
        state.length = action.payload
      },
      setVideo: (state, action: PayloadAction<string>) => {
        state.video = action.payload
      },
      setIngredientField: (state, action: PayloadAction<{type: string, index?: number, value?: string}>) => {
        switch (action.payload.type) {
            case 'add':
                state.ingredients.push({name: '', quantity: ''})
                break;
            case 'removeAtIndex':
                state.ingredients = state.ingredients.filter((val, index) => {
                    if (index !== action.payload.index || (index === 0 && state.ingredients.length === 1)){  
                        return val
                    } 
                })
                break;
            case 'setName':
                state.ingredients[action.payload.index!].name = action.payload.value!
                break;
            case 'setQuantity':
                state.ingredients[action.payload.index!].quantity = action.payload.value!
                break;
            default:
                console.error(new Error('Invalid payload type for setIngredientField'))
                break;
        }
      },
      setStepField: (state, action: PayloadAction<{type: string, index?: number, value?: string}>) => {
        switch (action.payload.type) {
            case 'add':
                state.steps.push({step_number: state.steps.length, step: ''})
                break;
            case 'removeAtIndex':
                state.steps = state.steps.filter((val, index) => {
                    if (index !== action.payload.index || (index === 0 && state.steps.length === 1)){
                        return val
                    } 
                })
                console.log(state.steps)
                break;
            case 'setStep':
                state.steps[action.payload.index!].step = action.payload.value!
                break;
            default:
                console.error(new Error('Invalid payload type for setStepField'))
                break;
        }
      }
    }
  })

export const { 
    setDifficulty,
    setName,
    setLength,
    setIngredientField,
    setStepField,
    setVideo 
} = createRecipeSlice.actions

export const selectCreateRecipe = (state: RootState) => state.createRecipe

export const createRecipeRecuder = createRecipeSlice.reducer
