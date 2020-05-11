<?php
// required headers
include_once '../../shared/pdf_header.php';
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/schedule.php';

Utilities::exec('Schedule', "print_dli", $filter = true);
