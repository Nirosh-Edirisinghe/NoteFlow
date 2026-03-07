import express from 'express'
import { createNote, getMyNotes } from '../controllers/noteController.js'
import authUser from '../middleware/authMiddleware.js'

const noteRouter = express.Router()

noteRouter.post('/create',authUser,createNote)
noteRouter.get("/my-notes", authUser, getMyNotes);

export default noteRouter