<?php
// required headers
include_once '../shared/header.php';

// include database and object files
include_once 'database.php';
include_once '../objects/om_journal.php';

Utilities::read('OMJournal', "alarms", $filter = true);
