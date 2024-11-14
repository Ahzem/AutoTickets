const Registration = require("../models/Registration");
const { uploadToBlob } = require("../services/blobService");
const { sendConfirmationEmail } = require("../services/emailService");
const { generateQRCode } = require("../services/qrCodeService");

const register = async (req, res) => {
  try {
    const { fullName, email, contactNumber } = req.body;
    const file = req.file;

    if (!email || !fullName || !contactNumber || !file) {
      throw new Error("Missing required fields");
    }

    const fileUrl = await uploadToBlob(file);

    const qrData = {
      fullName,
      email,
      contactNumber,
      registrationDate: new Date().toISOString(),
    };
    const qrCode = await generateQRCode(qrData);

    const registration = new Registration({
      fullName,
      email,
      contactNumber,
      paymentProofUrl: fileUrl,
      qrCode,
    });
    await registration.save();

    await sendConfirmationEmail(fullName, email, contactNumber, qrCode);

    res.json({
      success: true,
      message: "Registration successful! Please check your email.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed. Please try again.",
    });
  }
};

module.exports = { register };
