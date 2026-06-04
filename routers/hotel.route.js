import express from "express"
import { create,getById,getALL,update, deleteHotel } from "../controllers/hotel.controller.js"

const router = express.Router()
router.post('/create',create)
router.get('/get/:id', getById)
router.get('/getALL',getALL)
router.put("/update/:id",update)
router.delete("/delete/:id",deleteHotel)


export default router