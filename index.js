import e from "express";
const app = e()
import dotenv from 'dotenv'
import { authRouter } from "./routers/auth.router.js";
import helmet from "helmet";
dotenv.config()
const PORT = process.env.PORT || 5000
async function createServer() {
	try {

		app.use(e.json())
		app.use(helmet())
		app.use('/auth', authRouter)
		app.all('*', (req, res) => {
			res.status(404).send({message: 'NOT FOUND!'})
		})
		app.listen(PORT, (req, res) => {
			console.log('Server is starting...');
			
		})
	} catch(err) {
		
		console.log(err);
		
	}
}
createServer()