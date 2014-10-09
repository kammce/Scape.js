#! /bin/bash

echo -e "\e[1m\e[36mCompiling ScapeJS\e[0m"

BOLD="$(tput bold)"
DELL="$(tput cub 100)"
DEFAULT="$(tput sgr 0)"

echo -en "\e[31m$BOLD[=      ] 1/7 'src/generator.js'               $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/generator.js" >> Scape.js

echo -en "\e[31m$BOLD[==     ] 2/7 'src/communicator.js'               $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/ajax-communicator.js" >> Scape.js

echo -en "\e[31m$BOLD[====== ] 6/8 'src/router.js'               $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/router.js" >> Scape.js

echo -e  "\e[31m$BOLD[=======] 7/7 Finishing              $DELL"
java -jar yuicompressor-2.4.7.jar --type js "src/Scape.js" >> Scape.js

mv Scape.js dist/Scape.min.js

echo -e '\e[1m\e[32mDone!\e[0m'
echo -en "$DEFAULT"
