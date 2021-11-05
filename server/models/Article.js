/*
 * @Author: zhoule
 * @Date: 2021-11-02 12:10:31
 * @Description: 文章表结构设计
 * 导出模型
 */
const mongoose =require('mongoose')
const schema=new mongoose.Schema({
  title:{type:String,required:true},
  cats:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
  body:{type:String}
},{
  timestamps:true // 自动设置时间戳
})
  module.exports=mongoose.model('Article',schema)