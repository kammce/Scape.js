/**
 * A utility that brokers HTTP requests.
 * Utilizes the SCE Server-Client & Client-Server Data Model protocol v0.1.2014,
 * which helps to prevent CSRF attacks.
 *
 * @class AjaxCommunicator
 * @constructor
 * @main
 */
function AjaxCommunicator() {
	/**
	 * Default error function
	 *
	 * @property default_error_function
	 * @type Object
	 * @static
	 * @final
	 */
	this.default_error_function =  function(e) {
		console.debug('Error: Failed to contact server. Refresh page and try again.');
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
 * Formats a message, using the SCE Client-Server Data Model protocol v0.1.2014
 *		action=<insert action here>&data=<insert [string|json] here>
 * @method format
 * @for AjaxCommunicator
 * @return {String} in Client-Server JSON Structure
 */
AjaxCommunicator.prototype.format = function(action, data)
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
 * @for AjaxCommunicator
 * @return {String} "FAILURE" or pure server response
 */
AjaxCommunicator.prototype.validateResponse = function(response)
{
	console.debug(response);
	if(!_.isUndefined(response) && _.isString(response)) {
		if(response.contains("SERVER:")) {
			response = response.substr(response.indexOf("SERVER:")+"SERVER:".length);
			response = JSON.parse(response);
			if(_.has(response, "token") && _.has(response, "response"))
			{
				var res = response["response"];
				if(res.contains("JSON:")) {
					res = res.substr(res.indexOf("JSON:")+"JSON:".length);
				}
				return res;
			}
		}
	}
	console.debug("invalid server response!");
	return "FAILURE";
};
/**
 * Issues HTTP request to designation.
 * @method send
 * @for AjaxCommunicator
 * @param url {String} path to script.
 * @param success_function {Function} function wrapper for the true success funtion
 * @param message {String} data to be sent to server (MUST BE IN CLIENT-TO-SERVER FORMAT).
 * @param error_function {Function} function wrapper for communication errors.
 * @param async {Boolean} Sets request to be asyncronous or not
 * @param success {Function} Function to run on successful server response
 * @param failure {Function} Function to be run if server responds with "FAILURE" message

 */
AjaxCommunicator.prototype.send = function(url, success_function, message, error_function, async, success, failure) {
	var payload = this.ajax_template;
	var parent = this;
	console.log(message);
	if(_.isUndefined(url)) {
		throw "[AjaxCommunicator] url missing, aborting HTTP REQUEST.";
		return;
	}
	if(_.isUndefined(message)) {
		message = "";
	}
	if(!_.isUndefined(success_function)) {
		payload.success = function(data) {
			data = parent.validateResponse(data);
			success_function(data, success, failure);
			parent.result = data;
		};
	} else {
		throw "[AjaxCommunicator] url missing, aborting HTTP REQUEST.";
		return;
	}
	if(!_.isUndefined(error_function)) {
		payload.error = error_function;
	}
	if(!_.isUndefined(async)) {
		payload.async = async;
	}
	payload.url = url;
	payload.data = message;

	$.ajax(payload);
};
/**
 * Creates a new HTTP request function with a specific action (key), and function.
 * @example
 *  	var io = new AjaxCommunicator();
 *  	io.addRequest("getData", "path/to/script", false);
 *  	io.request("getData", data, function() {
 *  		// on success
 *  	}, function() {
 *  		// on failure
 *  	})
 *
 * @method addRequest
 * @for AjaxCommunicator
 * @param action {String} name of the action that the server should make.
 * @param path {String} path to the script you want to use.
 * @param async=false {Boolean} set request to be asycronous or not.
 * @param done {Function} A wrapper for the success function of the HTTP Request. This function is in adherence to the SCE Server-Client Data Model protocol v0.1.2014. Can be overridden if a different data coming from server is not from SCE. To keep code uniform, it is not advised to override this function and to keep it undefined.
 * @param error {Function} Override the default error function. To keep code uniform, it is not advised to override this function and to keep it undefined.
 */
AjaxCommunicator.prototype.addRequest = function(action, path, async, done, error) {
	var parent = this;
	if(_.isUndefined(done) || !_.isFunction(done)) {
		done = function (data, success, failure) {
			console.log("[AJAX: "+action+"] = "+data);
			if(_.isString(data)) {
				if(data.contains("FAILURE")) {
					if(!_.isUndefined(failure)) {
						data = data.replace(/^FAILURE[:]*/, "");
						failure(data);
					}
				} else {
					if(!_.isUndefined(success)) {
						success(data);
					}
				}
			}
		};
	}
	if(_.isUndefined(async)) { async == false; }
	this.requests[action] = function(data, success, failure) {
		parent.send(path, done, data, error, async, success, failure);
	}
};
/**
 * Issue an HTTP request
 * @example
 *  	var io = new AjaxCommunicator();
 *  	io.addRequest("getData", "path/to/script", false);
 *  	io.request("getData", data, function() {
 *  		// on success
 *  	}, function() {
 *  		// on failure
 *  	});
 *
 * @method addRequest
 * @for AjaxCommunicator
 * @param action {String} name of the action that the server should make.
 * @param data {String|Array|Object} data to be sent to server (gets JSON stringified).
 * @param success {Function} function to run if the server request is successful.
 * @param failure {Function} function to run if server responses with "FAILURE".
 */
AjaxCommunicator.prototype.request = function(action, data, success, failure) {
	if(_.isUndefined(success)) {
		throw "[AjaxCommunicator] All requests need success functions";
		console.error("[AjaxCommunicator] Could not find request");
	}

	if(!_.isUndefined(this.requests[action])) {
		var msg = this.format(action, data);
		this.requests[action](msg, success, failure);
	} else {
		console.debug("[AjaxCommunicator] Could not find request");
		throw "[AjaxCommunicator] Could not find request";
	}
};