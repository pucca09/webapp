
var db=require('../lib/DBOperation.js');
var url = require("url");
var qs = require("querystring");
var geo = require('../lib/geo.js');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
var tools = require('./tools.js');

exports.searchMotif = function(req,res){
	if(req.session.user==null)
        res.redirect('/login');
    else{
        var data = qs.parse(url.parse(req.url).query);
        var querylist = [];
        var area = JSON.parse(data.path);
        console.log(data);
        for(i in geo.geoCoordinate){
            
            var pt = new Object();
            pt.lng = geo.geoCoordinate[i][0];
            pt.lat = geo.geoCoordinate[i][1];
            //console.log(pt);
            //var inArea = isInsidePolygon(pt,area);

            if(tools.isInsidePolygon(pt,area)){
                querylist.push(i);
            }
            
        }
        console.log("querylist is "+querylist);
        var resultObj = {bar:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        pie:[
                                {value:1, name:'居住用地'},
                                {value:1, name:'办公用地'},
                                {value:1, name:'商业用地'},
                                {value:1, name:'道路与交通用地'},
                                {value:1, name:'绿地与广场用地'},
                                {value:1, name:'农业用地'}
                            ]
                        };
        var date_ = data.date.replace(/^(\d{4})-(\d{2})-(\d{2})$/,"$1$2$3");
        console.log(date_);
        db.readall('motif_bar',{date:date_,cellID:{$in:querylist}},function(err,item){
            db.readall('motif_pie',{date:date_,cellID:{$in:querylist},period:(data.period.indexOf("{")==-1)?data.period:eval('(' + data.period + ')')},function(err,item2){
                console.log(item);
                console.log(item2);
                //加载条形图
                if(item.length > 0){
                    console.log("更新bar plot")
                    var total = 0.0
                    for(var j=0;j<=item.length;j++){
                        if(typeof(item[j]) !="undefined"){
                            var nums = item[j].count;
                            for(var k=0;k<nums.length;k++){
                            resultObj.bar[k] += nums[k];
                            total += nums[k];
                            }

                        }
                        

                    }
                    console.log(resultObj.bar);
                    console.log(total);
                    // for(var j=0;j<=resultObj.bar.length;j++){
                    //     resultObj.bar[j] = resultObj.bar[j]/total
                    // }
                    // console.log(resultObj.bar)
                    
                }else{
                    console.log("cannot find the result");
                    resultObj.bar =[]
                    

                }
                //加载饼图
                if(item2.length > 0){
                    console.log("更新pie plot")

                    for(var j=0;j<=item2.length;j++){
                        if(typeof(item2[j]) !="undefined"){
                            for(var k=0;k<item2[j].count.length;k++){
                                resultObj.pie[k].value += item2[j].count[k]
                            }
                        }

                    }
                }else{
                    console.log("cannot find the result");
                    resultObj.pie =[]
                    

                }
                var strJson = JSON.stringify(resultObj);
                res.write(strJson);
                res.end();


            });
        
        });
        //res.render("motifResult",{data:[]});
    }
}

exports.motifOfArea = function(req, res) {
	if(req.session.user==null)
        res.redirect('/login');
    else{
    	res.render("motifOfArea",{req:req});
    }
	
}

//执行python read mongoDB 脚本
exports.download = function(req,res){
	if(req.session.user==null)
        res.redirect('/login');
    else{
        exec('python '+path.resolve(__dirname, '../shell/readMongo.py'),function(error,stdout,stderr){
            if(error) {
                console.info('stderr : '+stderr);
            }else{
                var fileName = 'scenicData.txt'
                var filePath = path.resolve(__dirname, '../public/files/scenicData')
                var stats = fs.statSync(filePath); 
                if(stats.isFile()){
                  res.set({
                   'Content-Type': 'application/octet-stream',
                   'Content-Disposition': 'attachment; filename='+fileName,
                   'Content-Length': stats.size
                });
                  fs.createReadStream(filePath).pipe(res);
                }else {
                  res.end(404);
                }
            }
        });
    }
}

