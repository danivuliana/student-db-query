import pg from 'pg';

const { Client } = pg;
const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_0pgwJMCOrht1@ep-frosty-fire-a94nhe0n-pooler.gwc.azure.neon.tech/neondb?sslmode=require'
});

async function runQueries() {
  await client.connect();

  const countResult = await client.query('SELECT COUNT(*) FROM students');
  console.log("Total students:", countResult.rows[0].count);

  const lowMarks = await client.query('SELECT * FROM students WHERE mark < 4');
  console.log("Students with mark < 4:");
  console.table(lowMarks.rows);

  const sortedStudents = await client.query('SELECT * FROM students ORDER BY mark DESC LIMIT 15');
  console.log("Top 15 students by mark:");
  console.table(sortedStudents.rows);

  await client.end();
}

runQueries();
