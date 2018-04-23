var express = require('express');
var router = express.Router();
var mysql = require("mysql");
const conf = require("../config/conf");
const conn = require("../config/connect");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/",function(req,res,next){
  let query = req.query;
  let sqlStr = "select * from city";
  conn.query(sqlStr, function (err, result) {
    if (err) {
        res.send(err);
    } else {
      res.send(result);
    }
})
});

module.exports = router;
