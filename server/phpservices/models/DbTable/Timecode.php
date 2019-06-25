<?php
class Application_Model_DbTable_Timecode extends Zend_Db_Table_Abstract
{
	protected $_name = 'TIMECODE';
	protected $_primary = 'TCD_TITLE';
    protected $_sequence = false;
}