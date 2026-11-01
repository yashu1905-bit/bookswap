import mongoose from 'mongoose';
const schema = new mongoose.Schema({ exchange:{type:mongoose.Schema.Types.ObjectId,ref:'Exchange',required:true}, sender:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, text:{type:String,required:true,maxlength:2000,trim:true} },{timestamps:true});
schema.index({exchange:1,createdAt:1});
export default mongoose.model('Message',schema);
