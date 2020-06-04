<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/folio_setting.php';

Utilities::exec('FolioSetting', $method = 'run_n_override', $filter = true);
