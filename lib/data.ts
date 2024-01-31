import { neon } from "@neondatabase/serverless";
import { Todo } from "./definitions";

const ITEMS_PER_PAGE = 5;
export async function fetchTodos() {
  const sql = neon(process.env.DATABASE_URL || "");

  try {
    console.log("Fetching revenue data...");
    const data = await sql`
    SELECT * FROM todos
    `;

    return data as Todo[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch todo data");
  }
}
