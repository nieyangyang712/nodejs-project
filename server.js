/* document.all.filter(e => {
    return e.style.font-family.toLowerCase().indexOf('yahei') > -1 || e.style.font-family.toLowerCase().indexOf('雅黑') > -1
}) */

const connection = require('./mysql')
const sqlsName = require('./sqlName')
const app = require('./http')

// 注册 解析表单的body-parser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
// parse application/json
app.use(bodyParser.json());

// 数据库表名
const sqlObj = new sqlsName()

//成功的返回
const suc_result = {
    "code": 0,
    "status": "200",
    "message": "success", 
}

// 失败返回
const err_result = {
    "code": 1,
    "status": "200",
    "message": "失败", 
}

// 测试连接
connection.connect( (err) => {
    if(err) throw err;
    console.log('连接成功');
})



// 查询所有的字典表
app.get('/master/getAll', (req, res) => {
    const sql = sqlObj.GETLIST_SQL_MASTERINFO
    connection.query(sql, (err, result) => {
        if (err){
            return res.json(err_result)
        } else{
            suc_result.data = result
            return res.json(suc_result)
        } 
    })
})
 
// 查询所有的用户
app.get('/user/getAll', (req, res) => {
    const sql = sqlObj.GETALL_SQL_USERINFO
    connection.query(sql, (err, result) => {
        if (err){
            return res.json(err_result)
        } else{
            suc_result.data = result
            return res.json(suc_result)
        } 
    })
})


// 添加student 
app.get('/student/save', (req, res) => {
    const sq1 = sqlObj.SAVE_SQL_STUDENT
    var list = { id: 6, name:'zhangsan' };

    connection.query('insert into student set ?', list, function(err, result) {
        if (err){
            return res.json({
                code: 1, msg: '添加失败'
            })
        } else{
            console.log(result);
            return res.json({
                code: 0, msg: '添加成功'
            }) 
        }
    })
})


// 修改数据
app.get('/student/edit', (req, res, next) => {
    var modsql = 'UPDATE student SET name = ? WHERE id = ?';
    var modsqlparams = ['吕雪源1', 5];
    connection.query(modsql, modsqlparams,(err, result)=> {
        if(err){
            return res.json({
                code: 1, msg: '修改失败'
            })
        } else{
            console.log(result);
            return res.json({
                code: 0, msg: '修改成功'
            }) 
        }
    })
})


// 根据id查询 student
app.get('/student/getById/:id', (req, res) => {
    let sqlStr = `SELECT * FROM student WHERE id = ${req.params.id}`;
    connection.query(sqlStr,(err, result) => {
        if(err) return res.json({
            code: 1, msg: '查询失败'
        })
        if(result.length !== 1) return res.json({err_code: 1, msg: '数据不存在'})
        res.json({
           code: 0,
           msg: "success",
           data: result
        })
    })
})

//根据id 删除student
app.get("/deleteMasterinfo/:id",(req, res)=>{
    let sql = `DELETE FROM student WHERE id = ${req.params.id}`;
    connection.query(sql,(err, result)=>{
        if (err){
            return res.json({
                code: 1, msg: '删除失败'
            })
        } else{
            return res.json({
                code: 0, msg: '删除成功'
            }) 
        }
    })
})



// 配置服务端口
app.listen(3000, () => {
    console.log("服务器开启在3000端口....");
})