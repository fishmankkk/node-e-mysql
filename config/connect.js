var mysql = require("mysql");
var conf = require("./conf");
var conn;

function connect(){

    conn = mysql.createConnection(conf.mysql);

    conn.connect(function(err){
        if(err)
        {
			console.log("数据库链接失败, 错误信息: " + err.message);
            throw err;
        }
    });

    conn.on("error",function(err){
        if(err.code == "PROTOCOL_CONNECTION_LOST")
        {
			console.log("数据库断开了链接, 正在尝试重新链接数据库...");
			connect();
        }
        else
        {
			console.log("数据库链接失败, 错误信息: " + err.message);
            throw err;
        }
    });
}

connect();

module.exports = conn;