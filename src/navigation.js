/**
 * The Navigator class is the top level controller the guides all other controllers, models and views. When the url hash changes, Navigator activates and changes the page like a hyperlink, but instead does not actually force a reload of the page, but dynamically loads html into the set view. It also launches the construtor class which is used to construct, fill in and add events to all elements within a page.
 *
 * @class Navigator
 * @constructor
 * @main
 */

function Navigator() {
	this.allowInterrupt = true;
	this.previousHash = "";
	this.routes = [];
	this.currentHash = "";
}
/**
 * The actual method that does all of the navigation and routing when the hash changes.
 * This function will not allow itself to be interrupted. It will only change to another hash after it has completed uploading the page, and running the constructor procedure for the page. This keeps the website from running the same scripts over and over again for no reason. There is also a potential problem to having this run again before the last navi finished. If the second navi destructs the view wille the constructor is running and assuming that elements exist, events either do not get attached or events get doubled up on.
 * @method navi
 * @for Navigator
 */
Navigator.prototype.navi = function() {
	var hash = this.getHash();
	/* If allow interrupt is false, stop what you are doing */
	if(!this.allowInterrupt) {
		location.hash =	this.previous_hash;
		return;
	}
	/* allow hash to change */
	this.allowInterrupt = false;
	console.debug("[NAVIGATION] hash = " +hash);

	if(objExists(this.routes[""+hash])) {
		this.routes[hash]();
		this.previousHash = hash;
	} else {
		console.debug("[NAVIGATION] Could not find route: '"+hash+"'");
	}
	this.allowInterrupt = true;
	this.currentHash = hash;
};
/**
 * Creates a new route to go when the route name and the hash match up (NOTE: this ignores url parameters).
 *
 * @method addRoute
 * @for Navigator
 * @param key {String} key associated with url hash.
 * @param page {Object} url to the page to be viewed.
 * @param funct {Object} overrides default function which runs constructor and manipulator.
 */
Navigator.prototype.addRoute = function(key, page, funct) {
	var parent = this;
	this.routes[key] = function() {
		maninpulator.clearView();
		maninpulator.setTargetDivAjax(page, function() {
			if(objExists(funct)) {
				funct();
			} else {
				constructor.setup(key);
				maninpulator.presentView();
			}
			allowInterrupt = true;
		});
	};
};
/**
 * [PROTOTYPE:] Creates a new route to go when the route name and the hash match up (NOTE: this ignores url parameters). Used for modular website design. DO NOT USE.
 *
 * @method addRoute
 * @for Navigator
 * @param key {String} key associated with url hash.
 * @param page {Object} url to the page to be viewed.
 * @param funct {Object} overrides default function which runs constructor and manipulator.
 */
Navigator.prototype.addModularRoute = function(key, page, funct) {
	this.routes[key] = function() {
		maninpulator.clearView();
		path[key] = "modules/"+key+"/"+storage.get("profile").privilege+"/";
		console.debug(path[key]+"::"+key);
		maninpulator.setModularDivAjax(page, function() {
			// NOTE: The key is also the folder
			if(objExists(funct)) {
				funct();
			} else {
				//constructor.setup(page);
				maninpulator.presentView();
				allowInterrupt = true;
			}
		});
	};
};
/**
 * Delete route.
 *
 * @method removeRoute
 * @for Navigator
 * @param page {String} key associated with route.
 */
Navigator.prototype.removeRoute = function(key) {
	delete this.routes[key];
};
/**
 * Clear all routes.
 *
 * @method clear
 * @for Navigator
 */
Navigator.prototype.clear = function() {
	this.keys = [];
};
/**
 * Attaches Navigator class from window "hashchange" event listener.
 *
 * @method enableRouting
 * @for Navigator
 */
Navigator.prototype.enableRouting = function() {
	var parent = this;
	var nav = function() { parent.navi(); }
	window.addEventListener("hashchange", nav, false);
	nav();
};
/**
 * Calls navi event to reload page.
 *
 * @method reload
 * @for Navigator
 */
Navigator.prototype.reload = function() {
	this.navi();
};
/**
 * Detaches Navigator class from window "hashchange" event listener.
 *
 * @method disableRouting
 * @for Navigator
 */
Navigator.prototype.disableRouting = function() {
	window.addEventListener("hashchange", function(){}, false);
};

/**
 * Get a specific url parameter.
 *
 * @method getUrlParameter
 * @for Navigator
 * @param param {String} parameter to retrieve
 * @return {String} url parameter
 */
Navigator.prototype.getUrlParameter = function(param) {
	var hash = location.hash;
	if(location.hash.indexOf(param) == -1) {
		return "";
	}
	var start = hash.indexOf(param)+param.length+1;
	var end = hash.indexOf("&", start);
	var value = "";
	if(end != -1) {
		value = hash.substr(start, end-start);
	} else {
		value = hash.substr(start);
	}
	return value;
};

/**
 * Get a specific url parameter.
 *
 * @method changeHashParameter
 * @for Navigator
 * @param param {String} parameter name
 * @param value {String} parameter's new value
 * @return {Boolean} if it has been found and has been changed, return true.
 */
Navigator.prototype.changeHashParameter = function(param, value) {
	var hash = location.hash;
	if(location.hash.indexOf(param) == -1) {
		return false;
	}
	//starts right after the equals sign
	var start = hash.indexOf(param)+param.length+1;
	var end = hash.indexOf("&", start);
	var new_hash = "";
	if(end != -1) {
		new_hash = hash.substr(0, start)+value+hash.substr(end);
	} else {
		new_hash = hash.substr(0,start)+value;
	}
	location.hash = new_hash;
	return true;
};

/**
 * Get the current hash.
 *
 * @method getHash
 * @for Navigator
 * @return {String} currrent url hash.
 */
Navigator.prototype.getHash = function() {
	var hash = location.hash;
	hash = hash.substr(1); // remove the #
	var end = hash.indexOf("?");
	if(end != -1) {
		hash = hash.substr(0, end);
	}
	return hash;
};