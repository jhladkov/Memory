import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {validationResult} from "express-validator";


const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_JWT, {
        expiresIn: '1m'
    })
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: `User ${email} was not found`})
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({message: 'Password or email is invalid'})
        }

        const token = createToken(user._id)

        return res.json({token})

    } catch (err) {
        res.status(400).json({message: err})
    }
}

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Registration error', errors})
        }
        const {email, password, username} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: 'This user is already registered'})
        }
        const hash = bcrypt.hashSync(password, 7)

        const user = await User.create({email, password: hash, username})
        res.status(201).json({id: user._id, email, username})
    } catch (err) {
        res.status(400).json({message: err})
    }
}

export const getUserData = async (req, res) => {
    try {
        const id = req?.userId?.id
        const user = await User.findOne({_id: id})
        console.log(user.data)
        res.status(200).json({data:user.data})
    } catch (err) {
        res.status(400).json({message: err})
    }
}
