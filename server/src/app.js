import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import pinoHttp from 'pino-http'
import { env } from './config/env.js'
import publicRoutes from './routes/public.js'
import adminRoutes from './routes/admin.js'

export function createApp() { const app = express(); app.use(helmet()); app.use(cors({ origin: env.clientOrigin })); app.use(express.json({ limit: '100kb' })); app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false })); app.use(pinoHttp()); app.use('/api', publicRoutes); app.use('/api/admin', adminRoutes); app.use((_req, res) => res.status(404).json({ error: 'Route not found.' })); app.use((_err, _req, res, _next) => res.status(500).json({ error: 'Something went wrong.' })); return app }
