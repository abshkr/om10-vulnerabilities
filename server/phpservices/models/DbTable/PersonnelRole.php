<?php
class Application_Model_DbTable_PersonnelRole extends Zend_Db_Table_Abstract
{
	protected $_name = 'ROLES_REF';
	protected $_primary = 'ROLE_ID';
    protected $_sequence = false;
}