// Nav toggle and simple lazy-loader
(function(){
  'use strict';
  function toggleNav(){
    var nav = document.getElementById('site-nav');
    if(!nav) return;
    var open = nav.style.display === 'flex' || nav.classList.contains('open');
    if(open){ nav.style.display = ''; nav.classList.remove('open'); }
    else{ nav.style.display = 'flex'; nav.classList.add('open'); }
  }

  document.addEventListener('click', function(e){
    var btn = e.target.closest('#nav-toggle');
    if(btn) { e.preventDefault(); toggleNav(); }
  });

  // Simple lazy images using data-src
  function lazyLoad(){
    var imgs = document.querySelectorAll('img[data-src]');
    imgs.forEach(function(img){
      if(img.dataset.src && img.getBoundingClientRect().top < window.innerHeight + 200){
        img.src = img.dataset.src; delete img.dataset.src;
      }
    });
  }
  window.addEventListener('scroll', lazyLoad);
  window.addEventListener('resize', lazyLoad);
  document.addEventListener('DOMContentLoaded', lazyLoad);
})();
