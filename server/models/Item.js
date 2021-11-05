/*
 * @Author: zhoule
 * @Date: 2021-11-02 15:55:44
 * @Description: file content
 */
const mongoose =require('mongoose')
const schema=new mongoose.Schema({
  name:{type:String,required:true},
  icon:{type:String} 
})
  module.exports=mongoose.model('Item',schema)