<?php
// required headers
include_once '../shared/header.php';

// include database and object files
include_once '../objects/cur_session.php';

Utilities::exec('CurSession', "killSessions", $filter = true);
