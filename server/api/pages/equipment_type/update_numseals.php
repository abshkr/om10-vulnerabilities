<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/eqpt_type.php';

Utilities::exec('EquipmentType', $method = 'update_compartment_seals', $filter = true);
