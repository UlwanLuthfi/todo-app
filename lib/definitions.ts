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
