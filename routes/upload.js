const express = require('express');
const router = express.Router();
const { upload, uploadImage } = require('../controller/userController')


router.post('/upload',uploadImage, upload)

module.exports = router;