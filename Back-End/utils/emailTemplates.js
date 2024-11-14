const getEmailTemplate = (fullName, email, contactNumber, qrCode) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4A90E2; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .qr-code { text-align: center; margin: 20px 0; }
        .details { margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Event Registration Confirmed!</h1>
        </div>
        <div class="content">
            <h2>Hello ${fullName}!</h2>
            <p>Your registration has been confirmed. Here are your details:</p>
            <div class="details">
                <ul>
                    <li>Name: ${fullName}</li>
                    <li>Email: ${email}</li>
                    <li>Contact: ${contactNumber}</li>
                </ul>
            </div>
            <div class="qr-code">
                <h3>Your Entry QR Code</h3>
                <img src="${qrCode}" alt="QR Code">
                <p>Please present this QR code at the event entrance</p>
            </div>
        </div>
        <div class="footer">
            <p>Thank you for registering!</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = { getEmailTemplate };
