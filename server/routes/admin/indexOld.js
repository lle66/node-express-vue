/*
 * @Author: zhoule
 * @Date: 2021-11-02 11:50:33
 * @Description: 以/admin/api 开头路由请求处理
 */
const express = require('express')
// express子路由
const router=express.Router()
// 数据模型
const Cat =require('../../models/Cat')
  
module.exports= app=>{
  
  router.post('/cat',async (req,res)=>{
    // 创建数据
    const model = await Cat.create(req.body)
    res.send(model)
    
  })
  router.put('/cat/:id',async (req,res)=>{
    // 修改数据
    const model = await Cat.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
    
  })
  router.delete('/cat/:id',async (req,res)=>{
    // 删除数据
    await Cat.findByIdAndDelete(req.params.id,req.body)
    res.send({success:true,code:200})
    
  })
  router.get('/cat',async (req,res)=>{
    // 查询数据----popupate表示取出关联字段 parent不会是一个id而会变成一个对象
    const model = await Cat.find().populate('parent').limit(10)
    res.send(model)
    
  })
  router.get('/cat/:id',async (req,res)=>{
    // 查询单个数据
    console.info('req.params',req.params)
    const items = await Cat.findById(req.params.id)
    res.send(items)
    
  })
  //以/admin/api 开头
  app.use('/admin/api',router)
}