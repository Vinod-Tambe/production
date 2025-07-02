const nodemailer = require("nodemailer");
require('dotenv').config();
const email_username = process.env.EMAIL_USER;
  const email_pass = process.env.EMAIL_PASS;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email_username,
    pass: email_pass, // Not your Gmail login password
  },
});

const sendOTPEmail = async (toEmail, sendotp) => {
  const info = await transporter.sendMail({
     from: '"📚Khataboss - Your Dream Software" <vinod4tambe@gmail.com>',
    to: toEmail,
    subject: "🔐 Your One-Time Password (OTP)",
    text: "",
    html: `<body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: Arial, sans-serif;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom: 30px;max-width: 600px; margin: 30px auto; background-color: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-radius: 8px;">
      <tr>
        <td align="center" style="padding: 30px 20px;">
          <img src="https://www.shutterstock.com/image-vector/open-book-diary-white-paper-600nw-2133316243.jpg" alt="GitHub Logo" width="70" height="70" style="border:1px solid black;border-radius: 100%;margin-bottom: 10px;" />
          <h2 style="font-size: 12px; color: #24292e; margin: 0;">If you did not request this, please ignore this email</h2>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0 30px 0px 30px;">
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 5px;">
            <div style="font-size: 48px; text-align: center;">🔑</div>
            <p style="font-size: 16px; color: #333; margin: 10px 0;">
              Continue sign in by entering the code below:
            </p>
            <p style="font-size: 32px; font-weight: bold; margin: 20px 0;color:#a45454;">
              ${sendotp}
            </p>
             <p style="font-size: 12px; font-weight: bold; margin: 20px 0;color:red;">
              ⚠️ “Do not share this code with anyone.”
            </p>
          </div>
          <p style="font-size: 13px; color: #666; margin-top: 20px;">
            No Copy Paste Option<br />
          </p>
        </td>
      </tr>
      <tr>
        <td align="center" style="font-size: 12px; color: #999; padding: 10px;">
          © 2025 khataboss. All rights reserved.
        </td>
      </tr>
    </table>
  </body>`,
  });
return true;
};
module.exports = { sendOTPEmail };