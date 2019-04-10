<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('DRAWERPRODUCT')) define('DRAWERPRODUCT','DrawerProductService.class');

class DrawerProductService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				PROD_CODE
				, PROD_CMPYCODE
				, PROD_CMPYNAME
				, PROD_NAME
				, PROD_DESC
				, PROD_GROUP
				, PROD_GROUPNAME
				, PROD_PRICE
				, PROD_PRICEUNIT
				, PROD_CLASS
				, PROD_CLASSDESC
				, PROD_TEXTCOLOR
				, PROD_BACKCOLOR
				, PROD_RPTUNIT
				, PROD_RPTUNITNAME
				, PROD_RPTTEMP
				, PROD_NUMBER
				, (
					case when bp.BASE_COUNTS>1 then 'Y' else 'N' end 
				)				 as PROD_IS_BLEND
				, PROD_LDTOL_FLAG
				, PROD_LDTOL_PTOL
				, PROD_LDTOL_NTOL
				, PROD_IS_COMPLIANT
				, PROD_HAZID
				, PROD_HAZNAME
				, PROD_HAZCLASS
				, PROD_HAZCODE
				, PROD_HAZRISK
				, PROD_HAZEMRG
				, PROD_HAZPACKGRP
				, PROD_HAZPACKMTHD	
				, PROD_CHECK_HOT_VOLUME
				, PROD_15_DENSITY
				, PROD_HOT_TEMP
				, PROD_CHECK_2ND_DRAWER
				, PROD_2ND_DRAWER
				, PROD_2ND_DRAWER_NAME
				, PROD_2ND_PRODUCT
				, PROD_2ND_PRODUCT_NAME
				, dg.MATERIAL		PROD_DGLINK
			from 
				GUI_PRODUCTS gp
				, DANGEROUS_GOODS		dg
				, DG_LINK				dl
				, (
					select 
						RAT_PROD_PRODCMPY
						, RAT_PROD_PRODCODE
						, count(*) as 				BASE_COUNTS
					from RATIOS 
					where RATIO_BASE in (select BASE_CODE from BASE_PRODS where BASE_CAT!=6) 
					group by RAT_PROD_PRODCMPY, RAT_PROD_PRODCODE
				) bp
			where 
				1 = 1
				and gp.PROD_CODE = bp.RAT_PROD_PRODCODE(+)
				and gp.PROD_CMPYCODE = bp.RAT_PROD_PRODCMPY(+)
				and gp.PROD_CODE = dl.DGLNK_SP_PRODCODE(+)
				and gp.PROD_CMPYCODE = dl.DGLNK_SP_PRODCMPY(+)
				and dl.DG_LINK_ID = dg.MATERIAL(+)
	";
	
	
	public function __construct()
	{
		session_start();
		
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
			if( isset($_SERVER['HTTP_HOST']) )
			{
				$this->host = $_SERVER['HTTP_HOST'];
			}
			else
			{
				$this->host = "localhost";
			}
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "gantry/drawer_prods.cgi";
            $this->cgi_items = CGIDIR . "gantry/drawer_prods.cgi";
            $this->cgi_periods = CGIDIR . "gantry/drawer_prods.cgi";
            $this->cgi_reset = CGIDIR . "gantry/drawer_prods.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/drawer_prods.cgi";
            $this->cgi_items ="cgi-bin/en/gantry/drawer_prods.cgi";
            $this->cgi_periods ="cgi-bin/en/gantry/drawer_prods.cgi";
            $this->cgi_reset = "cgi-bin/en/gantry/drawer_prods.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) GPVIEW ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
   public function getPaged($values, $dtypes, $sorts, $orders, $pageNum = 1, $pageSize = 50)
	{
        $g = new GlobalClass();
	
		if ($values == "" || is_string($values) )
		{
			//$filter = $values;
			$filterObj = array();
			$filterObj['sql_text'] = $values;
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		} 
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY PROD_CMPYCODE, PROD_CODE";
		
		//$query = "SELECT * FROM ( " . $this->myview . " ) GPVIEW  $filter $sort";
		$query = "SELECT * FROM ( " . $this->myview . " ) GPVIEW " . $filter['sql_text'] . " $sort";

		$low   = ($pageNum-1)*$pageSize+1;
		$high  = $pageNum*$pageSize; 
		//$queryPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		
		$queryPaged = array();
        $queryPaged['sql_text'] = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		$queryPaged['sql_data'] = $filter['sql_data'];
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($queryPaged);
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 
         
    public function initDrawerProductItems(  )
	{
		$sql="
			select 
				NULL							as PITEM_PROD_CODE
				, NULL							as PITEM_PROD_NAME
				, NULL							as PITEM_CMPY_CODE
				, NULL							as PITEM_CMPY_NAME
				, NULL							as PITEM_PROD_GROUP
				, NULL							as PITEM_PROD_CLASS
				, 0								as PITEM_LDTOL_FLAG
				, 0								as PITEM_LDTOL_PTOL
				, 0								as PITEM_LDTOL_NTOL
				, NULL							as PITEM_PROD_HAZID
				, bprod.BASE_CODE				as PITEM_BASE_CODE
				, bprod.BASE_NAME				as PITEM_BASE_NAME
				, 0								as PITEM_RATIO_VALUE
				, 0								as PITEM_BLTOL_FLAG
				, 0								as PITEM_BLTOL_PTOL
				, 0								as PITEM_BLTOL_NTOL
				, 'N'							as PITEM_HOT_MAIN
				, decode(bprod.BASE_CAT,6,1,0)	as PITEM_ADTV_FLAG
				, 0								as PITEM_RATIO_SUBSEQ
				, 0								as PITEM_RATIO_SEQ
				, 0								as PITEM_RATIO_SUBCOUNT
				, 0								as PITEM_RATIO_COUNT
				, 0								as PITEM_RATIO_TOTAL
				, bprod.BASE_PROD_GROUP			as PITEM_BASE_GROUP
				, bpgrp.PGR_DESCRIPTION			as PITEM_BASE_GRPNAME
				, bprod.BASE_CAT				as PITEM_BASE_CLASS
				, bpcls.BCLASS_DESC				as PITEM_BCLASS_NAME
				, bprod.BASE_LIMIT_PRESET_HT	as PITEM_HOT_CHECK
				, bprod.BASE_RPT_TUNT			as PITEM_BASE_TUNIT
				, bunit.DESCRIPTION				as PITEM_BASE_TUNITNAME
				, bprod.BASE_RPT_TEMP			as PITEM_BASE_RPTTEMP
				, bpcls.BCLASS_DENS_LO			as PITEM_BCLASS_DENS_LO
				, bpcls.BCLASS_DENS_HI			as PITEM_BCLASS_DENS_HI
				, bpcls.BCLASS_VCF_ALG			as PITEM_BCLASS_VCF_ALG
				, bpcls.BCLASS_TEMP_LO			as PITEM_BCLASS_TEMP_LO
				, bpcls.BCLASS_TEMP_HI			as PITEM_BCLASS_TEMP_HI
			from 
				PRODUCT_GROUP					bpgrp
				, UNIT_SCALE_VW					bunit
				, BASE_PRODS					bprod
				, (
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
						1=1	
						and bs.BCLASS_NO = bm.BCLASS_ID(+)
				) 							bpcls
			where
				1=1  
				and bprod.BASE_CAT = bpcls.BCLASS_NO 
				and bprod.BASE_PROD_GROUP = bpgrp.PGR_CODE(+) 
				and bprod.BASE_RPT_TUNT = bunit.UNIT_ID(+) 
			order by bprod.BASE_CODE
		";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getDrawerProductItems( $prod, $cmpy )
	{
		/*
		$sql="
			select
				PITEM_PROD_CODE
				, PITEM_PROD_NAME
				, PITEM_CMPY_CODE
				, PITEM_CMPY_NAME
				, PITEM_PROD_GROUP
				, PITEM_PROD_CLASS
				, PITEM_LDTOL_FLAG
				, PITEM_LDTOL_PTOL
				, PITEM_LDTOL_NTOL
				, PITEM_PROD_HAZID
				, PITEM_BASE_CODE
				, PITEM_BASE_NAME
				, PITEM_RATIO_VALUE
				, PITEM_BLTOL_FLAG
				, PITEM_BLTOL_PTOL
				, PITEM_BLTOL_NTOL
				, PITEM_HOT_MAIN
				, PITEM_ADTV_FLAG
				, PITEM_RATIO_SUBSEQ
				, PITEM_RATIO_SEQ
				, PITEM_RATIO_SUBCOUNT
				, PITEM_RATIO_COUNT
				, PITEM_RATIO_TOTAL
				, PITEM_BASE_GROUP
				, PITEM_BASE_GRPNAME
				, PITEM_BASE_CLASS
				, PITEM_BCLASS_NAME
				, PITEM_BASE_TUNIT
				, PITEM_BASE_TUNITNAME
				, PITEM_BASE_RPTTEMP
				, PITEM_BCLASS_DENS_LO
				, PITEM_BCLASS_DENS_HI
				, PITEM_BCLASS_VCF_ALG
				, PITEM_BCLASS_TEMP_LO
				, PITEM_BCLASS_TEMP_HI
			from
				GUI_PRODUCT_ITEMS
			where 
				1=1
				and PITEM_PROD_CODE='$prod'
				and PITEM_CMPY_CODE='$cmpy'
			order by
				PITEM_CMPY_CODE, PITEM_PROD_CODE
		";
		*/	
		
		$sql = array();
        $sql['sql_text'] = "
			select
				PITEM_PROD_CODE
				, PITEM_PROD_NAME
				, PITEM_CMPY_CODE
				, PITEM_CMPY_NAME
				, PITEM_PROD_GROUP
				, PITEM_PROD_CLASS
				, PITEM_LDTOL_FLAG
				, PITEM_LDTOL_PTOL
				, PITEM_LDTOL_NTOL
				, PITEM_PROD_HAZID
				, PITEM_BASE_CODE
				, PITEM_BASE_NAME
				, PITEM_RATIO_VALUE
				, PITEM_BLTOL_FLAG
				, PITEM_BLTOL_PTOL
				, PITEM_BLTOL_NTOL
				, PITEM_HOT_MAIN
				, PITEM_ADTV_FLAG
				, PITEM_RATIO_SUBSEQ
				, PITEM_RATIO_SEQ
				, PITEM_RATIO_SUBCOUNT
				, PITEM_RATIO_COUNT
				, PITEM_RATIO_TOTAL
				, PITEM_BASE_GROUP
				, PITEM_BASE_GRPNAME
				, PITEM_BASE_CLASS
				, PITEM_BCLASS_NAME
				, PITEM_HOT_CHECK
				, PITEM_BASE_TUNIT
				, PITEM_BASE_TUNITNAME
				, PITEM_BASE_RPTTEMP
				, PITEM_BCLASS_DENS_LO
				, PITEM_BCLASS_DENS_HI
				, PITEM_BCLASS_VCF_ALG
				, PITEM_BCLASS_TEMP_LO
				, PITEM_BCLASS_TEMP_HI
			from
				GUI_PRODUCT_ITEMS
			where 
				1=1
				and PITEM_CMPY_CODE=:cmpy_code
				and PITEM_PROD_CODE=:prod_code
			order by
				PITEM_CMPY_CODE, PITEM_PROD_CODE
		";
		$sql['sql_data'] = array( $cmpy, $prod );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
   public function getPagedGenericProducts($values, $dtypes, $sorts, $orders, $pageNum = 1, $pageSize = 50)
	{
        $g = new GlobalClass();
	
		if ($values == "" || is_string($values) )
		{
			//$filter = $values;
			$filterObj = array();
			$filterObj['sql_text'] = $values;
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		} 
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY GEN_PROD_CODE";
		
		//$query = "SELECT * FROM GUI_GENERIC_PRODUCTS $filter $sort";
		$query = "SELECT * FROM GUI_GENERIC_PRODUCTS " . $filter['sql_text'] . " $sort";

		$low   = ($pageNum-1)*$pageSize+1;
		$high  = $pageNum*$pageSize; 
		//$queryPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		
		$queryPaged = array();
        $queryPaged['sql_text'] = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		$queryPaged['sql_data'] = $filter['sql_data'];
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($queryPaged);
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 


    public function isDrawerProductCodeUsed( $prod )
	{
		//$sql = "select * from PRODUCTS where PROD_CODE='$prod' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from PRODUCTS where PROD_CODE=:prod_code ";
		$sql['sql_data'] = array( $prod );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isDrawerProductKeyUsed( $cmpy, $prod )
	{
		//$sql = "select * from PRODUCTS where PROD_CMPY='$cmpy' and PROD_CODE='$prod' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from PRODUCTS where PROD_CMPY=:cmpy_code and PROD_CODE=:prod_code ";
		$sql['sql_data'] = array( $cmpy, $prod );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isDrawerProductItemKeyUsed( $cmpy, $prod, $base )
	{
		//$sql = "select * from RATIOS where RAT_PROD_PRODCMPY='$cmpy' and RAT_PROD_PRODCODE='$prod' and RATIO_BASE='$base' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from RATIOS where RAT_PROD_PRODCMPY=:cmpy_code and RAT_PROD_PRODCODE=:prod_code and RATIO_BASE=:base_code ";
		$sql['sql_data'] = array( $cmpy, $prod, $base );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }


    public function getDefaultTimeString()
	{
        $mydb = DB::getInstance();
        $sql="
			select CONFIG_VALUE from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_TIME_STRING' 
			";
        $rows = $mydb->query($sql, "N");
		
		$str = "23:59:59";
		if ( count( $rows ) > 0 )
		{
			$str = $rows[0]->CONFIG_VALUE;
		}
		
        return $str;
    }
	

/*
baseProd	123456789                prod	PRODTEST2                           cmpy	0002                prod	PRODTEST3
ratio	100                          prodNm	prod test 2                         prod	PRODTEST2           prodNm	prod test 3
cmpy	0002                         prodGrp	COMPLIES                        prodNm	prod test 2         prodGrp	COMPLIES
prod	PRODTEST2                    hz_id	1267                                prodGrp	COMPLIES            hz_id	1863
prodNm	prod test 2                  prodCls	GEN_TEST2                       hz_id	1267                prodCls	GEN_TEST2
pro_ins	Y                            cmd	ADD                                 prodCls	GEN_TEST2           loadtolerancecheck	on
prodGrp	COMPLIES                     genNm	                                    op	28                      negativeLimit	-3.15
hz_id	1267                         op	18                                      ratio	0                   psotiveLimit	+3.15
prodCls	GEN_TEST2                    ratio	/                                   pro_ins	Y                   cmd	ADD
baseNm	-1                           cmpy	0002                                negativeLimit	-1          genNm	
cmd	ADD                                                                         psotiveLimit	-1          op	18
loadtolerancecheck	-1               ???????????????????                                                    ratio	/
negativeLimit	-1                                                                                          cmpy	0002
psotiveLimit	-1                                                                                          
blend_lower	-3.8                                                                                            ??????????
blend_upper	+3.8
blendtolerance_check	on
op	37

<span id="feedback" style="COLOR: #FF0000;">Successful Updated</span>
*/
    
    public function create($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        /**************************************************************************************************
        Call CGI to CREATE Drawer Product
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Drawer Product++++++",DRAWERPRODUCT);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy'=>urlencode($data->prod_cmpycode),
            'prod'=>urlencode($data->prod_code),
            'prodNm'=>urlencode($data->prod_name),
            'prodGrp'=>urlencode($data->prod_group),
            'hz_id'=>urlencode($data->prod_hazid),
            'prodCls'=>urlencode($data->prod_class),
            'loadtolerancecheck'=>urlencode($data->prod_ldtol_flag),
            'negativeLimit'=>urlencode($data->prod_ldtol_ntol),
            'psotiveLimit'=>urlencode($data->prod_ldtol_ptol),
            'genNm'=>urlencode(""),
            'ratio'=>urlencode("/"),
            'compliance'=>urlencode($data->prod_is_compliant),
            'cmd'=>urlencode("ADD"),   	
			'op'=>urlencode("18")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "pro_ins=Y";
        $patternSuccessChn = "pro_ins=Y";
        $isFoundEng = strstr($response, $patternSuccessEng);
        $isFoundChn = strstr($response, $patternSuccessChn);
        if ($isFoundEng == false && $isFoundChn == false) {
                logMe("Add Drawer Product failed!!!",DRAWERPRODUCT);
                return "ERROR";
        }
        logMe("CGI Add Drawer Product succeeded!!!",DRAWERPRODUCT);
		
		// update product name
		$this->updateProductName($data->prod_cmpycode, $data->prod_code, $data->prod_name);
		
		// update product description
		$this->updateProductDescription($data->prod_cmpycode, $data->prod_code, $data->prod_desc);
		
		// update load tolerance values
		$this->updateLoadToleranceFields($data->prod_code, $data->prod_cmpycode, $data->prod_ldtol_ptol, $data->prod_ldtol_ntol);
        $this->updateCompliantField($data->prod_code, $data->prod_cmpycode, $data->prod_is_compliant);
		
		// update product dg link
		$this->updateProductDGLink($data);
		
		// update fields related to hot volume check
		$this->updateHotVolumeCheckFields($data->prod_code, $data->prod_cmpycode, $data->prod_check_hot_volume, $data->prod_15_density, $data->prod_hot_temp);
		// update fields related to link of 2nd drawer company
		$this->updateLinkDrawerFields($data->prod_code, $data->prod_cmpycode, $data->prod_check_2nd_drawer, $data->prod_2nd_drawer, $data->prod_2nd_product);

		if ( is_array($data->prod_items) === FALSE )
		{
			$data->prod_items = (array)($data->prod_items);
		}
		if( $data->has_items=="1" && sizeof($data->prod_items) > 0 )
		{
			for($i=0; $i<sizeof($data->prod_items); $i++)
			{      
				logMe("Info: ++++++Adding new Drawer Product Ratio++++++",DRAWERPRODUCT);
				logMe("Info111: ++++++Adding new Drawer Product Ratio++++++",DRAWERPRODUCT."---".sizeof($data->prod_items));
				logMe("Info112: ++++++Adding new Drawer Product Ratio++++++",DRAWERPRODUCT."---".gettype($data->prod_items));
				logMe("Info113: ++++++Adding new Drawer Product Ratio++++++",DRAWERPRODUCT."---".gettype($data->prod_items[$i]));
				
				$ratio_item = $data->prod_items[$i];
				$ratio_item->session_id = $data->session_id;
                                $ratio_item->prod_is_compliant = $data->prod_is_compliant;
				$ratioResult = "OK";
				if ( $i == 0 )
				{
					// need create both drawer product and its first ratio
					$ratioResult = $this->createRatio( $ratio_item, "Y" );
					if ( $ratioResult == "OK" )
					{
						// update product name
						$this->updateProductName($data->prod_cmpycode, $data->prod_code, $data->prod_name);
		
						// update product description
						$this->updateProductDescription($data->prod_cmpycode, $data->prod_code, $data->prod_desc);
		
						// update load tolerance values
						$this->updateLoadToleranceFields($data->prod_code, $data->prod_cmpycode, $data->prod_ldtol_ptol, $data->prod_ldtol_ntol);
						$this->updateCompliantField($data->prod_code, $data->prod_cmpycode, $data->prod_is_compliant);
		
						// update product dg link
						$this->updateProductDGLink($data);

						// update fields related to hot volume check
						$this->updateHotVolumeCheckFields($data->prod_code, $data->prod_cmpycode, $data->prod_check_hot_volume, $data->prod_15_density, $data->prod_hot_temp);
						// update fields related to link of 2nd drawer company
						$this->updateLinkDrawerFields($data->prod_code, $data->prod_cmpycode, $data->prod_check_2nd_drawer, $data->prod_2nd_drawer, $data->prod_2nd_product);
					}
				}
				else
				{
					// just need create the ratio
					$ratioResult = $this->createRatio( $ratio_item, "-1" );
				}
				if ( $ratioResult != "OK" )
				{
					return $ratioResult;
				}
				
			}
		}
		
        return "OK";
    }  

	
/*
prod	PRODTEST2                 prod	PRODTEST2
prodNm	prod test 2               prodNm	prod test 2
prodGrp	COMPLIES                  prodGrp	COMPLIES
hz_id	1267                      hz_id	1267
prodCls	GEN_TEST                  prodCls	GEN_TEST
loadtolerancecheck	on            cmd	MOD
negativeLimit	-3.56             genNm	
psotiveLimit	+3.56             op	17
cmd	MOD                           ratio	1
genNm	                          cmpy	0002
op	17
ratio	1
cmpy	0002

<span id="feedback" style="COLOR: #FF0000;">Successful Updated</span>
*/	
    public function update($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("PROD_CMPY"=>($data->prod_cmpycode), "PROD_CODE"=>($data->prod_code));
		$excludes = array ("PROD_PRICE"=>0, "PROD_PRICE_UNIT"=>0, "PROD_TXT_COLOUR"=>0, "PROD_BACK_COLOUR"=>0, "PROD_RPT_UNIT"=>0, "PROD_RPT_TEMP"=>0, "PROD_NUMBER"=>0, "PROD_IS_BLEND"=>0 );
		$upd_journal = new UpdateJournalClass( "Drawer Products", "PRODUCTS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Drawer Product 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Drawer Product++++++",DRAWERPRODUCT);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy'=>urlencode($data->prod_cmpycode),
            'prod'=>urlencode($data->prod_code),
            'prodNm'=>urlencode($data->prod_name),
            'prodGrp'=>urlencode($data->prod_group),
            'hz_id'=>urlencode($data->prod_hazid),
            'prodCls'=>urlencode($data->prod_class),
            'loadtolerancecheck'=>urlencode($data->prod_ldtol_flag),
            'negativeLimit'=>urlencode($data->prod_ldtol_ntol),
            'psotiveLimit'=>urlencode($data->prod_ldtol_ptol),
            'genNm'=>urlencode(""),
            'ratio'=>urlencode("1"),
            'cmd'=>urlencode("MOD"),   	
			'op'=>urlencode("17")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">Successful Updated</span>";
        $patternSuccessChn = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">修改成功</span>";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Update Drawer Product!!!",DRAWERPRODUCT);
                return "ERROR";
        }
        logMe("CGI Update Drawer Product!!!",DRAWERPRODUCT);
		
		// update product name
		$this->updateProductName($data->prod_cmpycode, $data->prod_code, $data->prod_name);
		
		// update product description
		$this->updateProductDescription($data->prod_cmpycode, $data->prod_code, $data->prod_desc);
		
		// update load tolerance values
		$this->updateLoadToleranceFields($data->prod_code, $data->prod_cmpycode, $data->prod_ldtol_ptol, $data->prod_ldtol_ntol);
		$this->updateCompliantField($data->prod_code, $data->prod_cmpycode, $data->prod_is_compliant);
		
		// update product dg link
		$this->updateProductDGLink($data);

		// update fields related to hot volume check
		$this->updateHotVolumeCheckFields($data->prod_code, $data->prod_cmpycode, $data->prod_check_hot_volume, $data->prod_15_density, $data->prod_hot_temp);
		// update fields related to link of 2nd drawer company
		$this->updateLinkDrawerFields($data->prod_code, $data->prod_cmpycode, $data->prod_check_2nd_drawer, $data->prod_2nd_drawer, $data->prod_2nd_product);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
        logMe("CGI LOG0 Update Drawer Product!!!",DRAWERPRODUCT);
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
        logMe("CGI LOG1 Update Drawer Product!!!",DRAWERPRODUCT);
		$upd_journal->log();
        logMe("CGI LOG2 Update Drawer Product!!!",DRAWERPRODUCT);
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		// get the original list of product ratios
		if( $data->has_items=="1" && sizeof($data->prod_items) > 0 )
		{
			for($i=0; $i<sizeof($data->prod_items); $i++)
			{   
				//$errmsg = $i."\t".$data->prod_items[$i]->aitem_prodcode."\t".$data->prod_items[$i]->aitem_qtylimit."\taction: ".$data->actions[$i]->option."\t".sizeof($data->actions)."*******";
				//error_log( "\n*****ERRMSG_ALLOCS\n".$errmsg, 3, "temp.log");
			
				$ratio_item = $data->prod_items[$i];
				$ratio_item->session_id = $data->session_id;
				if ( $data->actions[$i]->option == "1" )
				{ // insert new product ratio
					$ratioResult = $this->createRatio( $ratio_item, "-1" );
					if ( $ratioResult != "OK" )
					{
						return $ratioResult;
					}
				}
				else
//				if ( $data->prod_items[$i]->action == 2 )
				if ( $data->actions[$i]->option == "2" )
				{ // update existing product ratio
					$ratioResult = $this->updateRatio( $ratio_item );
					if ( $ratioResult != "OK" )
					{
						return $ratioResult;
					}
				}
				else
				if ( $data->actions[$i]->option == "3" )
				{ // delete existing product ratio
					$ratioResult = $this->deleteRatio( $ratio_item );
					if ( $ratioResult != "OK" )
					{
						return $ratioResult;
					}
				}
				else
				{ // do nothing
					continue; 
				}
			
			}
		}
		
        return "OK";
    }  

	
/*
op	19
cmpy	0002
prod	PRODTEST2
prodNm	prod test 2
hz_id	1267
prodCls	GEN_TEST
cmd	DEL

<span id="feedback" style="COLOR: #FF0000;">Successful Deleted</span>
*/	
    public function delete($data)
	{
		// delete product dg link first
		$delRes = $this->deleteProductDGLink($data);
		if ( $delRes != "OK" )
		{
			return $delRes;
		}
		
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting DrawerProduct++++++",DRAWERPRODUCT);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy'=>urlencode($data->prod_cmpycode),
            'prod'=>urlencode($data->prod_code),
            'prodNm'=>urlencode($data->prod_name),
            'hz_id'=>urlencode($data->prod_hazid),
            'prodCls'=>urlencode($data->prod_class),
			'cmd'=>urlencode("DEL"),   	
			'op'=>urlencode("19")
        );
		
       $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">Successful Deleted</span>";
        $patternSuccessChn = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">删除成功</span>";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
            logMe("Delete DrawerProduct failed!!!",DRAWERPRODUCT);
            return "ERROR";
        }
        logMe("CGI Delete DrawerProduct succeeded!!!",DRAWERPRODUCT);

        return "OK";
    }   


/*
baseProd	200005590              baseProd	200001735               baseProd	200001274          baseProd	123456789
ratio	1                          ratio	123                     ratio	2345                   ratio	100
cmpy	0002                       cmpy	0002                        cmpy	0002                   cmpy	0002
prod	PRODTEST2                  prod	PRODTEST2                   prod	PRODTEST2              prod	PRODTEST2
prodNm	prod test 2                prodNm	prod test 2             prodNm	prod test 2            prodNm	prod test 2
pro_ins	-1                         pro_ins	-1                      pro_ins	-1                     pro_ins	Y
prodGrp	-1                         prodGrp	-1                      prodGrp	-1                     prodGrp	COMPLIES
hz_id	-1                         hz_id	-1                      hz_id	-1                     hz_id	1267
prodCls	-1                         prodCls	-1                      prodCls	-1                     prodCls	GEN_TEST2
baseNm	-1                         baseNm	-1                      baseNm	-1                     baseNm	-1
cmd	ADD                            cmd	ADD                         cmd	ADD                        cmd	ADD
loadtolerancecheck	-1             loadtolerancecheck	-1          loadtolerancecheck	-1         loadtolerancecheck	-1
negativeLimit	-1                 negativeLimit	-1              negativeLimit	-1             negativeLimit	-1
psotiveLimit	-1                 psotiveLimit	-1                  psotiveLimit	-1             psotiveLimit	-1
blend_lower	-3.3                   blend_lower	-3.1                op	37                         blend_lower	-3.8
blend_upper	+3.3                   blend_upper	+3.1                                               blend_upper	+3.8
blendtolerance_check	on         blendtolerance_check	on                                         blendtolerance_check	on
op	37                             op	37                                                         op	37

<span id="feedback" style="COLOR: #FF0000;">Successful Updated</span>
*/
    public function createRatio($data, $dp_ins="-1")
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        /**************************************************************************************************
        Call CGI to CREATE Drawer Product Ratio
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Drawer Product Ratio++++++",DRAWERPRODUCT);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'baseProd'=>urlencode($data->pitem_base_code),
            'ratio'=>urlencode($data->pitem_ratio_value),
            'cmpy'=>urlencode($data->pitem_cmpy_code),
            'prod'=>urlencode($data->pitem_prod_code),
            'prodNm'=>urlencode($data->pitem_prod_name),
            'pro_ins'=>urlencode($dp_ins),
            'prodGrp'=>urlencode($data->pitem_prod_group),
            'hz_id'=>urlencode($data->pitem_prod_hazid),
            'prodCls'=>urlencode($data->pitem_prod_class),
            'baseNm'=>urlencode($data->pitem_base_name),
            'loadtolerancecheck'=>urlencode($data->pitem_ldtol_flag),
            'negativeLimit'=>urlencode($data->pitem_ldtol_ntol),
            'psotiveLimit'=>urlencode($data->pitem_ldtol_ptol),
            'blend_lower'=>urlencode($data->pitem_bltol_ntol),
            'blend_upper'=>urlencode($data->pitem_bltol_ptol),
//            'blendtolerance_check'=>urlencode($data->pitem_bltol_flag),
            'blendtolerance_check'=>urlencode($data->pitem_bltol_flag=='1'?'on':''),
            'compliance'=>urlencode($data->prod_is_compliant),
            'cmd'=>urlencode("ADD"),   	
			'op'=>urlencode("37")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        //$patternSuccessEng = "stBar=Success";
        //$patternSuccessChn = "stBar=成功";
        $patternSuccessEng = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">Successful Updated</span>";
        $patternSuccessChn = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">修改成功</span>";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Add Drawer Product Ratio failed!!!",DRAWERPRODUCT);
                return "ERROR";
        }
        logMe("CGI Add Drawer Product Ratio succeeded!!!",DRAWERPRODUCT);
		
		// update blend tolerance values
		$this->updateBlendToleranceFields($data->pitem_prod_code, $data->pitem_cmpy_code, $data->pitem_base_code, $data->pitem_bltol_ptol, $data->pitem_bltol_ntol);
		
		// update hot main flag
		$this->updateRatioHotMainField($data->pitem_prod_code, $data->pitem_cmpy_code, $data->pitem_base_code, $data->pitem_hot_main);
		
        return "OK";
    }  


/*
ratio	2347
cmpy	0002
prod	PRODTEST2
prodNm	prod test 2
baseProd	200001274
pro_ins	-1
prodGrp	-1
hz_id	-1
prodCls	-1
baseNm	FSII/CI-LI
cmd	MOD
loadtolerancecheck	-1
negativeLimit	-1
psotiveLimit	-1
blend_lower	-3.53
blend_upper	+3.53
blendtolerance_check	on
op	37

<span id="feedback" style="COLOR: #FF0000;">Successful Updated</span>
*/	
    public function updateRatio($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ( "RATIO_BASE"=>($data->pitem_base_code), "RAT_PROD_PRODCMPY"=>($data->pitem_cmpy_code), "RAT_PROD_PRODCODE"=>($data->pitem_prod_code) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Drawer Product Ratios", "RATIOS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Drawer Product Ratio 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Drawer Product Ratio++++++",DRAWERPRODUCT);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'baseProd'=>urlencode($data->pitem_base_code),
            'ratio'=>urlencode($data->pitem_ratio_value),
            'cmpy'=>urlencode($data->pitem_cmpy_code),
            'prod'=>urlencode($data->pitem_prod_code),
            'prodNm'=>urlencode($data->pitem_prod_name),
            'pro_ins'=>urlencode("-1"),
            'prodGrp'=>urlencode($data->pitem_prod_group),
            'hz_id'=>urlencode($data->pitem_prod_hazid),
            'prodCls'=>urlencode($data->pitem_prod_class),
            'baseNm'=>urlencode($data->pitem_base_name),
            'loadtolerancecheck'=>urlencode($data->pitem_ldtol_flag),
            'negativeLimit'=>urlencode($data->pitem_ldtol_ntol),
            'psotiveLimit'=>urlencode($data->pitem_ldtol_ptol),
            'blend_lower'=>urlencode($data->pitem_bltol_ntol),
            'blend_upper'=>urlencode($data->pitem_bltol_ptol),
//            'blendtolerance_check'=>urlencode($data->pitem_bltol_flag),
            'blendtolerance_check'=>urlencode($data->pitem_bltol_flag=='1'?'on':''),
            'cmd'=>urlencode("MOD"),   	
			'op'=>urlencode("37")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">Successful Updated</span>";
        $patternSuccessChn = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">修改成功</span>";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Update Drawer Product Ratio!!!",DRAWERPRODUCT);
                return "ERROR";
        }
        logMe("CGI Update Drawer Product Ratio!!!",DRAWERPRODUCT);
		
		// update blend tolerance values
		$this->updateBlendToleranceFields($data->pitem_prod_code, $data->pitem_cmpy_code, $data->pitem_base_code, $data->pitem_bltol_ptol, $data->pitem_bltol_ntol);
		
		// update hot main flag
		$this->updateRatioHotMainField($data->pitem_prod_code, $data->pitem_cmpy_code, $data->pitem_base_code, $data->pitem_hot_main);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
 		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        return "OK";
    }  

	
/*
op	39
cmpy	0002
prod	PRODTEST2
baseProd	200001274
baseNm	FSII/CI-LI
ratio	2347
cmd	DEL
prodNm	prod test 2
--prod	PRODTEST2

<span id="feedback" style="COLOR: #FF0000;">Successful Updated</span>
*/	
    public function deleteRatio($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting Drawer Product Ratio++++++",DRAWERPRODUCT);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy'=>urlencode($data->pitem_cmpy_code),
            'prod'=>urlencode($data->pitem_prod_code),
            'prodNm'=>urlencode($data->pitem_prod_name),
            'baseProd'=>urlencode($data->pitem_base_code),
            'baseNm'=>urlencode($data->pitem_base_name),
            'ratio'=>urlencode($data->pitem_ratio_value),
			'cmd'=>urlencode("DEL"),   	
			'op'=>urlencode("39")
        );

       $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">Successful Updated</span>";
        $patternSuccessChn = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">修改成功</span>";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
            logMe("Delete Drawer Product Ratio failed!!!",DRAWERPRODUCT);
            return "ERROR";
        }
        logMe("CGI Delete Drawer Product Ratio succeeded!!!",DRAWERPRODUCT);

        return "OK";
    }   
	
	
/*
GENERIC PRODUCT
op	13
prod	
cmpy	0002
newgenprd	GEN_TEST2

<span id="feedback" style="COLOR: #FF0000;">Success</span>
*/	
    public function createGenProd($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        /**************************************************************************************************
        Call CGI to CREATE Generic Product
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Generic Product ++++++",DRAWERPRODUCT);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy'=>urlencode($data->prod_cmpycode),
            'newgenprd'=>urlencode($data->prod_class),
            'prod'=>urlencode($data->prod_code),
			'op'=>urlencode("13")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        //$patternSuccessEng = "stBar=Success";
        //$patternSuccessChn = "stBar=成功";
        $patternSuccessEng = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">Success</span>";
        $patternSuccessChn = "<span id=\"feedback\" style=\"COLOR: #FF0000;\">成功</span>";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Add Generic Product failed!!!",DRAWERPRODUCT);
                return "ERROR";
        }
        logMe("CGI Add Generic Product succeeded!!!",DRAWERPRODUCT);
		
        return "OK";
    }  
	
    public function deleteGenProd( $code )
	{
        $mydb = DB::getInstance();
        //$sql="delete from GENERIC_PROD where GEN_PROD_CODE='$code' ";
		
		$sql = array();
        $sql['sql_text'] = "delete from GENERIC_PROD where GEN_PROD_CODE=:genprod_code ";
		$sql['sql_data'] = array( $code );
		
        $result = $mydb->delete($sql);
		if ( $result == RETURN_OK )
		{
			return "OK";
		}
		else
		{
            return "ERROR";
		}
    }
	
    public function updateLoadToleranceFields($prod, $cmpy, $ptol, $ntol)
	{
		if ( trim($ptol) == "" )
		{
			$ptol = '0.0';
		}
		if ( trim($ntol) == "" )
		{
			$ntol = '0.0';
		}
		
        $mydb = DB::getInstance();
		/*
        $sql="
			update PRODUCTS set 
				PROD_LDTOL_PTOL=$ptol
				, PROD_LDTOL_NTOL=$ntol  
			where 
				PROD_CODE='$prod'
				and PROD_CMPY='$cmpy'
		";
		*/
		$sql = array();
        $sql['sql_text'] = "
			update PRODUCTS set 
				PROD_LDTOL_PTOL=:ptol
				, PROD_LDTOL_NTOL=:ntol  
			where 
				PROD_CODE=:prod_code
				and PROD_CMPY=:cmpy_code
		";
		$sql['sql_data'] = array( $ptol, $ntol, $prod, $cmpy );
		
        $result = $mydb->update($sql);
        return $result;
    }
	
    public function updateBlendToleranceFields($prod, $cmpy, $base, $ptol, $ntol)
	{
		if ( trim($ptol) == "" )
		{
			$ptol = '0.0';
		}
		if ( trim($ntol) == "" )
		{
			$ntol = '0.0';
		}

        $mydb = DB::getInstance();
		/*
        $sql="
			update RATIOS set 
				RAT_BLTOL_PTOL=$ptol
				, RAT_BLTOL_NTOL=$ntol  
			where 
				RAT_PROD_PRODCODE='$prod'
				and RAT_PROD_PRODCMPY='$cmpy'
				and RATIO_BASE='$base'
		";
		*/
		$sql = array();
        $sql['sql_text'] = "
			update RATIOS set 
				RAT_BLTOL_PTOL=:ptol
				, RAT_BLTOL_NTOL=:ntol  
			where 
				RAT_PROD_PRODCODE=:prod_code
				and RAT_PROD_PRODCMPY=:cmpy_code
				and RATIO_BASE=:base_code
		";
		$sql['sql_data'] = array( $ptol, $ntol, $prod, $cmpy, $base );
		
        $result = $mydb->update($sql);
        return $result;
    }
	
    public function updateRatioHotMainField($prod, $cmpy, $base, $flag)
	{
		if ( trim($flag) == "" )
		{
			$flag = 'N';
		}
		if ( $flag == "0" )
		{
			$flag = 'N';
		}
		if ( $flag == "1" )
		{
			$flag = 'Y';
		}

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update RATIOS set 
				RAT_HOT_MAIN=:hot_flag
			where 
				RAT_PROD_PRODCODE=:prod_code
				and RAT_PROD_PRODCMPY=:cmpy_code
				and RATIO_BASE=:base_code
		";
		$sql['sql_data'] = array( $flag, $prod, $cmpy, $base );
		
        $result = $mydb->update($sql);
        return $result;
    }
	
    public function updateCompliantField($prod, $cmpy, $flag)
	{
		if ( trim($flag) == "" )
		{
			$flag = 0;
		}

        $mydb = DB::getInstance();
		/*
        $sql="
			update PRODUCTS set 
				PROD_IS_COMPLIANT=$flag
			where 
				PROD_CODE='$prod'
				and PROD_CMPY='$cmpy'
		";
		*/
		$sql = array();
        $sql['sql_text'] = "
			update PRODUCTS set 
				PROD_IS_COMPLIANT=:cmplnt_flag
			where 
				PROD_CODE=:prod_code
				and PROD_CMPY=:cmpy_code
		";
		$sql['sql_data'] = array( $flag, $prod, $cmpy );
		
        $result = $mydb->update($sql);
        return $result;
    }
	
    public function updateProductName($cmpy, $code, $name)
	{
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "update PRODUCTS set PROD_NAME=:prodname where PROD_CODE=:prodcode and PROD_CMPY=:prodcmpy";
		$sql['sql_data'] = array( $name, $code, $cmpy );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateProductDescription($cmpy, $code, $desc)
	{
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "update PRODUCTS set PROD_DESC=:proddesc where PROD_CODE=:prodcode and PROD_CMPY=:prodcmpy";
		$sql['sql_data'] = array( $desc, $code, $cmpy );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateProductColors($cmpy, $code, $back_color, $text_color)
	{
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "
			update PRODUCTS 
			set 
				PROD_BACK_COLOUR = :backcolor 
				, PROD_TXT_COLOUR = :textcolor
			where 
				PROD_CODE=:prodcode 
				and PROD_CMPY=:prodcmpy
		";
		$sql['sql_data'] = array( $back_color, $text_color, $code, $cmpy );
		
        $result = $mydb->update($sql);
		
        if ($result == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    }
	
	//The following is the functions to manage DG_LINK records
	
    public function createProductDGLink($data)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DG_LINK
			( 
				DGLNK_SP_PRODCODE
				, DGLNK_SP_PRODCMPY
				, DG_LINK_ID			
			) 
			values 
			( 
				:prod_code
				, :prod_cmpy
				, :dg_link_id
			) 
		";

		$sql['sql_data'] = array( $data->prod_code, $data->prod_cmpycode, $data->prod_dglink );
		
        $res = $mydb->insert($sql);
		
        if ($res == RETURN_OK)
        {
			$keys = array ("DGLNK_SP_PRODCODE"=>($data->prod_code), "DGLNK_SP_PRODCMPY"=>($data->prod_cmpycode));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Product DG Link", "DG_LINK", $keys, $excludes );
			$ins_journal->logOneLine("created a product dg link [" . $data->prod_code . " - " . $data->prod_cmpycode . " - " . $data->prod_dglink . "] successfully");
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
		
    }
    
    public function updateProductDGLink($data)
	{
		$this->createProductDGLink($data);
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("DGLNK_SP_PRODCODE"=>($data->prod_code), "DGLNK_SP_PRODCMPY"=>($data->prod_cmpycode));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Product DG Link", "DG_LINK", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DG_LINK set
				DG_LINK_ID = :dg_link_id
			where 
				 DGLNK_SP_PRODCODE=:prod_code 
				 and DGLNK_SP_PRODCMPY=:prod_cmpy
		";
		$sql['sql_data'] = array( $data->prod_dglink, $data->prod_code, $data->prod_cmpycode );
		
        $res = $mydb->update($sql);
		
        if ($res == RETURN_OK)
        {
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    }
    
    public function deleteProductDGLink($data)
	{
        $mydb = DB::getInstance();        
		$sql = array();
		$sql['sql_text'] = "delete from DG_LINK where DGLNK_SP_PRODCODE=:prod_code and DGLNK_SP_PRODCMPY=:prod_cmpy";
		$sql['sql_data'] = array( $data->prod_code, $data->prod_cmpycode );
		$res = $mydb->delete($sql);
		
        if ($res == RETURN_OK)
        {
			$keys = array ("DGLNK_SP_PRODCODE"=>($data->prod_code), "DGLNK_SP_PRODCMPY"=>($data->prod_cmpycode));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Product DG Link", "DG_LINK", $keys, $excludes );
			$del_journal->logOneLine("deleted a product dg link [" . $data->prod_code . " - " . $data->prod_cmpycode . " - " . $data->prod_dglink . "] successfully");
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    } 
	
    public function updateHotVolumeCheckFields($prod, $cmpy, $flag, $dens, $temp)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update PRODUCTS set 
				PROD_CHECK_HOT_VOLUME=:prod_check_hot_volume
				, PROD_15_DENSITY=:prod_15_density  
				, PROD_HOT_TEMP=:prod_hot_temp  
			where 
				PROD_CODE=:prod_code
				and PROD_CMPY=:cmpy_code
		";
		
		$sql['sql_data'] = array( $flag, $dens, $temp, $prod, $cmpy );
		
        $result = $mydb->update($sql);
        return $result;
    }
	
    public function updateLinkDrawerFields($prod, $cmpy, $flag, $cmpy2, $prod2)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update PRODUCTS set 
				PROD_CHECK_2ND_DRAWER=:prod_check_2nd_drawer
				, PROD_2ND_DRAWER=:prod_2nd_drawer  
				, PROD_2ND_PRODUCT=:prod_2nd_product  
			where 
				PROD_CODE=:prod_code
				and PROD_CMPY=:cmpy_code
		";
		
		$sql['sql_data'] = array( $flag, $cmpy2, $prod2, $prod, $cmpy );
		
        $result = $mydb->update($sql);
        return $result;
    }
	
}
?>