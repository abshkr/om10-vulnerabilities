<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/folio.php';

Utilities::exec('Folio', "save_to_tanks", $filter = true);
