import express from "express";
import {login, register,getUserData} from "../controllers/auth.js";
import {check} from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router()

router.post('/register',[
    check('username',"Username field cannot be empty").notEmpty(),
    check('password', 'Password length have to be more than 6').isLength({min: 6}),
    check('email', 'Email field cannot be empty').notEmpty(),
    check('email').normalizeEmail().isEmail()
], register)
router.post('/login', login)
router.get('/getUserData',authMiddleware, getUserData)


export default router
