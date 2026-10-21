import { Router } from 'express'
import { createLead } from '../controllers/leadController.js'
import { pool } from '../db/pool.js'
const router = Router()
router.post('/contact', (req, res) => createLead(req, res, 'inquiry'))
router.post('/quotations', (req, res) => createLead(req, res, 'quotation'))
router.get('/services', async (_req, res, next) => { try { if (!pool) return res.json([]); const { rows } = await pool.query('SELECT * FROM services WHERE is_published = TRUE ORDER BY name'); res.json(rows) } catch (error) { next(error) } })
router.get('/services/:slug', async (req, res, next) => { try { if (!pool) return res.status(404).json({ error: 'Service not found.' }); const { rows } = await pool.query('SELECT * FROM services WHERE slug = $1 AND is_published = TRUE LIMIT 1', [req.params.slug]); if (!rows[0]) return res.status(404).json({ error: 'Service not found.' }); res.json(rows[0]) } catch (error) { next(error) } })
router.get('/service-categories', async (_req, res, next) => { try { if (!pool) return res.json([]); const { rows } = await pool.query('SELECT * FROM service_categories WHERE is_active = TRUE ORDER BY display_order, name'); res.json(rows) } catch (error) { next(error) } })
router.get('/blog', async (_req, res, next) => { try { if (!pool) return res.json([]); const { rows } = await pool.query("SELECT id, title, slug, excerpt, featured_image, published_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC"); res.json(rows) } catch (error) { next(error) } })
router.get('/projects', async (_req, res, next) => { try { if (!pool) return res.json([]); const { rows } = await pool.query("SELECT * FROM projects WHERE status = 'published' ORDER BY title"); res.json(rows) } catch (error) { next(error) } })
router.get('/faqs', async (_req, res, next) => { try { if (!pool) return res.json([]); const { rows } = await pool.query('SELECT * FROM faq_items WHERE is_published = TRUE ORDER BY display_order'); res.json(rows) } catch (error) { next(error) } })
router.get('/health', (_req, res) => res.json({ status: 'ok', service: 'a2ny-api' }))
export default router
