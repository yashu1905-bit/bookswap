import mongoose from 'mongoose';
const schema = new mongoose.Schema({ author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, recipient:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, exchange:{type:mongoose.Schema.Types.ObjectId,ref:'Exchange',required:true}, rating:{type:Number,min:1,max:5,required:true}, text:{type:String,maxlength:600,default:''} },{timestamps:true});
schema.index({author:1,exchange:1},{unique:true});
export default mongoose.model('Review',schema);
