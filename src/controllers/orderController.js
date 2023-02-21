import orderService from '../services/orderService'

class orderController {
    async addOrder(req, res) {
        let order = await orderService.addOrderService(req.body)
        return res.status(200).json({
            EC: 1,
            message: "Đặt hàng thành công",
            data: order
        })
    }
    async getOrder(req, res) {
        let orders
        if (req.body.userId) {
            orders = await orderService.getAllOrderService(req.body)
        }
        else {
            orders = await orderService.allOrderService(req.query)
        }
        return res.status(200).json({
            EC: 1,
            data: orders
        })
    }
    async getAOrder(req, res) {
        let order
        if (req.body.userId) {
            order = await orderService.aOrderService(req.body.userId, req.params.id)
        }
        else {
            order = await orderService.getAOrderService(req.params.id)
        }
        return res.status(200).json({
            EC: 1,
            data: order
        })
    }
    async cancelOrder(req, res) {
        let orders = await orderService.cancelAOrder(req.body.userId, req.params.id)
        return res.status(200).json({
            EC: 1,
            data: orders
        })
    }
    async updateOrder(req, res) {
        let order = await orderService.updateOrderService(req.params.id, req.body)
        return res.status(200).json({
            EC: 1,
            message: "Sửa thành công đơn hàng",
            data: order
        })
    }
}

module.exports = new orderController()