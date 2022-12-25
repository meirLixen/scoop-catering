const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images/products')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
});
const isImage = (req, file, callback) => {
	if (file.mimetype.startsWith('image'))
		callback(null, true)
	else {
		callback(new Error('Only image is Allowed...'))
	}
}
const upload = multer({
	storage: storage,
	fileFilter: isImage

})

exports.uploadImage = upload.single('photo');

exports.upload = (req, res) => {
	console.log(req.file);
	res.status(200).json({
		success: 'Succsse',
	})
}



