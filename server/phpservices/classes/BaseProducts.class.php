<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('BASEPRODCLASS')) define('BASEPRODCLASS','BaseProducts.class');

class BaseProductsClass{
    public function create($data){
        if (!$data) return RETURN_FAIL;
        
        $errMsg = '';
        if (!integrityCheck($data, $errMsg, "BASE_PRODS")){
            logMe("Invalid parameter. Error message: " . $errMsg,BASEPRODCLASS);
            return RETURN_FAIL;
        }
        
        $values = getInsertString($data);

        $mydb = DB::getInstance();
        $sql="INSERT INTO BASE_PRODS $values";
        $res = $mydb->insert($sql);
        
        if($res=='Success'){
            $sql1 = "INSERT INTO GENERIC_PROD (GEN_PROD_CODE) VALUES('".$data->base_code."')";
            $res1 = $mydb->insert($sql1);
                        
            $sql2 = "INSERT INTO PRODUCTS (PROD_CODE,PROD_NAME,PROD_CMPY,PROD_CLASS) VALUES('".$data->base_code."','".$data->base_name."','BaSePrOd','".$data->base_code."')";
            $res2 = $mydb->insert($sql2);
            
            $sql3 = "INSERT INTO RATIOS (RATIO_BASE,RATIO_VALUE,RAT_PROD_PRODCMPY,RAT_PROD_PRODCODE) VALUES('".$data->base_code."','1','BaSePrOd','".$data->base_code."')";
            $res3 = $mydb->insert($sql3);
        }
        return $res;
    }
    
    public function delete($code){
        if (!$code) return RETURN_FAIL;
        $mydb = DB::getInstance();        
        
        if(sizeof($mydb->query("SELECT * FROM PRODUCTS WHERE PROD_CODE='$code' AND PROD_CMPY != 'BaSePrOd'"))>0)return RETURN_FAIL; 

        $res1 = 'Success';$res2 = 'Success';$res3 = 'Success';
        if(sizeof($mydb->query("SELECT * FROM RATIOS WHERE RATIO_BASE='$code' AND RAT_PROD_PRODCMPY='BaSePrOd' AND RAT_PROD_PRODCODE='$code'"))>0){
            $sql3 = "DELETE FROM RATIOS WHERE RATIO_BASE='$code' AND RAT_PROD_PRODCMPY='BaSePrOd' AND RAT_PROD_PRODCODE='$code'";
            $res3 = $mydb->delete($sql3, OCI_NO_AUTO_COMMIT);
        }
        if(sizeof($mydb->query("SELECT * FROM PRODUCTS WHERE PROD_CODE='$code' AND PROD_CMPY='BaSePrOd' AND PROD_CLASS='$code'"))>0){
            $sql2 = "DELETE FROM PRODUCTS WHERE PROD_CODE='$code' AND PROD_CMPY='BaSePrOd' AND PROD_CLASS='$code'";
            $res2 = $mydb->delete($sql2, OCI_NO_AUTO_COMMIT);
        }
        if(sizeof($mydb->query("SELECT * FROM GENERIC_PROD WHERE GEN_PROD_CODE='$code'"))>0){
            $sql1 = "DELETE FROM GENERIC_PROD WHERE GEN_PROD_CODE='$code'";
            $res1 = $mydb->delete($sql1, OCI_NO_AUTO_COMMIT);
        }
            
        $res = '';
        if(($res1=='Success')&&($res2=='Success')&&($res3=='Success')){
            $sql = "DELETE FROM BASE_PRODS WHERE BASE_CODE='$code'";
            $res = $mydb->delete($sql);
        }else{
            $mydb->rollback();
        }
        return $res;
    } 
    
/* without any transactional data things may end very very badly.
    public function delete($code){
        if (!$code) return RETURN_FAIL;
        $mydb = DB::getInstance();        
        
        $sql3 = "DELETE FROM RATIOS WHERE RATIO_BASE='$code' AND RAT_PROD_PRODCMPY='BaSePrOd' AND RAT_PROD_PRODCODE='$code'";
        $res3 = $mydb->delete($sql3);

        $sql2 = "DELETE FROM PRODUCTS WHERE PROD_CODE='$code' AND PROD_CMPY='BaSePrOd' AND PROD_CLASS='$code'";
        $res2 = $mydb->delete($sql2);
        
        $sql1 = "DELETE FROM GENERIC_PROD WHERE GEN_PROD_CODE='$code'";
        $res1 = $mydb->delete($sql1);
            
        $res = '';
        if(($res1=='Success')&&($res2=='Success')&&($res3=='Success')){
            $sql = "DELETE FROM BASE_PRODS WHERE BASE_CODE='$code'";
            $res = $mydb->delete($sql);
        }
        return $res;
    } 
  */  



    public function getProductGroups(){
        $mydb = DB::getInstance();
        $sql="SELECT * FROM PRODUCT_GROUP";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'ProductGroup')));
    }
    
    public function getBaseClasses(){
        $mydb = DB::getInstance();
        //$sql="SELECT * FROM BASECLASS where BCLASS_NO>0	order by BCLASS_NO";
        $sql = "
			select 
				bs.BCLASS_NO
				, NVL(bm.BCLASS_NAME, bs.BCLASS_DESC)			as BCLASS_DESC
				, bs.BCLASS_DENS_LO
				, bs.BCLASS_DENS_HI
				, bs.BCLASS_VCF_ALG
				, bs.BCLASS_TEMP_LO
				, bs.BCLASS_TEMP_HI			
			from 
				BASECLASS 			bs
				, BCLASS_TYP		bm
			where 
				bs.BCLASS_NO>0	
				and bs.BCLASS_NO = bm.BCLASS_ID(+)
			order by bs.BCLASS_NO  
		";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'BaseClass')));
    }
    
    public function lookup(){
        $mydb = DB::getInstance();
        $sql="SELECT BASE_CODE,BASE_NAME FROM BASE_PRODS";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'BaseProductsLookup')));
    }      
}
?>
