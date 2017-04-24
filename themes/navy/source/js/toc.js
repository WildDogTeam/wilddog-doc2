(function(){
  'use strict';

  var header = document.getElementById('header');
  var container = document.getElementById('container');
  var toc = document.getElementById('article-toc');
  var headerHeight = header.clientHeight;

  if (!toc) return;

  function updateSidebarPosition(){
    var scrollTop = container.scrollTop;

    if (scrollTop > headerHeight){
      toc.classList.add('fixed');
    } else {
      toc.classList.remove('fixed');
    }
  }

  container.addEventListener('scroll', function(){
    window.requestAnimationFrame(updateSidebarPosition);
  });

  updateSidebarPosition();

})();