exports.drawPolygon = function(req,res){
	if(req.session.user==null)
        res.redirect('/login');
    else{
	res.render("drawPolygon",{req:req});
	}
}
exports.scenicInfo = function(req,res){
	if(req.session.user==null)
        res.redirect('/login');
    else{
        db.readall("scenicInfo",{},function(err,item){
           res.render("scenicInfo",{scenic:item,req:req}); 
        });
        
    }
}
exports.trafficHeat = function(req,res){
	if(req.session.user==null)
        res.redirect('/login');
    else{
        res.render("trafficHeat",{req:req});
    }
}
//判断基站点是否位于指定区域内部
exports.insertScenicArea = function(req,res){
	if(req.session.user==null)
        res.redirect('/login');
    else{
        var data = qs.parse(url.parse(req.url).query);
        
        // console.log(JSON.parse(data.path));
        // console.log(typeof(JSON.parse(data.path)));
        var count = 0;
        db.deletedb('scenicInfo',{scenicID:data.scenicID},function(){console.log("delete success")});
        var area = JSON.parse(data.path);
        for(i in geo.geoCoordinate){
            
            var pt = {};
            pt.lng = geo.geoCoordinate[i][0];
            pt.lat = geo.geoCoordinate[i][1];
            if(tools.isInsidePolygon(pt,area)){
                var scenicClass = (data.scenicClass == "")?"None":data.scenicClass;
                db.insert('scenicInfo',{scenicID:data.scenicID.toString(),scenicName:data.scenicName.toString(),scenicClass:scenicClass.toString(),cell:parseInt(i),cellLng:pt.lng,cellLat:pt.lat});
                count ++;
            }
            
        }
        res.write(count.toString());
        res.end();

	}
}
exports.result = function(req, res) {
	if(req.session.user==null)
        res.redirect('/login');
    else{
        console.log(req.body.destination);
        console.log(req.body.season);
        console.log(req.body.days);
    
        db.readall('routeInfo',{des:(req.body.destination.indexOf("{")==-1)?req.body.destination:eval('(' + req.body.destination + ')'),
            season:(req.body.season.indexOf("{")==-1)?req.body.season:eval('(' + req.body.season + ')'),
            days:(req.body.days== "")?eval("({'$nin':[]})"):req.body.days},function(err,item){
                if(item.length == 0){
                    console.log("cannot find the result");
                    res.render('alert',{req:req});
                }else{
                    res.render('result',{userlist:item,req:req});
                    console.log(item.length);

                }
                
                

            
        });
    }
}

exports.routeDetail = function(req, res) {

        var id = req.query.id;
        console.log(id);
        var ObjectID = require('mongodb').ObjectID;
        var imgStr = "";
        db.read('routeInfo',{"_id":ObjectID(id)},function(err,item){

            if(item){
                res.render('routeDetail',{userlist:item,req:req});
            }else{
                alert("查询为空！")
                res.redirect("travel");
                res.location("travel");
            }
        //res.render('routeDetail',{userlist:item,req:req});
        console.log(item.description);

        }); 
    }

exports.searchCID = function(req,res){
	if(req.session.user==null)
        res.redirect('/login');
    else{
        var sInfo = qs.parse(url.parse(req.url).query).cid;
        console.log(sInfo);
        db.readall('groupInfo',{cid:sInfo},function(err,item){
            var strJson = JSON.stringify(item);
            res.write(strJson);
            res.end();

        });

    }
}
exports.searchUID = function(req,res){
	if(req.session.user==null)
        res.redirect('/login');
    else{
        var sInfo = qs.parse(url.parse(req.url).query).uid;
        console.log(sInfo);
        db.read('groupInfo',{uid:sInfo},function(err,item1){
            db.readall('groupInfo',{cid:item1.cid},function(err,item2){
                var strJson = JSON.stringify(item2);
                res.write(strJson);
                res.end();

            });
        });
    }
}
    
exports.group = function(req,res){
	if(req.session.user==null)
        res.redirect('/login');
    else{
	res.render("groupTourists",{req:req});}
}

exports.planner = function(req,res){
	if(req.session.user==null)
        res.redirect('/login');
    else{
	res.render("planner",{req:req});}
}
    
exports.travel = function(req, res) {
    if(req.session.user==null)
        res.redirect('/login');
    else{
    res.render("travel",{req:req});}
}

exports.personalTravel1 = function(req, res) {
	if(req.session.user==null)
        res.redirect('/login');
    else{
	res.render("personalTravel1",{req:req});}
}
exports.personalTravel2 = function(req, res) {
	if(req.session.user==null)
        res.redirect('/login');
    else{
	res.render("personalTravel2",{req:req});}
}
exports.personalTravel3 = function(req, res) {
	if(req.session.user==null)
        res.redirect('/login');
    else{
	res.render("personalTravel3",{req:req});}
}

   
//好友推荐
exports.friendSearch = function(req, res) {
        var sInfo = qs.parse(url.parse(req.url).query).uid;
        console.log(sInfo);
        db.readall('friends', { userId: sInfo }, function(err, item) {
            var strJson = JSON.stringify(item);
            res.write(strJson);
            res.end();
            // console.log(JSON.stringify(item))
            // res.write("hello");
            // res.end();
            //res.render("userlist",{userlist:item});

        });
        // res.write("hello");
        // res.end();
    } 
exports.recommend = function(req,res){
    if(req.session.user==null)
        res.redirect('/login');
    else{
        res.render("recommend",{req:req});}
}
exports.deepspace = function(req,res){
    if(req.session.user==null)
        res.redirect('/login');
    else{
        res.render("deepspace",{req:req});}
}