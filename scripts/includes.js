// Client-side include script
// Finds containers with {header} or {footer} placeholders and replaces them
(function(){
  'use strict';

  var parts = [
    { selector: '#header', url: 'components/header.html' },
    { selector: '#footer', url: 'components/footer.html' }
  ];

  function tryFetch(url){
    return fetch(url).then(function(resp){
      if(!resp.ok) throw new Error('fetch failed: '+resp.status);
      return resp.text();
    });
  }

  function inject(){
    parts.forEach(function(p){
      var el = document.querySelector(p.selector);
      if(!el) return;
      // if content already looks like real HTML, skip fetch
      if(/<\w+/.test(el.innerHTML)) return;

      // try multiple relative paths so includes work from subfolders
      var candidates = [p.url, '../'+p.url, '../../'+p.url];
      (function attempt(i){
        if(i>=candidates.length) return; 
        tryFetch(candidates[i]).then(function(html){
          el.innerHTML = html;
        }).catch(function(){
          attempt(i+1);
        });
      })(0);
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', inject);
  } else inject();

  // expose for other scripts (router) to re-run includes after injecting fragments
  try{ window.runIncludes = inject; }catch(e){ /* ignore */ }
})();
