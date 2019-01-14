<?php
class Application_Model_DbTable_SiteConfig extends Zend_Db_Table_Abstract
{
	protected $_name = 'SITE_CONFIG';
	protected $_primary = 'CONFIG_KEY';
    protected $_sequence = false;
}
/*
class Application_Model_DbTable_URBAC_PWD_TRACES extends Zend_Db_Table_Abstract
{
	protected $_name = 'URBAC_PWD_TRACES';
	protected $_primary = 'PWDTRACE_ID';
    protected $_sequence = false;
}
*/
