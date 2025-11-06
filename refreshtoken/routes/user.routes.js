const express = require("express")

const router = express.Router()

const userControllers = require("../controllers/user.controller")

const middleware = require("../middlewares/multer.middleware")

const {authMiddleware} = require("../middlewares/auth.middleware")



router.get("/health", userControllers.healthCheck)


router.post(
    "/register",
    middleware.fields([{
        name:"profile",
        maxCount: 1
    }]),
    userControllers.userRegistraton
)


router.post("/login",userControllers.userLogin)

router.post("/logout",authMiddleware,userControllers.userLogout)

module.exports = router