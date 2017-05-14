@ECHO OFF

SET ZIP_DIR="C:\Program Files\7-Zip"
SET EXT_NAME=Titles-Extension.zip

PUSHD .\WebExtension
%ZIP_DIR%\7z a -r %EXT_NAME% *.*
POPD
MOVE .\WebExtension\%EXT_NAME% .

%ZIP_DIR%\7z a %EXT_NAME% LICENSE

ECHO All done
PAUSE
