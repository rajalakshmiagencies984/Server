const express = require('express')
const router = express.Router();
const {setServer} = require("../controllers/server")

router.post('/',setServer)

module.exports=router