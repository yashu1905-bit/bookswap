import mongoose from 'mongoose';
const schema = new mongoose.Schema({ user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, actor:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, type:{type:String,required:true}, text:{type:String,required:true}, exchange:{type:mongoose.Schema.Types.ObjectId,ref:'Exchange'}, read:{type:Boolean,default:false} },{timestamps:true});
export default mongoose.model('Notification',schema);
