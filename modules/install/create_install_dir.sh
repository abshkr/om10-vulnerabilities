#!/bin/bash
# NOTE: This is called by the Bamboo build tool to create an install tar.
# Don't modify unnecessarily.

# This script creates the initial install dir and populates it with frontend files.
# It is separate from create_install_tar so we can add other projects to the finall install.

OM_VER=`git describe --dirty --always --tags`

mkdir -p tmp/$OM_VER/frontend/
# Copy required files to frontend/
cp -r client/build/* server/api/ server/amfservices/ server/phpwrapper/ modules/load_bays/en/ modules/load_bays/images/ tmp/$OM_VER/frontend/