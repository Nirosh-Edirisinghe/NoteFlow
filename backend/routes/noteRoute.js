import express from 'express'
import { addCollaborator, createNote, deleteNote, getMyNotes, getNote, togglePinNote, updateNote } from '../controllers/noteController.js'
import authUser from '../middleware/authMiddleware.js'

const noteRouter = express.Router()

noteRouter.post('/create',authUser,createNote)
noteRouter.get("/my-notes", authUser, getMyNotes);
noteRouter.get("/get-note/:id", authUser, getNote);
noteRouter.put("/update-note/:id", authUser, updateNote);
noteRouter.put("/pin-note/:id", authUser, togglePinNote);
noteRouter.post("/add-collaborator/:id", authUser, addCollaborator);
noteRouter.delete("/delete/:id", authUser, deleteNote);

export default noteRouter