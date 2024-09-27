import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export function authMiddleWare(req, res, next) {
	const secret = process.env.SECRET_TOKEN
	if(req.method == 'OPTIONS') {
		next()
	}
	try {
		 const token = req.headers.authorization.split(' ')[1]
		 if(!token) {
		return	res.status(403).send({msg: 'пользователь не авторизован'})
		 }
		 const decodedData = jwt.verify(token, secret)
		 req.user = decodedData
		 next()
	} catch (err) {
		res.status(400).send({msg: 'пользователь не авторизован'})
	}
}