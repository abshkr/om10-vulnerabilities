<?php
require_once(dirname(__FILE__) . '/../classes/BaseProducts.class.php');
require_once(dirname(__FILE__) . '/../classes/Journal.class.php');

class BaseProductsService {
    var $tbl_name = "BASE_PRODS";

    public function count($filter,$order){
        $g = new GlobalClass();
        $rows = $g->count($this->tbl_name,$filter);
        return $rows;
    }    
    
    public function getAll(){
        $g = new GlobalClass();
        $rows = $g->getAll($this->tbl_name);
        return $rows;
    }
    
    public function getPaged($filter,$order,$offset,$tot){
        if($order==null)$order='base_name ASC';
        $g = new GlobalClass();
        $rows = $g->getPaged($this->tbl_name, $offset,$tot,$filter,$order);
        return $rows;
    }    
    
    public function getRecord($code){
        $g = new GlobalClass();
        $rows = $g->getRecord($this->tbl_name,$code);
        return $rows;
    }
    
    public function create($data){
        $bp = new BaseProductsClass();
        $ret = $bp->create($data);
        if ($ret == RETURN_OK)
        {
            $mydb = DB::getInstance();
            $sql="UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
            $mydb->update($sql);
		
			$keys = array ("BASE_CODE"=>($data->base_code));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Base Products", "BASE_PRODS", $keys, $excludes );
			$ins_journal->logOneLine("created a base product successfully");
        }
        return $ret;
    }
    
    public function update($code,$data){
			
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("BASE_CODE"=>($code));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Base Products", "BASE_PRODS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        $g = new GlobalClass();
        $ret = $g->update($this->tbl_name,$code,$data);
        if ($ret == RETURN_OK)
        {
            $mydb = DB::getInstance();
            $sql="UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
            $mydb->update($sql);
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        }
        return $ret;     
    }
    
    public function delete($code){
        $bp = new BaseProductsClass();
        $ret = $bp->delete($code);
        if ($ret == RETURN_OK)
        {
            $mydb = DB::getInstance();
            $sql="UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
            $mydb->update($sql);
		
			$keys = array ("BASE_CODE"=>($code));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Base Products", "BASE_PRODS", $keys, $excludes );
			$del_journal->logOneLine("deleted a base product successfully");
        }
        return $ret;
    }

    public function getProductGroups(){
        $bp = new BaseProductsClass();
        return $bp->getProductGroups();
    }
    
    public function getBaseClasses(){
        $bp = new BaseProductsClass();
        return $bp->getBaseClasses();
    }
    
    public function lookup(){
        $bp = new BaseProductsClass();
        return $bp->lookup();
    }          
}
?>