// Lightweight client-side router for BlueTEXT
(function(){
	'use strict';

	var routes = {
		'/': function(){ loadPage('index.html'); },
		'/index.html': function(){ loadPage('index.html'); }
		// add more static mappings if you want custom handling, e.g.
		// '/apps/': function(){ loadPage('apps/index.html'); }
	};

	function isInternalLink(a){
		return a.hostname === location.hostname && a.protocol.indexOf('http')===0;
	}

	function loadPage(url){
		// fetch the HTML fragment or full page and inject into <main>
		fetch(url).then(function(r){
			if(!r.ok) throw new Error('fetch failed');
			return r.text();
		}).then(function(html){
			var parser = new DOMParser();
			var doc = parser.parseFromString(html, 'text/html');
			var main = document.querySelector('main');
			if(main){
				var newMain = doc.querySelector('main');
				if(newMain) main.innerHTML = newMain.innerHTML;
				else main.innerHTML = html;
			}
			// re-run includes (header/footer) if necessary
			if(window.runIncludes) window.runIncludes();
		}).catch(function(){
			console.warn('Could not load', url);
		});
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
				if(i>=tryPaths.length) return;
				fetch(tryPaths[i]).then(function(r){
					if(!r.ok) throw new Error('not found');
					return r.text();
				}).then(function(text){
					var parser = new DOMParser();
					var doc = parser.parseFromString(text, 'text/html');
					var main = document.querySelector('main');
					if(main){
						var newMain = doc.querySelector('main');
						main.innerHTML = newMain ? newMain.innerHTML : text;
					}
					if(window.runIncludes) window.runIncludes();
				}).catch(function(){ tryNext(i+1); });
			})(0);
		}
	}

	window.addEventListener('popstate', function(){ routeTo(location.pathname); });
	document.addEventListener('click', handleLinkClick);

	// initial routing on load
	document.addEventListener('DOMContentLoaded', function(){
		routeTo(location.pathname);
	});

})();