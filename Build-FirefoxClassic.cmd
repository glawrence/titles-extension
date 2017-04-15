@ECHO OFF

SET ZIP_DIR="C:\Program Files\7-Zip"
SET EXT_NAME=Titles-Extension.xpi

PUSHD .\FirefoxClassic
%ZIP_DIR%\7z a -r %EXT_NAME% *.*
POPD
MOVE .\FirefoxClassic\%EXT_NAME% .

%ZIP_DIR%\7z a %EXT_NAME% LICENSE

ECHO All done
PAUSE
