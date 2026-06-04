import express from "express"
import { create,getById,getALL,update, deleteKamar } from "../controllers/kamar.controller.js"

const router = express.Router()
router.post('/create',create)
router.get('/get/:id', getById)
router.get('/getALL',getALL)
router.put('/update/:id',update)
router.delete('/delete/:id',deleteKamar)


export default router