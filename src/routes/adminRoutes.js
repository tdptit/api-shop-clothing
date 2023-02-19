import express from "express"
import adminController from "../controllers/adminController"
const router = express.Router()

router.post('/register', adminController.adminRegister)
router.post('/login', adminController.adminLogin)
router.post('/logout', adminController.adminLogout)
router.post('/refreshToken', adminController.requestRefreshToken)

module.exports = router