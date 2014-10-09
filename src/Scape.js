'use strict';
/**
 * ScapeJS is a super lightweight loose framework used for single page MVC operations.
 * ScapeJS is utilized by all SCE web client projects.
 * Initializes all of the ScapeJS objects.
 *
 * @module ScapeJS
 */

function Scape() {
	this.router = new Router();		// client-side
	this.communication = new Communicator(); // server-side
}