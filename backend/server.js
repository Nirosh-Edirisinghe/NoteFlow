import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js';
import authRouter from './routes/authRoutes.js';
import noteRouter from './routes/noteRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

connectDb()

//middleware
app.use(express.json())
app.use(cors())

// api enpoints
app.use('/api/auth',authRouter)
app.use('/api/note',noteRouter)

app.get('/',(req,res)=>{
  res.send("Api working great")
})
app.listen(port, ()=> console.log("server  strted",port))
