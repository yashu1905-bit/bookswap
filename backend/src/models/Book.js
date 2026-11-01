import mongoose from 'mongoose';
const schema = new mongoose.Schema({ title:{type:String,required:true,trim:true,maxlength:140}, author:{type:String,required:true,trim:true,maxlength:100}, description:{type:String,maxlength:1500,default:''}, genre:{type:String,required:true,trim:true}, condition:{type:String,enum:['Like new','Very good','Good','Fair'],default:'Good'}, image:{type:String,default:''}, owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, location:{type:String,default:''}, available:{type:Boolean,default:true} },{timestamps:true});
schema.index({title:'text',author:'text',description:'text',genre:'text'});
export default mongoose.model('Book',schema);
