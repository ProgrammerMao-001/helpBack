function dbMW(err, res, resolve, reject) {
    if (err) {
        console.log(`ERROR IN MYSQL:${err}`);
        reject(err)
        //抛出错误，使得错误级中间件捕获
        throw err;
    } else {
        resolve(res);
    }
}

module.exports = {
    select(params) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT ${params.select} FROM ${params.table} WHERE ${params.where}`,
                (err, res) => dbMW(err, res, resolve, reject)
            );
        });
    },

    insert(params) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${params.table} SET ${params.set}`, (err, res) =>
                dbMW(err, res, resolve, reject)
            );
        });
    },

    updata(params) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATA ${params.table} SET ${params.set} WHERE ${params.where}`,
                (err, res) => dbMW(err, res, resolve, reject)
            );
        });
    }
};