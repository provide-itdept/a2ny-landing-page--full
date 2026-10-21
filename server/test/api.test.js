import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { createApp } from '../src/app.js'

const app = createApp()
test('health endpoint reports the API is available', async () => { const response = await request(app).get('/api/health'); assert.equal(response.status, 200); assert.equal(response.body.status, 'ok') })
test('contact endpoint rejects incomplete submissions', async () => { const response = await request(app).post('/api/contact').send({ email: 'not-an-email' }); assert.equal(response.status, 400); assert.equal(response.body.error, 'Please check the required fields.') })
test('unknown routes return a safe 404', async () => { const response = await request(app).get('/api/does-not-exist'); assert.equal(response.status, 404); assert.equal(response.body.error, 'Route not found.') })
