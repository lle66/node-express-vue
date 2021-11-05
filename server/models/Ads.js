/*
 * @Author: zhoule
 * @Date: 2021-11-02 12:10:31
 * @Description: 广告位表结构设计
 * 导出模型
 */
const mongoose =require('mongoose')
const schema=new mongoose.Schema({
  name:{type:String,required:true},
  items:[{
    image:{type:String},
    url:{type:String}
  }]
})
  module.exports=mongoose.model('Ads',schema)