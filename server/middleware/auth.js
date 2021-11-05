/*
 * @Author: zhoule
 * @Date: 2021-11-03 11:02:09
 * @Description: 解密 校验token 中间件
 * 返回函数的函数
 */
const jwt= require('jsonwebtoken')
const AdminUser= require('../models/AdminUser')
module.exports=(options)=>{
  return async(req,res,next)=>{
    const token= String(req.headers.authorization||'').split(' ').pop()  //后端全部用小写  pop()方法从数组中删除最后一个元素，并返回该元素的值
    if(!token) return res.status(401).send({msg:'请提供token'})
    const {id}=jwt.verify(token,req.app.get('secret')) //decode解密不验证对错 所以使用verify req.app===app
    if(!id) return res.status(401).send({msg:'无效的token'})
    req.user = await AdminUser.findById(id) //挂载到req 后面到处理函数可用
    if(!req.user) return res.status(401).send({msg:'请先登录'})
   await next()
  }
}