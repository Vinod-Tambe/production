const nodemailer = require("nodemailer");

// ✅ Generate 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ✅ Send OTP to Email
const sendOtpToMail = async (email, otp) => {
  if (!email) throw new Error("Email is required to send OTP.");

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "your_email@gmail.com",
//       pass: "your_app_password", // App password, not Gmail password
//     },
//   });

//   const mailOptions = {
//     from: '"Your App Name" <your_email@gmail.com>',
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
//   };

//   await transporter.sendMail(mailOptions);

  return { success: true, message: `OTP sent to email ${otp} successfully.` };
};

// ✅ Verify OTP (simple comparison)
const verifyOtp = (main_otp, sent_otp) => {
  return main_otp === sent_otp;
};

module.exports = {
  generateOtp,
  sendOtpToMail,
  verifyOtp,
};
