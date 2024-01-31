import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Circle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

import { fetchTodos } from "@/lib/data";
import { DeleteButton, EditButton } from "./button";

export default async function DataTable() {
  const todos = await fetchTodos();

  const statusIcons = {
    done: (
      <CheckCircle className="mr-2 h-4 w-4 text-muted-foreground font-thin" />
    ),
    "in progress": <Clock className="mr-2 h-4 w-4 text-muted-foreground" />,
    canceled: <XCircle className="mr-2 h-4 w-4 text-muted-foreground" />,
    todo: <Circle className="mr-2 h-4 w-4 text-muted-foreground" />,
  };

  const priorityIcons = {
    high: <ArrowUp className="mr-2 h-4 w-4 text-muted-foreground" />,
    medium: <ArrowRight className="mr-2 h-4 w-4 text-muted-foreground" />,
    low: <ArrowDown className="mr-2 h-4 w-4 text-muted-foreground" />,
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.length !== 0 ? (
            todos?.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className="font-medium">{todo.title}</TableCell>
                <TableCell className="w-[130px]">
                  <div className="flex items-center">
                    {statusIcons[todo.status]}
                    <span className="capitalize">{todo.status}</span>
                  </div>
                </TableCell>
                <TableCell className="w-[100px]">
                  <div className="flex items-center">
                    {priorityIcons[todo.priority]}
                    <span className="capitalize">{todo.priority}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right w-[100px] space-x-2">
                  <EditButton todo={todo} />
                  <DeleteButton id={todo.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
