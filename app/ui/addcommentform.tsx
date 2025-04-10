"use client";

import Button from "@/app/ui/button";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";
import * as React from "react";
interface FormElements extends HTMLFormControlsCollection {
  commentInput: HTMLInputElement;
}
interface CommentFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function AddCommentForm({
  user,
  recipeId,
}: {
  user: User;
  recipeId: number;
}) {
  const [formValid, setFormValid] = React.useState(true);
  const [submit, setSubmit] = React.useState("idle");
  const [isInputValid, setIsInputValid] = React.useState(true);
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });
  const router = useRouter();
  return (
    <form
      onSubmit={async (event: React.FormEvent<CommentFormElement>) => {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
          commentInput: { value: string };
        };
        const isValid = formElement.checkValidity();
        setFormValid(isValid);
        const firstInvalidField = formElement.querySelector(
          ":invalid"
        ) as HTMLInputElement;
        firstInvalidField?.focus();
        if (isValid) {
          try {
            const res = await fetch(`/api/comments`, {
              body: JSON.stringify({
                user: user,
                recipeId: recipeId,
                comment: event.currentTarget.elements.commentInput.value,
              }),
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
            if (res.status !== 200) {
              setSubmit("failed");
            } else {
              setSubmit("success");
            }
          } catch (error) {
            console.log(`There was an error sumbitting the recipe: ${error}`);
          }
        }
      }}
    >
      <textarea
        className="bg-gunmetal text-lavendar-blush w-full rounded-md border-gray-500"
        id="commentInput"
        required={true}
        data-cy={"commentInput"}
        onChange={(e) => {
          console.log(matcher.hasMatch(e.target.value));
          setIsInputValid(!matcher.hasMatch(e.target.value));
        }}
      />
      {submit === "failed" && (
        <div className="text-chili-red">
          Failed to submit comment! Please try again
        </div>
      )}{" "}
      {!isInputValid && (
        <div className="text-chili-red">
          No obscene language allowed in comments!
        </div>
      )}
      {submit !== "success" && isInputValid && (
        <div className="float-right mt-4">
          <Button
            type="submit"
            data-cy="commentsubmitbutton"
            disabled={!isInputValid}
            onClick={() => {
              router.refresh();
            }}
          >
            Add Comment
          </Button>
        </div>
      )}
      {submit === "success" && (
        <div className="float-right mt-4 text-lavendar-blush">
          Comment successfully submitted!
        </div>
      )}
    </form>
  );
}
