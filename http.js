const express = require('express')
const app = express()
 
//allow custom header and CORS
// 设置跨域
app.all('*', (req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*')
   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
   res.header('X-Powered-By', '3.2.1')
   res.header('Content-type', 'application/json;charset=utf-8')

   if (req.method == 'OPTIONS') {
      res.send(200); 
      // 让options请求快速返回
   } else {
      next();
   }
})
 
// exports
module.exports = app