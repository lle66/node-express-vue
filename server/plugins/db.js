/*
 * @Author: zhoule
 * @Date: 2021-11-02 11:58:16
 * @Description: 连接数据库
 */
const mongoose =require('mongoose')

module.exports=app=>{
  mongoose.connect('mongodb://127.0.0.1/test',{
    // 警告处理--可能
    useNewUrlParser:true
  })
  // 把models文件夹下面的js全部引用一遍 防止模型关联的模型 因为没有被引用报错
  require('require-all')(__dirname+'/../models')
}