import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const maxAge = 3*24*60*60
const createToken = (id) => {
    return jwt.sign({id},process.env.SECRET_JWT, {
        expiresIn: maxAge
    })
}

export const login = async (req,res) => {

}

export const register = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await User.create({email,password})
        const token = createToken(user._id)

        res.cookie('jwt', token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        })
        res.status(201).json({user: user._id, created: true})
    }catch (err) {
        res.status(400).json({error: err})
    }
}
