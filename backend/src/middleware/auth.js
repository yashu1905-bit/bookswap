import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protect(req,res,next){try{const token=req.cookies?.token||req.headers.authorization?.replace(/^Bearer\s+/i,'');if(!token)return res.status(401).json({message:'Please sign in to continue.'});const data=jwt.verify(token,process.env.JWT_SECRET);req.user=await User.findById(data.id).select('-password');if(!req.user)return res.status(401).json({message:'Account not found.'});next();}catch{return res.status(401).json({message:'Your session has expired. Please sign in again.'});}}
