<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );
require_once( 'ScreenFormButtonService.php' );

if(!defined('BASEPRODUCT')) define('BASEPRODUCT','BaseProductService.class');

class BaseProductService
{
	var $username;
	var $password;
	var $server;
	var $connect;
    var $mylang='ENG';
	var $myview="
			select
				bp.BASE_CODE
				, bp.BASE_NAME
				, decode(bp.BASE_PROD_GROUP, 'null', '', bp.BASE_PROD_GROUP)		as BASE_PROD_GROUP
				, bg.PGR_DESCRIPTION												as BASE_GROUP_NAME
				, bp.BASE_CAT
				, bc.BCLASS_DESC													as BASE_CLASS_DESC
				, bp.BASE_RPT_TUNT
				, bp.BASE_RPT_TEMP
				, bp.BASE_DENS_LO
				, bp.BASE_DENS_HI
				, bp.BASE_COLOR
				, decode(bp.BASE_CAT, 6, 1, 0)										as BASE_ADTV
				, bp.BASE_CODE||' - '||bp.BASE_NAME									as BASE_TEXT
				, bp.BASE_CODE||' - '||bp.BASE_NAME||' ('||bc.BCLASS_DESC||') ' 	as BASE_DESC
				, bc.BCLASS_DENS_LO													as BASE_CLASS_DENS_LO
				, bc.BCLASS_DENS_HI													as BASE_CLASS_DENS_HI
				, bc.BCLASS_VCF_ALG													as BASE_CLASS_VCF_ALG
				, bc.BCLASS_TEMP_LO													as BASE_CLASS_TEMP_LO
				, bc.BCLASS_TEMP_HI													as BASE_CLASS_TEMP_HI
				, bt.BASE_TANK_COUNT												as BASE_TANK_COUNT
				, bt.BASE_TANK_LIST													as BASE_TANK_LIST
				, bp.BASE_REF_TEMP
				, bp.BASE_REF_TUNT
				, bp.BASE_LIMIT_PRESET_HT
				, bp.BASE_CORR_MTHD
				, bp.BASE_REF_TEMP_SPEC
				, uv.DESCRIPTION													as BASE_REF_TUNT_NAME
				, cm.COMPENSATION_NAME												as BASE_CORR_MTHD_NAME
				, rts.REF_TEMP_SPEC_NAME											as BASE_REF_TEMP_SPEC_NAME
			from
				BASE_PRODS 			bp
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
				) 					bc
				, PRODUCT_GROUP		bg
				, (
					select
						TANKS.TANK_BASE
						, COUNT(TANKS.TANK_CODE) 													as BASE_TANK_COUNT
						, LISTAGG(TANKS.TANK_CODE, ', ') WITHIN GROUP (ORDER BY TANKS.TANK_CODE) 	as BASE_TANK_LIST
					from
						TANKS
					where
						1=1
					group by TANKS.TANK_BASE
				) bt
				, UNIT_SCALE_VW		uv
				, COMPENSATION_MTHD	cm
				, REF_TEMP_SPEC		rts
			where
				( ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
				or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
				or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
				and bp.BASE_CAT = bc.BCLASS_NO
				and bp.BASE_PROD_GROUP = bg.PGR_CODE(+)
				and bp.BASE_CODE = bt.TANK_BASE(+)
				and bp.BASE_REF_TUNT = uv.UNIT_ID(+)
				and bp.BASE_CORR_MTHD = cm.COMPENSATION_ID(+)
				and bp.BASE_REF_TEMP_SPEC = rts.REF_TEMP_SPEC_ID(+)
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
            $this->cgi = CGIDIR . "gantry/baseprods_mod.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/baseprods_mod.cgi";
        }


	}

	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) BPVIEW ";

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
		else $sort="ORDER BY BASE_CODE";

		$query = "SELECT * FROM ( " . $this->myview . " ) BPVIEW ";
		//$query = $query . " $filter $sort ";
		$query = $query . " " . $filter['sql_text'] . " $sort ";

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

    public function isBaseProductKeyUsed( $base_code )
	{
		//$sql = "select * from BASE_PRODS where BASE_CODE='$base_code' ";

		$sql = array();
        $sql['sql_text'] = "select * from BASE_PRODS where BASE_CODE=:base_code ";
		$sql['sql_data'] = array( $base_code );

        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );

        return $count;
   }

    public function isDefaultDrawerProductFound( $base_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from PRODUCTS where PROD_CODE=:base_code and PROD_CMPY='BaSePrOd'";
		$sql['sql_data'] = array( $base_code );

        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );

        return $count;
   }


