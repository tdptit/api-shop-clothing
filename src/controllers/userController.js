require('dotenv').config()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../services/userService')

class userController {
    async userRegister(req, res, next) {
        let { email } = req.body
        let err = await userService.findUser(email)
        if (err !== null) {
            return res.status(200).json({
                alo: "2",
                EC: -1,
                message: "Account already exists"
            })
        }
        const Schema = Joi.object({
            name: Joi.string()
                .min(3).max(40).required(),
            password: Joi.string()
                .min(6).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            address: Joi.string()
                .max(200).required(),
            phone: Joi.string()
                .min(10).required(),
        })
        const { error } = Schema.validate(req.body, { abortEarly: false })
        if (error) {
            console.log(error)
            return res.status(200).json({
                alo: "1",
                EC: -1,
                detai: "Joi",
                message: error
            })
        }
        const { password } = req.body
        const hash = await bcrypt.hash(password, 10)
        req.body.password = hash
        let user = await userService.userRegisterService(req.body)
        user.password = null
        return res.status(200).json({
            EC: 1,
            message: "Account successfully created",
            data: user
        })
    }
    async userLogin(req, res) {
        let user = await userService.findUser(req.body.email)
        if (user == null) {
            return res.status(200).json({
                EC: -1,
                message: "Account does not exist"
            })
        }
        let err = await bcrypt.compare(req.body.password, user.password)
        if (!err) {
            return res.status(200).json({
                EC: -1,
                message: "Incorrect password"
            })
        }
        let accessToken = jwt.sign({
            _id: user._id,
            userType: user.userType
        }, process.env.JWT_ACCESS_KEY, {
            expiresIn: "30s"
        })
        let refreshToken = jwt.sign({
            _id: user._id,
            userType: user.userType
        }, process.env.JWT_REFRESH_KEY, {
            expiresIn: "10d"
        })
        // Save token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: 'strict',
        })
        user.password = null
        return res.status(200).json({
            EC: 1,
            message: "Successful",
            name: user.name,
            accessToken: accessToken,
        })
    }
}

module.exports = new userController()