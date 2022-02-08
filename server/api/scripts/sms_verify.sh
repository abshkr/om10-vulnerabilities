#!/bin/sh
if [ ! -n "$DOCUMENT_ROOT" ]; then
    DOCUMENT_ROOT=/var/www/htdocs/frontend
fi

python $DOCUMENT_ROOT/api/scripts/sms_verify.py $@
