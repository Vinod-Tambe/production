const adminService = require('../services/admin.service');

// Create a new admin
const create_admin = async (req, res) => {
  try {
    const admin = await adminService.create_admin(req.body);
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get admin details by ID
const get_admin_details = async (req, res) => {
  try {
    const admin = await adminService.get_admin_details({ _id: req.params.id });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update admin details by ID
const update_admin_details = async (req, res) => {
  try {
    const admin = await adminService.update_admin_details(req.params.id, req.body);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Export all controller methods
module.exports = {
  create_admin,
  get_admin_details,
  update_admin_details,
};
