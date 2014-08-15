/**
 * ScapeJS is a super lightweight loose framework used for single page MVC operations.
 * ScapeJS is utilized by all SCE web client projects.
 * Initializes all of the ScapeJS objects.
 *
 * @module ScapeJS
 */

var path = {};
var generator = new Generator(), // utility
	communicator = new AjaxCommunicator(), // utility
	constructor = new Constructor(),	// utility
	maninpulator = new ContentManipulator(), // view
	storage = new Storage(),		// model
	router = new Navigator()		// controller
