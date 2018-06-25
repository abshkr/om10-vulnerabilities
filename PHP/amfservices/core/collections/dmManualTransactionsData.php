<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmManualTransactionData.php");

/**
 * @author jz
 * @version 1.0
 * @created 15-10-2013 10:09:50 AM
 */

class dmManualTransactionsData extends dmCollection{

    /*
    private function __construct(){
        $a = func_get_args();
        $i = func_num_args();
        if (method_exists($this, $f='__construct'.$i)) {
            call_user_func_array(array($this,$f), $a);
        } 
    }
    */
    /**
     * @param string $params
     */
    public function __construct( $params = false ){

        $this->SQLTable = "MOVEMENTS";                          //the table/view this collection maps to.
        $this->model = "dmManualTransactionData";                   //the model that this collection should consist of.
        $this->dmClass = "dmManualTransactionsData";                //the class name for Middleware/Front end integration.

        //required data;
        $this->suppliers          = array();
        $this->trips              = array();
        $this->openorders         = array();
        $this->nomiitems          = array();
        $this->carriers           = array();
        $this->tankers            = array();
        $this->operators          = array();
        $this->arms               = array();
        $this->equipments         = array();
        $this->compartments       = array();
        $this->drawers            = array();
        $this->productscontainer  = array();
        $this->products           = array();
        $this->productsrecipe     = array();
        $this->metercodes         = array();
        $this->metertypes         = array();
        $this->tankcodes          = array();
        $this->baseproducts       = array();
        $this->baseproductclasses = array();

        parent::__construct($params);
        
        //$this->gather();
        ////$this->getData($params);

    }

    public function getInstance($params = false)
    {
        new dmError(array("dev" => "getInstance in dmManualTransactionsData "));
		
		$mtObj = new dmManualTransactionsData($params);
		$json_flag=1;
        $objData = (json_encode($mtObj));
		if ( $objData === FALSE )
		{
			$zip_on=0;
			$json_flag=0;
        	$objData = $mtObj;
		}
		else
		{
			$zip_mthd="zlib";
			$zip_on=0;
			$org_len = strlen($objData);
			if ( $zip_on == 1 )
			{
				// Do compressing, return compressed string or FALSE if an error occurred. 
				$compress_data = gzcompress($objData, 9);
				//$compress_data = zlib_encode($objData, 15);
				if ( $compress_data === FALSE )
				{
					// no change of data, return JSON string
					$zip_on=0;
				}
				else
				{
					// The compressed data must be binary format, need to encode before transfering online
					$zip_len = strlen($compress_data);
					// Do encoding, return the encoded data as a string or FALSE on failure
					$encode_data = base64_encode( $compress_data );
					if ( $encode_data === FALSE )
					{
						// no change of data, return JSON string
						$zip_on=0;
					}
					else
					{
						// Compress and encode successfully, return new data
						$objData = $encode_data;
						$enc_len = strlen($encode_data);
					}
				}
			}
		}
		
        return new dmMesg(array("data" => $objData, "json_on"=>$json_flag, "zip_on"=>$zip_on, "zip_mthd"=>$zip_mthd, "org_len"=>$org_len, "zip_len"=>$zip_len, "enc_len"=>$enc_len ));
		
        //return new dmMesg(array("data" => $objData, "json_on"=>$json_flag ));

        //return new dmMesg(array("data" => new dmManualTransactionsData($params)));
    }

    public function getInstance2($params = false)
    {
        new dmError(array("dev" => "getInstance in dmManualTransactionsData "));

        return new dmMesg(array("data" => new dmManualTransactionsData($params)));
    }

 
    /**
     * (non-PHPdoc)
     * @see dmCollection::getData()
     */
    public function getData( $params = false )
    {
        //-------------------------
        // SQL to get all supplier data
        $sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,2)<>0 ORDER BY CMPY_NAME ASC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->suppliers = $chk->data;

