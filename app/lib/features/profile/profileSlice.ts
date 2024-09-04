import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Session } from "@auth0/nextjs-auth0";
import User from "@/app/data/models/User";
import { UserZype } from "../../data/zodels/UserRecipeZodel";

export interface ProfileSliceState {
  toggle: boolean;
  user: UserZype | null;
}

const initialState: ProfileSliceState = {
  toggle: false,
  user: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setToggle: (state) => {
      // console.log(state.toggle)
      state.toggle = !state.toggle;
    },
    setUser: (state) => {},
  },
});

export const fetchUserMetadata = createAsyncThunk(
  "user/fetchUserMetadata",
  async (query: string) => {
    const response: Map<string, Object[]> = new Map(
      await (await fetch(`/api/user/metadata`)).json(),
    );
    // console.log(response)
    return response.get("recipes")![0];
  },
);

export const { setToggle } = profileSlice.actions;

export const selectProfileSlice = (state: RootState) => state.profile;

export const profileReducer = profileSlice.reducer;
