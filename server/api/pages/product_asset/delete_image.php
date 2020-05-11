<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/product_asset.php';

Utilities::exec('ProductAsset', $method = 'delete_image', $filter = true);
