<?php
require_once(dirname(__FILE__) . '/../classes/Folio.class.php');

class FolioService {
    var $tbl_name = "CLOSEOUTS";
    
    public function count($filter,$order){
        $g = new GlobalClass();
        $rows = $g->count($this->tbl_name,$filter);
        return $rows;
    }

    
    public function getAllFolios($status=0){
        $myFolio = new FolioClass();
        if($status)
        {
                $rows = $myFolio->getAllFoliosByStatus($status);
            
        }
        else {
                $rows = $myFolio->getAllFolios();
     
        }
       
        return $rows;
    }
    
    public function getAllFoliosByDate($dateTime){
        $myFolio = new FolioClass();
        if($dateTime)
        {
                $rows = $myFolio->getAllFoliosByDateTime($dateTime);
            
        }
        else
        {
            return false;
        }
        return $rows;
    }
}
?>