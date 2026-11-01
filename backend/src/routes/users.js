import{Router}from'express';import{protect}from'../middleware/auth.js';import User from'../models/User.js';import Review from'../models/Review.js';import Book from'../models/Book.js';
const r=Router();
r.get('/me',protect,async(req,res)=>{const[books,reviews]=await Promise.all([Book.find({owner:req.user.id}).sort('-createdAt'),Review.find({recipient:req.user.id}).populate('author','name avatar').sort('-createdAt')]);res.json({user:req.user,books,reviews});});
r.patch('/me',protect,async(req,res,next)=>{try{const{name,bio,location,avatar}=req.body;const user=await User.findByIdAndUpdate(req.user.id,{name,bio,location,avatar},{new:true,runValidators:true}).select('-password');res.json({user});}catch(e){next(e);}});
r.get('/:id',async(req,res,next)=>{try{const user=await User.findById(req.params.id).select('name bio location avatar createdAt');if(!user)return res.status(404).json({message:'Reader not found.'});const[books,reviews]=await Promise.all([Book.find({owner:user.id,available:true}).sort('-createdAt'),Review.find({recipient:user.id}).populate('author','name avatar').sort('-createdAt')]);res.json({user,books,reviews});}catch(e){next(e);}});
export default r;
