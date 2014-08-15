/* === PHASE: Models/Storage === */

storage.addData("modules");

/* === PHASE: Manipulator === */

maninpulator.setView("#content");

/* === PHASE: navigation	=== */

router.addRoute("", "pages/dashboard.html");
router.addRoute("dashboard", "pages/dashboard.html");
router.addRoute("membership-add", "pages/membership-add.html");
router.addRoute("membership-edit", "pages/membership-edit.html");
router.addRoute("membership-process", "pages/membership-process.html");
router.addRoute("membership-permissions", "pages/membership-permissions.html");
router.addRoute("membership-info", "pages/membership-info.html");
//router.addRoute("workshops", "pages/workshops.html");
//router.addRoute("alerts", "pages/alerts.html");
//router.addRoute("pos", "pages/pos.html");

/* === PHASE: Communicator === */

communicator.addRequest("getNewMember", "server-side/Membership-Inquiry.php", false);
communicator.addRequest("addNewMember", "server-side/Membership-Inquiry.php", false);
communicator.addRequest("addMember", "server-side/Membership-Inquiry.php", false);
communicator.addRequest("getMember", "server-side/Membership-Inquiry.php", false);
communicator.addRequest("editMember", "server-side/Membership-Inquiry.php", false);
communicator.addRequest("setPermissions", "server-side/Membership-Inquiry.php", false);
communicator.addRequest("getPermissions", "server-side/Membership-Inquiry.php", false);

/*communicator.addRequest("getModules", "server-side/transciever/modules.php", false);

communicator.request("getModules", "", function(data) {
	data = JSON.parse(data);
	storage.set("modules", data);
}, function() {
	bootbox.alert("No modules/services found. You are out of luck man!");
});*/

/* === PHASE: Storage		=== */

/* === PHASE: Generator 	=== */

//generator.addFactory("sidenav", function(params) {
//	console.log(params);
//	params = params;
//	var tpl = [
//		'<li>'+
//			'<a href="#', /* module name */'">'+
//			'<i class="fa fa-', /* icon */'"></i> ',
//		 	/* title */'</a>'+
//		'</li>'
//	];
//	var buffer = "";
//	for (var i = params.length - 1; i >= 0; i--) {
//		var folder = params[i].folder;
//		var info = JSON.parse(params[i].data);
//		var html = "";
//		if(info.navigation.location != "header") {
//			html  = tpl[0]+folder;
//			html += tpl[1]+info.navigation.icon;
//			html += tpl[2]+info.title;
//			html += tpl[3];
//		}
//		buffer += html;
//	}
//	return buffer;
//});

/* === PHASE : Constructor === */
constructor.addProcedure("upload", function() {
	var priv = $.cookie('priv');
	if(objExists(priv)) {
		if(priv == "admin") {
			$("#priv-text").html("client");
		} else {
			$("#priv-text").html("admin");
		}
	} else {
		$.cookie('priv', 'client');
		priv = 'client';
	}
	/*
	var modules = storage.get("modules") || {};
	console.debug(modules);

	$("ul#side-nav").html('<li class="active"><a href="#dashboard"><i class="fa fa-dashboard"></i> Dashboard</a></li>');
	$("ul#side-nav").append(generator.manifest("sidenav", modules));

	for (var i = modules.length - 1; i >= 0; i--) {
		var folder = modules[i].folder;
		var info = JSON.parse(modules[i].data);

		//var profilepriv = storage.get("profile").privilege;
		var path = "modules/"+folder+"/"+info.privileges[priv];
		console.log(path);
		router.addModularRoute(modules[i].folder, path);
	}
	*/
});

constructor.loadProcedure("dashboard", "js/pages/dashboard.js");
constructor.loadProcedure("membership-add", "js/pages/membership-add.js");
constructor.loadProcedure("membership-edit", "js/pages/membership-edit.js");
constructor.loadProcedure("membership-permissions", "js/pages/membership-permissions.js");
constructor.loadProcedure("membership-info", "js/pages/membership-info.js");

/*function() {
	$("table").tablesorter({debug: true});
	//do something here!
});*/
constructor.addProcedure("workshops", function() {
	//do something here!
});
constructor.addProcedure("alerts", function() {
	//do something here!
});
constructor.addProcedure("pos", function() {
	//do something here!
});

/* === PHASE: Events === */

$("#toggle-priv").on("click", function() {
	if($.cookie('priv') ==  "admin") {
		$.cookie('priv', 'client');
	} else {
		$.cookie('priv', 'admin')
	}
	constructor.setup("upload");
});

constructor.setup("upload");

router.enableRouting();