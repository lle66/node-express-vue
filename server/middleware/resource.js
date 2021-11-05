/*
 * @Author: zhoule
 * @Date: 2021-11-03 11:07:16
 * @Description: 资源中间件
 */
module.exports=(options)=>{
  return async(req,res,next)=>{
    const modelName = req.params.resource.slice(0,1).toUpperCase() +req.params.resource.slice(1)
    //给请求对象 统一挂载模型
    req.Model =require(`../models/${modelName}`) 
    next() //继续处理下一个中间件
  }
}