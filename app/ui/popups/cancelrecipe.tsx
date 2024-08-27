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

export default function CancelRecipe({ recipeName }: { recipeName?: string }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Cancel</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Continue without saving changes?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            WARNING: Navigating away from this page will result in all unsaved
            changes being lost! Continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Link href={recipeName ? `/recipes/${recipeName}` : `/recipes`}>
            <Button>Continue</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
