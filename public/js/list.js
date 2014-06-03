window.onload = function() {

  // initial for tablist
  (function() {
    var listIcon = document.querySelector('.tablist-icon');
    var list = document.querySelector('.tablist');
    var lis = document.querySelectorAll('.tablist-item');
    var fa = document.querySelector('.tablist-fa');
    list.style.left = '-' + list.offsetWidth + 'px';
    listIcon.onclick = listOut;
    listIcon.style.top = lis[3].offsetTop + 'px';

    function listOut() {
      listIcon.style.left = list.offsetWidth + 'px';
      listIcon.style.opacity = '.8';
      list.style.left = '0';
      console.log(fa.classList);
      fa.classList.toggle('fa-th-list');
      fa.classList.toggle('fa-angle-left');
      listIcon.onclick = listIn;
    }

    function listIn() {
      listIcon.style.left = '0';
      listIcon.style.opacity = '.5';
      list.style.left = '-' + list.offsetWidth + 'px';
      fa.classList.toggle('fa-th-list');
      fa.classList.toggle('fa-angle-left');
      listIcon.onclick = listOut;
    }
  })();

  // initial for search
  (function() {
    var searchBtn = document.querySelector('.btn-search');
    var searchBox = document.querySelector('.search-box');
    var section = document.querySelector('.search-box + section');
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
};