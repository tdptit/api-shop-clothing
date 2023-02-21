import express from 'express'
import userController from '../controllers/userController'
import userMiddleware from '../middlewares/userMiddleware'
import cartMiddleware from '../middlewares/cartMiddleware'
import productController from '../controllers/productController'
import cartController from '../controllers/cartController'
import orderMiddleware from '../middlewares/orderMiddleware'
import orderController from '../controllers/orderController'

const router = express.Router()

router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.post('/logout', userMiddleware.checkLogin, userController.userLogout)
router.post('/infor', userMiddleware.checkLogin, userController.updateInfor)
router.post('/refreshToken', userMiddleware.checkLogin, userController.requestRefreshToken)

router.get('/getProduct/:id', productController.getProduct)
router.get('/getAllProduct', productController.getAllProduct)

router.get('/getCart', userMiddleware.checkLogin, cartController.getCart)
router.post('/addCart', userMiddleware.checkLogin, cartMiddleware.addProductToCart, cartController.addProductToCart)
router.put('/updateCart', userMiddleware.checkLogin, cartMiddleware.updateCart, cartController.updateCart)

router.get('/order', userMiddleware.checkLogin, orderController.getOrder)
router.get('/order/:id', userMiddleware.checkLogin, orderController.getAOrder)
router.post('/order', userMiddleware.checkLogin, orderMiddleware.purchase, orderController.addOrder)
router.delete('/order/:id', userMiddleware.checkLogin, orderController.cancelOrder)

module.exports = router