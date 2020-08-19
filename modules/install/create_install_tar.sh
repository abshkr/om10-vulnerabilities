#!/bin/bash
# NOTE: This is called by the Bamboo build tool to create an install tar.
# Don't modify unnecessarily.

OM_VER=`git describe --dirty --always --tags`

mkdir -p tmp/$OM_VER/frontend/
# Copy required files to frontend/
cp -r client/build/* server/api/ server/amfservices/ server/phpwrapper/ modules/load_bays/en/ modules/load_bays/images/ tmp/$OM_VER/frontend/
# Are these js files are required to be in /var/www/htdocs/? Or frontend?
# cp modules/load_bays/*.js tmp/$OM_VER/
cd tmp/
tar --create --gzip --verbose --owner=omega --group=omega --file $OM_VER.tar.gz $OM_VER/
mv $OM_VER.tar.gz ..
cd ..
rm -rf tmp/