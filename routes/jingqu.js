/**
 * Created by pucca09 on 2016/5/20.
 * 景区分析
 */
var db = require('../lib/DBOperation.js');

exports.heatmap = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('scenic', {}, { sightid: 1 }, function(err, item) {
            db.readall('HotRoute', {}, function(err, item1) {
                res.render('index', { 'hotpoint': item, 'hotroute': item1, req: req });
            });
        });
};

exports.guishubyday = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('customerFlowByProvByMonth', {}, { date: 1 }, function(err, item) {
            res.render('guishubyday', { dayflow: item, req: req });
        });
};

exports.guishubymonth = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('guishumap', {}, { date: 1 }, function(err, item) {
            res.render('guishubymonth', { monthflow: item, req: req });
        });
};

exports.guishubysight = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('scenicCustomerFlowByProvByMonth', {}, { date: 1 }, function(err, item) {
            res.render('guishubysight', { sightflow: item, req: req });
        });
};

exports.traffic = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('traffic', {}, { train: 1 }, function(err, item) {
            res.render('traffic', { trafficclass: item, req: req });
        });
};

exports.sightflow = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('scenicCustomerFlowByMonth', {}, { date: 1 }, function(err, item1) {
            db.readallseq('scenicCustomerFlowByDay', {}, { sightid: 1, date: 1 }, function(err, item2) {
                res.render('sightflow', { sightflow: item1, dayflow: item2, req: req });
            });
        });
};

exports.prostay = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('customerStayDaysCount', {}, { date: 1 }, function(err, item) {
            res.render('prostay', { prostaynum: item, req: req });
        });
};

exports.migration = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readall('migration', {}, function(err, item) {
            res.render('migration', { move: item, req: req });
        });
};

exports.sightstay = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('scenicSpotStayDurCount', {}, { sightid: 1 }, function(err, item) {
            res.render('sightstay', { stay: item, req: req });
        });
};

exports.live = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readall('live', {}, function(err, item) {
            res.render('live', { live: item, req: req });
        });
};

exports.inandout = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        db.readallseq('inandout', {}, { date: 1 }, function(err, item) {
            res.render('inandout', { inandout: item, req: req });
        });
};

exports.remen = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        res.render('remen', { req: req });
};

exports.tuijian = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        res.render('tuijian', { req: req });
};

exports.tuijiandetial = function(req, res) {
    if (req.session.user == null)
        res.redirect('/login');
    else
        res.render('tuijiandetial', { req: req });
};