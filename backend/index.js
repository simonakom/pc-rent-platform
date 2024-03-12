const express = require("express");
const app = express();
const mainRouter = require("./MainRouter");

app.use(express.json()); // to receive json format data into the backend (use req.body)
app.use("/api", mainRouter);


// app.get("/", (req, res) => {
//     res.status(200).json({message: "working"});
// })
app.listen(3000, () => {
	console.log("Server running: http://localhost:3000/");
});