/*
 * @Author: zhoule
 * @Date: 2021-11-04 10:18:08
 * @Description: file content
 */
module.exports=app=>{
  const router =require('express').Router()
  const Aticle= require('../../models/Article')
  const Cat= require('../../models/Cat')
  // 测试
  router.get('/news/init',async(req,res)=>{
    const parent =await Cat.findOne({
      name:'文章'
    })
    const cats= await Cat.find().where({
      parent:parent
    }).lean()
    const list =Array(5).fill(0).map((title,index)=>{
      // cats.slice(0) 复制操作  Math.random()返回0-1之间的随机数   
      // 随机取分类
      const randomCat=cats.slice(0).sort((a,b)=>Math.random()-0.5)
      console.info('randomCat',randomCat)
      return {
        title: '新闻标题'+index,
        cats:randomCat[0],
        body:'新闻内容'+index
      }
    })
    await Aticle.deleteMany({})
    await Aticle.insertMany(list)
    res.send(list)
  })
  router.get('/news/list',async(req,res)=>{
    // 查关联项
    // const parent=await Cat.findOne({name:'文章'}).populate({path:'children'}) ？？？？ 没查到
    const parent=await Cat.findOne({name:'文章'})
    //match 相当于where查条件
    const children = await Cat.aggregate(
      [
        {$match:{parent:parent._id}},
        {$lookup:{
          from:'articles', //关联的表-- 模型的小写负数形式
          localField:"_id",// 本地键
          foreignField:'cats',// 外键
          as:'newsList',// 新字段 命名
        }}//lookup 类似join
      ]
    )  // 聚合查询
    res.send(children)
  })
  app.use('/web/api',router)
}