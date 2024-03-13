const express = require("express");  
const router = express.Router();
const UserModel = require("../model/UserMode");
const Address = require("../model/AddressModel");
const security = require("../utils/security");


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
		if (err.errno === 1062) {
			res.status(400).json({ message: "Data is not unique" });
		} else {
			res.status(500).json({ message: "Server error" });
		}
	}
});

router.get("/", (req, res) => {
	res.send("working");
});

module.exports = router;


// //Add to database
// router.post("/", async (req, res) => {
// 	try{ 
// 		const {username, passEncoded, email, birthDate, phone, addressId} = req.body;
// 		console.log(username, passEncoded, email, birthDate, phone, addressId);

// 		const newUser = new UserModel({username, passEncoded, email, birthDate, phone, addressId});
// 		await newUser.save();
// 		console.log(newUser.getInstance());
// 		res.send(newUser.getInstance());
// 	}catch(err){
// 		console.error(err);
// 		if(err.errno === 1062)
// 		res.status(400).send("Adding not possible. User already exist");
// 	else {
// 		res.status(500).send("Server error")
// 		}
// 	}
// });

// //Get all users
// router.get("/", async (req, res) => {
// 	const allUsersWithoutId = await UserModel.findAll()
// 	const allUsers = allUsersWithoutId.map((value) => value.getInstance());
// 	res.send(allUsers)
// 	})

// //Get all users by id
// router.get("/:id", async (req, res) => {
// 	const user = await UserModel.findById(req.params.id);
// 	res.send(user.getInstance());
// });

// //Delete
// router.delete("/:id", async (req, res) => {
// 	try{
// 	const result =  await UserModel.deleteById(req.params.id);
// 	res.send("Entry successfully deleted");
// 	}catch(err){
// 		if (err.message === "not found") res.status(404).send("Entry " + req.params.id + " not found");
// 		else res.status(500).send("Server error");
// 	}
// });

// //Update
// router.put("/:id", async (req, res) => {
// 	const {username, passEncoded, email, birthDate, phone, addressId} = req.body;
// 	const userObj = await UserModel.findById(req.params.id);

// 	if (username) userObj.username = username;
// 	if (passEncoded) userObj.passEncoded = passEncoded;
// 	if (email) userObj.email = email;
// 	if (birthDate) userObj.birthDate = birthDate;
// 	if (phone) userObj.phone = phone;
// 	if (addressId) userObj.addressId = addressId;

// 		await userObj.update();
// 		res.send(userObj.getInstance());
// })



// module.exports = router;