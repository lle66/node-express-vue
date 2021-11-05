/*
 * @Author: zhoule
 * @Date: 2021-11-03 16:11:06
 * @Description: file content
 */
module.exports = {
  outputDir:__dirname+'/../server/public/web',
  // 打包后静态文件前面加的路径 默认是/
  publicPath: process.env.NODE_ENV==='production'?'/public/web/':'/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}
