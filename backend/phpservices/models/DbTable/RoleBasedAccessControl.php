<?php
require_once(dirname(__FILE__) . '/../../models/DbTable/Personnel.php');

class Application_Model_DbTable_URBAC_ROLES extends Zend_Db_Table_Abstract
{
	protected $_name = 'URBAC_ROLES';
	protected $_primary = 'ROLE_ID';
    protected $_sequence = true;
	protected $_dependentTables = array('Application_Model_DbTable_URBAC_USER_ROLES');
}

class Application_Model_DbTable_URBAC_ROLE_DOMAINS_PRIVILEGES extends Zend_Db_Table_Abstract
{
	protected $_name = 'URBAC_ROLE_DOMAINS_PRIVILEGES';
	protected $_primary = 'ROLE_DMN_PRVLG_ID';
    protected $_sequence = true;
}

class Application_Model_DbTable_URBAC_USER_ROLES extends Zend_Db_Table_Abstract
{
	protected $_name = 'URBAC_USER_ROLES';
	protected $_primary = 'USER_ROLE_ID';
    protected $_sequence = true;

	protected $_referenceMap = array(
		'User_ID' => array(
			'columns'           => 'USER_ID',
            'refTableClass'     => 'Application_Model_DbTable_URBAC_USERS',
            'refColumns'        => 'USER_ID'
        ),
		'Role_ID' => array(
			'columns'           => 'ROLE_ID',
            'refTableClass'     => 'Application_Model_DbTable_URBAC_ROLES',
            'refColumns'        => 'ROLE_ID'
        )
	);
}