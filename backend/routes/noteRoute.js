import express from 'express'
import { createNote } from '../controllers/noteController.js'
import authUser from '../middleware/authMiddleware.js'

const noteRouter = express.Router()

noteRouter.post('/create',authUser,createNote)

export default noteRouter