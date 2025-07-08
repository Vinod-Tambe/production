const Owner = require('../models/owner.model');
const { get_owner_id_by_token } = require('./jwtProvider');

async function getOwnerIdFromToken(req) {
  try {
    
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    // Await if get_owner_id_by_token is async
    const ownerObjectId = await get_owner_id_by_token(token);

    if (!ownerObjectId || !ownerObjectId.userId) {
      throw new Error('Invalid token or missing userId');
    }
    // Find owner document by userId
    const owner = await Owner.findById(ownerObjectId.userId).select('own_id');
    if (!owner) return null;
    return owner.own_id;
  } catch (error) {
    console.error('Error in getOwnerIdFromToken:', error.message);
    return null;
  }
}

module.exports = {
  getOwnerIdFromToken,
};
