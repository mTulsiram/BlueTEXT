// Lightweight client-side router for BlueTEXT
(function(){
	'use strict';

		var cache = {}; // simple in-memory cache: path -> html string

		var routes = {
			'/': function(){ loadPage('index.html'); },
			'/index.html': function(){ loadPage('index.html'); },
			// explicit common mappings to reduce fetch attempts
			'/apps/': function(){ loadPage('apps/index.html'); },
			'/games/': function(){ loadPage('games/index.html'); },
			'/tools/': function(){ loadPage('tools/index.html'); },
			'/courses/': function(){ loadPage('courses/index.html'); },
			'/blog/': function(){ loadPage('blog/index.html'); },
			'/shop/': function(){ loadPage('shop/index.html'); },
		};

	function isInternalLink(a){
		return a.hostname === location.hostname && a.protocol.indexOf('http')===0;
	}

		function loadPage(url){
			if(cache[url]){
				injectHTML(cache[url]);
				return Promise.resolve(cache[url]);
			}
			return fetch(url).then(function(r){
				if(!r.ok) throw new Error('fetch failed');
				return r.text();
			}).then(function(html){
				cache[url] = html;
				injectHTML(html);
				return html;
			}).catch(function(err){
				console.warn('Could not load', url, err);
			});
		}

		function injectHTML(html){
			var parser = new DOMParser();
			var doc = parser.parseFromString(html, 'text/html');
			var main = document.querySelector('main');
			if(main){
				var newMain = doc.querySelector('main');
				if(newMain) main.innerHTML = newMain.innerHTML;
				else main.innerHTML = html;
			}
			if(window.runIncludes) window.runIncludes();
		}

	function handleLinkClick(e){
		if(e.defaultPrevented) return;
		var a = e.target.closest('a');
		if(!a) return;
		if(!isInternalLink(a)) return; // external
		var href = a.getAttribute('href');
		if(!href || href.indexOf('mailto:')===0 || href.indexOf('tel:')===0) return;
		// allow hash links and files
		if(href.indexOf('#')===0 || href.match(/\.(png|jpg|jpeg|svg|pdf|zip)$/i)) return;

		e.preventDefault();
		var path = new URL(href, location.href).pathname;
		history.pushState({}, '', path);
		routeTo(path);
	}

	function routeTo(path){
		if(routes[path]) routes[path]();
		else{
			// default: try to load the matching file
			// if path ends with '/', try path + 'index.html'
			var tryPaths = [path];
			if(path.endsWith('/')) tryPaths.unshift(path + 'index.html');
			tryPaths.push(path.replace(/\/$/, '') + '.html');
					(function tryNext(i){
						if(i>=tryPaths.length){
							renderNotFound();
							return;
						}
						var p = tryPaths[i];
						if(cache[p]){ injectHTML(cache[p]); return; }
						fetch(p).then(function(r){
							if(!r.ok) throw new Error('not found');
							return r.text();
						}).then(function(text){
							cache[p] = text;
							injectHTML(text);
						}).catch(function(){ tryNext(i+1); });
					})(0);
		}
	}

			function renderNotFound(){
				var main = document.querySelector('main');
				if(main){
					main.innerHTML = '<h2>Page not found</h2><p>The requested page could not be found.</p>';
				}
			}

	window.addEventListener('popstate', function(){ routeTo(location.pathname); });
	document.addEventListener('click', handleLinkClick);

	// initial routing on load
	document.addEventListener('DOMContentLoaded', function(){
		routeTo(location.pathname);
	});

})();