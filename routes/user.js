const express = require('express')
const {login,register,getAll,editUser,deleteUser,changePassword}=require('../controllers/user')
const router = express.Router();


router.get('/',getAll)
router.patch('/:id',editUser)
router.delete('/',deleteUser)
router.post('/login',login)
router.post('/register',register)
router.patch('/change/password',changePassword)


module.exports = router;