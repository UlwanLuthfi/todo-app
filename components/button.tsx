import React from "react";
import { buttonVariants } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { deleteTodo } from "@/lib/actions";
import Form from "@/components/edit-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Todo } from "@/lib/definitions";

export function EditButton({ todo }: { todo: Todo }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <span className="sr-only">Edit</span>
        <Pencil className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Todo</AlertDialogTitle>
          <AlertDialogDescription>
            Make changes to your todo here. Click save when you&apos;re done.
          </AlertDialogDescription>

          <Form todo={todo} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteButton({ id }: { id: string }) {
  const deleteTodoWithId = deleteTodo.bind(null, id);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <span className="sr-only">Delete</span>
        <Trash2 className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={deleteTodoWithId}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
