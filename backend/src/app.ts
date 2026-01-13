import type { Request, Response } from 'express'
import express from 'express'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to my Soul Society')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
