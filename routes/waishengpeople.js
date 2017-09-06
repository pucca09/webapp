/**
 * Created by pucca09 on 2016/5/20.
 * 外省人
 */
var db=require('../lib/DBOperation.js');
var async = require('async');

exports.waishengselect = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('waishengselect',{req:req});
};

exports.waishengdetail = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
    {
        db.readall('waishengselect',{province:(req.body.guishu.indexOf("{")==-1)?req.body.guishu:eval('(' + req.body.guishu + ')'),
        uesrtype:(req.body.visitortype.indexOf("{")==-1)?req.body.visitortype:eval('(' + req.body.visitortype + ')'),
        traffic:(req.body.traffic.indexOf("{")==-1)?req.body.traffic:eval('(' + req.body.traffic + ')'),
        mianshui:(req.body.mianshui.indexOf("{")==-1)?req.body.mianshui:eval('(' + req.body.mianshui + ')'),
        daycell:(req.body.phone.indexOf("{")==-1)?req.body.phone:eval('(' + req.body.phone + ')')},function(err,item){
            var n0=0;
            //item.forEach(function (item1) {
            //    db.readall('hotelmap',{cellid:item1.livecell},function(err,item2){
            //        item2.forEach(function (item3) {
            //            if(item3.hoteltype.indexOf('0')==0)
            //            {
            //                n0++;
            //            }
            //        });
            //    });
            //});
            console.log(n0);
            //for(i=0;i<item.length;i++){
            //    db.readall('hotelmap',{cellid:item[i].livecell},function(err,item1){
            //        for(j=0;j<item1.length;j++){
            //            if(item1[j].hoteltype.indexOf('0')==0)
            //            {
            //                n0++;
            //            }
            //        }
            //    });
            //}
            //async.each(item,function(item1,callback){
            //    db.readall('hotelmap',{cellid:item1.livecell},function(err,item2){
            //            async.each(item2,function(item3,callback){
            //                 if(item3.hoteltype.indexOf('0')==0)
            //                 {
            //                       n0++;
            //                 }
            //            },function(err){
            //
            //            });
            //        });
            //},function(err,arg){
            //
            //});
            res.render('waishengdetail',{people:item,req:req});
        });

    }
};

exports.zeppelin = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('zeppelin',{req:req});
};

exports.motif = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('motif',{req:req});
};

exports.jinghe = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('jinghe',{req:req});
};

exports.shejiaoquan = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('shejiaoquan',{req:req});
};

exports.jingdianxiangguan = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('jingdianxiangguan',{req:req});
};

exports.yidongxiangguan = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('yidongxiangguan',{req:req});
};

exports.fourg = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('4g',{req:req});
};

exports.dbscan = function(req, res){
    db.readall('dbscan', {}, function (err, item) {
        if(req.session.user==null)
            res.redirect('/login');
        else
            res.render('dbscan',{req:req,circle:item});
    });
};

exports.xingwei = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('xingwei',{req:req});
};

exports.zaixian = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('zaixian',{req:req});
};

exports.guizhou = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('guizhou',{req:req});
};