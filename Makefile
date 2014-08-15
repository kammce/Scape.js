# Patterns matching JS files that should be minified. Files with a -min.js
# suffix will be ignored.
JS_FILES = src/Scape.js

# Command to run to execute the YUI Compressor.
YUI_COMPRESSOR = java -jar yuicompressor-2.4.7.jar

# Flags to pass to the YUI Compressor for JS.
YUI_COMPRESSOR_FLAGS = --charset utf-8 --verbose

JS_MINIFIED = $(JS_FILES:.js=-min.js)

# target: minify - Minifies JS.
minify: minify-js

# target: minify-js - Minifies JS.
minify-js: $(JS_FILES) $(JS_MINIFIED)

%-min.js: %.js
	@echo '==> Minifying $<'
	$(YUI_COMPRESSOR) $(YUI_COMPRESSOR_FLAGS) --type js $< >$@
	@echo

# target: clean - Removes minified JS files.
clean:
	rm -f $(JS_MINIFIED)


	# Set the source directory
srcdir = src/

# Create the list of modules paths
modules =	${srcdir}ajax-communicator.js
			${srcdir}constructor.js
			${srcdir}content-manipulator.js
			${srcdir}functions.js
			${srcdir}generator.js
			${srcdir}navigation.js
			${srcdir}Scape.js
			${srcdir}storage.js

# Build full list of files
files = ${modules}

# Set both to be built
all: Scape.tmp.js Scape.min.js

# Combine all of the files into spark-dev.js
Scape.tmp.js: ${files}
	cat > $@ $^

# Compress spark-dev.js into spark.js
Scape.min.js: Scape.tmp.js
	java -jar compiler.jar --js $^ --js_output_file $@