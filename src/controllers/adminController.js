require('dotenv').config()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from "joi"
import userService from '../services/userService'
import tokenService from '../services/tokenService'

const generateAccessToken = (user) => {
    return jwt.sign({
        _id: user._id,
        userType: user.userType
    }, process.env.JWT_ACCESS_KEY, {
        expiresIn: "1h"
    })
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        _id: user._id,
        userType: user.userType
    }, process.env.JWT_REFRESH_KEY, {
        expiresIn: "10d"
    })
}

class adminController {
    async adminRegister(req, res) {
        const { name, email, password, address, phone, secretAdmin } = req.body
        let err = await userService.findUser(email)
        if (err !== null) {
            return res.status(200).json({
                EC: -1,
                message: "Email đã tồn tại"
            })
        }
        const Schema = Joi.object({
            name: Joi.string()
                .min(3).max(40).required(),
            password: Joi.string()
                .min(6).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required(),
        })
        const { error } = Schema.validate({ name, email, password }, { abortEarly: false })
        if (error) {
            console.log(error)
            return res.status(200).json({
                EC: -1,
                message: error
            })
        }
        if (secretAdmin !== process.env.SECRET_KEY_ADMIN) {
            return res.status(200).json({
                EC: -1,
                message: 'secretAdmin không đúng'
            })
        }
        const hash = await bcrypt.hash(password, 10)
        req.body.password = hash
        req.body.userType = 'admin'
        let user = await userService.userRegisterService(req.body)
        user.password = null
        return res.status(200).json({
            EC: 1,
            message: "Đăng kí thành công",
            data: user
        })
    }
    async adminLogin(req, res) {
        let user = await userService.findUser(req.body.email)
        if (user == null) {
            return res.status(200).json({
                EC: -1,
                message: "Email không tồn tại"
            })
        }
        if (user.userType === 'user') {
            return res.status(200).json({
                EC: -1,
                message: "Email không có quyền hạn"
            })
        }
        let err = await bcrypt.compare(req.body.password, user.password)
        if (!err) {
            return res.status(200).json({
                EC: -1,
                message: "Sai mật khẩu"
            })
        }
        let accessToken = generateAccessToken(user)
        let refreshToken = generateRefreshToken(user)
        //  token cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })
        await tokenService.saveRefeshToken(refreshToken)
        user.password = null
        return res.status(200).json({
            EC: 1,
            message: "Đăng nhập thành công",
            user: user,
            accessToken: accessToken,
        })
    }
    async requestRefreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken
        let newAccessToken, newRefreshToken
        if (!refreshToken) {
            return res.status(200).json({
                EC: -1,
                message: "Chưa đăng nhập"
            })
        }
        let err = await tokenService.findRefreshToken(refreshToken)
        if (err == null) {
            return res.status(200).json({
                EC: -1,
                message: "Chưa xác thực"
            })
        }
        await tokenService.clearTokenService(refreshToken)

        await jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
            if (err) {
                console.log(err)
                return res.status(200).json({
                    EC: -1,
                    message: "Chưa xác thực"
                })
            }
            newAccessToken = generateAccessToken(user)
            newRefreshToken = generateRefreshToken(user)
            await tokenService.saveRefeshToken(newRefreshToken)
            //  token cookie
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            })
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            })
        })
        return res.status(200).json({
            message: "AccessToken mới",
            accessToken: newAccessToken,
        })
    }
    async adminLogout(req, res) {
        await tokenService.clearTokenService(req.cookies.refreshToken)
        await res.clearCookie("accessToken")
        await res.clearCookie("refreshToken")
        return res.status(200).json({
            EC: 1,
            message: "Đăng xuất thành công"
        })
    }
    async getAllUser(req, res) {
        let user = await userService.getUser(req.query)
        return res.status(200).json({
            EC: 1,
            data: user
        })
    }
}


module.exports = new adminController()