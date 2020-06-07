<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class MovementItem extends CommonClass
{
    protected $TABLE_NAME = 'MOVEMENT_ITEMS';
    
    public $NUMBER_FIELDS = array(
        "MVITM_PROD_QTY",
        "MVITM_QTY_SCHD",
        "MVITM_QTY_MOVE",
        "MVITM_QTY_DELV",
        "MSITM_SPECQTY",
        "MSITM_PRLDQTY",
        "MSITM_PRSTQTY",
        "MSITM_DELVQTY"
    );

    public $BOOLEAN_FIELDS = array(
        
    );

    
}