/*
http://10.1.10.225/cgi-bin/en/gantry/baseprods_mod.cgi?base_code=TST1&base_name=tst1&bclass_desc=Gasolines&base_prod_group=&cmd=ADD&pg=0
base_code	TST1
base_name	tst1
bclass_desc	Gasolines
base_prod_group
cmd	ADD
pg	0

http-equiv="refresh" content="0;URL=baseprods.cgi?op=20&statusBar=Operation Succeeded!"
    <span id="feedback" style="COLOR: #FF0000;">Operation Succeeded!</span>
*/
    public function createByCGI($data)
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
        Call CGI to CREATE Base Product
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Base Product++++++",BASEPRODUCT);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'base_code'=>urlencode($data->base_code),
            'base_name'=>urlencode($data->base_name),
            'base_cat'=>urlencode($data->base_cat),
            'bclass_desc'=>urlencode($data->base_class_desc),
            'base_prod_group'=>urlencode($data->base_prod_group),
			'pg'=>0,
            'cmd'=>urlencode('ADD')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccessEng = "statusBar=Operation Succeeded!";
        $patternSuccessChn = "statusBar=�����ɹ�!";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Add Base Product failed!!!",BASEPRODUCT);
                return "ERROR";
        }
        logMe("CGI Add Base Product succeeded!!!",BASEPRODUCT);

        return "OK";
    }


/*
http://10.1.10.225/cgi-bin/en/gantry/baseprods_mod.cgi?base_code=TST1&base_name=tst1234&bclass_desc=Diesel+oils%2FFuel+oils%2FHeating+oils&base_prod_group=&cmd=MOD&pg=0
base_code	TST1
base_name	tst1234
bclass_desc	Diesel oils/Fuel oils/Heating oils
base_prod_group
cmd	MOD
pg	0

http-equiv="refresh" content="0;URL=baseprods.cgi?op=25&pg=0&statusBar=Operation Succeeded!"
      <span id="feedback" style="COLOR: #FF0000;">Operation Succeeded!</span>

*/
    public function updateByCGI($data)
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
		$keys = array ("BASE_CODE"=>($data->base_code));
		$excludes = array ("LAST_UPD_TIME"=>0, "BASE_CLASS_DESC"=>0);
		$upd_journal = new UpdateJournalClass( "Base Products", "BASE_PRODS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**************************************************************************************************
        Call CGI to modify Base Product
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Base Product++++++",BASEPRODUCT);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'base_code'=>urlencode($data->base_code),
            'base_name'=>urlencode($data->base_name),
            'base_cat'=>urlencode($data->base_cat),
            'bclass_desc'=>urlencode($data->base_class_desc),
            'base_prod_group'=>urlencode($data->base_prod_group),
			'pg'=>0,
            'cmd'=>urlencode('MOD')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccessEng = "statusBar=Operation Succeeded!";
        $patternSuccessChn = "statusBar=�����ɹ�!";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Update Base Product!!!",BASEPRODUCT);
                return "ERROR";
        }
        logMe("CGI Update Base Product!!!",BASEPRODUCT);

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
http://10.1.10.225/cgi-bin/en/gantry/baseprods_mod.cgi?statusBar=Operation%20Succeeded!&pg=0&op=25&base_name=tst1234&base_code=TST1&bclass_desc=Diesel%20oils/Fuel%20oils/Heating%20oils&base_prod_group=&cmd=DEL
statusBar	Operation Succeeded!
pg	0
op	25
base_name	tst1234
base_code	TST1
bclass_desc	Diesel oils/Fuel oils/Heating oils
base_prod_group
cmd	DEL

http-equiv="refresh" content="0;URL=baseprods.cgi?op=25&pg=0&statusBar=Operation Succeeded!"
      <span id="feedback" style="COLOR: #FF0000;">Operation Succeeded!</span>
