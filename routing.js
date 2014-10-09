/* === PHASE: Models/Storage === */

var app = new Scape();

/* === PHASE: navigation	=== */

app.router.config("#content",
[
	{
		url: '/home',
		tmpl: 'pages/home.html',
		js: 'js/pages/home.js'
	},
	{
		url: '/home',
		tmpl: 'pages/home.html',
		js: 'js/pages/home.js'
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

/* Communication */

app.communication.config([
	{
		listener: "server-side/Membership-Inquiry.php", 
		async:false,
		actions: [
			"getNewMember", 
			"addNewMember", 
			"addMember", 
			"getMember", 
			"editMember", 
			"setPermissions", 
			"getPermissions"
		]
	}
]);

app.request("getNewMember", function(data) {}, function(failure) {});
app.router.enable();
/* Do what ever else you want after this point */