"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { FormSchema } from "@/lib/definitions";

const sql = neon(process.env.DATABASE_URL || "");

const EditTodo = FormSchema.omit({ id: true });
const CreateTodo = FormSchema.omit({ id: true });

export async function editTodo(id: string, formData: FormData) {
  const validatedFields = EditTodo.safeParse({
    status: formData.get("status"),
    priority: formData.get("priority"),
    title: formData.get("title"),
  });

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

export async function createTodo(formData: FormData) {
  const validatedFields = CreateTodo.safeParse({
    status: formData.get("status"),
    priority: formData.get("priority"),
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Todo.",
    };
  }

  const { status, priority, title } = validatedFields.data;

  try {
    await sql`
    INSERT INTO todos (id, status, priority, title)
    VALUES (uuid_generate_v4(), ${status}, ${priority}, ${title})
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Create Todo" };
  }

  revalidatePath("/");
}
