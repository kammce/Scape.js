/**
 * The Router class is the top level controller the guides all other controllers, models and views. When the url hash changes, Router activates and changes the page like a hyperlink, but instead does not actually force a reload of the page, but dynamically loads html into the set view. It also launches the construtor class which is used to construct, fill in and add events to all elements within a page.
 *
 * @class Router
 * @Router
 * @main
 */

function Router() {
	var parent = this;
	/**
	 * Stores JQuery selector for the container for the view
	 *
	 * @property view
	 * @type String
	 */
	this.view = "";
	/**
	 * This variable is a flag to keep multiple routes from happening at once.
	 *
	 * @property allowInterrupt
	 * @type Boolean
	 */
	this.allowInterrupt = true;
	/**
	 * Stores current previous hash in the routing fails. This is used to revert to the previous page.
	 *
	 * @property previousHash
	 * @type String
	 */
	this.previousHash = "";
	/**
	 * Event to be ran after hash has changed and before routing has finished.
	 *
	 * @property routingBegun
	 * @type Function
	 */
	this.routingBegun = function() {};
	/**
	 * Event to be ran after hash has changed and routing hash finished.
	 *
	 * @property routingFinshed
	 * @type Function
	 */
	this.routingFinshed = function() {};
	/**
	 * Stores current hash.
	 *
	 * @property hash
	 * @type String
	 */
	this.hash = "";
	/**
	 * Current page
	 *
	 * @property current_page
	 * @type {String}
	 */
	this.current_page = "";
	/**
	 * This array is a map of all of the procedures in Router. The keys are strings and the values are functions.
	 *
	 * @property procedures
	 * @type Array/Map
	 */
	this.procedures = {};
}
/**
 * The actual method that does all of the routes and routing when the hash changes.
 * This function will not allow itself to be interrupted. It will only change to another hash after it has completed uploading the page, and running the Router procedure for the page. This keeps the website from running the same scripts over and over again for no reason. There is also a potential problem to having this run again before the last route finished. If the second route destructs the view wille the Router is running and assuming that elements exist, events either do not get attached or events get doubled up on.
 * @method route
 * @for Router
 */
Router.prototype.route = function() {
	var hash = this.getHash();
	this.routingBegun(hash);
	/* If allow interrupt is false, stop what you are doing */
	if(!this.allowInterrupt) {
		location.hash =	this.previousHash;
		return;
	}
	/* allow hash to change */
	this.allowInterrupt = false;
	console.debug("[NAVIGATION] hash = " +hash);
	
	if (_.has(this.procedures, hash)) {
		this.procedures[hash]();
	} else {
		console.debug("[SCAPEJS-Router] Could not find procedure for '"+hash+"'");
		this.allowInterrupt = true;
		location.hash = this.otherwise;
	}
	this.allowInterrupt = true;
	this.hash = hash;
	this.routingFinshed(hash);
};
/**
 * Creates a new route to go when the route name and the hash match up (NOTE: this ignores url parameters).
 *
 * @method config
 * @for Router
 * @param key {String} container.
 * @param links {Object} JSON structure of possible urls.
 */
Router.prototype.config = function(container, links) {
	var parent = this;
	this.setView(container);
	// console.debug(links);
	for (var i = links.length - 1; i >= 0; i--) {
		//console.debug(links[i]);
		//console.debug("[links] url="+links[i].url+":: tmpl="+links[i].tmpl+":: js="+links[i].js);
		if(links[i].hasOwnProperty("otherwise")) {
			this.otherwise = links[i].otherwise;
		} else {
			this.defineProcedure(links[i]);
		}
	};
	console.debug(this.procedures);
};
/**
 * Clear all routes.
 *
 * @method clear
 * @for Router
 */
Router.prototype.clear = function() {
	this.procedures = {};
};
/**
 * Attaches Router class from window "hashchange" event listener.
 *
 * @method enableRouting
 * @for Router
 */
Router.prototype.enable = function() {
	var parent = this;
	var nav = function() { parent.route(); }
	window.addEventListener("hashchange", nav, false);
	nav();
};
/**
 * Calls route event to reload page.
 *
 * @method reload
 * @for Router
 */
