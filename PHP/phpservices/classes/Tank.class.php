<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('TANKCLASS')) define('TANKCLASS','Tank.class');

class TankClass{
    public function getQuantity(){
        $mydb = DB::getInstance();
        $sql = "SELECT SUM(tank_cor_vol) quantity, tank_base FROM tanks GROUP BY tank_base";
        $rows = $mydb->query($sql);
        return (prepareForAMF($rows, array(0 => 'Tank')));
    }
    
    public function getBaseQuantity($base_code){
        $mydb = DB::getInstance();
        $sql = "SELECT SUM(tank_cor_vol) quantity, tank_base FROM tanks WHERE tank_base='$base_code' GROUP BY tank_base";
        $rows = $mydb->query($sql);
        if (count($rows) != 1) return -1;        
        else return ((integer)$rows[0]->QUANTITY);
    }    
}
?>