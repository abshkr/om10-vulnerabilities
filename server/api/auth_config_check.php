
<?php
header("Access-Control-Allow-Origin: *");

include_once './config/database.php';
include_once './service/site_service.php';

$database = new Database();
$db = $database->getConnection2();
$serv = new SiteService($db);
$config_value = $serv->site_config_value("SITE_LDAP_ENABLED", "N");
$ldap_flag = ($config_value === 'Y' || $config_value === 'y');
$config_value = $serv->site_config_value("SITE_SAML_ENABLED", "N");
$saml_flag = ($config_value === 'Y' || $config_value === 'y');

$auth_configs = array("SITE_LDAP_ENABLED"=>$ldap_flag, "SITE_SAML_ENABLED"=>$saml_flag);
echo json_encode($auth_configs, JSON_PRETTY_PRINT);