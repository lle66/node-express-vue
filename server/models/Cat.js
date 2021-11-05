/*
 * @Author: zhoule
 * @Date: 2021-11-02 12:10:31
 * @Description: Category表结构设计
 * 导出模型
 */
const mongoose =require('mongoose')
const schema=new mongoose.Schema({
  name:{type:String,required:true},
  parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'} //关联本身模型
})

// 查关联项
schema.virtual('children',{
  localField:'_id',
  foreignField:'parent', // 外健
  justOne:false,
  ref:'Category'  // 关联表
})
  module.exports=mongoose.model('Category',schema)