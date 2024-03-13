const express = require("express");
const router = express.Router();
const PcModel = require ("../model/PcModel")

//Add to database
router.post("/", async (req, res) => {
	try{ 
		const {ownerId, cpu, gpu, ramType, ramSpeed, ramAmount, pcType} = req.body;
		console.log(ownerId, cpu, gpu, ramType, ramSpeed, ramAmount, pcType);

		const newPc = new PcModel({ownerId, cpu, gpu, ramType, ramSpeed, ramAmount, pcType});
		await newPc.save();
		console.log(newPc.getInstance());
		res.send(newPc.getInstance());
	}catch(err){
		console.error(err);
		if(err.errno === 1062)
		res.status(400).send("Adding not possible. Pc already exist");
	else {
		res.status(500).send("Server error")
		}
	}
});

//Get all pc
router.get("/", async (req, res) => {
	const allCountriesWithoutId = await PcModel.findAll()
	const allCountries = allCountriesWithoutId.map((value) => value.getInstance());
	res.send(allCountries)
	})

//Get all pc by id
router.get("/:id", async (req, res) => {
	const pc = await PcModel.findById(req.params.id);
	res.send(pc.getInstance());
});

//Delete
router.delete("/:id", async (req, res) => {
	try{
	const result = await PcModel.deleteById(req.params.id);
	res.send("Entry successfully deleted");
	}catch(err){
		if (err.message === "PC not found") res.status(404).send("Entry " + req.params.id + " not found");
		else res.status(500).send("Server error");
	}
});

//Update
router.put("/:id", async (req, res) => {
	const {ownerId, cpu, gpu, ramType, ramSpeed, ramAmount, pcType} = req.body;
	const pcObj = await PcModel.findById(req.params.id);
	if (ownerId)
	pcObj.ownerId = ownerId;
	if (cpu)
	pcObj.cpu = cpu;
	if (gpu)
	pcObj.gpu = gpu;
	if (ramType)
	pcObj.ramType = ramType;
	if (ramSpeed)
	pcObj.ramSpeed = ramSpeed;
	if (ramAmount)
	pcObj.ramAmount = ramAmount;
	if (pcType)
	pcObj.pcType = pcType;

		await pcObj.update();
		res.send(pcObj.getInstance());
})


module.exports = router;