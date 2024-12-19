const express = require("express");
const router = express.Router();

const { iniciarSesion } = require("../controller/Login");

router.post("/login");

module.exports = router;
