#!/bin/bash
# Don't run if the version number isn' set.
if [[ -z "$OM_VER" ]]; then
	echo "Variable \$OM_VER is not set"
	exit 1
fi

mkdir -p tmp/$OM_VER/frontend/
# cp -r frontend/client/build/* frontend/server/api/ amfservices/ phpwrapper/ images/ en/ tmp/frontend/
cp -r frontend/client/build/* frontend/server/api/ amfservices/ phpwrapper/ tmp/$OM_VER/frontend/
cd tmp/
tar --create --gzip --verbose --owner=omega --group=omega --file $OM_VER.tar.gz $OM_VER/
mv $OM_VER.tar.gz ..
cd ..
rm -rf tmp/
