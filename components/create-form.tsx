import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "./ui/alert-dialog";
import { createTodo } from "@/lib/actions";

export default async function CreateForm() {
  return (
    <form action={createTodo} className="space-y-2">
      <Input name="title" placeholder="Please enter a title" />

      <div className="flex justify-between">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select name="status">
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select name="priority">
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction type="submit">Submit</AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
}
