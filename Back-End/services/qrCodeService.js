const qrcode = require("qrcode");

const generateQRCode = async (data) => {
  return await qrcode.toDataURL(JSON.stringify(data));
};

module.exports = { generateQRCode };
