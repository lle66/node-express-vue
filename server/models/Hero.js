/*
 * @Author: zhoule
 * @Date: 2021-11-02 15:55:44
 * @Description: 英雄数据模型
 */
const mongoose =require('mongoose')
const schema=new mongoose.Schema({
  name:{type:String,required:true},
  avatar:{type:String},
  avatar:{type:String},
  title:{type:String},
  cats:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],//catagory分类 关联多个分类
  scores:{//评分 一个对象
    difficult:{type:Number},
    skills:{type:Number},
    attack:{type:Number},
    survive:{type:Number},
  },
  skills:[{// 技能
    icon:{type:String},
    name:{type:String},
    description:{type:String},
    tips:{type:String},
  }],
  // 出装
  items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
  //逆风出装
  items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
  // 用法
  usageTips:{type:String},
  // 英雄关系
  parners:[{
    hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
    description:{type:String}
  }]
})
  module.exports=mongoose.model('Hero',schema)