import { z } from "zod";

export type Todo = {
  id: string;
  status: "todo" | "in progress" | "done" | "canceled";
  priority: "low" | "medium" | "high";
  title: string;
};

export type TodoForm = {
  id: string;
  status: "todo" | "in progress" | "done" | "canceled";
  priority: "low" | "medium" | "high";
  title: string;
};

export const FormSchema = z.object({
  id: z.string({ invalid_type_error: "Please select todo." }),
  status: z.enum(["todo", "in progress", "done", "canceled"], {
    invalid_type_error: "Please select status.",
  }),
  priority: z.enum(["low", "medium", "high"], {
    invalid_type_error: "Please select priority.",
  }),
  title: z.string({ invalid_type_error: "Please enter a title." }),
});
