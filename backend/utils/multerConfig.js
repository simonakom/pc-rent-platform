const multer = require("multer");

const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, cb) => {
		// const currentTimestamp = Date.now();
		// cb(null, currentTimestamp + "-" + file.filename);
		console.log("Atsitiko failo uzvadinimas");
		cb(null, "computer.jpg");
	},
	// filename: "petras.jpg",
});

const upload = multer({ storage });

module.exports = upload;