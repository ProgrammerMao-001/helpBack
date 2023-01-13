function query(sql, params, callback) {
    // 获取连接
    pool.getConnection((err, conn) => {
        // 错误信息、连接对象
        if (err) {
            console.log('连接mySql失败');
            pool.releaseConnection(); // 释放连接
        }
        conn.query(sql, params, (error, result, fields) => {
            if (error) {
                conn.release(); // 释放连接对象
                console.log('执行sql失败');
                return
            }
            callback(result, fields);
            conn.release(); // 释放连接对象
        })
    })
}