import express from 'express'
import { createNote, getMyNotes, getNote } from '../controllers/noteController.js'
import authUser from '../middleware/authMiddleware.js'

const noteRouter = express.Router()

noteRouter.post('/create',authUser,createNote)
noteRouter.get("/my-notes", authUser, getMyNotes);
noteRouter.get("/get-note/:id", authUser, getNote);

export default noteRouter