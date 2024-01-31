"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const sql = neon(process.env.DATABASE_URL || "");

const FormSchema = z.object({
  id: z.string({ invalid_type_error: "Please select todo." }),
  status: z.enum(["todo", "in progress", "done", "canceled"]),
  priority: z.enum(["low", "medium", "high"]),
  title: z.string(),
});

const EditTodo = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    status?: string[];
    priority?: string[];
    title?: string[];
  };
  message?: string | null;
};

export async function editTodo(id: string, formData: FormData) {
  const validatedFields = EditTodo.safeParse({
    status: formData.get("status"),
    priority: formData.get("priority"),
    title: formData.get("title"),
  });

  console.log(id);
  console.log(formData.get("status"));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Todo.",
    };
  }

  const { status, priority, title } = validatedFields.data;

  try {
    await sql`
    UPDATE todos 
    SET status = ${status}, priority = ${priority}, title = ${title} 
    WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Edit Todo" };
  }

  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  try {
    await sql`DELETE FROM todos WHERE id = ${id}`;
  } catch (error) {
    return { message: "Database Error: Failed to Delete Todo" };
  }

  revalidatePath("/");
}
