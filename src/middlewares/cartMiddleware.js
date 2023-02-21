import cartService from '../services/cartService'
import productService from '../services/productService'

module.exports = {
    async addProductToCart(req, res, next) {
        const cart = await cartService.findCart(req.body.userId)
        if (cart == null) {
            return res.status(200).json({
                EC: -1,
                message: "Error giỏ hàng"
            })
        }
        const product = await productService.getAProductService(req.body.id)
        if (product == null) {
            return res.status(200).json({
                EC: -1,
                message: "Error sản phẩm"
            })
        }
        if (parseInt(req.body.quantity) > product.quantity) {
            return res.status(200).json({
                EC: -1,
                message: `Bạn chỉ đc mua tối đa ${product.quantity} sản phẩm`
            })
        }
        const checkCart = cart.items.find((item => item.product == req.body.id))
        if (checkCart !== undefined) {
            if (checkCart.quantity + parseInt(req.body.quantity) > product.quantity) {
                return res.status(200).json({
                    EC: -1,
                    message: `Bạn chỉ đc mua tối đa ${product.quantity} sản phẩm`
                })
            }
        }
        next()
    },
    async updateCart(req, res, next) {
        const cart = await cartService.findCart(req.body.userId)
        if (cart == null) {
            return res.status(200).json({
                EC: -1,
                message: "Error"
            })
        }
        const product = await productService.getAProductService(req.body.id)
        if (product == null) {
            return res.status(200).json({
                EC: -1,
                message: "Error"
            })
        }
        if (parseInt(req.body.quantity) > product.quantity) {
            return res.status(200).json({
                EC: -1,
                message: `Bạn chỉ đc mua tối đa ${product.quantity} sản phẩm`
            })
        }
        next()
    }
}