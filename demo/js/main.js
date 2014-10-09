"use strict";

// console.debug = function () {};

// Use mustache.js style templating
_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g, // {{ insert_var }}
	escape: /\{\{\{(.+?)\}\}\}/g // {{{ escape_var }}}
};

var app = new Scape();
app.router.config("#content",
[
	{
		url: '/home',
		tmpl: 'pages/home.html',
		js: 'js/pages/home.js'
	},
	{
		url: '/home/verify',
		tmpl: 'pages/home.html',
		js: function() {
			alert("Home has been verified!");
		}
	},
	{
		url: '/dashboard',
		tmpl: 'pages/dashboard.html',
		js: 'js/pages/dashboard.js'
	},
	{
		url: '/dashboard/info',
		tmpl: 'pages/info.html',
		js: 'js/pages/info.js'
	},
	{
		url: '/dashboard/stats',
		tmpl: 'pages/info.html',
		js: function() {
			alert("info stats has occured");
		}
	},
	{
		otherwise: '/home'
	}
]);

app.communication.request("server-side/server.php",
	"getName", "",
	function success(data) {
		alert(data);
	},
	function error(e) {
		console.debug(e);
	}
);
app.router.enable();
/* Do what ever else you want after this point */