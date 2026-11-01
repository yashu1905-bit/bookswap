import Notification from '../models/Notification.js';
export async function notify(req,user,actor,type,text,exchange){const item=await Notification.create({user,actor,type,text,exchange});req.app.get('io')?.to(`user:${user}`).emit('notification:new',item);}
