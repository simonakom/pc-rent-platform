const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Pc route working");
});
router.get("/kazkoks", (req, res) => {
	res.send("Route working");
});

module.exports = router;