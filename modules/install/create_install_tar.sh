#!/bin/bash
# NOTE: This is called by the Bamboo build tool to create an install tar.
# Don't modify unnecessarily.

OM_VER=`git describe --dirty --always --tags`

mkdir -p tmp/$OM_VER/frontend/
# cp -r client/build/* server/api/ server/amfservices/ server/phpwrapper/ images/ en/ tmp/$OM_VER/frontend/
cp -r client/build/* server/api/ server/amfservices/ server/phpwrapper/ tmp/$OM_VER/frontend/
cd tmp/
tar --create --gzip --verbose --owner=omega --group=omega --file $OM_VER.tar.gz $OM_VER/
mv $OM_VER.tar.gz ..
cd ..
rm -rf tmp/