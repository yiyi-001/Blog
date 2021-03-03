

exports.query = (sql, data = null) => {

    return new Promise((resolve, reject) => {
        const mysql = require('mysql');

        let connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '123456',
            database : 'blog'
        });

        // 与数据库建立连接
        connection.connect();
       
        // 数据库操作
        connection.query(sql, data, function (error, results) {
            console.log('sql ===>>>',sql);
            
            console.log('访问数据库');
            
            if (error) {
                // 失败的回调
                reject(error);
                return
            }
            // console.log('result ===>>> ',result);
            
            // 成功的回调   返回查询结果
            resolve(results)
        });

        connection.end();
    })

}