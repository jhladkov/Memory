import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()


app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/', authRoutes)




const PORT = process.env.PORT || 9000

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    app.listen(PORT, () => console.log(`Server Port ${PORT}`))
}).catch((err) => console.log(`${err} did not connected`))

