/**
 * Created by laoxuanshi on 2016/5/20.
 */
var db=require('../lib/DBOperation.js');

exports.polygon = function(req, res){
    res.render('polygon',{pol:"",line:[{"startPoint":{"coordinates":[0,0]},"endPoint":{"coordinates":[0,0]}}]});
};

exports.polygon1 = function(req, res){
    var templng=req.body.polygonlng.split(',');
    var templat=req.body.polygonlat.split(',');
    var polygon1=[];
    for(i=0;i<templng.length;i++){
        polygon1.push([parseFloat(templng[i]),parseFloat(templat[i])]);
    }
    polygon1.push([parseFloat(templng[0]),parseFloat(templat[0])]);
    var polygon2 = [polygon1];

    db.readall("test1", {"startPoint": {"$geoWithin": {"$geometry": {"type": "Polygon", "coordinates": polygon2}}}},
        function (err, item) {
            res.render('polygon',{pol:polygon1,line:item});
        });
};

exports.insertRoutes = function (req, res) {
    for (var i = 0; i < 1000; i++) {
        var x1 = Math.random() % 1 + 116;
        var y1 = Math.random() % 1 + 39.5;
        var coordinates1 = [x1, y1];
        var x2 = Math.random() % 1 + 116;//
        var y2 = Math.random() % 1 + 39.5;//
        var coordinates2 = [x2, y2];

        var passingBy = [[i, i], [i + 1, i + 1]];
        db.insert("places", {
            "user": "user" + i,
            "startPoint": {"type": "Point", "coordinates": coordinates1},
            "endPoint": {"type": "Point", "coordinates": coordinates2},
            "passingBy": passingBy
        });
    }
};

exports.createIndex = function (req, res) {
    //db.createIdx("places", {"stopPoint": "2dsphere"}, "stopPointIndex");
    db.createIdx("places", {"startPoint": "2dsphere"}, "startPointIndex");
    db.createIdx("places", {"endPoint": "2dsphere"}, "endPointIndex");
};

exports.polyline = function(req, res){
    res.render('polyline',{});
};

exports.heatmap = function(req, res){
    res.render('heatmap',{});
};

exports.polyline1 = function(req, res){
    db.readall('lfd',{},function(err,item){
        res.render('polyline1',{lj:item});
    });
};

exports.polyline2 = function(req, res){
    db.readall('hbdlj',{},function(err,item){
        res.render('polyline2',{lj:item});
    });
};

