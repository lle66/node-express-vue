/*
 * @Author: zhoule
 * @Date: 2021-11-02 12:10:31
 * @Description: 广告位表结构设计
 * 导出模型
 */
const mongoose =require('mongoose')
const schema=new mongoose.Schema({
  userName:{type:String,required:true},
  password:
  {type:String,
    required:true,
    select:false, //密码不可查---- 保存到时候不去动竟然没关系
    set(val){
    return require('bcrypt').hashSync(val,10) // 10~12 加密级别比较保险  比md5加密更安全

  }}, // set 把值改了在保存
})
  module.exports=mongoose.model('AdminUser',schema)