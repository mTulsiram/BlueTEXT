// Main initialization: set footer year and ensure includes/router run
document.addEventListener('DOMContentLoaded', function(){
	var y = document.getElementById('year');
	if(y) y.textContent = new Date().getFullYear();
	if(window.runIncludes) window.runIncludes();
	if(window.routeTo) window.routeTo(location.pathname);
});