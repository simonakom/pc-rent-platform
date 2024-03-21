const express = require("express");
const router = express.Router();
const PcModel = require ("../model/PcModel")


 //Add to database
router.post("/", async (req, res) => {
try{
    const { cpu, gpu, ramType, ramSpeed, ramAmount, pcType} = req.body;
    console.log(req.body)

    const newPc = new PcModel
    ({ ownerId: req.session.id,
        cpu,
        gpu, 
        ramType, 
        ramSpeed, 
        ramAmount, 
        pcType
    });
    await newPc.save();
    res.status(201).json({
        message: "Information successfully saved to the database",
        newPc: newPc.getInstance(),
		status: true,
    });
}
catch(err) {
	return res.status(500).json({
		message: "Internal server error",
        status: false,
    });
}
});

// //Get all pc
router.get("/", async (req, res) => {
	const allPc = await PcModel.findAll()
	res.status(200).json(allPc.map(pcObjs => pcObjs.getInstance()));
	})

// //Get all pc by id
router.get("/:id", async (req, res) => {
	const pc = await PcModel.findById(req.params.id);
	res.send(pc.getInstance());
});

// //Delete
router.delete("/:id", async (req, res) => {
	try{
	const result = await PcModel.deleteById(req.params.id);
	res.send("Entry successfully deleted");
	}catch(err){
		if (err.message === "PC not found") res.status(404).send("Entry " + req.params.id + " not found");
		else res.status(500).send("Server error");
	}
});

// //Update
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


