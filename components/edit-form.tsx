"use client";

import { Todo, TodoForm } from "@/lib/definitions";
import { editTodo } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "./ui/alert-dialog";

export default function EditTodoForm({ todo }: { todo: TodoForm }) {
  const editTodoWithId = editTodo.bind(null, todo.id);

  return (
    <form action={editTodoWithId} className="space-y-2">
      <Input placeholder="Please enter a title" defaultValue={todo.title} />

      <div className="flex justify-between">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={todo.status}>
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
          <Select defaultValue={todo.priority}>
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
