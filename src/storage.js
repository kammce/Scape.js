/**
 * Data modeler to hold complex maps and strutures that the client needs to operate.
 *
 * @class Storage
 * @constructor
 * @main
 */

function Storage() {
	return {
		/**
		 * Structure to hold all data.
		 *
		 * @property cache
		 * @type Object/Structure
		 * @default {
		 *  	dummy: "",
		 *  	profile: {
		 *  		privilege: "client"
		 *  	},
		 * },
		*/
		cache: {
			dummy: "",
			profile: {
				privilege: "client"
			},
		},
		/**
		 * Adds new key value pair to cache
		 *
		 * @property addData
		 * @param key {String} key to go with value
		 * @param value {Mixed} value associeted with key
		 * @type function
		*/
		addData: function(key, value) {
			this.cache[key] = value;
		},
		/**
		 * Return valued stored in cache
		 *
		 * @property cache
		 * @type function
		 * @param key {String} key to retrieve value
		 * @return mixed
		*/
		get: function(key) {
			if(this.cache.hasOwnProperty(key)) {
				return this.cache[key];
			}
			console.error("[STORAGE] key: '"+key+"' does not exist.")
			return undefined;
		},
		/**
		 * Set a value to previously added key
		 *
		 * @property set
		 * @param key {String} key to go with value
		 * @param value {Mixed} set value associeted with key
		 * @type function
		 */
		set: function(key, value) {
			if(!this.cache.hasOwnProperty(key)) {
				console.error("[STORAGE] key: '"+key+"' does not exist.")
				return false;
			}
			this.cache[key] = value;
			return true;
		},
		/**
		 * Set a value to previously added key
		 *
		 * @property clear
		 * @type function
		 */
		clear: function() {
			this.cache = {
				dummy: "",
				profile: {
					privilege: "client"
				},
			};
		}
	};
}