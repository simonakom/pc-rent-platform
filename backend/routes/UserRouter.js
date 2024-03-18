const express = require("express");  
const router = express.Router();
const UserModel = require("../model/UserMode");
const Address = require("../model/AddressModel");
const security = require("../utils/security");
let currentAddressId;

// Register route
router.post("/register", async (req, res) => {
	try {
		const {
			username,
			password,
			email,
			birthDate,
			phone,
			country,
			county,
			municipality,
			zipCode,
			city,
			street,
			streetNumber,
			apartmentNumber,
		} = req.body;

		const newAddress = new Address({
			country,
			county,
			municipality,
			zipCode,
			city,
			street,
			streetNumber,
			apartmentNumber,
		});
		console.log(newAddress);
		await newAddress.save();

		currentAddressId = newAddress.id;

		const salt = security.generateSalt();
		const hashedPassword = security.hashPassword(password, salt);
		const newUser = new UserModel({ 
			username,
			passEncoded: hashedPassword,
			salt,
			email,
			birthDate,
			phone,
			addressId: newAddress.id,
		});
		await newUser.save();

		//sessions
		req.session.user = {
			username: newUser.username,
			email: newUser.email,
			id: newUser.id,
		};
		req.session.isLoggedIn = true;

		res.status(201).send({
			user: newUser.getInstance(),
			address: newAddress.getInstance(),
		});
	} catch (err) {
		console.error(err);
		Address.deleteById(currentAddressId);
		if (err.errno === 1062) {
			res.status(400).json({ message: "Data is not unique" });
		} else {
			res.status(500).json({ message: "Server error" });
		}
	}
});

// Login route
router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password)
			return res.status(400).json({
					message: "Please provide full login information",
					status: false,
				});
		const existingUser = await User.findByUsername(username);
		if (!existingUser)
			return res.status(404).json({
					message: "User with this name could not be found",
					status: false,
				});

		if (!security.isValidPassword(password,existingUser.salt,existingUser.passEncoded))
			return res.status(400).json({
					message: "Login details are invalid",
					status: false,
				});
		req.session.user = {
			username: existingUser.username,
			email: existingUser.email,
			id: existingUser.id,
		};

		req.session.isLoggedIn = true;
		res.status(200).json({ message: "Successfully logged into the system", status: true });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error", status: false });
	}
});

// Logout route
router.get("/logout", async (req, res) => {
	if (req.session.isLoggedIn) {
		req.session.destroy();
		return res.status(200).json({ message: "Successfully loggedout!", status: true });
	} else {
		return res.status(200).json({messsage: "To log out you must first log in",status: false,});
	} 
});
 
//session
router.get("/check-session", (req, res) => {
	if (req.session.isLoggedIn)
		return res.status(200).json({ isLoggedIn: req.session.isLoggedIn });
	return res.status(200).json({ isLoggedIn: false });
});

module.exports = router;
 