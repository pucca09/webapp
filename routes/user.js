/**
 * Created by pucca09 on 2016/5/20.
 */
var db = require('../lib/DBOperation.js');

exports.loginweb1 = function(req, res) {
    //db.insert('user',{username:"dianxin",password:"dianxininsight"});
    req.session.user = null;
    res.render('login', { error: "" });
};

exports.loginweb2 = function(req, res) {
    db.read('user', { username: req.body.username, password: req.body.password }, function(err, item) {
        if (err != null || item == null) {
            res.render('login', { error: '用户名或密码错误' });
        } else {
            req.session.user = JSON.parse(JSON.stringify(item));
            res.redirect('/index');
        }
    });
};