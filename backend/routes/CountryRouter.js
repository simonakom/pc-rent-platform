const express = require("express");
const router = express.Router();
const CountryModel = require ("../model/CountryModel")

//Add to database
router.post("/", async (req, res) => {
	try{ 
		const {country, countryShort} = req.body;
		console.log(country, countryShort);

		const newCountry = new CountryModel({country, countryShort});
		await newCountry.save();
		console.log(newCountry.getInstance());
		res.send(newCountry.getInstance());
	}catch(err){
		console.error(err);
		if(err.errno === 1062)
		res.status(400).send("Adding not possible. Country already exist");
	else {
		res.status(500).send("Server error")
		}
	}
});

//Get all countries
router.get("/", async (req, res) => {
	const allCountriesWithoutId = await CountryModel.findAll()
	const allCountries = allCountriesWithoutId.map((value) => value.getInstance());
	res.send(allCountries)
	})

//Get all countries by id
router.get("/:id", async (req, res) => {
	const country = await CountryModel.findById(req.params.id);
	res.send(country.getInstance());
});

//Delete
router.delete("/:id", async (req, res) => {
	try{
	const result =  await CountryModel.deleteById(req.params.id);
	res.send("Entry successfully deleted");
	}catch(err){
		if (err.message === "not found") res.status(404).send("Entry " + req.params.id + " not found");
		else res.status(500).send("Server error");
	}
});

//Update
router.put("/:id", async (req, res) => {
	const {country, countryShort} = req.body;
	const countryObj = await CountryModel.findById(req.params.id);
	if (country)
		countryObj.country = country;
	if (countryShort)
		countryObj.countryShort = countryShort;

		await countryObj.update();
		res.send(countryObj.getInstance());
})


module.exports = router;