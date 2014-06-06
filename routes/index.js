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
function renderList(str) {
  var type = str;
  function render(req, res) {
    var p = new Page('list');
    var id = 1;
    if(req.params && req.params.id) id = req.params.id;
    p.render({type: type, page: id}, function(err, data) {
      if(err) throw err;
      res.render('list', {type: str, data: data, page: id});
    });
  }
  return render;
}

router.get('/list', renderList('list'));
router.get('/recommand', renderList('recommand'));
router.get('/special', renderList('special'));
router.get('/hot', renderList('hot'));
router.get('/new', renderList('new'));
router.get('/list/:id', renderList('list'));
router.get('/recommand/:id', renderList('recommand'));
router.get('/special/:id', renderList('special'));
router.get('/hot/:id', renderList('hot'));
router.get('/new/:id', renderList('new'));

/* GET catagory list page */
function renderCatagoryList(req, res) {
  var p = new Page('catagory');
  p.render({id: req.params.id}, function(err, data) {
    if(err) throw err;
    res.render('catagory', {type: 'catagory'}, data: data);
  });
}
router.get('/catagory/:id', renderCatagoryList);
router.get('/catagory/:id/:page', renderCatagoryList);

/* GET detail page */
router.get('/detail/:id', function(req, res) {
  res.render('detail', {type: 'detail', id: req.params.id});
});

module.exports = router;