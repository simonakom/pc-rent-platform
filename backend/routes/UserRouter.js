const express = require("express");  
const router = express.Router();
const UserModel = require("../model/UserMode");


//Add to database
router.post("/", async (req, res) => {
	try{ 
		const {username, passEncoded, email, birthDate, phone, addressId} = req.body;
		console.log(username, passEncoded, email, birthDate, phone, addressId);

		const newUser = new UserModel({username, passEncoded, email, birthDate, phone, addressId});
		await newUser.save();
		console.log(newUser.getInstance());
		res.send(newUser.getInstance());
	}catch(err){
		console.error(err);
		if(err.errno === 1062)
		res.status(400).send("Adding not possible. Country already exist");
	else {
		res.status(500).send("Server error")
		}
	}
});

//Get all users
router.get("/", async (req, res) => {
	const allUsersWithoutId = await UserModel.findAll()
	const allUsers = allUsersWithoutId.map((value) => value.getInstance());
	res.send(allUsers)
	})

//Get all users by id
router.get("/:id", async (req, res) => {
	const user = await UserModel.findById(req.params.id);
	res.send(user.getInstance());
});

//Delete
router.delete("/:id", async (req, res) => {
	try{
	const result =  await UserModel.deleteById(req.params.id);
	res.send("Entry successfully deleted");
	}catch(err){
		if (err.message === "not found") res.status(404).send("Entry " + req.params.id + " not found");
		else res.status(500).send("Server error");
	}
});

Update
router.put("/:id", async (req, res) => {
	const {username, passEncoded, email, birthDate, phone, addressId} = req.body;
	const userObj = await UserModel.findById(req.params.id);

	if (username) userObj.username = username;
	if (passEncoded) userObj.passEncoded = passEncoded;
	if (email) userObj.email = email;
	if (birthDate) userObj.birthDate = birthDate;
	if (phone) userObj.phone = phone;
	if (addressId) userObj.addressId = addressId;

		await userObj.update();
		res.send(userObj.getInstance());
})



module.exports = router;