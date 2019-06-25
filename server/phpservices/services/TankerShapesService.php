<?php
require_once(dirname(__FILE__) . '/../classes/EquipmentTypes.class.php');
require_once(dirname(__FILE__) . '/../classes/TankerShapes.class.php');

class TankerShapesService {
    var $tbl_name = "GUI_TANKER_SHAPES";
	
    // public function getTankerComposition($id, $tanker, $owner, $option )
	// {
        // $tk = new TankerShapesClass();
        // $rows = $tk->getTankerComposition($id, $tanker, $owner, $option );
        // return $rows;
	// }
	
    // public function getEquipmentsByTypeAndOwner($id, $owner, $option)
	// {
        // $tk = new TankerShapesClass();
        // $rows = $tk->getEquipmentsByTypeAndOwner($id, $owner, $option);
        // return $rows;
	// }
	
    // public function getEquipmentsByTypeAndTanker($id, $owner, $tanker, $idx, $option)
	// {
        // $tk = new TankerShapesClass();
        // $rows = $tk->getEquipmentsByTypeAndTanker($id, $owner, $tanker, $idx, $option);
        // return $rows;
	// }
     
    public function getEquipmentShape($tnkr_code){
        $tk = new TankerShapesClass();
        return $tk->getEquipmentShape($tnkr_code);        
    }
}
?>