const { sendOTPEmail } = require("./mail.service");

// ✅ Generate 6-digit OTP
const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// ✅ Send OTP to Email
const sendOtpToMail = async (email, otp) => {
  if (!email) throw new Error("Email is required to send OTP.");

  try {
    const sendStatus = await sendOTPEmail(email, otp);

    return {
      success: true,
      message: `OTP sent to email ${email} successfully.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to send OTP to email ${email}.`,
      error: error.message,
    };
  }
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
