import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React from "react";
import Button from "../button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DeleteRecipe({
  recipeName,
  recipeID,
}: {
  recipeName: string;
  recipeID: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = React.useState("idle");
  const router = useRouter();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/recipes/delete?id=${recipeID}`, {
        method: "DELETE",
      });
      if (res.status !== 200) {
        setSubmit("failed");
      } else {
        setSubmit("success");
        console.log(res);
        router.push(`/recipes/${recipeName}/edit/delete`);
      }
    } catch (error) {
      console.log(`There was an error sumbitting the recipe: ${error}`);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Delete</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete ${recipeName}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            WARNING: Deleting a recipe will remove ALL of it&aposs data FOREVER!
            Are you sure you want to delete {recipeName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
