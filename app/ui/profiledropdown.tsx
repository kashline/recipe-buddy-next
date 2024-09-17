import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { selectProfileSlice } from "../lib/features/profile/profileSlice";
import { setToggle } from "../lib/features/profile/profileSlice";

export default function ProfileDropdown() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const profileSlice = useAppSelector(selectProfileSlice);
  const dispatch = useAppDispatch();
  return (
    <Paper
      sx={{
        minWidth: 250,
        maxWidth: "100%",
        position: "absolute",
        marginRight: "100px",
        top: 50,
        right: -100,
        zIndex: 10,
      }}
    >
      {user && (
        <MenuList>
          <MenuItem
            onClick={() => {
              router.push("/profile");
              dispatch(setToggle());
            }}
          >
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/profile/recipes");
              dispatch(setToggle());
            }}
          >
            <ListItemText>My Recipes</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/api/auth/logout");
              dispatch(setToggle());
            }}
          >
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        </MenuList>
      )}{" "}
      {!user && (
        <MenuList>
          <MenuItem
            onClick={() => {
              router.push("/api/auth/login");
              dispatch(setToggle());
            }}
          >
            <ListItemText>Login</ListItemText>
          </MenuItem>
        </MenuList>
      )}
    </Paper>
  );
}
