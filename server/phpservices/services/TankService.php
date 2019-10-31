<?php
require_once(dirname(__FILE__) . '/../classes/Tank.class.php');

class TankService {
    var $tbl_name = "TANKS";

    public function getQuantity(){
        $tk = new TankClass();
        $rows = $tk->getQuantity();
        return $rows;
    }    
    
    public function getBaseQuantity($base_code){
        $tk = new TankClass();
        $res = $tk->getBaseQuantity($base_code);
        return $res;
    }
}
?>