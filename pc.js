// 实例
const db = require('./public/outShow.js');
const express = require('express')
const serve = express()
serve.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //*表示可以跨域任何域名都行（包括直接存在本地的html文件）出于安全考虑最好只设置 你信任的来源也可以填域名表示只接受某个域名
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type'); //可以支持的消息首部列表
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS'); //可以支持的提交方式
    res.header('Content-Type', 'application/json;charset=utf-8'); //响应头中定义的类型
    next();
})

serve.get('/routerlist', (req, res) => {
    // 查询实例
    db.query('select * from routerlist', [], function (result, fields) {
        // console.log(result);
        res.send(result);
    });
})

// 查询的接口
serve.get('/aaa', (req, res) => {
    // console.log(req.query)
    let sql = 'select * from routerlist';
    let obj = req.query;
    if (!obj) sql = 'select name,url from routerlist'
    if (obj.url && !obj.name) sql = `SELECT * FROM routerlist WHERE url = "${obj.url}"`
    if (obj.name && !obj.url) sql = `SELECT * FROM routerlist WHERE name = "${obj.name}"`
    if (obj.url && obj.name) sql = `SELECT * FROM routerlist WHERE name = "${obj.name}" AND url = "${obj.url}"`
    // console.log(sql)
    db.query(sql, (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        res.send(results);
    })
})


//添加实例
// var addSql = 'INSERT INTO websites(username,password) VALUES(?,?)';
// var addSqlParams = ['咕噜先森', '666'];
// db.query(addSql, addSqlParams, function (result, fields) {
//     console.log('添加成功')
// })

serve.listen(3000, () => {
    console.log("服务已经启动,3000 端口监听中...");
})
