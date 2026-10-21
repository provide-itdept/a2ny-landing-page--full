import { inquirySchema, quotationSchema } from '../validators/requests.js'
import { pool } from '../db/pool.js'
import { notifyNewLead } from '../services/emailService.js'
const memoryLeads = []
export async function createLead(req, res, type) { const schema = type === 'quotation' ? quotationSchema : inquirySchema; const parsed = schema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ error: 'Please check the required fields.', fields: parsed.error.flatten().fieldErrors }); const lead = { ...parsed.data, type, receivedAt: new Date().toISOString() }; if (pool) await pool.query('INSERT INTO leads (type, payload, created_at) VALUES ($1, $2, NOW())', [type, JSON.stringify(lead)]); else memoryLeads.push(lead); try { await notifyNewLead(lead) } catch (error) { req.log?.error(error, 'notification_failed') } return res.status(201).json({ message: 'Request received.' }) }
export function listMemoryLeads(type) { return memoryLeads.filter((lead) => lead.type === type) }
