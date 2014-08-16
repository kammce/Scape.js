/**
 * The ContentManipulator class manipulates view information and page html
 *
 * @class ContentManipulator
 * @constructor
 * @main
 */
function ContentManipulator() {
	var parent = this;
	this.view_target = "";
	var handleClearView = function(e) {
		parent.clearView();
	}
	var handlePresentView = function(e) {
		console.log('testing');
		parent.presentView();
	}
	var handleSetupDivAjax = function(e) {
		parent.setTargetDivAjax(e.detail.page, e.detail.funct);
	}
	document.addEventListener("clearView", handleClearView);
	document.addEventListener("presentView", handlePresentView);
	document.addEventListener("setTargetDivAjax", handleSetupDivAjax);
}
/**
 * Sets view for the whole application. Must be a <div>
 *
 * @method removeProcedure
 * @for ContentManipulator
 * @param target {String} selector of a single <div> element
 */
ContentManipulator.prototype.setView = function(target) {
	if(objExists(target) && typeof target == "string" && $(target).is( "div" )) {
		this.view_target = target;
		return true;
	} else {
		return false;
	}
};
/**
 * Makes target view transparent (with animation), and empty it's contents.
 *
 * @method clearView
 * @for ContentManipulator
 */
ContentManipulator.prototype.clearView = function() {
	$(this.view_target).animate({ opacity: 0 }, 500, function() {
		$(this).empty();
	});
};
/**
 * Makes target view visible
 *
 * @method clearView
 * @for ContentManipulator
 */
ContentManipulator.prototype.presentView = function() {
	console.log("did you happen too early?");
	$(this.view_target).animate({ opacity: 1 }, 500);
};

/**
 * Fades out one source view and fades in destination view.
 *
 * @method viewSwap
 * @for ContentManipulator
 * @param out {String} selector to an element to fade out.
 * @param in {String} selector to an element to fade in.
 */
ContentManipulator.prototype.viewSwap = function(out, _in) {
	$(out).fadeOut(500);
	$(_in).fadeOut(500, function() {
		$(out).css({"display" : "none"});
		$(_in).fadeIn(500);
	});
};
/**
 * Sets the inner HTML of any destination element to the url of an .html file.
 *
 * @method setContentDivAjax
 * @for ContentManipulator
 * @param destination {String} selector to a single element to set the source HTML to.
 * @param url {String} url to .html file.
 * @param callback {Function} Function to run after html is loaded into destination element.
 */
ContentManipulator.prototype.setContentDivAjax = function(destination, url, callback) {
	$(destination).animate({ opacity: 0 }, 500, function() {
		$.ajax({
		    url: url,
		    cache:false,
			success: function (data) {
				$(parent.view_target).html(data);
				if(objExists(callback)) { callback(); }
			},
			error: function(e) {
				bootbox.alert('Error: '+e);
			},
			async:false
		});
	});
};
/**
 * Sets the inner HTML of the view.
 *
 * @method setContentDivAjax
 * @for ContentManipulator
 * @param url {String} url to .html file.
 * @param callback {Function} function to run after html is loaded into destination element.
 */
ContentManipulator.prototype.setTargetDivAjax = function(url, callback) {
	var parent = this;
	$(this.view_target).animate({ opacity: 0 }, 500, function() {
		$.ajax({
		    url: url,
		    cache: false,
			success: function (data) {
				$(parent.view_target).html(data);
				if(objExists(callback)) { callback(); }
				//autoSetupLayout();
			},
			error: function(e) {
				bootbox.alert('Page: '+url+" could not be loaded");
				console.debug(e);
			},
			async:false
		});
	});
};
/**
 * [PROTOTYPE] Sets the inner HTML of the target element to the html of the .html file found in the url path.
 *
 * @method setContentDivAjax
 * @for ContentManipulator
 * @param url {String} url to .html file.
 * @param callback {Function} function to run after html is loaded into destination element.
 */
ContentManipulator.prototype.setModularDivAjax = function(url, callback) {
	var parent = this;
	$(this.view_target).animate({ opacity: 0 }, 500, function() {
		$.ajax({
			type: 'GET',
			data: "url="+url,
		    url: "server-side/transciever/localizer.php",
		    cache:false,
			success: function (data) {
				$(parent.view_target).html(data);
				if(objExists(callback)) { callback(); }
				//autoSetupLayout();
			},
			error: function(e) {
				bootbox.alert('Error: '+e);
			},
			async:false
		});
	});
};

/**
 * Sets the inner HTML of an element to the destination id.
 *
 * @method setContentDivAjax
 * @for ContentManipulator
 * @param url {String} url to .html file.
 * @param source {String} selector to element holding HTML to be swapped with destination.
 * @param destination {String} selector to element to have it's HTML replaced with source.
 */
ContentManipulator.prototype.swapContentDiv = function(destination, source, callback) {
	$(destination).fadeOut(500, function() {
		$(destination).html($(source).html());
		$(destination).fadeIn(500, function() {
			if(objExists(callback)) { callback(); }
		});
	});
};

/**
 * Sets the inner HTML to a string containing HTML.
 *
 * @method setContentDivAjax
 * @for ContentManipulator
 * @param destination {String} selector to element to have it's HTML replaced with source.
 * @param data {String} containing HTML.
 */
ContentManipulator.prototype.setContentDiv = function(destination, data) {
	$(destination).fadeOut(500, function() {
		$(destination).html(data);
		$(destination).fadeIn(500);
	});
};

/**
 * [PROTOTYPE] Sets the inner html of an element to the destination id based on the text within an <a> tag being pressed. DO NOT USE.
 *
 * @method setContentDivAjax
 * @for ContentManipulator
 * @param destination {String} selector to element to have it's HTML replaced with source.
 * @param source {String} element to source div contianing html.
 */
ContentManipulator.prototype.updateContentDiv = function(destination, source) {
	var getClickedItem, findItemData;
	$(destination).fadeOut(500, function() {
		getClickedItem = source.innerHTML;
		getClickedItem = getClickedItem.replace("&amp;", "&");
		findItemData = document.getElementsByName(getClickedItem+"");
		findItemData = findItemData[0].innerHTML;
		getClickedItem = getClickedItem.replace("&","&amp;");
		$(destination).html("<strong class='title'>"+getClickedItem+"</strong><br><br>"+findItemData);
		$(destination).fadeIn(500);
	});
};

/**
 * Sets input to html of an element.
 *
 * @method setContentDivAjax
 * @for ContentManipulator
 * @param destination {String} input field.
 * @param source {String} element to source div contianing html.
 */
ContentManipulator.prototype.setFormField = function(destination, source) {
	$(destination).html($(source).html());
}