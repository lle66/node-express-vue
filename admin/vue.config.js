/*
 * @Author: zhoule
 * @Date: 2021-11-04 17:19:48
 * @Description: file content
 */
module.exports={
  outputDir:__dirname+'/../server/public/admin',
  // 打包后静态文件前面加的路径 默认是/
  publicPath: process.env.NODE_ENV==='production'?'/public/admin/':'/'
}