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
      <button
        type="button"
        className="text-lavendar-blush border-2 border-gray-500 w-fit px-5 rounded-md hover:border-non-photo-blue h-8"
        onClick={handleClickOpen}
      >
        Cancel
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="bg-lavendar-blush">
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
            <button
              className="text-gunmetal border-2 border-gray-500 w-fit px-5 rounded-md hover:border-non-photo-blue h-8"
              onClick={handleClose}
            >
              Cancel
            </button>
            <Link href={recipeName ? `/recipes/${recipeName}` : `/recipes`}>
              <button className="text-gunmetal border-2 border-gray-500 w-fit px-5 rounded-md hover:border-non-photo-blue h-8">
                Continue
              </button>
            </Link>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