Router.prototype.reload = function() {
	this.route();
};
/**
 * Detaches Router class from window "hashchange" event listener.
 *
 * @method disableRouting
 * @for Router
 */
Router.prototype.disableRouting = function() {
	window.addEventListener("hashchange", function(){}, false);
};
/**
 * Set routingBegun property
 *
 * @method setRouteBegun
 * @for Router
 */
Router.prototype.setRouteBegun = function(funct) {
	if(_.isFunction(funct)) {
		this.routingBegun = funct;
	} else {
		throw "[ROUTER] setRouteBegun only accepts functions as parameter";
	}
};
/**
 * Set routingFinished property
 *
 * @method setRouteFinished
 * @for Router
 */
Router.prototype.setRouteFinished = function(funct) {
	if(_.isFunction(funct)) {
		this.routingFinshed = funct;
	} else {
		throw "[ROUTER] setRouteFinished only accepts functions as parameter";
	}
};

/**
 * Creates a Router procedure for a given page.
 *
 * @method defineProcedure
 * @for Router
 * @param page {String} key associated with Router function
 * @param funct {Object} function to be run when page is loaded into view.
 */
Router.prototype.defineProcedure = function(link) {
	var parent = this;
	if(!_.isString(link.tmpl)) {
		throw "[SCAPEJS] Could not define procedure, tmpl attribute is not a valid string!";
	}
	if(_.isFunction(link.js)) {
		this.procedures[link.url] = function() {
			//console.log(link.js);
			parent.loadHTML(link.tmpl, link.js);
		}
	} else if(_.isString(link.js)) {
		this.procedures[link.url] = function() {
			console.log("loading html");
			parent.loadHTML(link.tmpl, function() {
				$.getScript(link.js);
			});
		};
	} else {
		throw "[SCAPEJS] Could not define procedure, link.js is not a function nor a string.";
	}
};
/**
 * Delete Router procedure for a given page.
 *
 * @method removeProcedure
 * @for Router
 * @param page {String} key associated with Router function
 */
Router.prototype.removeProcedure = function(page) {
	delete this.procedures[page];
};
/**
 * Clear all procedures.
 *
 * @method clear
 * @for Router
 */
Router.prototype.clear = function() {
	this.procedures = {};
}
/**
 * Sets view for the whole application. Must be a <div>
 *
 * @method removeProcedure
 * @for Router
 * @param target {String} selector of a single <div> element
 */
Router.prototype.setView = function(target) {
	if(_.isString(target) && $(target).is( "div" )) {
		this.view = target;
	} else {
		throw "[SCAPEJS] View selector must be a div";
	}
};
/**
 * Sets the inner HTML of the view.
 *
 * @method loadHTML
 * @for Router
 * @param url {String} url to .html file.
 * @param callback {Function} function to run after html is loaded into destination element.
 */
Router.prototype.loadHTML = function(url, callback) {
	var parent = this;
	$(this.view).animate({ opacity: 0 }, 500, function() {
		$(this).empty();
		$.ajax({
		    url: url,
		    cache: false,
			success: function (ext_html) {
				$(parent.view).html(ext_html);
				if(_.isFunction(callback)) { callback(); }
				$(parent.view).animate({ opacity: 1 }, 500);
			},
			error: function(e) {
				console.debug('Page: '+url+" could not be loaded");
				console.debug(e);
			},
			async:false
		});
	});
};


/**
 * Get a specific url parameter.
 *
 * @method getUrlParameter
 * @for Router
 * @param param {String} parameter to retrieve
 * @return {String} url parameter
 */
Router.prototype.getUrlParameter = function(param) {
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
 * @for Router
 * @param param {String} parameter name
 * @param value {String} parameter's new value
 * @return {Boolean} if it has been found and has been changed, return true.
 */
Router.prototype.changeHashParameter = function(param, value) {
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
 * @for Router
 * @return {String} currrent url hash.
 */
Router.prototype.getHash = function() {
	var hash = location.hash;
	hash = hash.substr(1); // remove the #
	var end = hash.indexOf("?");
	if(end != -1) {
		hash = hash.substr(0, end);
	}
	return hash;
};