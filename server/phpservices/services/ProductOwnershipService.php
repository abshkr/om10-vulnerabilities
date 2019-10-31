<?php
require_once(dirname(__FILE__) . '/../classes/ProductOwnership.class.php');

class ProductOwnershipService {
    var $tbl_name = "GUI_BASE_PROD_OWNSHIP";
    
    public function getOwnershipByProdEx($base_code){
        $po = new ProductOwnership();
        $rows = $po->getOwnershipByProdEx($base_code);
        return $rows;
    }
    
    public function getAmountByProd($base_code){
        $po = new ProductOwnership();
        $res = $po->getAmountByProd($base_code);
        return $res;
    }
    
    public function adjustOwnership($quantity, $company, $base_code, $reason, $controlFromOutside = false){
        $po = new ProductOwnership();
        $res = $po->adjustOwnership($quantity, $company, $base_code, $reason, $controlFromOutside = false);
        return $res;
    }    
    
    public function giveAwayOwnership($quantity, $src_cmpy, $dest_cmpy, $base_code){
        $po = new ProductOwnership();
        $res = $po->giveAwayOwnership($quantity, $src_cmpy, $dest_cmpy, $base_code);
        return $res;        
    }
}
?>