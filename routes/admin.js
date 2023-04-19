const express = require('express')

const {login,register,deleteAdmin,getAllAdmin}=require('../controllers/admin')

const router=express.Router();


router.get('/',getAllAdmin)
router.delete('/',deleteAdmin)
router.post('/login',login)
router.post('/register',register)



module.exports=router;