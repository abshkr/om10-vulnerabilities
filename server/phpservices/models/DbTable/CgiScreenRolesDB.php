<?php
class Application_Model_DbTable_Role_Priv extends Zend_Db_Table_Abstract
{
	protected $_name = 'ROLE_PRIV';
    protected $_primary = array('ROLE_ID', 'CGI_ID');
	protected $_sequence = false;
    protected $_dependentTables = array('Application_Model_DbTable_Scr_Ref');
    
    protected $_referenceMap = array(
		'ScrRefClass' => array(
			'columns'           => 'CGI_ID',
            'refTableClass'     => 'Application_Model_DbTable_Scr_Ref',
            'refColumns'        => 'CGI_ID'
        ),
		'ScrRefRoles' => array(
			'columns'           => 'ROLE_ID',
            'refTableClass'     => 'Application_Model_DbTable_PersonnelRole',
            'refColumns'        => 'ROLE_ID'
        )
	);
}
class Application_Model_DbTable_Scr_Ref extends Zend_Db_Table_Abstract
{
	protected $_name = 'SCR_REF';
	protected $_primary = 'CGI_ID';
    protected $_sequence = false;
	protected $_dependentTables = array('Application_Model_DbTable_Role_Priv');
}

