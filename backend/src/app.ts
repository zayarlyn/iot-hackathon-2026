import type { Request, Response } from 'express'
import express from 'express'
import 'dotenv/config'

const app = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to my Soul Society')
})

app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`)
})
