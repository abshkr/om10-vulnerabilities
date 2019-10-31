<?php
class Application_Model_DbTable_Http_Session_Trace extends Zend_Db_Table_Abstract
{
	protected $_name = 'HTTP_SESSION_TRACE';
    protected $_primary = 'SESS_ID';
	protected $_sequence = false;
   
}
