const express = require('express');
const router = express.Router();
const conf = require("../config/conf");
const conn = require("../config/connect");
const message = require("../config/message");

//查
router.get("/",function(req,res,next){
  let msg = new message();
  let query = req.query;
  let sqlStr = "select * from city";
  conn.query(sqlStr, function (err, result) {
    if (err) {
        // res.send(err);
        msg.setStatus(false).setMessage(err.message);
        res.json(msg);
    } else {
      // res.send(result);
        msg.setStatus(true).setMessage("设置成功").setData(result);
        res.json(msg);
    }
  })
});

// 新增
router.post("/add",function(req,res,next){
  console.log(req.body);
  let city = req.body.city;
  let country_id = req.body.country_id;
  let sqlStr = "insert into city(city,country_id) values('" + city + "','" + country_id + "')";
  conn.query(sqlStr, function (err, result) {
    if (err) {
        res.send(err);
    } else {
      res.send({message: '新增成功', data: result});
    }
  })
});

// 删
router.post("/delete",function(req,res,next){
  let query = req.query;
  let city_id = req.body.city_id;
  let sqlStr = "select * from city where city_id=" + city_id;
  conn.query(sqlStr, function (err, result) {
    if (err) {
        res.send(err);
    } else {
        res.send({message: '删除成功', data: result});
    }
  })
});

// 更新
router.post('/update', function (req, res, next) {
  let city_id = req.body.city_id;
  let city = req.body.city;
  let country_id = req.body.country_id;
  let sqlStr = "update city set city='" + city + "' where city_id=" + city_id;
  conn.query(sqlStr, function (err, result) {
      if (err) {
          res.send(err);
      } else {
          res.send({message: '修改成功', data: result});
      }
  });
});

module.exports = router;
