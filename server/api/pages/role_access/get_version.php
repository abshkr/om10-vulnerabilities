<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/feature.php';

// echo file_get_contents("../../config/FeatureSettings.json");

Utilities::read('Feature', $method = 'get_version', $filter = true);