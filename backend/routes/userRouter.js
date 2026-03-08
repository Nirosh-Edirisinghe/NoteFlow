import express from 'express'
import authUser from '../middleware/authMiddleware.js'
import { getCurrentUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/me',authUser,getCurrentUser)

export default userRouter