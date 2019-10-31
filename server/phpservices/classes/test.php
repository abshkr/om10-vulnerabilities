<?php

require_once(dirname(__FILE__) . '/Companies.class.php');

$a = new CompaniesClass();
$data = $a->getCompanies();
print_r($data);