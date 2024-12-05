
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import 'dotenv/config'
import { connectDB } from "./model/db.js"

import { UserModel } from "./model/User.js"
import { AuthRouter } from "./Routes/AuthRouter.js"


connectDB()
const app = express() 
const port = process.env.PORT || 7000

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}))
app.use(cookieParser()) 
app.use(express.json())
app.use(bodyParser.json())
app.use('/auth', AuthRouter )


app.listen(port, () =>{
    console.log(`server running on port ${port}`)
})
