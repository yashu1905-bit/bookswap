import {Router} from 'express';import bcrypt from 'bcryptjs';import jwt from 'jsonwebtoken';import User from '../models/User.js';import {protect} from '../middleware/auth.js';
const router=Router();
const cookieOptions=()=>({httpOnly:true,sameSite:'lax',secure:process.env.COOKIE_SECURE==='true',path:'/'});
function token(res,user){const value=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'7d'});res.cookie('token',value,{...cookieOptions(),maxAge:7*86400000});}
router.post('/register',async(req,res,next)=>{try{const{name,email,password}=req.body;if(!name?.trim()||!email||!/^\S+@\S+\.\S+$/.test(email)||!password||password.length<8)return res.status(400).json({message:'Enter your name, a valid email, and a password of at least 8 characters.'});const user=await User.create({name,email,password:await bcrypt.hash(password,12)});token(res,user);res.status(201).json({user:{id:user._id,name:user.name,email:user.email,location:user.location,bio:user.bio}});}catch(e){next(e);}});
router.post('/login',async(req,res,next)=>{try{const user=await User.findOne({email:String(req.body.email||'').toLowerCase()}).select('+password');if(!user||!await bcrypt.compare(req.body.password||'',user.password))return res.status(401).json({message:'Email or password is incorrect.'});token(res,user);res.json({user:{id:user._id,name:user.name,email:user.email,location:user.location,bio:user.bio,avatar:user.avatar}});}catch(e){next(e);}});
router.post('/logout',(req,res)=>{res.clearCookie('token',cookieOptions());res.json({message:'Signed out.'});});
router.get('/me',protect,(req,res)=>res.json({user:req.user}));
export default router;
