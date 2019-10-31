<?php
class Application_Model_DbTable_BaseClass extends Zend_Db_Table_Abstract
{
	protected $_name = 'BASECLASS';
    protected $_primary = 'BCLASS_NO';
    protected $_sequence = false;
	protected $_dependentTables = array('Application_Model_DbTable_BaseProds');
}

class Application_Model_DbTable_BaseProdGroup extends Zend_Db_Table_Abstract
{
	protected $_name = 'PRODUCT_GROUP';
    protected $_primary = 'PGR_CODE';
	protected $_sequence = false;
    protected $_dependentTables = array('Application_Model_DbTable_BaseProds');
    
    protected $_referenceMap = array(
        'UnitView' => array(
            'columns'           => 'PGR_CODE',
            'refTableClass'     => 'Application_Model_View_Unit',
            'refColumns'        => 'UNIT_ID'
        )
    );
}

class Application_Model_View_Unit extends Zend_Db_Table_Abstract
{
    protected $_name = 'UNIT_SCALE_VW';
    protected $_sequence = false;
    protected $_dependentTables = array('Application_Model_DbTable_BaseProdGroup');
}

class Application_Model_DbTable_BaseProds extends Zend_Db_Table_Abstract
{
	protected $_name = 'BASE_PRODS';
    protected $_primary = 'BASE_CODE';
    protected $_sequence = false;
    
	protected $_referenceMap = array(
		'ProdClass' => array(
			'columns'           => 'BASE_CAT',
            'refTableClass'     => 'Application_Model_DbTable_BaseClass',
            'refColumns'        => 'BCLASS_NO'
        ),
		'ProdGroup' => array(
			'columns'           => 'BASE_PROD_GROUP',
            'refTableClass'     => 'Application_Model_DbTable_BaseProdGroup',
            'refColumns'        => 'PGR_CODE'
        )
	);
}

class Application_Model_DbTable_GENERIC_PROD extends Zend_Db_Table_Abstract
{
    protected $_name = 'GENERIC_PROD';
    protected $_primary = 'GEN_PROD_CODE';
}

class Application_Model_DbTable_PRODUCTS extends Zend_Db_Table_Abstract
{
    protected $_name = 'PRODUCTS';
    protected $_primary =  array('PROD_CODE', 'PROD_CMPY');
}

class Application_Model_DbTable_RATIOS extends Zend_Db_Table_Abstract
{
    protected $_name = 'RATIOS';
    protected $_primary = array('RATIO_BASE', 'RAT_PROD_PRODCODE', 'RAT_PROD_PRODCMPY');
}