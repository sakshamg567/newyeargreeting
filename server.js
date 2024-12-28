const express = require("express");
const path = require("path")
const router = require("./routes/greeting.router")
const connectToMongoDB = require("./connection")
const dotenv = require("dotenv")
const GREETING = require("./models/greeting.model")
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

app.get("/:id", async(req,res) => {
   const shortId = req.params.id;
   
   const entry = await GREETING.find({shortId: shortId});
   if(!entry) {
      res.redirect("/")
   }
   const message = entry[0]?.message;
   const sender = entry[0]?.fromUser;
   return res.render("greeting", {
      message: message,
      sender: sender
   })
})

app.use("/api/greeting", router )

app.listen(port, () => console.log("server started"));