        // SQL to get all trip data
        /* To improve the loading speed
        $sql = "SELECT SHLS_TRIP_NO FROM SCHEDULE WHERE STATS IN ('F','A') OR STATS IS NULL ORDER BY SHLS_CALDATE DESC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->trips = $chk->data;
        */

        // SQL to get all open order data
        /* To improve the loading speed
        $sql = "
select C.CUST_SUPP, CO.ORDER_NO
from CUSTOMER C,
CUST_ORDER CO
where C.CUST_ACCT = CO.ORDER_CUST
order by C.CUST_SUPP, CO.ORDER_NO desc
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->openorders = $chk->data;
        */

        // SQL to get all nomination item data
        /* To improve the loading speed
        $sql = "
select MV.MV_SUPPLIER, MVI.MVITM_ITEM_ID
from MOVEMENTS MV,
MOVEMENT_ITEMS MVI
where MV.MV_ID = MVI.MVITM_MOVE_ID
order by MV.MV_SUPPLIER, MVI.MVITM_ITEM_ID desc
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->nomiitems = $chk->data;
        */

        // SQL to get all carrier data
        /* To improve the loading speed
        $sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,4)<>0 ORDER BY CMPY_NAME ASC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->carriers = $chk->data;
        */

        // SQL to get all tanker data
        /* To improve the loading speed
        $sql = "
                SELECT gui_tnkr2.TNKR_CODE as TNKR_CODE, gui_tnkr2.TNKR_EQPT_NAME as TNKR_EQPT_NAME, gui_tnkr2.TNKR_CARRIER_NAME as TNKR_CARRIER_NAME 
                FROM 
                    (
SELECT tnkr.TNKR_CODE             AS TNKR_CODE ,
    tnkr.TNKR_NAME                  AS TNKR_NAME ,
    tnkr.TNKR_CARRIER               AS TNKR_CARRIER ,
    carr.CMPY_NAME                  AS TNKR_CARRIER_NAME ,
    tnkr.TNKR_OWNER                 AS TNKR_OWNER ,
    mngr.CMPY_NAME                  AS TNKR_OWNER_NAME ,
    tnkr.TNKR_ETP                   AS TNKR_ETP ,
    etyp.ETYP_TITLE                 AS TNKR_EQPT_NAME ,
    tnkr.TNKR_BASE_SITE             AS TNKR_BASE_SITE ,
    base.TERM_NAME                  AS TNKR_BASE_SITE_NAME ,
    tnkr.TNKR_DEST_DEPOT            AS TNKR_DEST_DEPOT ,
    dest.TERM_NAME                  AS TNKR_DEST_DEPOT_NAME ,
    tnkr.TNKR_LAST_DEPOT            AS TNKR_LAST_DEPOT ,
    prev.TERM_NAME                  AS TNKR_LAST_DEPOT_NAME ,
    tnkr.TNKR_CUR_DEPOT             AS TNKR_CUR_DEPOT ,
    curr.TERM_NAME                  AS TNKR_CUR_DEPOT_NAME ,
    tnkr.TNKR_PIN                   AS TNKR_PIN ,
    NVL(tnkr.TNKR_LOCK, 'N')        AS TNKR_LOCK ,
    NVL(tnkr.TNKR_ACTIVE, 'N')      AS TNKR_ACTIVE ,
    NVL(tnkr.TNKR_BAY_LOOP_CH, 'N') AS TNKR_BAY_LOOP_CH ,
    NVL(tnkr.TNKR_ARCHIVE, 'N')     AS TNKR_ARCHIVE ,
    tnkr.TNKR_NTRIPS                AS TNKR_NTRIPS ,
    tnkr.TNKR_OWN_TXT               AS TNKR_OWN_TXT ,
    tnkr.TNKR_LIC_EXP               AS TNKR_LIC_EXP ,
    tnkr.TNKR_DGLIC_EXP             AS TNKR_DGLIC_EXP ,
    tnkr.TNKR_INS_EXP               AS TNKR_INS_EXP ,
    tnkr.STATS                      AS TNKR_STATS ,
    tnkr.LAST_TRIP                  AS TNKR_LAST_TRIP ,
    tnkr.TNKR_MAX_KG                AS TNKR_MAX_KG
  FROM TANKERS tnkr ,
    EQUIP_TYPES etyp ,
    COMPANYS carr ,
    COMPANYS mngr ,
    TERMINAL base ,
    TERMINAL dest ,
    TERMINAL prev ,
    TERMINAL curr
  WHERE tnkr.TNKR_ETP                                  = etyp.ETYP_ID(+)
  AND tnkr.TNKR_CARRIER                              = carr.CMPY_CODE(+)
  AND tnkr.TNKR_OWNER                                = mngr.CMPY_CODE(+)
  AND tnkr.TNKR_BASE_SITE                            = base.TERM_CODE(+)
  AND tnkr.TNKR_DEST_DEPOT                           = dest.TERM_CODE(+)
  AND tnkr.TNKR_LAST_DEPOT                           = prev.TERM_CODE(+)
  AND tnkr.TNKR_CUR_DEPOT                            = curr.TERM_CODE(+) 
                    ) gui_tnkr2 
                order by gui_tnkr2.tnkr_code
            ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->tankers = $chk->data;
        */

