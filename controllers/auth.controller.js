const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwtProvider = require('../utils/jwtProvider');
const otpService = require('../services/otp.service'); // <-- Import OTP service

// ============================
// 🧑 OWNER LOGIN (PASSWORD)
// ============================
const owner_login = async (req, res) => {
  const { identifier, own_password } = req.body;

  try {
    const owner = await Owner.findOne({
      $or: [
        { own_login_id: identifier },
        { own_email: identifier.toLowerCase().trim() },
        ...(isNaN(identifier) ? [] : [{ own_mobile_no: Number(identifier) }])
      ]
    });

    if (!owner) {
      return res.status(200).json({ success: false, message: 'Invalid mobile number, login ID or email.' });
    }

    const isPasswordValid = await bcrypt.compare(own_password, owner.own_password);
    if (!isPasswordValid) {
      return res.status(200).json({ success: false, message: 'Please enter the correct password.' });
    }

    const token = jwtProvider.generateToken({ userId: owner._id });

    owner.own_last_login = new Date();
    await owner.save();

    const data = owner.toObject();
    delete data.own_password;

    res.status(200).json({
      success: true,
      message: 'Welcome back! Login successful.',
      token,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// ============================
// ✅ SEND OTP TO OWNER
// ============================
const send_owner_otp = async (req, res) => {
  const { identifier } = req.body;

  try {
    const owner = await Owner.findOne({
      $or: [
        { own_login_id: identifier },
        { own_email: identifier.toLowerCase().trim() },
        ...(isNaN(identifier) ? [] : [{ own_mobile_no: Number(identifier) }])
      ]
    });

    if (!owner || !owner.own_email) {
      return res.status(200).json({ success: false, message: 'Owner not found or email not registered.' });
    }

    const otp = otpService.generateOtp();

    owner.own_otp = otp;
    owner.own_otp_expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    await owner.save();

    await otpService.sendOtpToMail(owner.own_email, otp);

    res.status(200).json({ success: true, message: `OTP sent to ${otp} ${owner.own_email}.` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
  }
};

// ============================
// ✅ OWNER LOGIN WITH OTP
// ============================
const owner_login_with_otp = async (req, res) => {
  const { identifier, otp } = req.body;

  try {
    const owner = await Owner.findOne({
      $or: [
        { own_login_id: identifier },
        { own_email: identifier.toLowerCase().trim() },
        ...(isNaN(identifier) ? [] : [{ own_mobile_no: Number(identifier) }])
      ]
    });

    if (!owner) {
      return res.status(200).json({ success: false, message: 'Owner not found with given identifier.' });
    }

    if (!owner.own_otp || !owner.own_otp_expiry) {
      return res.status(200).json({ success: false, message: 'OTP not found. Please resend a OTP.' });
    }

    const isOtpValid = otpService.verifyOtp(otp, owner.own_otp);
    if (!isOtpValid) {
      return res.status(200).json({ success: false, message: 'Incorrect OTP. Please try again.' });
    }

    if (Date.now() > owner.own_otp_expiry) {
      return res.status(200).json({ success: false, message: 'Your OTP has expired. Please resend a OTP.'});
    }

    owner.own_otp = undefined;
    owner.own_otp_expiry = undefined;
    owner.own_last_login = new Date();
    await owner.save();

    const token = jwtProvider.generateToken({ userId: owner._id });
    const data = owner.toObject();
    delete data.own_password;

    res.status(200).json({
      success: true,
      message: 'Welcome back! Login successful.',
      token,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// ============================
// 👤 ADMIN LOGIN
// ============================
const admin_login = async (req, res) => {
  const { identifier, admin_password } = req.body;

  try {
    const admin = await Admin.findOne({
      $or: [
        { admin_email: identifier },
        { admin_phone: identifier }
      ]
    });

    if (!admin) {
      return res.status(200).json({ success: false, message: 'Admin not found' });
    }

    const isPasswordValid = await bcrypt.compare(admin_password, admin.admin_password);
    if (!isPasswordValid) {
      return res.status(200).json({ success: false, message: 'Invalid password' });
    }

    const token = jwtProvider.generateToken({ adminId: admin._id });

    admin.admin_last_login = new Date();
    await admin.save();

    const data = admin.toObject();
    delete data.admin_password;

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      token,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  admin_login,
  owner_login,
  send_owner_otp,
  owner_login_with_otp,
};
