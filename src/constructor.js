/**
 * Constructor loads/holds the functions that should be run right after html has been loaded into a view (&lt;div&gt;). The purpose of constructor is to use the data acquired from AjaxCommunicator and stored in the Storage class to add context to the page. The HTML is a blank template and Constructor fills it in. This is also the class that should be used to add events to elements that exist on a single page as well.
 *
 * @class Constructor
 * @constructor
 * @main
 */

function Constructor() {
	var parent = this;
	/**
	 * Current page
	 *
	 * @property current_page
	 * @type {String}
	 */
	this.current_page = "";
	/**
	 * Current parameter sent to page
	 *
	 * @property current_param
	 * @type {String}
	 */
	this.current_param = "";

	/**
	 * This array is a map of all of the procedures in Constructor. The keys are strings and the values are functions.
	 *
	 * @property procedures
	 * @type Array/Map
	 */
	this.procedures = {};
	var setupHandler = function(e) {
		console.log(e.detail.page);
		parent.setup(e.detail.page);
	}
	document.addEventListener("ConstructorSetup", setupHandler);
}

/**
 * Setup process runs constructor function based on the page currently being viewed.
 *
 * @method setup
 * @for Constructor
 * @param page {String} key associated with constructor function
 * @param param {Object} parameters to change how the constructor function constructs the page.
 * @return {Boolean} true if setup was successful
 */
Constructor.prototype.setup = function(page, param) {

	console.log("did you happen too late?");
	if (this.procedures.hasOwnProperty(page)) {
		this.procedures[page](param);
		this.current_page = page;
		this.current_param = param;

		document.dispatchEvent(evt.maninpulator.presentView);
		return true;
	} else {
		console.debug("[CONSTRUCTOR] Could not find procedure '"+page+"'");
		return false;
	}
};
/**
 * Creates a constructor procedure for a given page.
 *
 * @method addProcedure
 * @for Constructor
 * @param page {String} key associated with constructor function
 * @param funct {Object} function to be run when page is loaded into view.
 */
Constructor.prototype.addProcedure = function(page, funct) {
	this.procedures[page] = funct;
};
/**
 * Loads external javascript file as a constructor procedure for a given page.
 *
 * @method loadProcedure
 * @for Constructor
 * @param page {String} key associated with constructor function
 * @param url {String} path to .js that contains function to be run when page is loaded into view. The entire .js file code should be wrapped in
	$(function() {
		// code goes here
	})
 */
Constructor.prototype.loadProcedure = function(page, url) {
	this.procedures[page] = function() {
		var scr = $("script[src='"+url+"']");
		if(scr.length > 0) { src.remove(); }
		var result = $.Deferred(),
	        script = document.createElement("script");
	    script.async = "async";
	    script.type = "text/javascript";
	    // this forces it to never cache
	    script.src = url+"?a="+(new Date()).getTime();
	    script.onload = script.onreadystatechange = function(_, isAbort) {
	        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
	            if (isAbort) {
	                result.reject();
	            }
	            else {
	                result.resolve();
	            }
	        }
	    };
	    script.onerror = function () { result.reject(); };
	    $("head")[0].appendChild(script);
	}
};
/**
 * Delete constructor procedure for a given page.
 *
 * @method removeProcedure
 * @for Constructor
 * @param page {String} key associated with constructor function
 */
Constructor.prototype.removeProcedure = function(page) {
	delete this.procedures[page];
};
/**
 * Clear all procedures.
 *
 * @method clear
 * @for Constructor
 */
Constructor.prototype.clear = function() {
	this.procedures = [];
}
