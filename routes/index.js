var express = require('express');
var Page = require('../module/Page');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res) {
  var p = new Page('index');
  p.render(function(err, data) {
    if(err) throw err;
    res.render('index', {type: 'index', data: data});
  });
});

/* GET list page */
(function(){
  function renderList(str) {
    var type = str;
    function render(req, res) {
      var p = new Page('list');
      var page = 1;
      if(req.params && req.params.page) page = req.params.page;
      p.render({type: type, page: page}, function(err, data) {
        if(err) throw err;
        res.render('list', {type: str, data: data, page: page});
      });
    }
    return render;
  }

  router.get('/list', renderList('list'));
  router.get('/recommand', renderList('recommand'));
  router.get('/special', renderList('special'));
  router.get('/hot', renderList('hot'));
  router.get('/new', renderList('new'));
  router.get('/list/:page', renderList('list'));
  router.get('/recommand/:page', renderList('recommand'));
  router.get('/special/:page', renderList('special'));
  router.get('/hot/:page', renderList('hot'));
  router.get('/new/:page', renderList('new'));
})();

/* GET catagory list page */
(function(){
  function renderCatagoryList(req, res) {
    var p = new Page('catagory');
    var page = 1;
    var id = 1;
    if(req.params && req.params.id) id = req.params.id;
    if(req.params && req.params.page) page = req.params.page;
    p.render({type: 'catagory', page: page, id: id}, function(err, data) {
      if(err) throw err;
      res.render('list', {type: 'catagory', id: id, data: data, page: page});
    });
  }
  router.get('/catagory/:id', renderCatagoryList);
  router.get('/catagory/:id/:page', renderCatagoryList);
})();

/* GET detail page */
(function(){
  router.get('/detail/:id', function(req, res) {
    var p = new Page('detail');
    var id = 0;
    if(req.params && req.params.id) id = req.params.id;
    p.render({type: 'detail', id: id}, function(err, data) {
      if(err) throw err;
      res.render('detail', {type: 'detail', id: id, data: data});
    });
  });
})();

module.exports = router;