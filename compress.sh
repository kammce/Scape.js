#! /bin/bash

echo -e "\e[1m\e[36mCompiling ScapeJS\e[0m"

BOLD="$(tput bold)"
DELL="$(tput cub 100)"
DEFAULT="$(tput sgr 0)"

echo -en "\e[31m$BOLD[=       ] 1/8 'src/functions.js'               $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/functions.js" > Scape.js

echo -en "\e[31m$BOLD[==      ] 2/8 'src/generator.js'               $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/generator.js" >> Scape.js

echo -en "\e[31m$BOLD[===     ] 3/8 'src/ajax-communicator.js'               $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/ajax-communicator.js" >> Scape.js

echo -en "\e[31m$BOLD[====    ] 4/8 'src/constructor.js'               $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/constructor.js" >> Scape.js

echo -en "\e[31m$BOLD[=====   ] 5/8 'src/content-manipulator.js'          $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/content-manipulator.js" >> Scape.js

echo -en "\e[31m$BOLD[======  ] 6/8 'src/storage.js'               $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/storage.js" >> Scape.js

echo -en "\e[31m$BOLD[======= ] 7/8 'src/navigation.js'               $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/navigation.js" >> Scape.js

echo -e "\e[31m$BOLD[========] 8/8 Finishing              $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/Scape.js" >> Scape.js

mv Scape.js dist/Scape.min.js

echo -e '\e[1m\e[32mDone!\e[0m'
echo -en "$DEFAULT"