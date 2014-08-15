(function($) {
    $.fn.extend( {
        limiter: function(limit, elem) {
            $(this).on("keyup focus", function() {
                setCount(this, elem);
            });
            function setCount(src, elem) {
                var chars = src.value.length;
                if (chars > limit) {
                    src.value = src.value.substr(0, limit);
                    chars = limit;
                }
                elem.html( limit - chars );
            }
            setCount($(this)[0], elem);
        }
    });
})(jQuery);

String.prototype.contains = function(search, case_sense) {
	if(case_sense) { search = search.toLowerCase(); this.toLowerCase(); }
	return (this.indexOf(search) != -1);
};
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* check if string is empty */
function isEmpty(str) {
	if(!objExists(str)) { return true; }
	try {
		str = str.replace(/[ ]/g, "");
		if(str == "") { return true; }
		return false;
	} catch(e) {
		return false;
	}
}
function objExists(obj) {
	if(typeof obj != "undefined") {
		if(obj != null) {
			return true;
		}
		return false;
	}
	return false;
}
function emptySet(obj) {
	if(Array.isArray(obj)) {
		if(obj.length == 0) {
			return true;
		}
		return false;
	}
	return false;
}
function urlcheck(str){
  return /^http\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?$/.test(str);
}
/*
	Checks if an email is valid.
	@param str email address string.
*/
function echeck(str) {
    var emailText = str;
    var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (pattern.test(emailText)) {
        return true;
    } else {
        return false;
    }
}
function includes(arr,obj) {
    return (arr.indexOf(obj) != -1);
}
function isBlank(str) {
	if(typeof str == "undefined") {
		return true;
	}
	var n_str = str.trim();
	if(n_str == "") {
		return true;
	} else { return false; }
}

//
// http://thecodeabode.blogspot.com
// @author: Ben Kitzelman
// @license: FreeBSD: (http://opensource.org/licenses/BSD-2-Clause) Do whatever you like with it
// @updated: 03-03-2013
//
var getAcrobatInfo = function() {

	var getBrowserName = function() {
		return this.name = this.name || function() {
		var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";

		if(userAgent.indexOf("chrome") > -1) return "chrome";
		else if(userAgent.indexOf("safari") > -1) return "safari";
		else if(userAgent.indexOf("msie") > -1) return "ie";
		else if(userAgent.indexOf("firefox") > -1) return "firefox";
		return userAgent;
		}();
	};

	var getActiveXObject = function(name) {
		try { return new ActiveXObject(name); } catch(e) {}
	};

	var getNavigatorPlugin = function(name) {
		for(key in navigator.plugins) {
			var plugin = navigator.plugins[key];
			if(plugin.name == name) return plugin;
		}
	};

	var getPDFPlugin = function() {
		return this.plugin = this.plugin || function() {
			if(getBrowserName() == 'ie') {
			//
			// load the activeX control
			// AcroPDF.PDF is used by version 7 and later
			// PDF.PdfCtrl is used by version 6 and earlier
				return getActiveXObject('AcroPDF.PDF') || getActiveXObject('PDF.PdfCtrl');
			}
			else {
				return getNavigatorPlugin('Adobe Acrobat') || getNavigatorPlugin('Chrome PDF Viewer') || getNavigatorPlugin('WebKit built-in PDF');
			}
		}();
	};

	var isAcrobatInstalled = function() {
		return !!getPDFPlugin();
	};

	var getAcrobatVersion = function() {
		try {
			var plugin = getPDFPlugin();

			if(getBrowserName() == 'ie') {
			var versions = plugin.GetVersions().split(',');
			var latest = versions[0].split('=');
			return parseFloat(latest[1]);
		}

		if(plugin.version) return parseInt(plugin.version);
			return plugin.name
		}
		catch(e) {
			return null;
		}
	}

	//
	// The returned object
	//
	return {
		browser: getBrowserName(),
		acrobatExists: isAcrobatInstalled() ? true : false,
		acrobatVersion: getAcrobatVersion()
	};
};

function changeNavTo(hash) {
	$( "ul.nav li" ).each(function( index ) {
		$( this ).removeClass();
	});
	$("ul.nav li a[href^='"+hash+"']").parent().addClass("active");
}
