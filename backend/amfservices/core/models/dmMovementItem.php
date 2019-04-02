<?php
require_once (__DIR__ . '/../dmModel.php');

/**
 * @author bn
 * @version 1.0
 * @created 26-Feb-2013 3:58:54 PM
 */
class dmMovementItem extends dmModel{

    public function __construct( $params = false ){

        $this->SQLTable = "MOVEMENT_ITEMS";
        $this->dmClass = "dmMovementItem";
        $this->primaryKey = array("MVITM_MOVE_ID", "MVITM_LINE_ID");
        
        $this->dmClass = "dmMovementItem";
        
        parent::__construct($params);
        
    }
    
    public function create( $params = false )
    {
        if($params)
        {
            if(isset($params->payload))
            {
//              if(isset($params->payload->MVITM_KEY) && isset($params->payload->MVITM_NUMBER))
                if(isset($params->payload->MVITM_KEY) )
                {
//                  $sql = "SELECT MV_ID FROM MOVEMENTS where MV_KEY='".$params->payload->MVITM_KEY."' and MV_NUMBER='".$params->payload->MVITM_NUMBER."' ";
                    $sql = "SELECT MV_ID FROM MOVEMENTS where MV_KEY='".$params->payload->MVITM_KEY."' ";
                    if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg) return $chk;

                    // next MV_ID
                    $params->payload->MVITM_MOVE_ID = $chk->data[0]["MV_ID"];
                }
            }
        }
        
        // create an unique key for a nomination item so that it can be identified in bay
        $params->payload->MVITM_ITEM_ID = $params->payload->MVITM_MOVE_ID * 1000 + $params->payload->MVITM_LINE_ID;

        $res = parent::create($params);     
        $sql = "SELECT SUM(NVL(MVITM_PROD_QTY, 0)) PROD_QTY,
                SUM(NVL(MVITM_QTY_SCHD, 0)) SCHED_QTY, 
                SUM(NVL(MVITM_QTY_MOVE, 0)) MOVED_QTY
            FROM MOVEMENT_ITEMS
            WHERE MVITM_MOVE_ID = " . $params->payload->MVITM_MOVE_ID;
        $chk = $this->ctl->query(array("sql" => $sql));
        $mv_status = 3; //MV_FULLY_LOADED
        if ($chk->data[0]["SCHED_QTY"] == 0)
            $mv_status = 0;     //MV_NEW
        else if ($chk->data[0]["MOVED_QTY"] == 0 && 
            $chk->data[0]["SCHED_QTY"] < $chk->data[0]["MOVED_QTY"])
            $mv_status = 1;     //MV_PARTIALLY_SCHEDULED
        else if ($chk->data[0]["MOVED_QTY"] == 0 && 
            $chk->data[0]["SCHED_QTY"] >= $chk->data[0]["MOVED_QTY"])
            $mv_status = 2;     //MV_FULLY_SCHEDULED
        else if ($chk->data[0]["MOVED_QTY"] > 0 && 
            $chk->data[0]["MOVED_QTY"] < $chk->data[0]["PROD_QTY"])
            $mv_status = 7;     //MV_PARTIALLY_LOADED
        else
            $mv_status = 3;     //MV_FULLY_LOADED
        $sql = "UPDATE MOVEMENTS SET MV_STATUS = " . $mv_status . 
            "WHERE MV_ID = " . $params->payload->MVITM_MOVE_ID;
        $this->ctl->query(array("sql" => $sql));

        return $res;
    }

}
?>