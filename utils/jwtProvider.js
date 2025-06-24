const jwt=require("jsonwebtoken")
require('dotenv').config();
const SECRET_KEY=process.env.JWT_SECRET;
const generateToken=(userId)=>{
    const token = jwt.sign({userId},SECRET_KEY,{expiresIn:"48h"})
    return token;
}

const get_owner_id_by_token=(token)=>{
    const decodedToken=jwt.verify(token,SECRET_KEY)
    return decodedToken.userId;
}
const get_admin_id_by_token=(token)=>{
    const decodedToken=jwt.verify(token,SECRET_KEY)
    return decodedToken.adminId;
}

module.exports={get_owner_id_by_token,get_admin_id_by_token,generateToken}