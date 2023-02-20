import express from "express"
import adminController from "../controllers/adminController"
import productController from "../controllers/productController"
import fileService from "../services/fileService"
import productMiddleware from "../middlewares/productMiddleware"
const router = express.Router()

router.post('/register', adminController.adminRegister)
router.post('/login', adminController.adminLogin)
router.post('/logout', adminController.adminLogout)
router.post('/refreshToken', adminController.requestRefreshToken)
router.get('/getUser', adminController.getAllUser)

router.post('/createProduct', fileService.uploadFile.array("img", 20), productMiddleware.validateProduct, productController.postCreateProduct)
router.put('/updateProduct/:id', productMiddleware.findProduct, fileService.uploadFile.array("img", 20), productMiddleware.validateProduct, productController.putUpdateProduct)
router.get('/getProduct/:id', productController.getProduct)
router.get('/getAllProduct', productController.getAllProduct)
router.delete('/deleteProduct/:id', productController.deleteAProduct)

module.exports = router