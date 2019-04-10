<?php

class Application_Model_DbTable_Companys extends Zend_Db_Table_Abstract
{
	protected $_name = 'COMPANYS';
    protected $_primary = 'CMPY_CODE';
    protected $_sequence = false;
}
