<?php

class Application_Model_DbTable_Tanks extends Zend_Db_Table_Abstract
{
	protected $_name = 'TANKS';
    protected $_primary = array('TANK_CODE', 'TANK_TERMINAL');
    protected $_sequence = false;
}
