import Cart from '../models/carts'
import User from '../models/users'

module.exports = {
    async purchase(req, res, next) {
        let user = await User.findById(req.body.userId)
        if (user.address == undefined || user.phone == undefined) {
            return res.status(200).json({
                EC: -1,
                message: "Cần điền đầy đủ thông tin"
            })
        }
        let cart = await Cart.findOne({ userId: req.body.userId })
        if (cart.items.length == 0) {
            return res.status(200).json({
                EC: -1,
                message: "Giỏ hàng trống"
            })
        }
        next()
    }
}