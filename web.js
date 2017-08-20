/**
 * Module dependencies.
 */
var webconfig = require('./config.js').config.webconfig;
var path = require('path');
var mm = require('./routes/insertmongodb');
var user = require('./routes/user');
var jingqu = require('./routes/jingqu');
var benshengpeople = require('./routes/benshengpeople');
var waishengpeople = require('./routes/waishengpeople');
var test = require('./routes/test');
var cqq = require('./routes/cqq');
var lyx = require('./routes/lyx');
var express = require("express");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.bodyParser({ uploadDir: './logs' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session({
    secret: "flyserver",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/insert1', mm.insertscenicindex);
app.get('/insert2', mm.insertguishubyday);
app.get('/insert3', mm.insertguishubymonth);
app.get('/insert4', mm.insertguishubysight);
app.get('/insert5', mm.insertsightflow1);
app.get('/insert6', mm.insertsightflow2);
app.get('/insert7', mm.insertprostay);
app.get('/insert8', mm.insertsightline);
app.get('/insert9', mm.insertwaishengselect);
app.get('/insert10', mm.inserthotel);
app.get('/insert11', mm.insertinandout);
app.get('/insert12', mm.insertbenshengselect);
app.get('/insert13', mm.insertmotif);
app.get('/insert14', mm.insertdbscan);
app.get('/insert15', mm.insertlj);
app.get('/insert16', mm.insertlfjs);
app.get('/insert17', mm.createIndex);
app.get('/insert18', mm.insertlfd);

app.get('/login', user.loginweb1);
app.post('/login', user.loginweb2);
app.get('/index', lyx.ensemble);
app.get('/guishubyday', jingqu.guishubyday);
app.get('/guishubymonth', jingqu.guishubymonth);
app.get('/guishubysight', jingqu.guishubysight);
app.get('/sightflow', jingqu.sightflow);
app.get('/traffic', jingqu.traffic);
app.get('/migration', jingqu.migration);
app.get('/sightstay', jingqu.sightstay);
app.get('/inandout', jingqu.inandout);
app.get('/live', jingqu.live);
app.get('/prostay', jingqu.prostay);
app.get('/remen', jingqu.remen);
app.get('/tuijian', jingqu.tuijian);
app.get('/tuijiandetial', jingqu.tuijiandetial);
app.get('/', function(req, res) {
    res.redirect('/login');
});

// updated by lyx on 2017/06/05
app.get('/searchSID', lyx.searchSID);
app.get('/sightdistribute', lyx.distribute);
app.get('/mapmatching', lyx.mapmatching);
app.get('/searchUID', lyx.searchUID);


app.get('/peoplelist', benshengpeople.peoplelist);
app.get('/places', benshengpeople.places);
app.get('/journal/:id', benshengpeople.journal);
app.get('/benshengselect', benshengpeople.benshengselect);
app.post('/benshengdetail', benshengpeople.benshengdetail);

app.get('/waishengselect', waishengpeople.waishengselect);
app.post('/waishengdetail', waishengpeople.waishengdetail);

app.get('/zeppelin', waishengpeople.zeppelin);
app.get('/motif', waishengpeople.motif);
app.get('/jinghe', waishengpeople.jinghe);
app.get('/shejiaoquan', waishengpeople.shejiaoquan);
app.get('/jingdianxiangguan', waishengpeople.jingdianxiangguan);
app.get('/yidongxiangguan', waishengpeople.yidongxiangguan);
app.get('/fourg', waishengpeople.fourg);
app.get('/dbscan', waishengpeople.dbscan);
app.get('/xingwei', waishengpeople.xingwei);
app.get('/zaixian', waishengpeople.zaixian);
app.get('/guizhou', waishengpeople.guizhou);

app.get('/polygon', test.polygon);
app.post('/polygon', test.polygon1);
app.get('/polyline', test.polyline);
app.get('/polyline1', test.polyline1);
app.get('/polyline2', test.polyline2);
app.get('/testInsertRoutes', test.insertRoutes);
app.get('/testIndex', test.createIndex);
app.get('/heatmap', test.heatmap);
// cqq get
app.get('/searchMotif', cqq.searchMotif);
app.get('/motifOfArea', cqq.motifOfArea);
app.get('/trafficHeat', cqq.trafficHeat);
app.get('/travel', cqq.travel);
app.get('/routeDetail', cqq.routeDetail);
app.get('/personalTravel1', cqq.personalTravel1);
app.get('/personalTravel2', cqq.personalTravel2);
app.get('/personalTravel3', cqq.personalTravel3);
app.get('/drawPolygon', cqq.drawPolygon);
app.get('/scenicInfo', cqq.scenicInfo);
app.get('/download', cqq.download);
app.get('/insertScenicArea', cqq.insertScenicArea);
app.get('/friendSearch',cqq.friendSearch);
app.get('/recommend',cqq.recommend);
app.get('/deepspace',cqq.deepspace);
// cqq post
app.post('/result', cqq.result);
app.listen(webconfig.web_port, function() {
    console.log("Express server listening 80");
});