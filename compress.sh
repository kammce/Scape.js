#! /bin/bash

echo -e "Compiling ScapeJS"

echo "[=  ] 2/3 'src/router.js'"
java -jar yuicompressor-2.4.7.jar --type js "src/router.js" >> Scape.js

echo "[== ] 1/3 'src/communicator.js'"
java -jar yuicompressor-2.4.7.jar --type js "src/communicator.js" >> Scape.js

echo "[===] 3/3 Finishing"
java -jar yuicompressor-2.4.7.jar --type js "src/Scape.js" >> Scape.js

mv Scape.js dist/Scape.min.js

echo 'Done!'
