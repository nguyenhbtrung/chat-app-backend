const sql = require('mssql');

// Cấu hình SQL Server
const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        trustedConnection: false, // Chuyển sang false vì sẽ sử dụng SQL Server Authentication
        enableArithAbort: true,
        encrypt: false, // Đặt thành true nếu cần mã hóa kết nối
        trustServerCertificate: true,
        multipleActiveResultSets: true,
    },
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER, // Tài khoản SQL Server
            password: process.env.DB_PASSWORD // Mật khẩu SQL Server
        }
    }
};


// Kết nối cơ sở dữ liệu
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch((err) => {
        console.log('Database Connection Failed:', err);
    });

module.exports = { sql, poolPromise };
