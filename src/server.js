import express from "express"
import connection from "./config/database"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import route from './routes/indexRoutes'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
mongoose.set('strictQuery', false);
connection()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})