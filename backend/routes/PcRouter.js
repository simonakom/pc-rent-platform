const express = require("express");
const router = express.Router();
const PcModel = require ("../model/PcModel")
const upload = require ("../utils/multerConfig")
const PcImageModel = require ("../model/PcImageModel")


//Add to database
router.post("/", upload.array("files", 2), async (req, res) => {
try{
    const { pcName, cpu, gpu, ramType, ramSpeed, ramAmount, pcType} = req.body;
    // console.log(req.body)
	// console.log(req.files)

    const newPc = new PcModel
    ({ pcName,
		ownerId: req.session.user.id,
        cpu,
        gpu, 
        ramType, 
        ramSpeed, 
        ramAmount, 
        pcType,
    });
    await newPc.save();

	const allPcImageModels = req.files.map((file) => new PcImageModel({uri: file.path, pcId: newPc.id }));
	const allPcImageSavePromises = allPcImageModels.map((model) => model.save());
	await Promise.all(allPcImageSavePromises);

    res.status(201).json({
        message: "Information successfully saved to the database",
        newPc: newPc.getInstance(),
		pcImages: allPcImageModels.map((model) => model.getInstance()),
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
	const allPcsWithImages = await PcModel.findAllWithImages();
	res.status(200).json(allPcsWithImages.map((pc)=>{
		return pc.getInstance();
	}));
});

// //Get posted pc
router.get("/my-computers", async (req, res) => {
	if (!req.session.isLoggedIn)
		return res.status(403).json({ message: "Unauthorized", status: false });
	const allPcs = await PcModel.findAllByOwnerIdWithImages(req.session.user.id);
	return res
		.status(200)
		.json({ allPcs: allPcs.map((pc) => pc.getInstance()), status: true });
});

// //Get all pc by id
router.get("/:id", async (req, res) => {
	try {
		const pc = await PcModel.findById(req.params.id);
		if (!pc)
			return res.status(404).json({ message: "pc not found", status: false });
		const pcImages = await PcImageModel.getByPcId(pc.id);

		return res.status(200).json({
			pc: pc.getInstance(),
			pcImages: pcImages.map((pcImage) => pcImage.getInstance()),
			status: true,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "Bad Id", status: false });
	}
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
	const {pcName, ownerId, cpu, gpu, ramType, ramSpeed, ramAmount, pcType} = req.body;
	const pcObj = await PcModel.findById(req.params.id);
	if (pcName)
	pcObj.pcName = pcName;
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

router.get("/my-computers", async (req, res) => {
})

module.exports = router;


