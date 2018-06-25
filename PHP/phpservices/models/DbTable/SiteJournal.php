<?php
class Application_Model_DbTable_SiteJournal extends Zend_Db_Table_Abstract
{
	protected $_name = 'SITE_JOURNAL';
    protected $_sequence = false;
}
class Application_Model_DbTable_JournalMsgTypes extends Zend_Db_Table_Abstract
{
	protected $_name = 'ENUMITEM';
	protected $_primary = 'ENUM_NO';
    protected $_sequence = false;
}