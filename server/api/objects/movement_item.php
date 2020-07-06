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
        "MSITM_DELVQTY",
        "MVITM_MOVE_ID",
        "MVITM_LINE_ID",
        "MVITM_ITEM_ID",
        "MVITM_PERIOD_ID",
        "MVITM_ITEM_KEY",
        "MVITM_TYPE",
        "MVITM_PROD_UNIT",
        "MVITM_RAT_UPTOL",
        "MVITM_QTY_UPTOL",
        "MVITM_UNIT_UPTOL",
        "MVITM_RAT_DNTOL",
        "MVITM_QTY_DNTOL",
        "MVITM_UNIT_DNTOL",
        "MVITM_UNIT_SCHD",
        "MVITM_UNIT_MOVE",
        "MVITM_UNIT_DELV",
        "MVITM_STATUS",
        "MVITM_PACK_SIZE",
        "MVITM_PRICE_TYPE",
        "MVITM_PRICE"
    );

    public $BOOLEAN_FIELDS = array(
        "MVITM_COMPLETED" => 1
    );

    
}