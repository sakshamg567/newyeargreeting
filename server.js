const express = require("express");
const path = require("path")
const router = require("./routes/greeting.router")
const connectToMongoDB = require("./connection")
const dotenv = require("dotenv")
dotenv.config();


connectToMongoDB(process.env.MONGO_DB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(() => console.error("CONNECTION FAILED"))

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use('/assets', express.static(path.join(__dirname, '/assets')));

app.get("/", async(req, res) => {
   res.render("home")
})

app.get("/greeting", async(req,res) => {
   res.render("greeting")
})

app.use("/api/greeting", router )

app.listen(port, () => console.log("server started"));
