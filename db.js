const { Pool } = require('pg');

// Cấu hình PostgreSQL
const config = {
    user: process.env.DB_USER, // Tài khoản PostgreSQL
    host: process.env.DB_SERVER, // Địa chỉ server
    database: process.env.DB_NAME, // Tên database
    password: process.env.DB_PASSWORD, // Mật khẩu
    port: process.env.DB_PORT || 5432, // Cổng PostgreSQL (mặc định là 5432)
};

// Kết nối cơ sở dữ liệu
const pool = new Pool(config);

pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
    console.error('PostgreSQL connection error:', err);
});

module.exports = pool;
