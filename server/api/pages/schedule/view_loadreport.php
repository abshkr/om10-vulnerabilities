<?php
// required headers
include_once '../../shared/pdf_header.php';
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/movement.php';

Utilities::read('Movement', "view_loadreport", $filter = true);
