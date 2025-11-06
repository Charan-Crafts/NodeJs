require("dotenv").config()

const express = require("express")



const cors = require('cors')

const cookie_parser = require("cookie-parser")

const mongoConnection = require("./db/mongoDB")

const app = express()

const port = process.env.PORT;

app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.use(cookie_parser())

app.use(express.json())

app.use(express.urlencoded({extended:true}))

mongoConnection()
// Routes

const userRoutes = require("./routes/user.routes")

app.use("/api/v1",userRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})