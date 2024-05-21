const multer = require("multer");

const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, cb) => {
		const currentTimestamp = Date.now(); //recived unique number based on the current time
		const localName = currentTimestamp + "-" + file.originalname; //generate a unique filename based on the current time and the original filename
		cb(null, localName); //The name is set and the file is saved
	},
});

const upload = multer({ storage });

module.exports = upload;