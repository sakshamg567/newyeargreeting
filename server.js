const express = require("express");
const path = require("path")
const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async(req, res) => {
   res.render("home")
})

app.listen(port, () => console.log("server started"));
