/*
 * @Author: zhoule
 * @Date: 2021-11-02 15:04:06
 * @Description: 改造过的api
 */
const express = require('express')
const jwt= require('jsonwebtoken')
const AdminUser= require('../../models/AdminUser')
// express子路由-----resource动态参数
const router=express.Router({mergeParams:true})
// 数据模型---路径后面好像文件大小写无所谓
// const req.Model =require('../../models/CAts')

//解密 校验token 中间件
const authMiddleware=  require('../../middleware/auth')

// 资源中间件
const  resourceMiddleware=require('../../middleware/resource')

module.exports= app=>{

  router.post('/',async (req,res)=>{
    // 创建数据
    const model = await req.Model.create(req.body)
    res.send(model)
    
  })
  router.put('/:id',async (req,res)=>{
    // 修改数据
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
    
  })
  router.delete('/:id',async (req,res)=>{
    // 删除数据
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({success:true,code:200})
    
  })
  router.get('/',async (req,res)=>{
    // 查询数据
    //popupate表示取出关联字段 parent不会是一个id而会变成一个对象
    // const model = await req.Model.find().populate('parent').limit(10)
    // 为了满足通用 setOptions给关联字段 条件限制
    let queryOptions={}
    console.info('(req.Model.modelName',req.Model.modelName)
    if(req.Model.modelName==='Category'){
      queryOptions.populate='parent'
    }
    if(req.Model.modelName==='Article'){
      queryOptions.populate='cats'
    }
    const model = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(model)
    
  })
  router.get('/:id',async (req,res)=>{
    // 查询单个数据
    const item = await req.Model.findById(req.params.id)
    res.send(item)
    
  })
  //以/admin/api 开头  --加了rest 表示rest风格 resource动态参数
  app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)



  //npm i multer 专门处理上传文件中间件
  const multer= require('multer')
  // dest上传目标--- 目录是从左到右读吗 __dirname当前文件
  const upload=multer({dest: __dirname+'/../../upload'})
    // 不属于上面的router  single单个文件上传中间件
  app.post('/admin/api/upload',authMiddleware(),upload.single('file'),async (req,res)=>{
    const file=req.file
    file.url=`http://localhost:3000/upload/${file.filename}`
    res.send(file)
  })
  app.post('/admin/api/login',async (req,res)=>{
    const {userName,password} =req.body
    // 1.根据用户名找用户 
    // const UserModel = req.Model?.modelName==='AdminUser'?req.Model:AdminUser// --------
    const user = await AdminUser.findOne({userName}).select('+password') // 把password查出来 + 强制查出 -排除
    if(!user){
      return res.status(422).send({
        msg:'用户不存在'
      })
    }
    // 2.校验密码
    const isValid=require('bcrypt').compareSync(password,user.password) // 比较明文合密文
    if(!isValid){
      return res.status(422).send({
        msg:'密码错误'
      })
    }
    // 3. 返回token 
    const token= jwt.sign({
      id:user._id,
      // _id:user.id,
      // userName:user.userName
    },app.get('secret'))// 签名  第一个参数：加密的数据对象(自定义配) 第二个表示生成token的密钥
    // 上面的get只有一个参数表示获取配置
    res.send({token})
  })

  //四个参数表示错误处理 
  app.use(async(err,req,res,next)=>{
    res.status(err.statusCode||500).send({msg:err.message})
  })
}