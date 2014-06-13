var Page = require('./module/Page');
var page = new Page('index');
page.render(function(err, res) {
  if(err) throw err;
  console.log(res);
});