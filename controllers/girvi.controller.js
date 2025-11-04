const { create_girvi_record, update_girvi_record, get_girvi_record_details, get_all_girvi_record } = require("../services/girvi.service");
const { getOwnerIdFromToken } = require("../utils/tokenHelper");

// Controller to create a new Girvi
const create_girvi = async (req, res) => {
  try {
     const ownerId = await getOwnerIdFromToken(req);
     req.body.girv_own_id=ownerId;
    const girvi = await create_girvi_record(req.body);
    res.status(201).json({
      success: true,
      data: girvi,
      message: 'Girvi created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to update an existing Girvi
const update_girvi = async (req, res) => {
  try {
    const girvi = await update_girvi_record(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: girvi,
      message: 'Girvi updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to delete a Girvi
const delete_girvi = async (req, res) => {
  try {
    const result = await remove_girvi_record(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to get a Girvi by ID
const get_girvi_details = async (req, res) => {
  try {
    const girvi = await get_girvi_record_details(req.params.girv_id);
    res.status(200).json({
      success: true,
      data: girvi
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to get all Girvi records
const get_all_girvi = async (req, res) => {
  try {
    const girviList = await get_all_girvi_record();
    res.status(200).json({
      success: true,
      data: girviList
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  create_girvi,
  update_girvi,
  delete_girvi,
  get_girvi_details,
  get_all_girvi
};