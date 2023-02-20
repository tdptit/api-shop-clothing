require('dotenv').config()
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const userService = require('../services/userService')

class adminMiddleware {
    async checkLogin(req, res, next) {
        try {
            let checkToken = req.cookies.accessToken
            let result = jwt.verify(checkToken, process.env.JWT_ACCESS_KEY)
            if (result.userType == 'user') {
                return res.status(200).json({
                    EC: -1,
                    message: "Bạn không có quyền"
                })
            }
            // await userService.findUser(result._id)
        } catch (error) {
            console.log(error)
            if (error.name == "TokenExpiredError") {
                return res.status(200).json({
                    EC: -1,
                    message: "Token hết hạn"
                })
            }
            return res.status(200).json({
                EC: -1,
                message: "Bạn cần đăng nhập"
            })
        }
        next()
    }
}
module.exports = new adminMiddleware()