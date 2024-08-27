import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface ProfileSliceState {
  toggle: boolean;
}

const initialState: ProfileSliceState = {
  toggle: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setToggle: (state) => {
      console.log(state.toggle);
      state.toggle = !state.toggle;
    },
  },
});

export const { setToggle } = profileSlice.actions;

export const selectProfileSlice = (state: RootState) => state.profile;

export const profileReducer = profileSlice.reducer;
