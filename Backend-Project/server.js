const express = require("express")

const dotenv = require("dotenv")

const mongoDBConnection = require('./db/mongoDB.js')

const cors = require("cors")

const cookieParser = require("cookie-parser")

dotenv.config()

mongoDBConnection();

const app = express()

const port = process.env.PORT;



app.use(cors({

    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json())

app.use(express.static("public"))

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

// Import routes

const userRoutes = require("./routes/user.routes.js")

app.use("/api/v1/",userRoutes)



app.listen(port, () => {
    console.log(`Server is running at port ${port}`);

})