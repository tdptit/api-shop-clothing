import express from "express"
import connection from "./config/database"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import route from './routes/indexRoutes'
// import path from "path"
// import multer from "multer"
// import fs from "fs"

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
mongoose.set('strictQuery', false);
connection()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.get('/test', (req, res) => {
//     res.sendFile('C:/Users/satth/Desktop/pnodejs/api-shop-clothing/src/test.html')
// })
// const upload = multer({ dest: './public/data/uploads/' })
// app.post('/test', upload.array('uploaded_file', 10), function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any 
//     fs.unlink(req.files[0], (err) => {
//         if (err) console.log(err)
//     })
//     console.log(req.files)
//     console.log("check body-----------", req.body)
// });
// app.post('/test', (req, res) => {
//     req.body.user = "tiendung"
//     console.log(req.body)
// })
route(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})