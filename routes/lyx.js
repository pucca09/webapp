/**
 * Created by luyuxiang on 2017/6/5.
 */
var db = require('../lib/DBOperation.js');

exports.ensemble = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('scenic', {}, { sightid: 1 }, function(err, item) {
            db.readall('HotRoute', {}, function(err, item1) {
                db.readallseq('customerStayDaysCount', {}, { date: 1 }, function(err, item2) {
                    db.readallseq('traffic', {}, { train: 1 }, function(err, item3) {
                        db.read('flowByMonth', { "sightid": "0" }, function(err, item4) {
                            res.render('index', { 'hotpoint': item, 'hotroute': item1, 'scenicInfo': item, 'prostaynum': item2, 'trafficclass': item3, 'initdata': item4, req: req });
                        });
                    });
                });
            });
        });
};

exports.searchSID = function(req, res) {
    var sid = req.query.sightid;
    db.read('flowByMonth', { "sightid": sid }, function(err, item) {
        var strJson = JSON.stringify(item);
        res.write(strJson);
        res.end();
    });
};

exports.distribute = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('scenic', {}, { sightid: 1 }, function(err, item) {
            res.render('sightdistribute', { 'hotpoint': item, req: req });
        });
};

exports.mapmatching = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        res.render('mapmatching', {});
};

exports.searchUID = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        var uid = req.query.uid;
    db.read('mapmatching', { "userId": uid }, function(err, item) {
        db.read('beforemapmatching', { "userId": uid }, function(err, item1) {
            var tmp = { "userid": uid, "traj": { "beforemm": item1.traj, "aftermm": item.traj } };
            var s = JSON.stringify(tmp);
            res.write(s);
            res.end();
        });
    });
};