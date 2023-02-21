import express from 'express'
import adminController from '../controllers/adminController'
import orderController from '../controllers/orderController'
import productController from '../controllers/productController'
import adminMiddleware from '../middlewares/adminMiddleware'
import productMiddleware from '../middlewares/productMiddleware'
import fileService from '../services/fileService'

const router = express.Router()

router.post('/register', adminController.adminRegister)
router.post('/login', adminController.adminLogin)
router.post('/logout', adminMiddleware.checkLogin, adminController.adminLogout)
router.post('/refreshToken', adminController.requestRefreshToken)
router.get('/getUser', adminMiddleware.checkLogin, adminController.getAllUser)

router.post('/createProduct', adminMiddleware.checkLogin, fileService.uploadFile.array("img", 20), productMiddleware.validateProduct, productController.postCreateProduct)
router.put('/updateProduct/:id', adminMiddleware.checkLogin, productMiddleware.findProduct, fileService.uploadFile.array("img", 20), productMiddleware.validateProduct, productController.putUpdateProduct)
router.get('/getProduct/:id', adminMiddleware.checkLogin, productController.getProduct)
router.get('/getAllProduct', adminMiddleware.checkLogin, productController.getAllProduct)
router.delete('/deleteProduct/:id', adminMiddleware.checkLogin, productController.deleteAProduct)

router.get('/order', adminMiddleware.checkLogin, orderController.getOrder)
router.get('/order/:id', adminMiddleware.checkLogin, orderController.getAOrder)
router.put('/order/:id', adminMiddleware.checkLogin, orderController.updateOrder)

module.exports = router