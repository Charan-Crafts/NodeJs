const express = require("express")

const router = express.Router()

const { healthCheck, userRegistration } = require("../controllers/user.controller")

const multerMiddleware = require('../middlewares/multer.middleware')

router.get("/health", healthCheck)

router.post("/register",
    multerMiddleware.fields(
        [{
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }]
    ),
    userRegistration
)

module.exports = router;