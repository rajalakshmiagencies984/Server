const express = require('express')
const {login,register,getAll,editUser,deleteUser,changePassword,addAddress,getUser}=require('../controllers/user')
const {otp_sendEmail}=require('../controllers/mail')
const router = express.Router();


router.get('/',getAll)
router.delete('/',deleteUser)
router.get('/:id',getUser)
router.patch('/:id',editUser)
router.post('/otp',otp_sendEmail)
router.post('/login',login)
router.post('/register',register)
router.post('/address/',addAddress)
router.patch('/change/password',changePassword)


module.exports = router;