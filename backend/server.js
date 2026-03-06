import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

connectDb()

//middleware
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
  res.send("Api working great")
})
app.listen(port, ()=> console.log("server  strted",port))
