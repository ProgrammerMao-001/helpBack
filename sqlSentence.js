/* mysql语句 */
// 查询
connection.query('SELECT * FROM t_user WHERE username = "whg"', (err, results, fields) => {
    if (err) {
        console.log(err);
    }
    console.log(results);
})

// 添加
connection.query('INSERT INTO t_user(username, pass) VALUES(?, ?)', ['whg', '123'], (err, results) => {
    if (err) {
        console.log(err);
    }
    console.log(results);
})

// 删除
connection.query('DELETE FROM t_user  WHERE id = 1', (err, results) => {
    if (err) {
        console.log(err);
    }
    console.log(results);
})

// 更新
connection.query('UPDATE t_user SET pass = "321" WHERE username = "whg"', (err, results) => {
    if (err) {
        console.log(err);
    }
    console.log(results);
})

// 结束连接
connection.end(function (err) {
    console.log('服务关闭...')
});
// 强制关闭
connection.destroy();

