<?php
// required headers
include_once '../../shared/pdf_header.php';
 
// include database and object files
include_once '../../config/database.php';
include_once '../../objects/movement.php';

Utilities::read('Movement', "view_bol", $filter = true);
// echo "<html><body><embed src='temp0.php' width='100%' height='100%' type='application/pdf'></body></html>";


