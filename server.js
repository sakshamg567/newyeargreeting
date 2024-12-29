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


const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use('/assets', express.static(path.join(__dirname, '/assets')));

app.get("/", async(req, res) => {
   res.render("home")
})

app.get("/:id", async(req,res) => {
   const shortId = req.params.id;
   
   const entry = await GREETING.findOne({shortId: shortId});
   if(!entry) {
      return res.redirect("/")
   }
   const message = entry?.message;
   const sender = entry?.fromUser;
   return res.render("greeting", {
      message: message,
      sender: sender
   })
})

app.get("*", async(req,res)=> {
   res.redirect("/")
})

app.use("/api/greeting", router )

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log("server started"));
