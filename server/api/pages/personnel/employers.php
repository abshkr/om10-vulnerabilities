<?php
// required headers
include_once '../../shared/header.php';
include_once '../../objects/company.php';

Utilities::read('Company', "employers", $filter = true);
