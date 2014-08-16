/* === PHASE: Models/Storage === */

var _s = new Scape();


_s.storage.addData("modules");

/* === PHASE: Manipulator === */
_s.maninpulator.setView("#content");

/* === PHASE: navigation	=== */

_s.router.addRoute("", "pages/dashboard.html");
_s.router.addRoute("dashboard", "pages/dashboard.html");
_s.router.addRoute("membership-add", "pages/membership-add.html");
_s.router.addRoute("membership-edit", "pages/membership-edit.html");
_s.router.addRoute("membership-process", "pages/membership-process.html");
_s.router.addRoute("membership-permissions", "pages/membership-permissions.html");
_s.router.addRoute("membership-info", "pages/membership-info.html");

/* === PHASE: Communicator === */

_s.communicator.addRequest("getNewMember", "server-side/Membership-Inquiry.php", false);
_s.communicator.addRequest("addNewMember", "server-side/Membership-Inquiry.php", false);
_s.communicator.addRequest("addMember", "server-side/Membership-Inquiry.php", false);
_s.communicator.addRequest("getMember", "server-side/Membership-Inquiry.php", false);
_s.communicator.addRequest("editMember", "server-side/Membership-Inquiry.php", false);
_s.communicator.addRequest("setPermissions", "server-side/Membership-Inquiry.php", false);
_s.communicator.addRequest("getPermissions", "server-side/Membership-Inquiry.php", false);

/* === PHASE: Storage		=== */

/* === PHASE: Generator 	=== */

_s.generator.addFactory("sidenav", function(params) {
	console.log(params);
	params = params;
	var tpl = [
		'<li>'+
			'<a href="#', /* module name */'">'+
			'<i class="fa fa-', /* icon */'"></i> ',
		 	/* title */'</a>'+
		'</li>'
	];
	var buffer = "";
	for (var i = params.length - 1; i >= 0; i--) {
		var folder = params[i].folder;
		var info = JSON.parse(params[i].data);
		var html = "";
		if(info.navigation.location != "header") {
			html  = tpl[0]+folder;
			html += tpl[1]+info.navigation.icon;
			html += tpl[2]+info.title;
			html += tpl[3];
		}
		buffer += html;
	}
	return buffer;
});

/* === PHASE : Constructor === */
_s.constructor.addProcedure("upload", function() {
	//Do something Here!
});

_s.constructor.loadProcedure("front-page", "js/pages/front-page.js");
_s.constructor.addProcedure("about", function() {
	// Once HTML has been loaded... run this.
});

_s.constructor.setup("upload");

_s.router.enableRouting();

/* Do what ever else you want after this point */