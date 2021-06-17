// 所有查询的数据库的表
function sqls() {
    this.SAVE_SQL_STUDENT = 'SELECT * FROM student'
    this.GETALL_SQL_USERINFO = 'SELECT * FROM userinfo'
    this.GETLIST_SQL_MASTERINFO = 'SELECT * FROM masterinfo'
    this.GETBYID_SQL_MASTERINFO = 'SELECT * FROM masterinfo where id=?'
}
module.exports = sqls