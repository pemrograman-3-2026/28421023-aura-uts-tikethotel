import express from "express"
import { getALL, login, register } from "../controllers/user.controller.js"

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/getALL', getALL)


export default router