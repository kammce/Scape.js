/**
 * A utility that brokers HTTP requests.
 * Utilizes the SCE Server-Client & Client-Server Data Model protocol v0.1.2014,
 * which helps to prevent CSRF attacks.
 *
 * @class Communicator
 * @constructor
 * @main
 */
function Communicator() {
	/**
	 * Default error function
	 *
	 * @property default_error_function
	 * @type Object
	 * @static
	 * @final
	 */
	this.default_error_function =  function(e) {
		console.debug('[SCAPEJS] AJAX error! \n ');
		console.debug(e);
	};
	/**
	 * Stored results from last HTTP Request.
	 *
	 * @property default_error_function
	 * @type Object
	 */
	this.result = "";
	/**
	 * Default Object to be used with JQuery Ajax function
	 *
	 * @property ajax_template
	 * @type Object
	 * @static
	 * @final
	 */
	this.ajax_template = {
		type: 'POST',
		url: undefined,
		data: undefined,
		success: undefined,
		error: this.default_error_function,
		dataType: "text",
		cache: false,
		async:false
	};
	/**
	 * This array is a map of all of the requests created by addRequest. The keys are strings and the values are functions.
	 *
	 * @property requests
	 * @type Array/Map
	 */
	this.requests = [];
}
/**
 * Configures the Communicator class. It is a one 
 * @method config
 * @for Communicator
 * @param setup {Array} Array of structures.
 * @example
	 {
			listener: "path/to/server/listener.php", 
			async: boolean [default=false],
			actions: [
				"",
				 ...
			]
		}
 * @param success_function {Function} function wrapper for the true success funtion
 */
 Communicator.prototype.config = function(setup) {

 }
/**
 * Formats a message, using the SCE Client-Server Data Model protocol v0.1.2014
 *		action=<insert action here>&data=<insert [string|json] here>
 * @method format
 * @for Communicator
 * @return {String} in Client-Server JSON Structure
 */
Communicator.prototype.format = function(action, data)
{
	var msg = "";
	if(!_.isUndefined(action)) {
		msg = "action="+action;
		if(!_.isUndefined(data)) {
			if(_.isString(data)) {
				msg += "&data="+data;
			} else if(_.isObject(data)) {
				msg += "&data="+JSON.stringify(data);
			}
		}
	}
	return msg;
};

/**
 * Validates server response, using the SCE Server-Client Data Model protocol v0.1.2014
 *  	SERVER:{"token": [0-9a-zA-Z]{30}, response: [string|json] }
 * stores token to be sent to server at the next transaction.
 * @method validateResponse
 * @for Communicator
 * @return {String} "FAILURE" or pure server response
 */
Communicator.prototype.validateResponse = function(response)
{
	console.debug(response);
	if(_.isString(response)) {
		console.debug(/SERVER:/.test(response));
		if(/SERVER:/.test(response)) {
			response = response.substr(response.indexOf("SERVER:")+"SERVER:".length);
			response = JSON.parse(response);
			if(_.has(response, "token") && _.has(response, "response"))
			{
				var res = response["response"];
				this.token = response["token"];
				if(/JSON:/.test(res)) {
					res = res.substr(res.indexOf("JSON:")+"JSON:".length);
				}
				return res; // Always a string 
			}
		}
	}
	console.warn("[SCAPEJS RESPONSE VALIDATE] Invalid server response");
	return "FAILURE";
};
/**
 * Issues HTTP request to designation.
 * @method send
 * @for Communicator
 * @param url {String} path to script.
 * @param success_function {Function} function wrapper for the true success funtion
 * @param query {String} data to be sent to server (MUST BE IN CLIENT-TO-SERVER FORMAT).
 * @param error_function {Function} function wrapper for communication errors.
 * @param async {Boolean} Sets request to be asyncronous or not
 * @param success {Function} Function to run on successful server response
 * @param failure {Function} Function to be run if server responds with "FAILURE" query

 */
Communicator.prototype.send = function(url, success_function, query, error_function, async) {
	var parent = this;
	var payload = this.ajax_template;
	
	console.debug("[SCAPEJS SEND] "+query);
	if(_.isUndefined(url)) {
		throw "[ScapeJS Communicator] url missing, aborting HTTP REQUEST.";
		return;
	}
	if(!_.isUndefined(success_function)) {
		payload.success = function(data) {
			data = parent.validateResponse(data);
			success_function(data);
			parent.result = data;
		};
	} else {
		throw "[ScapeJS Communicator] url missing, aborting HTTP REQUEST.";
		return;
	}

	payload.url = url;
	payload.error = (_.isUndefined(error_function)) ? payload.error : error_function;
	payload.async = (_.isUndefined(async)) ? payload.async : async;
	payload.data = (_.isUndefined(query)) ? "" : query;

	$.ajax(payload);
};
/**
 * Issue an HTTP request
 * @example
 *  	var io = new Communicator();
 *  	io.addRequest("getData", "path/to/script", false);
 *  	io.request("getData", data, function() {
 *  		// on success
 *  	}, function() {
 *  		// on failure
 *  	});
 *
 * @method addRequest
 * @for Communicator
 * @param action {String} name of the action that the server should make.
 * @param data {String|Array|Object} data gets stringified and sent to server.
 * @param success {Function} function to run if the server responds.
 */
Communicator.prototype.request = function(url, action, data, success, error, async) {
	var query = this.format(action, data);
	this.send(url, success, query, error, async);
};