const nodemailer = require("nodemailer");
const { getEmailTemplate } = require("../utils/emailTemplates");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (
  fullName,
  email,
  contactNumber,
  qrCode
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Event Registration Confirmation",
    html: getEmailTemplate(fullName, email, contactNumber, qrCode),
  });
};

module.exports = { sendConfirmationEmail };
