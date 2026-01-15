import type { Request, Response } from 'express'
import express from 'express'
import 'dotenv/config'
import { db } from './db'
import { deviceTable } from './db/schema'
import { eq } from 'drizzle-orm'

const app = express()
app.use(express.json())
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to my Soul Society')
})

app.post('/update-status/:id', async (req: Request, res: Response) => {
	const id = +req.params.id || 1
	await db.update(deviceTable).set(req.body).where(eq(deviceTable.id, id))
	return res.json({ message: 'Status updated' })
})

app.get('/get-status/:id', async (req: Request, res: Response) => {
	const id = +req.params.id || 1
	const device = await db.select().from(deviceTable).where(eq(deviceTable.id, id))
	return res.json(device)
})

app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`)
})
