import pg from 'pg'
import { env } from '../config/env.js'
const { Pool } = pg
export const pool = env.databaseUrl ? new Pool({ connectionString: env.databaseUrl }) : null
