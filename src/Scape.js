/**
 * ScapeJS is a super lightweight loose framework used for single page MVC operations.
 * ScapeJS is utilized by all SCE web client projects.
 * Initializes all of the ScapeJS objects.
 *
 * @module ScapeJS
 */

// create the event
var evt = {
	constructor: {
		setup: new CustomEvent('ConstructorSetup', {
			bubbles: false,
			cancelable: true,
			detail: {
				page: undefined,
			}
		})
	},
	maninpulator: {
		clearView: new CustomEvent('clearView', {
			bubbles: false,
			cancelable: true,
		}),
		presentView: new CustomEvent('presentView', {
			bubbles: false,
			cancelable: true,
		}),
		setTargetDivAjax: new CustomEvent('setTargetDivAjax', {
			bubbles: false,
			cancelable: true,
			detail: {
				page: undefined,
				funct: undefined,
			}
		})
	}
}

function Scape() {
	this.generator = new Generator(); // utility
	this.communicator = new AjaxCommunicator(); // utility
	this.constructor = new Constructor();	// utility
	this.maninpulator = new ContentManipulator(); // view
	this.storage = new Storage();		// model
	this.router = new Router();		// controller
}
