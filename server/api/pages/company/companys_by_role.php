<?php
// required headers
include_once '../../shared/header.php';

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/company_relation.php';

Utilities::read('CompanyRelation', $method = 'companys_by_role', $filter = true);
