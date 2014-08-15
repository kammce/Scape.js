/**
 * Generate html for the website. Meant for creating multiple items with different attributes.
 *
 * @class Generator
 * @constructor
 * @main
 */
function Generator() {
    /**
     * This array is a map of all of the generator functions. The keys are strings and the values are functions.
     *
     * @property requests
     * @type Array/Map
     */
    this.factory = [];
}
/**
 * Adds a new factory function that can be used for generating HTML
 *
 * @method addFactory
 * @for Generator
 * @param key {String} key associated with generator function
 * @param funct {Function} function that generates html
 * @return {Boolean} if factory add is successful
 */
Generator.prototype.addFactory = function(key, funct) {
    if(typeof funct != "function") {
        return false;
    }
    this.factory[key] = funct;
    return true;
};
/**
 * Runs factory function.
 *
 * @method manifest
 * @for Generator
 * @param key {String} key associated with generator function
 * @param params {Object} parameters for generating HTML.
 * @return {String} returns empty string if key does not exist. Otherwise return string (HTML) resulting from factory.
 */
Generator.prototype.manifest = function(key, params) {
    if(objExists(this.factory[key])) {
        return this.factory[key](params);
    } else {
        console.debug("[GENERATOR] Could not find factory");
        return "";
    }
};