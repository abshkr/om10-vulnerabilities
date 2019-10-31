<?php

class Application_Model_DbTable_Tankers extends Zend_Db_Table_Abstract
{
	protected $_name = 'TANKERS';
    protected $_primary = 'TNKR_CODE';
    protected $_sequence = false;
}
