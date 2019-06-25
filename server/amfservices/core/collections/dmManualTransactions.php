<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmManualTransaction.php");

/**
 * @author jz
 * @version 1.0
 * @created 25-04-2013 11:39:50 AM
 */

class dmManualTransactions extends dmCollection{

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
        $this->model = "dmManualTransaction";                   //the model that this collection should consist of.
        $this->dmClass = "dmManualTransactions";                //the class name for Middleware/Front end integration.

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
        $this->vcfinfo            = array();

        parent::__construct($params);
        
        //$this->gather();
        //$this->getData($params);

    }

    public function getInstance($params = false)
    {
        new dmError(array("dev" => "getInstance in dmManualTransactions "));

        //return new dmMesg(array("data" => new dmManualTransactions($params)));
		
		$mtObj = new dmManualTransactions($params);
		$mtObj->getData($params);
		
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
        //return new dmMesg(array("data" => json_encode($mtObj), "json_on"=>1 ));
        //return new dmMesg(array("data" => $mtObj));
    }

    public function getInstance2($params = false)
    {
        new dmError(array("dev" => "getInstance in dmManualTransactions "));

        return new dmMesg(array("data" => new dmManualTransactions($params)));
    }

    public function getNomiItemNumberBySupplier ($cmpy_code)
    {
        $sql="
select MVI.MVITM_ITEM_ID
from MOVEMENTS MV,
MOVEMENT_ITEMS MVI
where MV.MV_ID = MVI.MVITM_MOVE_ID
  and MV.MV_SUPPLIER = '$cmpy_code'
order by MVI.MVITM_ITEM_ID desc    
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getDrawerProductsByDrawer ($cmpy_code)
    {
        $sql="SELECT PROD_CODE,PROD_NAME FROM PRODUCTS WHERE PROD_CMPY = '$cmpy_code' ORDER BY PROD_CODE";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getDrawersBySuppTrip ($param)
    {
        $sql="SELECT C.CMPY_CODE, C.CMPY_NAME FROM SCHEDULE S,COMPANYS C WHERE S.SHLS_DRAWER = C.CMPY_CODE AND SHLS_SUPP='$param->supp' AND SHLS_TRIP_NO='$param->trip_no'";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getDrawerProductsBySuppTrip ($param)
    {
        $sql="SELECT P.PROD_CODE, P.PROD_NAME FROM SCHEDULE S, COMPANYS C, PRODUCTS P WHERE S.SHLS_DRAWER = C.CMPY_CODE AND P.PROD_CMPY = C.CMPY_CODE AND SHLS_SUPP='$param->supp' AND SHLS_TRIP_NO='$param->trip_no' ORDER BY P.PROD_CODE";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getTankInfoByProdArm ($param)
    {
        $sql="
select STREAM_ARMCODE, STREAM_MTRCODE, STREAM_INJCODE, STREAM_BASECODE, STREAM_TANKCODE, STREAM_TANKDEN, STREAM_TANKTEMP as BASE_RPT_TEMP, BP.BASE_RPT_TEMP as BASE_RPT_TEMP2, R.RATIO_VALUE, TK.TANK_GAUGINGMTHD, BP.BASE_CAT
from 
RATIOS R,
GUI_PIPENODE B,
BASE_PRODS BP,
TANKS TK
where
     B.STREAM_BASECODE = R.RATIO_BASE(+)
 and B.STREAM_BASECODE = BP.BASE_CODE(+)
 and B.STREAM_TANKCODE = TK.TANK_CODE(+)
 and RAT_PROD_PRODCMPY = '$param->drawer' and RAT_PROD_PRODCODE = '$param->drawerprod' and STREAM_ARMCODE='$param->arm'
order by B.STREAM_ARMCODE
     ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getDrawerProdSchdByProd ($param)
    {
        $sql="
select PROD_CODE,PROD_NAME,PROD_CMPY from PRODUCTS
where PROD_CODE in 
(select distinct SCHPPROD_PRODCODE
from
SCHEDULE S,
SPECPROD SP
where
SP.SCHPSPID_SHLSTRIP = S.SHLS_TRIP_NO(+)
and SP.SCHPSPID_SHLSSUPP  = S.SHLS_SUPP(+)
and S.SHLS_SUPP = '$param->supp' and S.SHLS_TRIP_NO = '$param->trip_no'
)
order by PROD_CODE
         ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    /**
     * (non-PHPdoc)
     * @see dmCollection::getData()
     */
    public function getData( $params = false )
    {
	
        if(!($chk = $this->getTankerByCarrier("-1")) instanceOf dmMesg)    return $chk;
        $this->tankers = $chk->data;
	
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
select distinct R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_BAYCODE, B.STREAM_ARMCODE, B.STREAM_BASECODE, B.STREAM_TANKCODE, B.STREAM_TANKDEN, B.STREAM_BCLASS_CODE
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

        // SQL to get vcf data
        $sql = "
select CONFIG_VALUE as AIR_BOUYANCY
from
SITE_CONFIG
where
     CONFIG_KEY = 'AIR_BUOYANCY_FACTOR'
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $this->vcfinfo = $chk->data;

        return new dmMesg();
    }

/* Replaced by php services START */
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
    public function getCustomersBySupplier ($cmpy_code)
    {
        $sql="
select 
    cust.CUST_ACCT as CUST_ACNT 
    , cust.CUST_SUPP as CUST_SUPP_CODE
    , scmp.CMPY_NAME as CUST_SUPP_NAME
    , cust.CUST_CODE as CUST_CMPY_CODE
    , ccmp.CMPY_NAME as CUST_CMPY_NAME
from 
    CUSTOMER cust
    , COMPANYS scmp
    , COMPANYS ccmp
where 
    cust.CUST_SUPP = scmp.CMPY_CODE 
    and cust.CUST_CODE = ccmp.CMPY_CODE
    and (cust.CUST_SUPP='$cmpy_code') 
order by cust.CUST_SUPP, cust.CUST_CODE 
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getOpenOrderNumberByCustomer ($order_cust)
    {
        /*$sql="
select CO.ORDER_NO
from CUSTOMER C,
CUST_ORDER CO
where C.CUST_ACCT = CO.ORDER_CUST
  and C.CUST_SUPP = '$cmpy_code'
order by CO.ORDER_NO desc
        ";*/
        $sql="
select CO.ORDER_CUST_ORDNO
from 
CUST_ORDER CO
where CO.ORDER_CUST = '$order_cust'
order by CO.ORDER_NO desc
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }
	
    public function getCarriersBySuppTrip ($param)
    {
        $sql="SELECT C.CMPY_CODE, C.CMPY_NAME FROM SCHEDULE S,COMPANYS C,TANKERS T WHERE S.SHL_TANKER = T.TNKR_CODE AND T.TNKR_CARRIER = C.CMPY_CODE AND S.SHLS_SUPP='$param->supp' AND S.SHLS_TRIP_NO='$param->trip_no'";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }
	
    public function getTankersBySuppTrip ($param)
    {
        $sql="SELECT T.TNKR_CODE FROM SCHEDULE S,TANKERS T WHERE S.SHL_TANKER = T.TNKR_CODE AND SHLS_SUPP='$param->supp' AND SHLS_TRIP_NO='$param->trip_no'";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }
	
	public function getEquipmentsByTanker($tanker_code)
    {
        $sql="SELECT DISTINCT EQPT_CODE FROM TNKR_EQUIP_CMPT_DET_VW WHERE TNKR_CODE = '$tanker_code' ORDER BY EQPT_CODE ASC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getCompartmentsByTanker($tanker_code)
    {
        $sql="SELECT TNKR_CODE, TNKR_CMPT FROM TNKR_EQUIP_CMPT_DET_VW WHERE TNKR_CODE = '$tanker_code' ORDER BY TNKR_CODE, TNKR_CMPT ASC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;
        
        return new dmMesg(array("data"=>$result));
    }
	
	/* Open Order is similar to schedule by product */
    public function getOrderDetailsByTanker($param)
    {
        $sql = "
SELECT
        'BY_PRODUCT' as SCHD_TYPE
		, 
		(
			SELECT (CASE WHEN '$param->suppcode' <> (SELECT ORDER_DRAWER FROM CUST_ORDER WHERE ORDER_CUST_ORDNO = '$param->openorderno') 
			        THEN (SELECT ORDER_DRAWER FROM CUST_ORDER WHERE ORDER_CUST_ORDNO = '$param->openorderno') 
					ELSE  '$param->suppcode' 
					END) 
			FROM DUAL
		) as SHLS_SUPP
        ,tc.TNKR_CMPT_NO
        ,tc.TRAILERCOMP
        ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
        ,tc.CMPT_UNITS
        ,tc.UNIT
        ,tc.EQPT_CODE
        ,tc.TC_EQPT
        ,null as PROD_CODE
        ,null as ALLOWED_QTY
FROM
        (
        SELECT
                 ROWNUM TNKR_CMPT_NO
    , tc_tmp.*
  FROM
    (
    SELECT
         c.TRAILERCOMP
        ,c.CMPT_CAPACIT
        ,c.CMPT_UNITS
        ,un.DESCRIPTION UNIT
        ,te.TC_SEQNO
        ,trs.EQPT_CODE
        ,te.TC_EQPT
        ,c.ETYP_ID_RT
        ,te.TC_TANKER
    FROM
        TNKR_EQUIP te
        ,TRANSP_EQUIP trs
        ,UNIT_SCALE_VW un
        ,CMPT_VW c
    WHERE
        te.TC_EQPT = trs.EQPT_ID
        AND trs.EQPT_ETP = C.ETYP_ID_RT
        AND un.UNIT_ID = c.CMPT_UNITS
        AND te.TC_TANKER = '$param->tankercode'
    ORDER BY te.TC_SEQNO,c.TRAILERCOMP
    ) tc_tmp
        ) tc,
        SFILL_ADJUST sf
WHERE
        tc.TC_EQPT = sf.ADJ_EQP(+)
        AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }
	
    public function getScheduleDetailsBySuppTrip ($param)
    {
        //$sql="SELECT S.SHLS_DRAWER, SD.SCHD_COMP_ID, SD.SCHDPROD_PRODCODE, SD.SCHD_SPECQTY, SD.SCHD_UNITS FROM SCHEDULE S, SPECDETS SD WHERE S.SHLS_SUPP=SD.SCHDSPEC_SHLSSUPP AND S.SHLS_TRIP_NO=SD.SCHDSPEC_SHLSTRIP AND S.SHLS_SUPP='$param->supp' AND S.SHLS_TRIP_NO='$param->trip_no' ORDER BY SD.SCHD_COMP_ID ASC";
        // Check schedule type.
        $sql = "
 SELECT LD_TYPE
    FROM GUI_SCHEDULES
    WHERE SUPPLIER_CODE='$param->supp' AND SHLS_TRIP_NO='$param->trip_no'
 UNION
 SELECT LD_TYPE
    FROM GUI_NOM_SCHEDULES
    WHERE SUPPLIER_CODE='$param->supp'AND SHLS_TRIP_NO='$param->trip_no'
        ";
        $schd_type = "";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        if(strtoupper($chk->data[0][LD_TYPE]) == "PRESCHEDULE")
        {
            // Schedule by compartment
            $schd_type = "BY_COMPARTMENT";
        }
        else if(strtoupper($chk->data[0][LD_TYPE]) == "PREORDER")
        {
            // Schedule by product
            $schd_type = "BY_PRODUCT";
        }

        $mymsg = "getScheduleDetailsBySuppTrip -> schedule type ===>" . $schd_type;
        $this->dbglog($mymsg);
        
        // Get schedule details.
        $sql="
SELECT
    SCHEDULE.SHL_TANKER
    ,TANKERS.TNKR_ETP
FROM
    SCHEDULE
    ,TANKERS
WHERE
    TANKERS.TNKR_CODE = SCHEDULE.SHL_TANKER
    AND SCHEDULE.SHLS_TRIP_NO = '$param->trip_no'
    AND SCHEDULE.SHLS_SUPP = '$param->supp'
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;

        $tanker = $chk->data[0][SHL_TANKER];
        $mymsg = "getScheduleDetailsBySuppTrip -> tanker ===>" . $tanker;
        $this->dbglog($mymsg);

        if($schd_type == "BY_COMPARTMENT")
        {
        $sql="
    SELECT
        'BY_COMPARTMENT' as SCHD_TYPE
        ,et.EQPT_CODE
        ,et.TNKR_CMPT_NO
        ,sd.UNIT UNIT
        ,et.TRAILERCOMP   TLR_CMPT
        ,sd.SHLS_SUPP
        ,sd.PROD_CODE
        ,sd.PROD_NAME
        ,sd.SCHD_UNITS CMPT_UNITS
        ,sd.SCHD_SPECQTY ALLOWED_QTY
        ,0 LOAD_QTY
        ,0 PRELD_QTY
        ,pr.PROD_NAME PREV_PROD
        ,DECODE(sd.ORDER_CUST_ORDNO,0,NULL,sd.ORDER_CUST_ORDNO) ORDER_CUST_ORDNO
        ,et.CMPT_CAPACIT
        ,'' ORDER_REF_CODE
        ,0.0 SCHORDER_QTY
        ,DECODE(pr.PROD_CODE,'-1',NULL,pr.PROD_CODE) PREV_PRODCODE
        ,et.TC_EQPT
        ,sd.SHLSLOAD_LOAD_ID
        ,sd.ARM_NAME
        ,sd.ARMCODE
        
        , NVL(DECODE(sd.SCHD_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED
        , sd.SCHD_PRLDQTY QTY_PRELOAD
        , trsf.TRIP_QTY_AMB QTY_AMB
        , trsf.TRIP_QTY_STD QTY_STD
        , trsf.TRIP_QTY_KG QTY_KG

        ,sd.CUSTOMER_CODE
        ,sd.DELIVERY_LOCATION
        ,sd.DELIVERY_NUMBER
    FROM
        (
            SELECT
                    tc.TNKR_CMPT_NO
                    ,tc.TRAILERCOMP
                    ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
                    ,tc.CMPT_UNITS
                    ,tc.UNIT
                    ,tc.EQPT_CODE
                    ,tc.TC_EQPT
            FROM
                    (
                    SELECT
                             ROWNUM TNKR_CMPT_NO
                , tc_tmp.*
              FROM
                (
                SELECT
                     c.TRAILERCOMP
                    ,c.CMPT_CAPACIT
                    ,c.CMPT_UNITS
                    ,un.DESCRIPTION UNIT
                    ,te.TC_SEQNO
                    ,trs.EQPT_CODE
                    ,te.TC_EQPT
                    ,c.ETYP_ID_RT
                    ,te.TC_TANKER
                FROM
                    TNKR_EQUIP te
                    ,TRANSP_EQUIP trs
                    ,UNIT_SCALE_VW un
                    ,CMPT_VW c
                WHERE
                    te.TC_EQPT = trs.EQPT_ID
                    AND trs.EQPT_ETP = C.ETYP_ID_RT
                    AND un.UNIT_ID = c.CMPT_UNITS
                    AND te.TC_TANKER = '$tanker'
                ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                ) tc_tmp
                    ) tc,
                    SFILL_ADJUST sf
            WHERE
                    tc.TC_EQPT = sf.ADJ_EQP(+)
                    AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ) et,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHDPROD_PRODCODE PROD_CODE
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_SPECQTY
            ,SPECDETS.SCHD_UNITS
            ,CUST_ORDER.ORDER_CUST_ORDNO
            ,un.DESCRIPTION UNIT
            ,SCHEDULE.SHLSLOAD_LOAD_ID
            ,BA_ARMS.ARM_NAME
            ,SPECDETS.ARMCODE
            ,SCHEDULE.SHLS_SUPP
            
            ,SPECDETS.SCHDSPEC_SHLSSUPP
            ,SPECDETS.SCHDSPEC_SHLSTRIP
            ,SPECDETS.SCHDPROD_PRODCMPY
            ,SPECDETS.SCHDPROD_PRODCODE
            ,SPECDETS.SCHD_PRLDQTY

            ,(SPECDETS.SCHD_SOLD_TO_NUM || NVL2(COMPANYS.CMPY_NAME,' - ','') || COMPANYS.CMPY_NAME) CUSTOMER_CODE
            ,(SPECDETS.SCHD_SHIP_TO_NUM || NVL2(DELV_LOCATION.DLV_NAME,' - ','') || DELV_LOCATION.DLV_NAME) DELIVERY_LOCATION
            ,SPECDETS.SCHD_DELIV_NUM DELIVERY_NUMBER
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
            ,CUST_ORDER
            ,unit_scale_vw un
            ,BA_ARMS
            ,CUSTOMER
            ,COMPANYS
            ,DELV_LOCATION
        WHERE
            SPECDETS.SCHD_UNITS = un.UNIT_ID
            AND PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND CUST_ORDER.ORDER_NO(+) = SPECDETS.SCHD_ORDER
            AND SCHEDULE.SHLS_SUPP = '$param->supp'
            AND SCHEDULE.SHLS_TRIP_NO = '$param->trip_no'
            AND SPECDETS.ARMCODE = BA_ARMS.BAA_CODE(+)
            AND (SPECDETS.SCHD_SOLD_TO_NUM = CUSTOMER.CUST_CODE(+) AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+))
            AND (SPECDETS.SCHD_SHIP_TO_NUM = DELV_LOCATION.DLV_CODE(+))
        ) sd,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_UNITS
            ,PRODUCTS.PROD_CODE
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
        WHERE
            PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                (
                SELECT * FROM
                    (
                    SELECT
                        SCHEDULE.SHLS_TRIP_NO
                        ,SCHEDULE.SHLS_SUPP
                    FROM
                        LOADS
                        ,SCHEDULE
                    WHERE
                        LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                        AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                        AND LOADS.LOAD_DMY < NVL(
                            (
                            SELECT
                                LOADS.LOAD_DMY
                            FROM
                                LOADS
                                ,SCHEDULE
                            WHERE
                                LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                AND LOADS.LOAD_DMY IS NOT NULL
                                AND SCHEDULE.SHLS_SUPP = '$param->supp'
                                AND SCHEDULE.SHL_TANKER = '$tanker'
                                AND SCHEDULE.SHLS_SUPP = '$param->supp'
                                AND SCHEDULE.SHLS_TRIP_NO = '$param->trip_no'
                            )
                            ,SYSDATE)
                        AND LOADS.LOAD_DMY IS NOT NULL
                        AND SCHEDULE.SHLS_SUPP = '$param->supp'
                        AND SCHEDULE.SHL_TANKER = '$tanker'
                    ORDER BY LOADS.LOAD_DMY DESC
                    )
                WHERE ROWNUM = 1
                )
        )pr,
        (
            SELECT 
                SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER
                , SCHEDULE.SHLS_TRIP_NO AS TRIP_NO
              , TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT
                , TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY
                , TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE
                , SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB
                , SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD
                , SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG
              , SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN
              , SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG
              , SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
            FROM 
              SCHEDULE
              , LOADS
              , TRANSACTIONS
              , TRANSFERS
            WHERE
                SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
            GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
        )trsf
    WHERE
            et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
        AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
        AND sd.SCHDSPEC_SHLSSUPP = trsf.TRIP_SUPPLIER(+)
        AND sd.SCHDSPEC_SHLSTRIP = trsf.TRIP_NO(+)
        AND sd.SCHDPROD_PRODCMPY = trsf.TRIP_PRODCMPY(+)
        AND sd.SCHDPROD_PRODCODE = trsf.TRIP_PRODCODE(+)
        AND sd.SCHD_COMP_ID      = trsf.TRIP_COMPARTMENT(+)    
    ORDER BY TO_NUMBER(et.TNKR_CMPT_NO)    
        ";
        }
        else
        {
/*        $sql="
    SELECT
        'BY_PRODUCT' as SCHD_TYPE
        ,et.EQPT_CODE
        ,et.TNKR_CMPT_NO
        ,null as UNIT
        ,et.TRAILERCOMP   TLR_CMPT
        ,sd.SHLS_SUPP
        ,null as PROD_CODE
        ,null as PROD_NAME
        ,null as CMPT_UNITS
        ,null as ALLOWED_QTY
        ,0 LOAD_QTY
        ,0 PRELD_QTY
        ,pr.PROD_NAME PREV_PROD
        ,null as ORDER_CUST_ORDNO
        ,et.CMPT_CAPACIT
        ,'' ORDER_REF_CODE
        ,0.0 SCHORDER_QTY
        ,DECODE(pr.PROD_CODE,'-1',NULL,pr.PROD_CODE) PREV_PRODCODE
        ,et.TC_EQPT
        ,null as SHLSLOAD_LOAD_ID
        ,null as ARM_NAME
        ,null as ARMCODE
        
        ,null as QTY_LOADED
        ,null as QTY_PRELOAD 
        ,null as QTY_AMB
        ,null as QTY_STD
        ,null as QTY_KG    
    FROM
        (
            SELECT
                    tc.TNKR_CMPT_NO
                    ,tc.TRAILERCOMP
                    ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
                    ,tc.CMPT_UNITS
                    ,tc.UNIT
                    ,tc.EQPT_CODE
                    ,tc.TC_EQPT
            FROM
                    (
                    SELECT
                             ROWNUM TNKR_CMPT_NO
                , tc_tmp.*
              FROM
                (
                SELECT
                     c.TRAILERCOMP
                    ,c.CMPT_CAPACIT
                    ,c.CMPT_UNITS
                    ,un.DESCRIPTION UNIT
                    ,te.TC_SEQNO
                    ,trs.EQPT_CODE
                    ,te.TC_EQPT
                    ,c.ETYP_ID_RT
                    ,te.TC_TANKER
                FROM
                    TNKR_EQUIP te
                    ,TRANSP_EQUIP trs
                    ,UNIT_SCALE_VW un
                    ,CMPT_VW c
                WHERE
                    te.TC_EQPT = trs.EQPT_ID
                    AND trs.EQPT_ETP = C.ETYP_ID_RT
                    AND un.UNIT_ID = c.CMPT_UNITS
                    AND te.TC_TANKER = '$tanker'
                ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                ) tc_tmp
                    ) tc,
                    SFILL_ADJUST sf
            WHERE
                    tc.TC_EQPT = sf.ADJ_EQP(+)
                    AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ) et,
        (
        SELECT 
           SHLS_SUPP 
        FROM SCHEDULE
        WHERE 
            SCHEDULE.SHLS_SUPP = '$param->supp'
        AND SCHEDULE.SHLS_TRIP_NO = '$param->trip_no'
        ) sd,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_UNITS
            ,PRODUCTS.PROD_CODE
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
        WHERE
            PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                (
                SELECT * FROM
                    (
                    SELECT
                        SCHEDULE.SHLS_TRIP_NO
                        ,SCHEDULE.SHLS_SUPP
                    FROM
                        LOADS
                        ,SCHEDULE
                    WHERE
                        LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                        AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                        AND LOADS.LOAD_DMY < NVL(
                            (
                            SELECT
                                LOADS.LOAD_DMY
                            FROM
                                LOADS
                                ,SCHEDULE
                            WHERE
                                LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                AND LOADS.LOAD_DMY IS NOT NULL
                                AND SCHEDULE.SHLS_SUPP = '$param->supp'
                                AND SCHEDULE.SHL_TANKER = '$tanker'
                                AND SCHEDULE.SHLS_SUPP = '$param->supp'
                                AND SCHEDULE.SHLS_TRIP_NO = '$param->trip_no'
                            )
                            ,SYSDATE)
                        AND LOADS.LOAD_DMY IS NOT NULL
                        AND SCHEDULE.SHLS_SUPP = '$param->supp'
                        AND SCHEDULE.SHL_TANKER = '$tanker'
                    ORDER BY LOADS.LOAD_DMY DESC
                    )
                WHERE ROWNUM = 1
                )
        )pr
    WHERE
    --        et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
    --    AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
        et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
    --    AND et.TNKR_CMPT_NO = ord.SCHO_DAD_SCHDCMPT(+)
    ORDER BY TO_NUMBER(et.TNKR_CMPT_NO )
        ";
*/
        $sql="
    SELECT
        'BY_PRODUCT' as SCHD_TYPE
        ,et.EQPT_CODE
        ,et.TNKR_CMPT_NO
        ,null as UNIT
        ,et.TRAILERCOMP   TLR_CMPT
        ,sd2.SHLS_SUPP
        ,null as PROD_CODE
        ,null as PROD_NAME
        ,null as CMPT_UNITS
        ,null as ALLOWED_QTY
        ,0 LOAD_QTY
        ,0 PRELD_QTY
        ,pr.PROD_NAME PREV_PROD
        ,null as ORDER_CUST_ORDNO
        ,et.CMPT_CAPACIT
        ,'' ORDER_REF_CODE
        ,0.0 SCHORDER_QTY
        ,DECODE(pr.PROD_CODE,'-1',NULL,pr.PROD_CODE) PREV_PRODCODE
        ,et.TC_EQPT
        ,null as SHLSLOAD_LOAD_ID
        ,null as ARM_NAME
        ,null as ARMCODE
        
        , NVL(DECODE(sd.SCHD_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED
        , sd.SCHD_PRLDQTY QTY_PRELOAD 
        , trsf.TRIP_QTY_AMB QTY_AMB
        , trsf.TRIP_QTY_STD QTY_STD
        , trsf.TRIP_QTY_KG QTY_KG

        ,sd2.CUSTOMER_CODE
        ,sd2.DELIVERY_LOCATION
		,sd2.DELIVERY_NUMBER
    FROM
        (
            SELECT
                    tc.TNKR_CMPT_NO
                    ,tc.TRAILERCOMP
                    ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
                    ,tc.CMPT_UNITS
                    ,tc.UNIT
                    ,tc.EQPT_CODE
                    ,tc.TC_EQPT
            FROM
                    (
                    SELECT
                             ROWNUM TNKR_CMPT_NO
                , tc_tmp.*
              FROM
                (
                SELECT
                     c.TRAILERCOMP
                    ,c.CMPT_CAPACIT
                    ,c.CMPT_UNITS
                    ,un.DESCRIPTION UNIT
                    ,te.TC_SEQNO
                    ,trs.EQPT_CODE
                    ,te.TC_EQPT
                    ,c.ETYP_ID_RT
                    ,te.TC_TANKER
                FROM
                    TNKR_EQUIP te
                    ,TRANSP_EQUIP trs
                    ,UNIT_SCALE_VW un
                    ,CMPT_VW c
                WHERE
                    te.TC_EQPT = trs.EQPT_ID
                    AND trs.EQPT_ETP = C.ETYP_ID_RT
                    AND un.UNIT_ID = c.CMPT_UNITS
                    AND te.TC_TANKER = '$tanker'
                ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                ) tc_tmp
                    ) tc,
                    SFILL_ADJUST sf
            WHERE
                    tc.TC_EQPT = sf.ADJ_EQP(+)
                    AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ) et,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHDPROD_PRODCODE PROD_CODE
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_SPECQTY
            ,SPECDETS.SCHD_UNITS
            ,CUST_ORDER.ORDER_CUST_ORDNO
            ,un.DESCRIPTION UNIT
            ,SCHEDULE.SHLSLOAD_LOAD_ID
            ,BA_ARMS.ARM_NAME
            ,SPECDETS.ARMCODE
            ,SCHEDULE.SHLS_SUPP
            
            ,SPECDETS.SCHDSPEC_SHLSSUPP
            ,SPECDETS.SCHDSPEC_SHLSTRIP
            ,SPECDETS.SCHDPROD_PRODCMPY
            ,SPECDETS.SCHDPROD_PRODCODE
            ,SPECDETS.SCHD_PRLDQTY
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
            ,CUST_ORDER
            ,unit_scale_vw un
            ,BA_ARMS
        WHERE
            SPECDETS.SCHD_UNITS = un.UNIT_ID
            AND PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND CUST_ORDER.ORDER_NO(+) = SPECDETS.SCHD_ORDER
            AND SCHEDULE.SHLS_SUPP = '$param->supp'
            AND SCHEDULE.SHLS_TRIP_NO = '$param->trip_no'
            AND SPECDETS.ARMCODE = BA_ARMS.BAA_CODE(+)
        ) sd,
        (
        SELECT
           SHLS_SUPP
           ,(SCHEDULE.SHLS_SOLD_TO_NUM || NVL2(COMPANYS.CMPY_NAME,' - ','') || COMPANYS.CMPY_NAME) CUSTOMER_CODE
           ,(SCHEDULE.SHLS_SHIP_TO_NUM || NVL2(DELV_LOCATION.DLV_NAME,' - ','') || DELV_LOCATION.DLV_NAME) DELIVERY_LOCATION
		   , SCHEDULE.SHL_FLEET_DATA DELIVERY_NUMBER
        FROM SCHEDULE
            ,CUSTOMER
            ,COMPANYS
            ,DELV_LOCATION
        WHERE 
            SCHEDULE.SHLS_SUPP = '$param->supp'
        AND SCHEDULE.SHLS_TRIP_NO = '$param->trip_no'
        AND (SCHEDULE.SHLS_SOLD_TO_NUM = CUSTOMER.CUST_CODE(+) AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+))
        AND (SCHEDULE.SHLS_SHIP_TO_NUM = DELV_LOCATION.DLV_CODE(+))
        ) sd2,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_UNITS
            ,PRODUCTS.PROD_CODE
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
        WHERE
            PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                (
                SELECT * FROM
                    (
                    SELECT
                        SCHEDULE.SHLS_TRIP_NO
                        ,SCHEDULE.SHLS_SUPP
                    FROM
                        LOADS
                        ,SCHEDULE
                    WHERE
                        LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                        AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                        AND LOADS.LOAD_DMY < NVL(
                            (
                            SELECT
                                LOADS.LOAD_DMY
                            FROM
                                LOADS
                                ,SCHEDULE
                            WHERE
                                LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                AND LOADS.LOAD_DMY IS NOT NULL
                                AND SCHEDULE.SHLS_SUPP = '$param->supp'
                                AND SCHEDULE.SHL_TANKER = '$tanker'
                                AND SCHEDULE.SHLS_SUPP = '$param->supp'
                                AND SCHEDULE.SHLS_TRIP_NO = '$param->trip_no'
                            )
                            ,SYSDATE)
                        AND LOADS.LOAD_DMY IS NOT NULL
                        AND SCHEDULE.SHLS_SUPP = '$param->supp'
                        AND SCHEDULE.SHL_TANKER = '$tanker'
                    ORDER BY LOADS.LOAD_DMY DESC
                    )
                WHERE ROWNUM = 1
                )
        )pr,
        (
            SELECT
                SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER
                , SCHEDULE.SHLS_TRIP_NO AS TRIP_NO
              , TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT
                , TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY
                , TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE
                , SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB
                , SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD
                , SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG
              , SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN
              , SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG
              , SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
            FROM 
              SCHEDULE
              , LOADS
              , TRANSACTIONS
              , TRANSFERS
            WHERE
                SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
            GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
        )trsf
    WHERE
            et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
        AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
        AND sd.SCHDSPEC_SHLSSUPP = trsf.TRIP_SUPPLIER(+)
        AND sd.SCHDSPEC_SHLSTRIP = trsf.TRIP_NO(+) 
        AND sd.SCHDPROD_PRODCMPY = trsf.TRIP_PRODCMPY(+)
        AND sd.SCHDPROD_PRODCODE = trsf.TRIP_PRODCODE(+)
        AND sd.SCHD_COMP_ID      = trsf.TRIP_COMPARTMENT(+)
    ORDER BY TO_NUMBER(et.TNKR_CMPT_NO)
        ";
        }

        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }


    public function getTankerByCarrier_OO($carrier_code)
    {
        $sql="
SELECT gui_tnkr2.TNKR_CODE as TNKR_CODE, gui_tnkr2.TNKR_EQPT_NAME as TNKR_EQPT_NAME, gui_tnkr2.TNKR_CARRIER_NAME as TNKR_CARRIER_NAME
FROM 
    (
    SELECT tnkr.TNKR_CODE               AS TNKR_CODE ,
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
      WHERE tnkr.TNKR_ETP                                = etyp.ETYP_ID(+)
      AND tnkr.TNKR_CARRIER                              = carr.CMPY_CODE(+)
      AND tnkr.TNKR_OWNER                                = mngr.CMPY_CODE(+)
      AND tnkr.TNKR_BASE_SITE                            = base.TERM_CODE(+)
      AND tnkr.TNKR_DEST_DEPOT                           = dest.TERM_CODE(+)
      AND tnkr.TNKR_LAST_DEPOT                           = prev.TERM_CODE(+)
      AND tnkr.TNKR_CUR_DEPOT                            = curr.TERM_CODE(+)
    ) gui_tnkr2 
WHERE 
    ( '-1'='$carrier_code' or 'ANY'='$carrier_code' or gui_tnkr2.tnkr_carrier='$carrier_code' )
order by gui_tnkr2.tnkr_code
            ";
// May need this condition later.
//       gui_tnkr2.TNKR_CODE in (select KYA_TANKER from ACCESS_KEYS)            
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getCarriersByOpenOrder($open_order)
    {
        $sql="
SELECT C.CMPY_CODE, C.CMPY_NAME
FROM 
COMPANYS C,
CUST_ORDER CO
WHERE CO.ORDER_CUST_ORDNO = '$open_order'
AND CO.ORDER_CARRIER = C.CMPY_CODE
ORDER BY C.CMPY_CODE
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getAllCarriers ($param)
    {
        $sql="SELECT CMPY_CODE, CMPY_NAME FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,4)<>0 ORDER BY CMPY_CODE ASC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getOrderProductsByCustOrderNo($param)
    {
//        $sql = "
//SELECT CO.ORDER_CUST_ORDNO, OPD.OSPROD_PRODCODE PROD_CODE, P.PROD_NAME, OPD.OSPROD_PRODCMPY PROD_CMPY, OPD.ORDER_PROD_QTY SCHP_SPECQTY, decode(OPD.ORDER_PROD_UNIT,'5','l(amb)','11','l(cor)','17','kg','unknown') UNIT_NAME
//FROM 
//    CUST_ORDER CO
//    ,OPRODMTD OPD
//    ,PRODUCTS P
//WHERE
//    OPD.ORDER_PROD_KEY=CO.ORDER_NO
//AND OPD.OSPROD_PRODCODE = P.PROD_CODE
//AND OPD.OSPROD_PRODCMPY = P.PROD_CMPY 
//AND ORDER_CUST_ORDNO='$param->custorderno'
//ORDER BY OPD.OSPROD_PRODCODE
        $sql = "
SELECT CO.ORDER_CUST_ORDNO, OPD.OSPROD_PRODCODE as SUPP_PROD_CODE, P.PROD_NAME as SUPP_PROD_NAME, P.PROD_CLASS as SUPP_PROD_CLASS, OPD.OSPROD_PRODCMPY SUPP_PROD_CMPY, OPD.ORDER_PROD_QTY SCHP_SPECQTY, decode(OPD.ORDER_PROD_UNIT,'5','l(amb)','11','l(cor)','17','kg','unknown') UNIT_NAME, NVL(OO_QTY.QTY_LOADED,0) QTY_LOADED, NVL(OO_QTY.QTY_AMB,0) QTY_AMB, NVL(OO_QTY.QTY_STD,0) QTY_STD, NVL(OO_QTY.QTY_KG,0) QTY_KG,
DRAWER_P.PROD_CMPY as PROD_CMPY, DRAWER_P.PROD_CODE as PROD_CODE, DRAWER_P.PROD_NAME as PROD_NAME, DRAWER_P.PROD_CLASS as PROD_CLASS
FROM 
    CUST_ORDER CO,
    OPRODMTD OPD,
    PRODUCTS P,
	PRODUCTS DRAWER_P,
    (
        select TRIP_PROD.PROD_CODE
            ,sum(TRIP_PROD.QTY_LOADED) QTY_LOADED
            ,sum(TRIP_PROD.QTY_AMB) QTY_AMB
            ,sum(TRIP_PROD.QTY_STD) QTY_STD
            ,sum(TRIP_PROD.QTY_KG) QTY_KG
        from
        CUST_ORDER CO,
        ORD_SCHEDULE OS,
        (
        select 
            pr.PROD_CODE as PROD_CODE
            , pr.PROD_NAME as PROD_NAME
            , pr.PROD_CMPY as PROD_CMPY
            , spec.SCHP_UNITS as UNIT_CODE
            , uv.DESCRIPTION as UNIT_NAME
            , spec.SCHP_SPECQTY as SCHP_SPECQTY
            , NVL(DECODE(spec.SCHP_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED
            , cmpt.TRIP_QTY_PRELOAD QTY_PRELOADED 
            , trsf.TRIP_QTY_AMB QTY_AMB
            , trsf.TRIP_QTY_STD QTY_STD
            , trsf.TRIP_QTY_KG QTY_KG
            , spec.SCHPSPID_SHLSTRIP
            , spec.SCHPSPID_SHLSSUPP
        from 
            SPECPROD spec
            , PRODUCTS pr
            , UNIT_SCALE_VW uv
            , (
        select 
            SPECDETS.SCHDSPEC_SHLSSUPP as TRIP_SUPPLIER
            , SPECDETS.SCHDSPEC_SHLSTRIP as TRIP_NO
            , SPECDETS.SCHDPROD_PRODCMPY as TRIP_PRODCMPY
            , SPECDETS.SCHDPROD_PRODCODE as TRIP_PRODCODE
            , SUM(SPECDETS.SCHD_PRESETQTY) as TRIP_QTY_PRESET
            , SUM(SPECDETS.SCHD_PRLDQTY) as TRIP_QTY_PRELOAD
            , SUM(SPECDETS.SCHD_SPECQTY) as TRIP_QTY_SCHED
            , SUM(SPECDETS.SCHD_DELIVERED) as TRIP_QTY_LOADED
        from SPECDETS
        group by SPECDETS.SCHDSPEC_SHLSSUPP, SPECDETS.SCHDSPEC_SHLSTRIP, SPECDETS.SCHDPROD_PRODCMPY, SPECDETS.SCHDPROD_PRODCODE
            ) cmpt
            , (
        select 
            SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER
            , SCHEDULE.SHLS_TRIP_NO as TRIP_NO
            , TRANSFERS.TRSFPROD_PRODCMPY as TRIP_PRODCMPY
            , TRANSFERS.TRSFPROD_PRODCODE as TRIP_PRODCODE
            , SUM(TRANSFERS.TRSF_QTY_AMB) as TRIP_QTY_AMB
            , SUM(TRANSFERS.TRSF_QTY_COR) as TRIP_QTY_STD
            , SUM(TRANSFERS.TRSF_LOAD_KG) as TRIP_QTY_KG
          , SUM(TRANSFERS.TRSF_RETURNS) as TRIP_QTY_RTN
          , SUM(TRANSFERS.TRSF_PRELOAD_KG) as TRIP_QTY_PKG
          , SUM(TRANSFERS.TRSF_DELIVERED) as TRIP_QTY_DELIVERED
        from 
          SCHEDULE
          , LOADS
          , TRANSACTIONS
          , TRANSFERS
        where
            SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
        and SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
        and LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
        and LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
        and TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
        and TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
        group by SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
            ) trsf
        where 
            spec.SCHPSPID_SHLSSUPP = cmpt.TRIP_SUPPLIER (+)
            and spec.SCHPSPID_SHLSTRIP = cmpt.TRIP_NO (+)
            and spec.SCHPPROD_PRODCMPY = cmpt.TRIP_PRODCMPY (+)
            and spec.SCHPPROD_PRODCODE = cmpt.TRIP_PRODCODE (+)
            and cmpt.TRIP_SUPPLIER = trsf.TRIP_SUPPLIER (+)
            and cmpt.TRIP_NO = trsf.TRIP_NO (+)
            and cmpt.TRIP_PRODCMPY = trsf.TRIP_PRODCMPY (+)
            and cmpt.TRIP_PRODCODE = trsf.TRIP_PRODCODE (+)
            and spec.SCHPPROD_PRODCMPY = pr.PROD_CMPY
            and spec.SCHPPROD_PRODCODE = pr.PROD_CODE
            and uv.UNIT_ID = spec.SCHP_UNITS
        order by spec.SCHPSPID_SHLSSUPP, spec.SCHPSPID_SHLSTRIP, pr.PROD_NAME
        ) trip_prod
        where
            CO.ORDER_NO = OS.OS_ORDER_NO
            and OS.OS_SHL_SHLSTRIP = trip_prod.SCHPSPID_SHLSTRIP
            and OS.OS_SHL_SHLSSUPP = trip_prod.SCHPSPID_SHLSSUPP
            and CO.ORDER_CUST_ORDNO = '$param->custorderno'
        group by trip_prod.PROD_CODE, CO.ORDER_CUST_ORDNO
    ) OO_QTY
WHERE
    OPD.ORDER_PROD_KEY=CO.ORDER_NO
AND OPD.OSPROD_PRODCODE = P.PROD_CODE
AND OPD.OSPROD_PRODCMPY = P.PROD_CMPY
AND DRAWER_P.PROD_CLASS = P.PROD_CLASS -- get comptiable drawer products
AND DRAWER_P.PROD_CMPY = CO.ORDER_DRAWER -- get comptiable drawer products
AND OPD.OSPROD_PRODCODE = OO_QTY.PROD_CODE(+)
AND ORDER_CUST_ORDNO='$param->custorderno'
ORDER BY OPD.OSPROD_PRODCODE
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }

    public function getAdditionalInfoByOpenOrder($open_order)
    {
        $sql="
SELECT (CO.ORD_SOLD_TO_NUM || NVL2(CMPY.CMPY_NAME,' - ','') || CMPY.CMPY_NAME) as CUSTOMER_CODE, (CO.ORD_SHIP_TO_NUM || NVL2(DL.DLV_NAME,' - ','') || DL.DLV_NAME) as DELIVERY_LOCATION
FROM
CUST_ORDER CO,
CUSTOMER CUST,
COMPANYS CMPY,
DELV_LOCATION DL
WHERE CO.ORDER_CUST_ORDNO = '$open_order'
AND (CO.ORD_SOLD_TO_NUM = CUST.CUST_CODE(+) AND CUST.CUST_CODE = CMPY.CMPY_CODE)
AND CO.ORD_SHIP_TO_NUM = DL.DLV_CODE(+)
        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }
	
	public function getTankerByCarrier($carrier_code)
    {
        $sql="
SELECT gui_tnkr2.TNKR_CODE as TNKR_CODE, gui_tnkr2.TNKR_EQPT_NAME as TNKR_EQPT_NAME, gui_tnkr2.TNKR_CARRIER_NAME as TNKR_CARRIER_NAME
FROM 
    (
    SELECT tnkr.TNKR_CODE               AS TNKR_CODE ,
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
      WHERE tnkr.TNKR_ETP                                = etyp.ETYP_ID(+)
      AND tnkr.TNKR_CARRIER                              = carr.CMPY_CODE(+)
      AND tnkr.TNKR_OWNER                                = mngr.CMPY_CODE(+)
      AND tnkr.TNKR_BASE_SITE                            = base.TERM_CODE(+)
      AND tnkr.TNKR_DEST_DEPOT                           = dest.TERM_CODE(+)
      AND tnkr.TNKR_LAST_DEPOT                           = prev.TERM_CODE(+)
      AND tnkr.TNKR_CUR_DEPOT                            = curr.TERM_CODE(+) 
    ) gui_tnkr2 
WHERE 
    ( '-1'='$carrier_code' or 'ANY'='$carrier_code' or gui_tnkr2.tnkr_carrier='$carrier_code' )
order by gui_tnkr2.tnkr_code
            ";
// May need this condition later.
//       gui_tnkr2.TNKR_CODE in (select KYA_TANKER from ACCESS_KEYS)
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }
	
    public function getDriverCodeBySuppDrawer ($param)
    {
        $sql="SELECT PER_CODE, PER_NAME FROM PERSONNEL WHERE upper(PER_CMPY) = '$param->supp' AND PER_AUTH IN (7,8,9) ORDER BY PER_CODE ASC";
//        $sql="
//SELECT PER_CODE, PER_NAME FROM PERSONNEL
//WHERE 
//PER_AUTH IN (7,8,9) 
//AND PER_CODE IN (SELECT KYA_PSN FROM ACCESS_KEYS WHERE ('-1'='$param->supp' or KYA_SP_SUPPLIER='$param->supp') AND ('-1'='$param->drawer' or KYA_DRAWER='$param->drawer'))
//ORDER BY PER_CODE ASC
//        ";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }	
	
    public function getTripNumberBySupplier ($param)
    {
        if($param->type == "S") // Shipment
            $sql="SELECT SHLS_TRIP_NO FROM SCHEDULE WHERE (STATS IN ('F','A') OR STATS IS NULL) AND SHLS_SUPP='$param->cmpy_code' AND SHLS_CLASS=0 ORDER BY SHLS_CALDATE DESC";
        elseif ($param->type == "N")  //  Nomination
            $sql="SELECT SHLS_TRIP_NO FROM SCHEDULE WHERE (STATS IN ('F','A') OR STATS IS NULL) AND SHLS_SUPP='$param->cmpy_code' AND SHLS_CLASS=1 ORDER BY SHLS_CALDATE DESC";
        else
            $sql="SELECT SHLS_TRIP_NO FROM SCHEDULE WHERE (STATS IN ('F','A') OR STATS IS NULL) AND SHLS_SUPP='$param->cmpy_code' ORDER BY SHLS_CALDATE DESC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)    return $chk;
        $result = $chk->data;

        return new dmMesg(array("data"=>$result));
    }
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Replaced by php services END */ 
    
    public function dbglog($msg)
    {
        return;
        $newline = "\n";
        $message = "[".date("y-m-d H:i:s")."] "." - ".$msg.$newline;
        error_log ( $message , 3 , "/home/omega/logs/jzamf.log" );
    }
}
?>