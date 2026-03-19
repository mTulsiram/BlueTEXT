// Nav toggle and simple lazy-loader
(function(){
  'use strict';
  function toggleNav(){
    const nav = document.getElementById('site-nav');
    if(!nav) return;
    const open = nav.style.display === 'flex' || nav.classList.contains('open');
    if(open){ nav.style.display = ''; nav.classList.remove('open'); }
    else{ nav.style.display = 'flex'; nav.classList.add('open'); }
  }

  document.addEventListener('click', function(e){
    const btn = e.target.closest('#nav-toggle');
    if(btn) { e.preventDefault(); toggleNav(); }
  });
  // search toggle
  document.addEventListener('click', function(e){
    const sbtn = e.target.closest('#search-toggle');
    if(sbtn){
      const wrapper = document.querySelector('.search-compact');
      if(wrapper) wrapper.classList.toggle('open');
    }
  });

  // dropdown toggle
  document.addEventListener('click', function(e){
    const db = e.target.closest('.drop-btn');
    if(db){
      const parent = db.closest('.dropdown');
      if(parent) parent.classList.toggle('open');
      // close other open dropdowns
      document.querySelectorAll('.dropdown').forEach(function(d){ if(d!==parent) d.classList.remove('open'); });
    } else {
      // close dropdowns when clicking outside
      if(!e.target.closest('.dropdown')) document.querySelectorAll('.dropdown').forEach(function(d){ d.classList.remove('open'); });
    }
  });

  // ensure mega menu buttons update aria-expanded
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.drop-btn');
    if(btn){
      const parent = btn.closest('.dropdown');
      const expanded = parent && parent.classList.contains('open');
      try{ btn.setAttribute('aria-expanded', expanded? 'true' : 'false'); }catch(_){}
    }
  });

  // keyboard support for dropdown buttons
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') document.querySelectorAll('.dropdown').forEach(function(d){ d.classList.remove('open'); });
  });

  // dark mode toggle
  function setDark(on){
    if(on) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try{ localStorage.setItem('prefers-dark', on? '1' : '0'); }catch(e){}
  }
  document.addEventListener('click', function(e){
    const d = e.target.closest('#dark-toggle');
    if(d){ const isDark = document.documentElement.classList.contains('dark'); setDark(!isDark); }
  });
  // initialize dark preference
  try{
    const pref = localStorage.getItem('prefers-dark');
    if(pref==='1') setDark(true);
    else if(pref==='0') setDark(false);
    else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setDark(true);
  }catch(e){}

  // Simple lazy images using data-src
  function lazyLoad(){
    const imgs = document.querySelectorAll('img[data-src]');
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
