const express = require("express");
const app = express();
const mainRouter = require("./MainRouter");

app.use(express.json());//kad priimti json formato duomenys i backend
app.use("/api", mainRouter);

// app.get("/", (req, res) => {
//     res.status(200).json({message: "working"});
// })

app.listen(3000, () => {
	console.log("Serveris paleistas, jo adresas: http://localhost:3000/");
});