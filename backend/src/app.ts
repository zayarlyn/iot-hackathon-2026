import cors from 'cors'
import { eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import express from 'express'
import { db } from './db'
import { deviceTable } from './db/schema'
import 'dotenv/config'

const app = express()
app.use(express.json())
app.use(cors({ origin: '*' }))
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to my Soul Society')
})

const cycle_order: { [key: string]: number } = { wash: 1, rinse: 2, spin: 3 }

app.post('/predict/:id', async (req: Request, res: Response) => {
	const id = +req.params.id || 1
	const device = (await db.select().from(deviceTable).where(eq(deviceTable.id, id)))[0]

	const vibration = req.body['avg_vibration']
	let state = vibration >= device.spin_threshold ? 'spin' : vibration >= device.wash_threshold ? 'wash' : vibration >= device.rinse_threshold ? 'rinse' : 'idle'

	// if (cycle_order[state] < cycle_order[device.status]) {
	// 	res.end()
	// }

	await db.update(deviceTable).set({ status: state }).where(eq(deviceTable.id, id))
	console.log(`vibration: ${req.body['avg_vibration']} | prediction: ${state}`)
	res.end()
})

app.post('/device/:id', async (req: Request, res: Response) => {
	const id = +req.params.id || 1
	await db.update(deviceTable).set(req.body).where(eq(deviceTable.id, id))
	return res.json({ message: 'Status updated' })
})

app.get('/device/:id', async (req: Request, res: Response) => {
	const id = +req.params.id || 1
	const device = (await db.select().from(deviceTable).where(eq(deviceTable.id, id)))[0]
	return res.json({ ...device, retrievedAt: new Date() })
})

app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`)
})
