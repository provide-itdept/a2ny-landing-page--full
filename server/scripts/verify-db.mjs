import 'dotenv/config'
import pg from 'pg'
import fs from 'node:fs/promises'
const { Pool } = pg
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
try {
  const info = await pool.query('select current_database() as database, current_user as user, now() as server_time')
  for (const file of ['migrations/001_initial.sql', 'migrations/002_content_schema.sql', 'migrations/003_seed_core_content.sql']) { await pool.query(await fs.readFile(file, 'utf8')); console.log(`APPLIED ${file}`) }
  const tables = await pool.query("select table_name from information_schema.tables where table_schema='public' and table_name in ('leads','service_categories','services','authors','blog_posts','projects','faq_items') order by table_name")
  console.log(`DB=${info.rows[0].database} USER=${info.rows[0].user} TABLES=${tables.rows.map((row) => row.table_name).join(',')}`)
} finally { await pool.end() }
