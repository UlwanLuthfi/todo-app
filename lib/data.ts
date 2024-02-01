import { neon } from "@neondatabase/serverless";
import { Todo } from "./definitions";

const ITEMS_PER_PAGE = 5;
const sql = neon(process.env.DATABASE_URL || "");

export async function fetchTodos(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    console.log("Fetching revenue data...");
    const data = await sql`
    SELECT
      id, status, priority, title
    FROM todos
    WHERE
      status ILIKE ${`%${query}%`} OR
      priority ILIKE ${`%${query}%`} OR
      title ILIKE ${`%${query}%`}
    ORDER BY created_at ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data as Todo[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch todo data");
  }
}