        // SQL to get all user data(driver:7/Loader:9/Contractor:8)
        /* To improve the loading speed
        $sql = "SELECT * FROM PERSONNEL WHERE PER_AUTH IN (7,8,9)";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->operators = $chk->data;
        */

        // SQL to get all arm code
        //$sql = "SELECT DISTINCT BAA_CODE FROM BA_ARMS ORDER BY BAA_CODE ASC";
        $sql = "
select distinct R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_BAYCODE, B.STREAM_ARMCODE, B.STREAM_BASECODE, B.STREAM_TANKCODE, B.STREAM_TANKDEN
from 
RATIOS R,
GUI_PIPENODE B
where B.STREAM_BASECODE = R.RATIO_BASE(+)
order by R.RAT_PROD_PRODCMPY, B.STREAM_ARMCODE
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->arms = $chk->data;

        // SQL to get all equipment data
        /* To improve the loading speed
        $sql = "SELECT DISTINCT EQPT_CODE FROM TNKR_EQUIP_CMPT_DET_VW ORDER BY EQPT_CODE ASC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->equipments = $chk->data;
        */

        // SQL to get all compartment data
        /* To improve the loading speed
        $sql = "SELECT DISTINCT TNKR_CMPT FROM TNKR_EQUIP_CMPT_DET_VW ORDER BY TNKR_CMPT ASC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->compartments = $chk->data;
        */

        // SQL to get all drawer data
        $sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,16)<>0 ORDER BY CMPY_NAME ASC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->drawers = $chk->data;

        // SQL to get all drawer products data
        $sql = "SELECT PROD_CODE,PROD_NAME,PROD_CMPY FROM PRODUCTS ORDER BY PROD_CODE";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->productscontainer = $chk->data;

        // SQL to get all drawer products data
        //$sql = "SELECT PROD_CODE,PROD_NAME,PROD_CMPY FROM PRODUCTS ORDER BY PROD_CODE";
        // Remove those drawer products which base has no arms(tanks)
        $sql = "
select PROD_CODE, PROD_NAME, PROD_CMPY from PRODUCTS
where  PROD_CODE in
(select distinct R.RAT_PROD_PRODCODE
from 
RATIOS R,
GUI_PIPENODE B
where B.STREAM_BASECODE = R.RATIO_BASE(+))
order by PROD_CODE
";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->products = $chk->data;

        // SQL to get all drawer products recipe data
        // Remove those drawer products which base has no arms(tanks)
        $sql = "
select P.PROD_CODE, P.PROD_NAME, P.PROD_CMPY, R.RATIO_BASE from PRODUCTS P, RATIOS R
where  P.PROD_CODE in
(select distinct R.RAT_PROD_PRODCODE
from 
RATIOS R,
GUI_PIPENODE B
where B.STREAM_BASECODE = R.RATIO_BASE(+))
and P.PROD_CODE = R.RAT_PROD_PRODCODE
and P.PROD_CMPY = R.RAT_PROD_PRODCMPY
order by P.PROD_CODE
";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->productsrecipe = $chk->data;    

        // SQL to get all meter codes data
        //$sql = "SELECT BAM_CODE FROM BA_METERS ORDER BY BAM_CODE";
        $sql = "