*/
    public function deleteByCGI($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}

        logMe("Info: ++++++Deleting Base Product++++++",BASEPRODUCT);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'base_code'=>urlencode($data->base_code),
            'base_name'=>urlencode($data->base_name),
            'base_cat'=>urlencode($data->base_cat),
            'bclass_desc'=>urlencode($data->base_class_desc),
            'base_prod_group'=>urlencode($data->base_prod_group),
			'pg'=>0,
			'op'=>25,
            'cmd'=>urlencode('DEL')
        );
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccessEng = "statusBar=Operation Succeeded!";
        $patternSuccessChn = "statusBar=�����ɹ�!";
		$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
        $isFoundEng = strpos($response, $patternSuccessEng);
        $isFoundChn = strpos($response, $patternSuccessChn);
        $isFoundUtf = strpos($response, $patternSuccessUtf);
        if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
			logMe("CGI Delete Base Product failed!!!",BASEPRODUCT);
			return "ERROR";
        }
        logMe("CGI Delete Base Product succeeded!!!",BASEPRODUCT);

        return "OK";
    }

    public function createByPHP($data)
	{
        if (!$data) return "ERROR";

		$baseNameLength = $data->base_name;

		if (strlen($baseNameLength)>20) return "ERROR";

		unset( $data->base_class_desc );

        $values = getInsertString($data, 1);

        $mydb = DB::getInstance();
        //$sql="INSERT INTO BASE_PRODS $values";
		$sql = array();
		$sql['sql_text'] = "INSERT INTO BASE_PRODS " . $values['sql_text'];
		$sql['sql_data'] = $values['sql_data'];
        $res = $mydb->insert($sql);

        if($res == RETURN_OK){
            //$sql1 = "INSERT INTO GENERIC_PROD (GEN_PROD_CODE) VALUES('".$data->base_code."')";
			$sql1 = array();
			$sql1['sql_text'] = "INSERT INTO GENERIC_PROD (GEN_PROD_CODE) VALUES( :base_code )";
			$sql1['sql_data'] = array( $data->base_code );
            $res1 = $mydb->insert($sql1);

            //$sql2 = "INSERT INTO PRODUCTS (PROD_CODE,PROD_NAME,PROD_CMPY,PROD_CLASS) VALUES('".$data->base_code."','".$data->base_name."','BaSePrOd','".$data->base_code."')";
			$sql2 = array();
			$sql2['sql_text'] = "INSERT INTO PRODUCTS (PROD_CODE,PROD_NAME,PROD_CMPY,PROD_CLASS) VALUES( :base_code1, :base_name, 'BaSePrOd', :base_code2 )";
			$sql2['sql_data'] = array( $data->base_code, $data->base_name, $data->base_code );
			$res2 = $mydb->insert($sql2);

            //$sql3 = "INSERT INTO RATIOS (RATIO_BASE,RATIO_VALUE,RAT_PROD_PRODCMPY,RAT_PROD_PRODCODE) VALUES('".$data->base_code."','1','BaSePrOd','".$data->base_code."')";
			$sql3 = array();
			$sql3['sql_text'] = "INSERT INTO RATIOS (RATIO_BASE,RATIO_VALUE,RAT_PROD_PRODCMPY,RAT_PROD_PRODCODE) VALUES( :base_code, '1', 'BaSePrOd', :base_code2 )";
			$sql3['sql_data'] = array( $data->base_code, $data->base_code );
            $res3 = $mydb->insert($sql3);
        }

        if ($res == RETURN_OK)
        {
            $sql="UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
            $mydb->update($sql);

			$keys = array ("BASE_CODE"=>($data->base_code));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Base Products", "BASE_PRODS", $keys, $excludes );
			$ins_journal->logOneLine("created a base product [" . $data->base_code . " - " . $data->base_name . "] successfully");
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

    public function updateByPHP($data)
	{

		unset( $data->base_class_desc );

		$baseNameLength = $data->base_name;

		if (strlen($baseNameLength)>20) return "ERROR";
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("BASE_CODE"=>($data->base_code));
		$excludes = array ("LAST_UPD_TIME"=>0, "BASE_CLASS_DESC"=>0);
		$upd_journal = new UpdateJournalClass( "Base Products", "BASE_PRODS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        $mydb = DB::getInstance();
        //$sql="UPDATE BASE_PRODS set BASE_NAME='". $data->base_name ."', BASE_CAT=". $data->base_cat .", BASE_PROD_GROUP='". $data->base_prod_group ."' where BASE_CODE='". $data->base_code ."' ";
		$sql = array();
        $sql['sql_text'] = "UPDATE BASE_PRODS set BASE_NAME=:base_name, BASE_CAT=:base_cat, BASE_PROD_GROUP=:base_prod_group where BASE_CODE=:base_code";
		$sql['sql_data'] = array( $data->base_name, $data->base_cat, $data->base_prod_group, $data->base_code );

        $res = $mydb->update($sql);

		// update configurable columns of table BASE_PRODS
		$this->updateConfigBaseColumn($data->base_code, $data->base_ref_temp, "base_ref_temp");
		$this->updateConfigBaseColumn($data->base_code, $data->base_ref_tunt, "base_ref_tunt");
		$this->updateConfigBaseColumn($data->base_code, $data->base_corr_mthd, "base_corr_mthd");
		$this->updateConfigBaseColumn($data->base_code, $data->base_ref_temp_spec, "base_ref_temp_spec");
		$this->updateConfigBaseColumn($data->base_code, $data->base_limit_preset_ht, "base_limit_preset_ht");
		$this->updateConfigBaseColumn($data->base_code, $data->base_dens_lo, "base_dens_lo");
		$this->updateConfigBaseColumn($data->base_code, $data->base_dens_hi, "base_dens_hi");
		$this->updateConfigBaseColumn($data->base_code, $data->base_color, "base_color");

		// update default drawer product name
		$dp_count = $this->isDefaultDrawerProductFound( $data->base_code );
        if ($res == RETURN_OK && $dp_count > 0)
        {
			$sql = array();
			$sql['sql_text'] = "UPDATE PRODUCTS set PROD_NAME=:base_name where PROD_CODE=:base_code and PROD_CMPY='BaSePrOd'";
			$sql['sql_data'] = array( $data->base_name, $data->base_code );

			$res = $mydb->update($sql);
		}

        if ($res == RETURN_OK)
        {
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

        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    }

	/**
	 * This is a generic function to update configurable columns in BASE_PRODS
	 *
	 * @param string          $code        Base product code
	 * @param integer|float   $cln_value   The new value of the column to be updated
	 * @param string          $cln_name    The name of the column to be updated, could be:
	 *                                         base_ref_temp
	 *                                         base_ref_tunt
	 *                                         base_corr_mthd
	 *                                         base_ref_temp_spec
	 *                                         base_limit_preset_ht
	 *                                         base_dens_lo
	 *                                         base_dens_hi
	 *
	 * @return Database operation result
	 */
    public function updateConfigBaseColumn( $code, $cln_value, $cln_name)
	{
		// check if the column is visible in GUI. If not, no update
		$cfgs = new ScreenFormButtonService();
		if ( $cfgs->getScreenFieldStatus("BASE_PRODUCTS", "fld__".$cln_name) < 0 )
		{
			return "OK";
		}

        $mydb = DB::getInstance();

 		$sql = array();
        $sql['sql_text'] = "update BASE_PRODS set " . strtoupper($cln_name) . "=:" . $cln_name . " where BASE_CODE=:base_code";
		$sql['sql_data'] = array( $cln_value, $code );

        $result = $mydb->update($sql);

        return $result;
    }

    public function deleteByPHP($data)
	{
		$code = $data->base_code;
        if (!$code) return "ERROR";
        $mydb = DB::getInstance();

        //if(sizeof($mydb->query("SELECT * FROM PRODUCTS WHERE PROD_CODE='$code' AND PROD_CMPY != 'BaSePrOd'"))>0)return "ERROR";
		$csql = array();
		$csql['sql_text'] = "SELECT * FROM PRODUCTS WHERE PROD_CODE=:prod_code AND PROD_CMPY != 'BaSePrOd'";
		$csql['sql_data'] = array( $code );
        if(sizeof($mydb->query($csql))>0)return "ERROR";


        $res1 = RETURN_OK;
		$res2 = RETURN_OK;
		$res3 = RETURN_OK;


		$csql3 = array();
		$csql3['sql_text'] = "SELECT * FROM RATIOS WHERE RATIO_BASE=:base_code AND RAT_PROD_PRODCMPY='BaSePrOd' AND RAT_PROD_PRODCODE=:prod_code";
		$csql3['sql_data'] = array( $code, $code );
        if(sizeof($mydb->query($csql3))>0)
        //if(sizeof($mydb->query("SELECT * FROM RATIOS WHERE RATIO_BASE='$code' AND RAT_PROD_PRODCMPY='BaSePrOd' AND RAT_PROD_PRODCODE='$code'"))>0)
		{
            //$sql3 = "DELETE FROM RATIOS WHERE RATIO_BASE='$code' AND RAT_PROD_PRODCMPY='BaSePrOd' AND RAT_PROD_PRODCODE='$code'";
			$sql3 = array();
			$sql3['sql_text'] = "DELETE FROM RATIOS WHERE RATIO_BASE=:base_code AND RAT_PROD_PRODCMPY='BaSePrOd' AND RAT_PROD_PRODCODE=:prod_code";
			$sql3['sql_data'] = array( $code, $code );
            $res3 = $mydb->delete($sql3, OCI_NO_AUTO_COMMIT);
        }

		$csql2 = array();
		$csql2['sql_text'] = "SELECT * FROM PRODUCTS WHERE PROD_CODE=:prod_code AND PROD_CMPY='BaSePrOd' AND PROD_CLASS=:class_code";
		$csql2['sql_data'] = array( $code, $code );
        if(sizeof($mydb->query($csql2))>0)
        //if(sizeof($mydb->query("SELECT * FROM PRODUCTS WHERE PROD_CODE='$code' AND PROD_CMPY='BaSePrOd' AND PROD_CLASS='$code'"))>0)
		{
            //$sql2 = "DELETE FROM PRODUCTS WHERE PROD_CODE='$code' AND PROD_CMPY='BaSePrOd' AND PROD_CLASS='$code'";
			$sql2 = array();
			$sql2['sql_text'] = "DELETE FROM PRODUCTS WHERE PROD_CODE=:prod_code AND PROD_CMPY='BaSePrOd' AND PROD_CLASS=:class_code";
			$sql2['sql_data'] = array( $code, $code );
            $res2 = $mydb->delete($sql2, OCI_NO_AUTO_COMMIT);
        }

		$csql1 = array();
		$csql1['sql_text'] = "SELECT * FROM GENERIC_PROD WHERE GEN_PROD_CODE=:class_code";
		$csql1['sql_data'] = array( $code );
        if(sizeof($mydb->query($csql1))>0)
        //if(sizeof($mydb->query("SELECT * FROM GENERIC_PROD WHERE GEN_PROD_CODE='$code'"))>0)
		{
            //$sql1 = "DELETE FROM GENERIC_PROD WHERE GEN_PROD_CODE='$code'";
			$sql1 = array();
			$sql1['sql_text'] = "DELETE FROM GENERIC_PROD WHERE GEN_PROD_CODE=:class_code";
			$sql1['sql_data'] = array( $code );
            $res1 = $mydb->delete($sql1, OCI_NO_AUTO_COMMIT);
        }

        $res = '';
        if(($res1==RETURN_OK)&&($res2==RETURN_OK)&&($res3==RETURN_OK))
		{
            $sql = "DELETE FROM BASE_PRODS WHERE BASE_CODE='$code'";
			$sql = array();
			$sql['sql_text'] = "DELETE FROM BASE_PRODS WHERE BASE_CODE=:base_code";
			$sql['sql_data'] = array( $code );
            $res = $mydb->delete($sql);
        }
		else
		{
            $mydb->rollback();
        }

        if ($res == RETURN_OK)
        {
            $sql="UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
            $mydb->update($sql);

			$keys = array ("BASE_CODE"=>($code));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Base Products", "BASE_PRODS", $keys, $excludes );
			$del_journal->logOneLine("deleted a base product [" . $data->base_code . " - " . $data->base_name . "] successfully");
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

	public function create( $data )
	{
		//return $this->createByCGI( $data );
		return $this->createByPHP( $data );
	}

	public function update( $data )
	{
		//return $this->updateByCGI( $data );
		return $this->updateByPHP( $data );
	}

	public function delete( $data )
	{
		//return $this->deleteByCGI( $data );
		return $this->deleteByPHP( $data );
	}

}
?>
