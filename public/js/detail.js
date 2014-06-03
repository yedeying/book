window.onload = function() {

  // initial for search
  (function() {
    var searchBtn = document.querySelector('.btn-search'),
        searchBox = document.querySelector('.search-box'),
        section = document.querySelector('.search-box + section');
    searchBtn.onclick = function() {
      var cla = searchBtn.classList;
      if(cla.contains('active')) {
        searchBox.style.top = '7px';
        section.style.marginTop = '0px';
      } else {
        searchBox.style.top = '61px';
        section.style.marginTop = '54px';
      }
      cla.toggle('active');
    };
  })();

  // initial for tab
  (function() {
    var startX, endX,
        tri = document.querySelector('.triangle'),
        left = document.querySelector('.detail-tab .left'),
        right = document.querySelector('.detail-tab .right'),
        wid = (left.offsetWidth - tri.offsetWidth) / 2,
        brief = document.querySelector('.inner-detail > .brief'),
        comment = document.querySelector('.inner-detail > .comment'),
    tri.style.left = wid + 'px';
    setTimeout(function() {
      tri.classList.add('left-transition');
      clearTimeout();
    }, 1);
    left.onclick = swiptLeft;
    right.onclick = swiptRight;


    /*li.addEventListener('touchstart', start, false);
    li.addEventListener('mousedown', start, false);
    li.addEventListener('touchmove', move, false);
    li.addEventListener('mousemove', move, false);
    li.addEventListener('touchend', end, false);
    li.addEventListener('mouseup', end, false);*/
    function start(e) {
      e.preventDefault();
      e = e.targetTouches ? e.targetTouches[0] : e;
      startX = e.pageX;
    }
    function move(e) {
      e.preventDefault();
      e = e.targetTouches ? e.targetTouches[0] : e;
      endX = e.pageX;
    }
    function end(e) {
      var x = endX - startX;
      if(x < -20) {
        swiptLeft();
      } else if(x > 20) {
        swiptRight();
      }
      e.preventDefault();
    }

    function swiptLeft() {
      wid = (left.offsetWidth - tri.offsetWidth) / 2;
      tri.style.left = wid + 'px';
      brief.style.left = '0';
      comment.style.left = '100%';
    };
    function swiptRight() {
      wid = (left.offsetWidth + tri.offsetWidth) / 2;
      tri.style.left = (document.body.offsetWidth - wid) + 'px';
      brief.style.left = '-100%';
      comment.style.left = '0%';
    }
  })();
};