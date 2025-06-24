const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwtProvider = require('../utils/jwtProvider');

// ============================
// 🧑 OWNER LOGIN 
// ============================
const owner_login = async (req, res) => {
  const { identifier, own_password } = req.body;

  try {
    const owner = await Owner.findOne({
      $or: [
        { own_login_id: identifier },
        { own_mobile_no: identifier }
      ]
    });

    if (!owner) {
      return res.status(404).json({ success: false, message: 'Owner not found' });
    }

    const isPasswordValid = await bcrypt.compare(own_password, owner.own_password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = jwtProvider.generateToken({ userId: owner._id });

    owner.own_last_login = new Date();
    await owner.save();

    const data = owner.toObject();
    delete data.own_password;

    res.status(200).json({
      success: true,
      message: 'Owner login successful',
      token,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}
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
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isPasswordValid = await bcrypt.compare(admin_password, admin.admin_password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
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
  owner_login
};
