/**
 * Created by laoxuanshi on 2016/5/20.
 * 本省人
 */
var db=require('../lib/DBOperation.js');

exports.peoplelist = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        db.readall('benshenguser',{},function(err,item){
            res.render('peoplelist',{req:req,userlist:item});
        });
};

exports.places = function(req, res){
    var top10=[ { lng: 110.424157, lat: 19.773597 ,count:23},
        { lng: 110.534541, lat: 19.647818 ,count:20},
        { lng: 110.434349, lat: 19.890442,count:15 },
        { lng: 110.500743, lat: 19.520943 ,count:10},
        { lng: 110.434541, lat: 19.57353 ,count:8},
        { lng: 110.23914, lat: 19.769243 ,count:7},
        { lng: 110.859262, lat: 19.756724 ,count:5},
        { lng: 110.158112, lat: 19.739304 ,count:3},
        { lng: 110.779384, lat: 19.71317 ,count:2},
        { lng: 110.358112, lat: 19.739304 ,count:1} ];

    top10.sort(function(a,b){return a.lng> b.lng?1:-1;});
    var maplng=(top10[0].lng+top10[9].lng)/2;
    top10.sort(function(a,b){return a.lat> b.lat?1:-1;});
    var maplat=(top10[0].lat+top10[9].lat)/2;
    top10.sort(function(a,b){return a.count< b.count?1:-1;});
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('topplaces',{points:top10,mapcenter:[maplng,maplat],req:req});
};

exports.journal = function(req, res){
    db.read('benshenguser', {userid:req.params.id}, function (err, item) {
        if(req.session.user==null)
            res.redirect('/login');
        else
            res.render('journal',{userdetial:item,req:req});

    });


};

exports.benshengselect = function(req, res){
    if(req.session.user==null)
        res.redirect('/login');
    else
        res.render('benshengselect',{req:req});
};

exports.benshengdetail = function(req, res){
    db.readall('benshengselect',{allcontect:{"$gte":parseInt(req.body.allcontect1),"$lte":parseInt(req.body.allcontect2)},
        incontect:{"$gte":parseInt(req.body.incontect1),"$lte":parseInt(req.body.incontect2)},
        outcontect:{"$gte":parseInt(req.body.outcontect1),"$lte":parseInt(req.body.outcontect2)},
        outtime:{"$gte":parseInt(req.body.outtime1),"$lte":parseInt(req.body.outtime2)},
        leavetime:{"$gte":parseInt(req.body.leavetime1),"$lte":parseInt(req.body.leavetime2)},
        rad:{"$gte":parseInt(req.body.rad1),"$lte":parseInt(req.body.rad2)}},function(err,item){
        //console.log(item.length);
        if(req.session.user==null)
            res.redirect('/login');
        else
            res.render('benshengdetail',{people:item,req:req});
    });
};

