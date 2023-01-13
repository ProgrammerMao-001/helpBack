// const {response} = require('express');
const express = require('express')
const mysql = require("mysql")
const serve = express()
serve.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //*表示可以跨域任何域名都行（包括直接存在本地的html文件）出于安全考虑最好只设置 你信任的来源也可以填域名表示只接受某个域名
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type'); //可以支持的消息首部列表
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS'); //可以支持的提交方式
    res.header('Content-Type', 'application/json;charset=utf-8'); //响应头中定义的类型
    next();
})

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'hello'
});

connection.connect(function (err) {
    if (err) {
        console.error('连接失败: ' + err.stack);
        return;
    }
    console.log('连接成功 id ' + connection.threadId);
})

let sql = 'SELECT * FROM routerlist'
let data = ''
connection.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR]:', err.message);
    }
    data = JSON.stringify(result);
})

serve.get('/', (req, res) => {
    res.send('express启动成功!');
})

// 查询 router 的全部数据
serve.get('/routerlist', (req, res) => {
    console.log(req.query.name)
    res.send(data);
})

// todo 查询
let url = '/testThree'
serve.get('/aaa', (req, res) => {
    connection.query(`SELECT * FROM routerlist WHERE url = "${url}"`, (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        res.send(results);
    })
})

serve.listen(3000, () => {
    console.log("服务已经启动,3000 端口监听中...");
})
