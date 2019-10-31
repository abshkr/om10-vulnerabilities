<?php
class Application_Model_DbTable_Personnel extends Zend_Db_Table_Abstract
{
	protected $_name = 'PERSONNEL';
	protected $_primary = 'PER_CODE';
    protected $_sequence = false;
	protected $_dependentTables = array('Application_Model_DbTable_URBAC_USERS');
}

class Application_Model_DbTable_PERM_OF_AREA extends Zend_Db_Table_Abstract
{
	protected $_name = 'PERM_OF_AREA';
	protected $_primary = array('PERM_PSN', 'PERM_AREA');
    protected $_sequence = false;
}

class Application_Model_DbTable_URBAC_USERS extends Zend_Db_Table_Abstract
{
	protected $_name = 'URBAC_USERS';
	protected $_primary = 'USER_ID';
    protected $_sequence = true;
	protected $_dependentTables = array('Application_Model_DbTable_URBAC_PWD_TRACES');
	
	protected $_referenceMap = array(
		'Per_Code' => array(
			'columns'           => 'USER_CODE',
            'refTableClass'     => 'Application_Model_DbTable_Personnel',
            'refColumns'        => 'PER_CODE'
        )
	);
}

class Application_Model_DbTable_URBAC_PWD_TRACES extends Zend_Db_Table_Abstract
{
	protected $_name = 'URBAC_PWD_TRACES';
	protected $_primary = 'PWDTRACE_ID';
    protected $_sequence = true;

	protected $_referenceMap = array(
		'User_ID' => array(
			'columns'           => 'PWDTRACE_USERID',
            'refTableClass'     => 'Application_Model_DbTable_URBAC_USERS',
            'refColumns'        => 'USER_ID'
        )
	);
}