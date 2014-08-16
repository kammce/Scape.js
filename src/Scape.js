/**
 * ScapeJS is a super lightweight loose framework used for single page MVC operations.
 * ScapeJS is utilized by all SCE web client projects.
 * Initializes all of the ScapeJS objects.
 *
 * @module ScapeJS
 */

function Scape() {
	this.generator = new Generator(); // utility
	this.communicator = new AjaxCommunicator(); // utility
	this.constructor = new Constructor();	// utility
	this.maninpulator = new ContentManipulator(); // view
	this.storage = new Storage();		// model
	this.router = new Navigator();		// controller
}
