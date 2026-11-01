import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name:{type:String,required:true,trim:true,maxlength:60}, email:{type:String,required:true,unique:true,lowercase:true,trim:true}, password:{type:String,required:true,minlength:8,select:false}, bio:{type:String,maxlength:400,default:''}, location:{type:String,maxlength:100,default:''}, avatar:{type:String,default:''}, wishlist:[{type:mongoose.Schema.Types.ObjectId,ref:'Book'}] },{timestamps:true});
export default mongoose.model('User',schema);
