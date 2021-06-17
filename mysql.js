// 创建数据库链接
const mysql = require('mysql')
// 注意隐私
const connection = mysql.createConnection({
  host: 'localhost',   // 服务器ip
  port: '3306',			   // 数据库端口号,默认为3306,可自行配置
  user: 'root',        // 登陆数据库用户名
  password: 'root',    // 登陆数据库密码
  database: 'test',     // 连接数据库名称
  timezone: "+08:00",				// 设置数据库时间,当数据库时间与当前时间不一致,可设置
  dateStrings: true
})

// 注册 解析表单的 body-parser
// const bodyParser = require('body-parser')
// connection.use(bodyParser.urlencoded({ extended:false }))
module.exports = connection