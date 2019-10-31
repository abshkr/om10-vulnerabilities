<?php
// required headers
include_once '../../shared/header.php';
include_once '../../objects/personnel.php';

Utilities::read('Personnel', "areaAccess", $filter = true);
