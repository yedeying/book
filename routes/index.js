var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {type: 'index'});
});

function renderList(str) {
  var type = str;
  function render(req, res) {
    res.render('list', {type: str});
  }
  return render;
}
router.get('/list', renderList('list'));
router.get('/recommand', renderList('recommand'));
router.get('/special', renderList('special'));
router.get('/hot', renderList('hot'));
router.get('/new', renderList('new'));
router.get('/catagory/:id', function(req, res) {
  res.render('list', {type: 'catagory', id: req.params.id + 1});
});

module.exports = router;
