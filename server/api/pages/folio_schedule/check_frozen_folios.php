<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/folio_setting.php';

Utilities::read('FolioSetting', $method = 'check_frozen_folios', $filter = true);