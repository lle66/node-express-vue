/*
 * @Author: zhoule
 * @Date: 2021-11-02 10:42:25
 * @Description: file content
 */
// const express=require('express')

const express = require('express')
const app = express()
app.set('secret','ddgshjheuu142') // 设置app实例变量  这里是密钥设置
app.use(require('cors')()) //跨域
app.use(express.json()) //可使用req.body
app.use('/upload',express.static(__dirname+'/upload'))
// 后台静态托管
app.use('/public',express.static(__dirname+'/public')) // public也要公开
app.use('/admin',express.static(__dirname+'/public/admin'))
app.use('/',express.static(__dirname+'/public/web'))
const port = 3000

require('./plugins/db.js')(app)
require('./routes/admin/index')(app)
require('./routes/web/index')(app)
// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))