select R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_MTRCODE
from
RATIOS R,
GUI_PIPENODE B
where B.STREAM_BASECODE = R.RATIO_BASE(+)
order by R.RAT_PROD_PRODCMPY, B.STREAM_ARMCODE,B.STREAM_MTRCODE
";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->metercodes = $chk->data;

        // SQL to get all meter types data
        $sql = "
select R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_MTRCODE, B.STREAM_INJCODE, B.STREAM_BASECODE, B.STREAM_BASENAME, B.STREAM_BCLASS_CODE,
decode(B.STREAM_BCLASS_CODE, 6, 'T', 11,'T','F') METER_TYPE_CODE, decode(B.STREAM_BCLASS_CODE, 6, 'Inject', 11,'Inject','Meter') METER_TYPE_DESC,  B.STREAM_BCLASS_NMAE, B.STREAM_TANKCODE
from
RATIOS R,
GUI_PIPENODE B
where
     B.STREAM_BASECODE = R.RATIO_BASE(+)
order by R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_BASECODE, B.STREAM_TANKCODE
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->metertypes = $chk->data;

        // SQL to get all tank codes data
        //$sql = "SELECT TANK_CODE FROM TANKS ORDER BY TANK_CODE";
        $sql = "
select R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_BASECODE, B.STREAM_BASENAME, B.STREAM_BCLASS_CODE, B.STREAM_TANKCODE
from
RATIOS R,
GUI_PIPENODE B
where
     B.STREAM_BASECODE = R.RATIO_BASE(+)
order by R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_BASECODE, B.STREAM_TANKCODE
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->tankcodes = $chk->data;

        // SQL to get all base products data
        //$sql = "SELECT BASE_CODE,BASE_NAME FROM BASE_PRODS ORDER BY BASE_CODE";
        $sql = "
select R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_MTRCODE, B.STREAM_INJCODE, B.STREAM_BASECODE, B.STREAM_BASENAME, B.STREAM_BCLASS_CODE, B.STREAM_TANKCODE, B.STREAM_TANKDEN,
(CASE WHEN (TK.TANK_GAUGINGMTHD<>1) THEN 15
 ELSE STREAM_TANKTEMP
 END) as  BASE_RPT_TEMP,
BP.BASE_RPT_TEMP as BASE_RPT_TEMP2, TK.TANK_GAUGINGMTHD, BP.BASE_CAT
from
RATIOS R,
GUI_PIPENODE B,
BASE_PRODS BP,
TANKS TK
where
     B.STREAM_BASECODE = R.RATIO_BASE(+)
 and B.STREAM_BASECODE = BP.BASE_CODE(+)
 and B.STREAM_TANKCODE = TK.TANK_CODE(+)
order by R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_BASECODE
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->baseproducts = $chk->data;

        // SQL to get all base product classes data
        //$sql = "SELECT BCLASS_DESC FROM BASECLASS ORDER BY BCLASS_DESC";
        $sql = "
select R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_BASECODE, B.STREAM_BASENAME, B.STREAM_BCLASS_CODE, B.STREAM_BCLASS_NMAE, B.STREAM_TANKCODE
from
RATIOS R,
GUI_PIPENODE B
where
     B.STREAM_BASECODE = R.RATIO_BASE(+)
order by R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_BASECODE, B.STREAM_TANKCODE
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->baseproductclasses = $chk->data;

        return new dmMesg();
    }
   
    public function dbglog($msg)
    {
        return;
        $newline = "\n";
        $message = "[".date("y-m-d H:i:s")."] "." - ".$msg.$newline;
        error_log ( $message , 3 , "/home/omega/logs/jzamf.log" );
    }
}
?>