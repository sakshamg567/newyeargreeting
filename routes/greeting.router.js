const express = require("express");
const handleGenerateShortidentifier = require("../controllers/greeting.controller")

const router = express.Router()

router.use(express.urlencoded({extended: true}))

router.post("/", handleGenerateShortidentifier)

module.exports = router