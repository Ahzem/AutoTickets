const express = require("express");
const router = express.Router();
const multer = require("multer");
const { register } = require("../controllers/registrationController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post("/register", upload.single("paymentProof"), register);

module.exports = router;
