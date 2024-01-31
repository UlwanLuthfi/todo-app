const { neon } = require("@neondatabase/serverless");
const { todos } = require("../lib/placeholder-data.js");

async function seedTodos(sql) {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    console.log(`UUID extension created or already exists`);

    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS todos (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        priority VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "todos" table`);

    const insertedTodos = await Promise.all(
      todos.map(
        (todo) => sql`
          INSERT INTO todos (priority, status, title)
          VALUES (${todo.priority}, ${todo.status}, ${todo.title})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedTodos.length} todos`);

    return {
      createTable,
      todos: insertedTodos,
    };
  } catch (error) {
    console.error("Error seeding todos:", error.message);
    throw error;
  }
}

async function main() {
  const sql = neon(process.env.DATABASE_URL);

  await seedTodos(sql);
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
