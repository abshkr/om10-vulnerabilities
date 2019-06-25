<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );
require_once( 'ScreenFormButtonService.php' );

if(!defined('TANKCONFIG')) define('TANKCONFIG','TankService.class');

class TankService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	
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
            $this->cgi = CGIDIR . "gantry/tanks_mod.cgi";
            $this->cgi_items = CGIDIR . "stck_mgmt/tank_stat.cgi";
            $this->cgi_vcf = CGIDIR . "calcvcf.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/tanks_mod.cgi";
            $this->cgi_items ="cgi-bin/en/stck_mgmt/tank_stat.cgi";
            $this->cgi_vcf ="cgi-bin/en/calcvcf.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM GUI_TANKS";
			
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
		else $sort="ORDER BY TANK_TERMINAL, TANK_CODE";
		
		//$query = "SELECT * FROM GUI_TANKS $filter $sort";
		$query = "SELECT * FROM GUI_TANKS " . $filter['sql_text'] . " $sort";

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
         


    public function isTankCodeUsed( $code )
	{
		//$sql = "select * from TANKS where TANK_CODE='$code' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from TANKS where TANK_CODE=:tank_code ";
		$sql['sql_data'] = array( $code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isTankKeyUsed( $site, $code )
	{
		//$sql = "select * from TANKS where TANK_TERMINAL='$site' and TANK_CODE='$code' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from TANKS where TANK_TERMINAL=:tank_site and TANK_CODE=:tank_code ";
		$sql['sql_data'] = array( $site, $code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isTankBaseUsed( $site, $code, $base )
	{
		//$sql = "select * from TANKS where TANK_TERMINAL='$site' and TANK_CODE='$code' and TANK_BASE='$base' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from TANKS where TANK_TERMINAL=:tank_site and TANK_CODE=:tank_code and TANK_BASE=:tank_base ";
		$sql['sql_data'] = array( $site, $code, $base );
		
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
http://bz.mobhk.om5000/cgi-bin/en/gantry/edit_tanks.cgi?cmd=ADD

terminal	CGPER
tank_code	TST1
tank_name	tst1
prod_code	988524
density	768
xboundry	
daily_limit_per	5
daily_limit_vol	1000
monthly_limit_per	5
monthly_limit_vol	1000
cmd	ADD
pg	0
lodens	
hidens	

http://bz.mobhk.om5000/cgi-bin/en/gantry/tanks_mod.cgi?terminal=CGPER&tank_code=TST1&tank_name=tst1&prod_code=988524&density=768&xboundry=&daily_limit_per=5&daily_limit_vol=1000&monthly_limit_per=5&monthly_limit_vol=1000&cmd=ADD&pg=0&lodens=&hidens=



op	2
tankTerm	CGPER
tk	TST1
origin	tankconf
statusBar	Operation Succeeded!

http://bz.mobhk.om5000/cgi-bin/en/stck_mgmt/tank_stat.cgi?op=2&tankTerm=CGPER&tk=TST1&origin=tankconf&statusBar=Operation%20Succeeded!



op	25
pg	6
tankTerm	CGPER
tk	TST1
prod	988524
origin	tankconf
prodNm	UNLEADED
lvlAlrm	0
leakDtct	N
fcfld	NULL
loDens	653.0 
hiDens	820.0
tk_location	
Dnst	768.0
prodCE	0.000000
lqdKG	0.0
prodLvl	0.0
obsTC	0.0
obsVol	0.0
stdVol	0.0
gaugMthd	0
tkGpNm	

http://bz.mobhk.om5000/cgi-bin/en/stck_mgmt/tank_stat.cgi?op=25&pg=6&tankTerm=CGPER&tk=TST1&prod=988524&origin=tankconf&prodNm=UNLEADED&lvlAlrm=0&leakDtct=N&fcfld=NULL&loDens=653.0+&hiDens=820.0&tk_location=&Dnst=768.0&prodCE=0.000000&lqdKG=0.0&prodLvl=0.0&obsTC=0.0&obsVol=0.0&stdVol=0.0&gaugMthd=0&tkGpNm=



t_ml t__OK = {"Operation Succeeded!","操作成功!"};
t_ml t__Failed = {"Operation Failed!","操作失败!"};

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
        Call CGI to CREATE Tank
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Tank++++++",TANKCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'terminal'=>urlencode($data->tank_terminal),
            'tank_code'=>urlencode($data->tank_code),
            'tank_name'=>urlencode($data->tank_name),
            'prod_code'=>urlencode($data->tank_base),
            'density'=>urlencode($data->tank_density),
            'xboundry'=>urlencode(""),
            'daily_limit_per'=>urlencode($data->tank_dtol_percent),
            'daily_limit_vol'=>urlencode($data->tank_dtol_volume),
            'monthly_limit_per'=>urlencode($data->tank_mtol_percent),
            'monthly_limit_vol'=>urlencode($data->tank_mtol_volume),
            'lodens'=>urlencode($data->tank_bclass_dens_lo),
            'hidens'=>urlencode($data->tank_bclass_dens_hi),
            'cmd'=>urlencode("ADD")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "statusBar=Operation Succeeded!";
        $patternSuccessChn = "statusBar=操作成功!";
        $isFoundEng = strstr($response, $patternSuccessEng);
        $isFoundChn = strstr($response, $patternSuccessChn);
        if ($isFoundEng == false && $isFoundChn == false) {
                logMe("Add Tank failed!!!",TANKCONFIG);
                return "ERROR";
        }
        logMe("CGI Add Tank succeeded!!!",TANKCONFIG);
		
		// update API and Std Density
		$this->updateTankAPI($data->tank_terminal, $data->tank_code, $data->tank_api, $data->tank_15_density);
		
		// update tank tolerance values
		//$this->updateTankToleranceFields($data->tank_terminal, $data->tank_code, $data->tank_dtol_percent, $data->tank_dtol_volume, $data->tank_mtol_percent, $data->tank_mtol_volume);
		
		// update tank name 
		$this->updateTankName( $data->tank_terminal, $data->tank_code, $data->tank_name );

        return "OK";
    }  

	
/*
tank_code	TST1
tank_name	tst1
prod_code	988524
prod_desc	UNLEADED
terminal	CGPER
density	768
tank_daily_tol_percent	5
tank_daily_tol_vol	1000
tank_monthly_tol_percent	5
tank_monthly_tol_vol	1000
cmd	MOD
pg	1

http://bz.mobhk.om5000/cgi-bin/en/gantry/edit_tanks.cgi?tank_code=TST1&tank_name=tst1&prod_code=988524&prod_desc=UNLEADED&terminal=CGPER&density=768&tank_daily_tol_percent=5&tank_daily_tol_vol=1000&tank_monthly_tol_percent=5&tank_monthly_tol_vol=1000&cmd=MOD&pg=1



terminal	CGPER
tank_code	TST1
tank_name	tst111
prod_code	6002
density	892
xboundry	
daily_limit_per	0
daily_limit_vol	0
monthly_limit_per	0
monthly_limit_vol	0
cmd	MOD
pg	1
lodens	
hidens	

http://bz.mobhk.om5000/cgi-bin/en/gantry/tanks_mod.cgi?terminal=CGPER&tank_code=TST1&tank_name=tst111&prod_code=6002&density=892&xboundry=&daily_limit_per=0&daily_limit_vol=0&monthly_limit_per=0&monthly_limit_vol=0&cmd=MOD&pg=1&lodens=&hidens=

http://bz.mobhk.om5000/cgi-bin/en/gantry/tanks.cgi?op=25&pg=1&statusBar=Operation%20Succeeded!
操作成功!
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
		$keys = array ("TANK_TERMINAL"=>($data->tank_terminal), "TANK_CODE"=>($data->tank_code));
		$excludes = array ("TANK_DATE"=>0);
		$upd_journal = new UpdateJournalClass( "Tanks", "TANKS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Tank 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Tank++++++",TANKCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'terminal'=>urlencode($data->tank_terminal),
            'tank_code'=>urlencode($data->tank_code),
            'tank_name'=>urlencode($data->tank_name),
            'prod_code'=>urlencode($data->tank_base),
            'density'=>urlencode($data->tank_density),
            'xboundry'=>urlencode(""),
            'daily_limit_per'=>urlencode($data->tank_dtol_percent),
            'daily_limit_vol'=>urlencode($data->tank_dtol_volume),
            'monthly_limit_per'=>urlencode($data->tank_mtol_percent),
            'monthly_limit_vol'=>urlencode($data->tank_mtol_volume),
            'lodens'=>urlencode($data->tank_bclass_dens_lo),
            'hidens'=>urlencode($data->tank_bclass_dens_hi),
            'cmd'=>urlencode("MOD")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "statusBar=Operation Succeeded!";
        $patternSuccessChn = "statusBar=操作成功!";
        $isFoundEng = strstr($response, $patternSuccessEng);
        $isFoundChn = strstr($response, $patternSuccessChn);
        if ($isFoundEng == false && $isFoundChn == false) {
                logMe("Update Tank!!!",TANKCONFIG);
                return "ERROR";
        }
        logMe("CGI Update Tank!!!",TANKCONFIG);
		
		// update API and Std Density
		$this->updateTankAPI($data->tank_terminal, $data->tank_code, $data->tank_api, $data->tank_15_density);
		
		// update tank tolerance values
		//$this->updateTankToleranceFields($data->tank_terminal, $data->tank_code, $data->tank_dtol_percent, $data->tank_dtol_volume, $data->tank_mtol_percent, $data->tank_mtol_volume);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
        logMe("CGI LOG0 Update Tank!!!",TANKCONFIG);
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
        logMe("CGI LOG1 Update Tank!!!",TANKCONFIG);
		$upd_journal->log();
        logMe("CGI LOG2 Update Tank!!!",TANKCONFIG);
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		// update tank name 
		$this->updateTankName( $data->tank_terminal, $data->tank_code, $data->tank_name );

        return "OK";
    }  

	
/*
tank_code	TST1
tank_name	tst111
prod_code	6002
prod_desc	ADO
terminal	CGPER
density	890
tank_daily_tol_percent	0
tank_daily_tol_vol	0
tank_monthly_tol_percent	0
tank_monthly_tol_vol	0
cmd	DEL
pg	1

http://bz.mobhk.om5000/cgi-bin/en/gantry/tanks_mod.cgi?tank_code=TST1&tank_name=tst111&prod_code=6002&prod_desc=ADO&terminal=CGPER&density=890&tank_daily_tol_percent=0&tank_daily_tol_vol=0&tank_monthly_tol_percent=0&tank_monthly_tol_vol=0&cmd=DEL&pg=1

http://bz.mobhk.om5000/cgi-bin/en/gantry/tanks.cgi?op=25&pg=1&statusBar=Operation%20Succeeded!
<span id="feedback" style="COLOR: #FF0000;">Operation Succeeded!</span>
*/	
    public function delete($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting Tank++++++",TANKCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'terminal'=>urlencode($data->tank_terminal),
            'tank_code'=>urlencode($data->tank_code),
            'tank_name'=>urlencode($data->tank_name),
            'prod_code'=>urlencode($data->tank_base),
            'prod_desc'=>urlencode($data->tank_base_name),
            'density'=>urlencode($data->tank_density),
            'tank_daily_tol_percent'=>urlencode($data->tank_dtol_percent),
            'tank_daily_tol_vol'=>urlencode($data->tank_dtol_volume),
            'tank_monthly_tol_percent'=>urlencode($data->tank_mtol_percent),
            'tank_monthly_tol_vol'=>urlencode($data->tank_mtol_volume),
			'cmd'=>urlencode("DEL")        );
		
       $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "statusBar=Operation Succeeded!";
        $patternSuccessChn = "statusBar=操作成功!";
        $isFoundEng = strstr($response, $patternSuccessEng);
        $isFoundChn = strstr($response, $patternSuccessChn);
        if ($isFoundEng == false && $isFoundChn == false) {
            logMe("Delete Tank failed!!!",TANKCONFIG);
            return "ERROR";
        }
        logMe("CGI Delete Tank succeeded!!!",TANKCONFIG);

        return "OK";
    }   

	
    public function updateTankToleranceFields($site, $tank, $dtolper, $dtolvol, $mtolper, $mtolvol)
	{
		if ( trim($dtolper) == "" )
		{
			$dtolper = '0.0';
		}
		if ( trim($dtolvol) == "" )
		{
			$dtolvol = '0.0';
		}
		if ( trim($mtolper) == "" )
		{
			$mtolper = '0.0';
		}
		if ( trim($mtolvol) == "" )
		{
			$mtolvol = '0.0';
		}
		
        $mydb = DB::getInstance();
		/*
        $sql="
			update TANKS set 
				TANK_DTOL_VOLUME=$dtolvol
				, TANK_DTOL_PERCENT=$dtolper  
				, TANK_MTOL_VOLUME=$mtolvol
				, TANK_MTOL_PERCENT=$mtolper  
			where 
				TANK_CODE='$tank'
				and TANK_TERMINAL='$site'
		";
		*/
		$sql = array();
        $sql['sql_text'] = "
			update TANKS set 
				TANK_DTOL_VOLUME=:dtolvol
				, TANK_DTOL_PERCENT=:dtolper  
				, TANK_MTOL_VOLUME=:mtolvol
				, TANK_MTOL_PERCENT=:mtolper  
			where 
				TANK_CODE=:tank_code
				and TANK_TERMINAL=:tank_site
		";
		$sql['sql_data'] = array( $dtolvol, $dtolper, $mtolvol, $mtolper, $tank, $site );
		
        $result = $mydb->update($sql);
        return $result;
    }

	
/*
http://bz.mobhk.om5000/cgi-bin/en/stck_mgmt/tank_stat.cgi?op=25&pg=6&tankTerm=CGPER&tk=S36&prod=98HZ42&origin=&prodNm=PREMIUM&lvlAlrm=0&leakDtct=N&fcfld=NULL&loDens=653.0+&hiDens=820.0&tk_location=ON_SITE&Dnst=752.8&prodCE=0.000000&lqdKG=2527843.0&prodLvl=11.0&obsTC=19.1&obsVol=3374456.0&stdVol=3357921.0&gaugMthd=1&tkGpNm=PREMIUM+98

op	25
pg	6
tankTerm	CGPER
tk	S36
prod	98HZ42
origin	
prodNm	PREMIUM
lvlAlrm	0
leakDtct	N
fcfld	NULL
loDens	653.0 
hiDens	820.0
tk_location	ON_SITE
Dnst	752.8
prodCE	0.000000
lqdKG	2527843.0
prodLvl	11.0
obsTC	19.1
obsVol	3374456.0
stdVol	3357921.0
gaugMthd	1
tkGpNm	PREMIUM 98

var saveSt="1";
var op="0";

*/	
    public function updateTankStatus($data)
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
		$keys = array ("TANK_TERMINAL"=>($data->tank_terminal), "TANK_CODE"=>($data->tank_code));
		$excludes = array ("TANK_DATE"=>0);
		$upd_journal = new UpdateJournalClass( "Tank Status", "TANKS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Tank 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Tank Status++++++",TANKCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tankTerm'=>urlencode($data->tank_terminal),
            'tk'=>urlencode($data->tank_code),
            'prod'=>urlencode($data->tank_base),
            'origin'=>urlencode(""),
            'prodNm'=>urlencode($data->tank_base_name),
            'lvlAlrm'=>urlencode($data->tank_lvl_alarm),
            'leakDtct'=>urlencode($data->tank_leakdtct_on),
            'fcfld'=>urlencode(""),
            'loDens'=>urlencode($data->tank_bclass_dens_lo),
            'hiDens'=>urlencode($data->tank_bclass_dens_hi),
            'tk_location'=>urlencode($data->tank_location),
            'Dnst'=>urlencode($data->tank_density),
            'prodCE'=>urlencode($data->tank_prod_c_of_e),
            'lqdKG'=>urlencode($data->tank_liquid_kg),
            'prodLvl'=>urlencode($data->tank_prod_lvl),
            'obsTC'=>urlencode($data->tank_temp),
            'obsVol'=>urlencode($data->tank_amb_vol),
            'stdVol'=>urlencode($data->tank_cor_vol),
            'gaugMthd'=>urlencode($data->tank_gaugingmthd),
            'tkGpNm'=>urlencode($data->tank_group),
            'op'=>urlencode("25")
        );
        $thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
        $thunkObj->writeToClient($this->cgi_items);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "var saveSt=\"1\";";
        $isFoundEng = strstr($response, $patternSuccessEng);
        if ($isFoundEng == false) {
                logMe("Update Tank Status Failed!!!",TANKCONFIG);
                return "ERROR";
        }
        logMe("CGI Update Tank Status!!!",TANKCONFIG);
		
		// update API and Std Density
		$this->updateTankAPI($data->tank_terminal, $data->tank_code, $data->tank_api, $data->tank_15_density);
		
		// update Expansion Coefficient
		$this->updateTankCofE($data->tank_terminal, $data->tank_code, $data->tank_prod_c_of_e);
		
		// update Ullage
		$this->updateTankUllage($data->tank_terminal, $data->tank_code, $data->tank_ullage);
		
		// update Sulphur
		$this->updateTankSulphur($data->tank_terminal, $data->tank_code, $data->tank_sulphur);
		
		// update Flashpoint
		$this->updateTankFlashpoint($data->tank_terminal, $data->tank_code, $data->tank_flashpoint);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
        logMe("CGI LOG0 Update Tank!!!",TANKCONFIG);
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
        logMe("CGI LOG1 Update Tank!!!",TANKCONFIG);
		$upd_journal->log();
        logMe("CGI LOG2 Update Tank!!!",TANKCONFIG);
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		// update Ullage
		$this->updateTankManualDate($data->tank_terminal, $data->tank_code);

        return "OK";
    }  

	
/*
http://bz.mobhk.om5000/cgi-bin/en/stck_mgmt/tank_stat.cgi?tankTerm=CGPER&tk=S36&op=20&tkgId=13&tkgType=E%26H&tkgAux=a&tkgChannel=0&tkgInst=13&tkgPollInt=120&tkAddress=0

tankTerm	CGPER
tk	S36
op	20
tkgId	13
tkgType	E&H
tkgAux	a
tkgChannel	0
tkgInst	13
tkgPollInt	120
tkAddress	0

ar op="30";

*/	
    public function updateTankGauge($data)
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
		$keys = array ("TANK_TERMINAL"=>($data->tank_terminal), "TANK_CODE"=>($data->tank_code));
		$excludes = array ("TANK_DATE"=>0);
		$upd_journal = new UpdateJournalClass( "Tank Gauge", "TANKS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Tank 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Tank Gauge++++++",TANKCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
			
            'tankTerm'=>urlencode($data->tank_terminal),
            'tk'=>urlencode($data->tank_code),
            'tkgId'=>urlencode($data->tank_identifier),
            'tkgType'=>urlencode($data->tank_drv_type),
            'tkgAux'=>urlencode($data->tank_drv_aux),
            'tkgChannel'=>urlencode($data->tank_channel),
            'tkgInst'=>urlencode($data->tank_instance),
            'tkgPollInt'=>urlencode($data->tank_poll_gap),
            'tkAddress'=>urlencode($data->tank_address),
            'op'=>urlencode("20")
        );
        $thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
        $thunkObj->writeToClient($this->cgi_items);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccessEng = "var op=\"30\";";
        $isFoundEng = strstr($response, $patternSuccessEng);
        if ($isFoundEng == false) {
                logMe("Update Tank Gauge Failed!!!",TANKCONFIG);
                return "ERROR";
        }
        logMe("CGI Update Tank Gauge!!!",TANKCONFIG);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
        logMe("CGI LOG0 Update Tank!!!",TANKCONFIG);
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
        logMe("CGI LOG1 Update Tank!!!",TANKCONFIG);
		$upd_journal->log();
        logMe("CGI LOG2 Update Tank!!!",TANKCONFIG);
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        return "OK";
    }  

	
/*
Observed Volume changed
http://bz.mobhk.om5000/cgi-bin/en/stck_mgmt/tank_stat.cgi?op=15&pg=6&tankTerm=CGPER&tk=S31&prod=98FJ22&origin=&prodNm=ULS&lvlAlrm=0&leakDtct=N&fcfld=obsVol&loDens=800.0+&hiDens=1075.0&tk_location=ON_SITE&Dnst=831.4&prodCE=0.000000&lqdKG=5521430.0&prodLvl=9.0&obsTC=24.5&obsVol=76695963.0&stdVol=6641123.0&gaugMthd=1&tkGpNm=ULS+ADO10+S3

op	15
pg	6
tankTerm	CGPER
tk	S31
prod	98FJ22
origin	
prodNm	ULS
lvlAlrm	0
leakDtct	N
fcfld	obsVol
loDens	800.0 
hiDens	1075.0
tk_location	ON_SITE
Dnst	831.4
prodCE	0.000000
lqdKG	5521430.0
prodLvl	9.0
obsTC	24.5
obsVol	76695963.0
stdVol	6641123.0
gaugMthd	1
tkGpNm	ULS ADO10 S3

var Dnst="831.400000";
var tkApi="-1.000000";
var lqdKG="5521429.662200";
var prodLvl="9.000000";
var obsTC="24.500000";
var obsVol="76695963.000000";
var stdVol="76067823.063030";


Observed Temp Changed
http://bz.mobhk.om5000/cgi-bin/en/stck_mgmt/tank_stat.cgi?op=15&pg=6&tankTerm=CGPER&tk=S31&prod=98FJ22&origin=&prodNm=ULS&lvlAlrm=0&leakDtct=N&fcfld=obsTC&loDens=800.0+&hiDens=1075.0&tk_location=ON_SITE&Dnst=831.4&prodCE=0.000000&lqdKG=5521430.0&prodLvl=9.0&obsTC=34.5&obsVol=6695963.0&stdVol=6641123.0&gaugMthd=1&tkGpNm=ULS+ADO10+S3

op	15
pg	6
tankTerm	CGPER
tk	S31
prod	98FJ22
origin	
prodNm	ULS
lvlAlrm	0
leakDtct	N
fcfld	obsTC
loDens	800.0 
hiDens	1075.0
tk_location	ON_SITE
Dnst	831.4
prodCE	0.000000
lqdKG	5521430.0
prodLvl	9.0
obsTC	34.5
obsVol	6695963.0
stdVol	6641123.0
gaugMthd	1
tkGpNm	ULS ADO10 S3

var Dnst="831.400000";
var tkApi="-1.000000";
var lqdKG="5521429.662200";
var prodLvl="9.000000";
var obsTC="34.500000";
var obsVol="6695963.000000";
var stdVol="6583136.023450";


Density changed
http://bz.mobhk.om5000/cgi-bin/en/stck_mgmt/tank_stat.cgi?op=15&pg=6&tankTerm=CGPER&tk=S31&prod=98FJ22&origin=&prodNm=ULS&lvlAlrm=0&leakDtct=N&fcfld=Dnst&loDens=800.0+&hiDens=1075.0&tk_location=ON_SITE&Dnst=931.4&prodCE=0.000000&lqdKG=5521430.0&prodLvl=9.0&obsTC=24.5&obsVol=6695963.0&stdVol=6641123.0&gaugMthd=1&tkGpNm=ULS+ADO10+S3

op	15
pg	6
tankTerm	CGPER
tk	S31
prod	98FJ22
origin	
prodNm	ULS
lvlAlrm	0
leakDtct	N
fcfld	Dnst
loDens	800.0 
hiDens	1075.0
tk_location	ON_SITE
Dnst	931.4
prodCE	0.000000
lqdKG	5521430.0
prodLvl	9.0
obsTC	24.5
obsVol	6695963.0
stdVol	6641123.0
gaugMthd	1
tkGpNm	ULS ADO10 S3

var Dnst="931.400000";
var tkApi="-1.000000";
var lqdKG="6185541.962200";
var prodLvl="9.000000";
var obsTC="24.500000";
var obsVol="6695963.000000";
var stdVol="6648957.339740";


Level Changed
http://bz.mobhk.om5000/cgi-bin/en/stck_mgmt/tank_stat.cgi?op=15&pg=6&tankTerm=CGPER&tk=S31&prod=98FJ22&origin=&prodNm=ULS&lvlAlrm=0&leakDtct=N&fcfld=prodLvl&loDens=800.0+&hiDens=1075.0&tk_location=ON_SITE&Dnst=831.4&prodCE=0.000000&lqdKG=5521430.0&prodLvl=119.0&obsTC=24.5&obsVol=6695963.0&stdVol=6641123.0&gaugMthd=1&tkGpNm=ULS+ADO10+S3

op	15
pg	6
tankTerm	CGPER
tk	S31
prod	98FJ22
origin	
prodNm	ULS
lvlAlrm	0
leakDtct	N
fcfld	prodLvl
loDens	800.0 
hiDens	1075.0
tk_location	ON_SITE
Dnst	831.4
prodCE	0.000000
lqdKG	5521430.0
prodLvl	119.0
obsTC	24.5
obsVol	6695963.0
stdVol	6641123.0
gaugMthd	1
tkGpNm	ULS ADO10 S3

var Dnst="831.400000";
var tkApi="-1.000000";
var lqdKG="5521429.662200";
var prodLvl="119.000000";
var obsTC="24.500000";
var obsVol="6695963.000000";
var stdVol="6641123.063030";

fcfld	obsVol
fcfld	obsTC
fcfld	Dnst
fcfld	prodLvl

*/	
    public function recalculateTankVolumes($data)
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
        Call CGI to re-calculate Tank Volume
        ***************************************************************************************************/
        logMe("Info: ++++++Re-calculating Tank Volume++++++",TANKCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tankTerm'=>urlencode($data->tank_terminal),
            'tk'=>urlencode($data->tank_code),
            'prod'=>urlencode($data->tank_base),
            'origin'=>urlencode(""),
            'prodNm'=>urlencode($data->tank_base_name),
            'lvlAlrm'=>urlencode($data->tank_lvl_alarm),
            'leakDtct'=>urlencode($data->tank_leakdtct_on),
            'fcfld'=>urlencode($data->tank_field_changed),
            'loDens'=>urlencode($data->tank_bclass_dens_lo),
            'hiDens'=>urlencode($data->tank_bclass_dens_hi),
            'tk_location'=>urlencode($data->tank_location),
            'Dnst'=>urlencode($data->tank_density),
            'prodCE'=>urlencode($data->tank_prod_c_of_e),
            'lqdKG'=>urlencode($data->tank_liquid_kg),
            'prodLvl'=>urlencode($data->tank_prod_lvl),
            'obsTC'=>urlencode($data->tank_temp),
            'obsVol'=>urlencode($data->tank_amb_vol),
            'stdVol'=>urlencode($data->tank_cor_vol),
            'gaugMthd'=>urlencode($data->tank_gaugingmthd),
            'tkGpNm'=>urlencode($data->tank_group),
            'op'=>urlencode("15")
        );
        $thunkObj = new Thunk($this->host, $this->cgi_items, $fields);
        $thunkObj->writeToClient($this->cgi_items);

        $response = $thunkObj->read();
		//return $response;
		
		$values = array();
		$values['tank_code'] = $this->getVarValue( $response, 'var tk="' );
		$values['tank_terminal'] = $this->getVarValue( $response, 'var tankTerm="' );
		$values['tank_bclass_dens_lo'] = $this->getVarValue( $response, 'var loDens="' );
		$values['tank_bclass_dens_hi'] = $this->getVarValue( $response, 'var hiDens="' );
		$values['tank_location'] = $this->getVarValue( $response, 'var tk_location="' );
		$values['tank_base_name'] = $this->getVarValue( $response, 'var prodNm="' );
		$values['tank_base'] = $this->getVarValue( $response, 'var prod="' );
		$values['tank_prod_c_of_e'] = $this->getVarValue( $response, 'var prodCE="' );
		$values['tank_lvl_alarm'] = $this->getVarValue( $response, 'var lvlAlrm="' );
		$values['tank_leakdtct_on'] = $this->getVarValue( $response, 'var leakDtct="' );
		$values['tank_density'] = $this->getVarValue( $response, 'var Dnst="' );
		$values['tank_liquid_kg'] = $this->getVarValue( $response, 'var lqdKG="' );
		$values['tank_prod_lvl'] = $this->getVarValue( $response, 'var prodLvl="' );
		$values['tank_temp'] = $this->getVarValue( $response, 'var obsTC="' );
		$values['tank_amb_vol'] = $this->getVarValue( $response, 'var obsVol="' );
		$values['tank_cor_vol'] = $this->getVarValue( $response, 'var stdVol="' );
		$values['tank_gaugingmthd'] = $this->getVarValue( $response, 'var gaugMthd="' );
		$values['tank_group'] = $this->getVarValue( $response, 'var tkGpNm="' );
		
		$values['tank_liquid_kg'] = $values['tank_cor_vol'] * $values['tank_density'] / 1000.0;
		
		$rows = array();
		$rows[] = (object)$values;
		$data->count = 1;
		$data->sqls = "recalculateTankVolumes";
		arrayEncodingConversion($rows);
		$data->data = (json_encode($rows));
		
        logMe("CGI Re-calculating Tank Volume!!!",TANKCONFIG);

        return $data;
    }  
	
	public function getVarValue( $response, $code, $loc=0 )
	{
		$start = strpos( $response, $code, $loc );
		$start += strlen($code);
		$end = strpos( $response, "\";", $start );
		$len = $end - $start - 1;
		$str = substr( $response, $start, $len );
		
		return $str;
	}
	
	public function getStandardTemperature()
	{
		$std_temp = getenv( "VSM_COMPENSATION_PT" );
		if ( $std_temp === FALSE )
		{
			$std_temp = 15.0;
		}
		
		// for testing
		//$std_temp = 30.0;
		
		return $std_temp;
	}
	
	public function getExpansionCoefficientRange()
	{
		$range = "0.000414~0.001674";
		
		return $range;
	}
	
	public function getDigitsSettings()
	{
		$digits ="";
		$digits .= "2|";   //digitsAPI:int=2;
		$digits .= "2|";   //digitsTEMP:int=2;
		$digits .= "3|";   //digitsDENS:int=3;
		$digits .= "0|";   //digitsLVL:int=0;
		$digits .= "0|";   //digitsVOL:int=0;
		$digits .= "0|";   //digitsMASS:int=0;
		$digits .= "3";   //digitsADTV:int=3;
		
		return $digits;
	}
	
/*
calcvcf.cgi?frm_baseCd="+view.dgTanks.selectedItem.payload.TANK_BASE+"&frm_which_type=LT&frm_real_amount="+view.tnk_tot_obs.text+"&frm_real_temp="+view.tnk_temp.text+"&frm_real_dens="+view.tnk_density.text;  
calcvcf.cgi?frm_baseCd="+base+"&frm_which_type="+type+"&frm_real_amount="+(obs+std+mass)+"&frm_real_temp="+temp+"&frm_real_dens="+dens;  
calcvcf.cgi?frm_baseCd="+base+"&frm_which_type="+type+"&frm_real_amount="+(obs+std+mass)+"&frm_real_temp="+temp+"&frm_real_dens="+dens;  
calcvcf.cgi?frm_baseCd="+base+"&frm_which_type="+type+"&frm_real_amount="+(qty)+"&frm_real_temp="+temp+"&frm_real_dens="+dens;  

calcvcf.cgi?frm_baseCd=00002&frm_which_type=LT&frm_real_amount=1000&frm_real_temp=64.57&frm_real_dens=821  
calcvcf.cgi?frm_baseCd=00002&frm_which_type=LT&frm_real_amount=1000&frm_real_temp=64.57&frm_real_dens=821 &base_prod_c_of_e=0.00085  
calcvcf.cgi?frm_baseCd="+ Number(oTmp.trsf_bs_prodcd) +"&";  

//    //http://sh.mobhk.om5000/cgi-bin/en/calcvcf.cgi?frm_baseCd=00002&frm_which_type=LT&frm_real_amount=1000&frm_real_temp=64.57&frm_real_dens=821  
//    //http://xx.mobhk.om5000/cgi-bin/en/calcvcf.cgi?frm_baseCd=00002&frm_which_type=LT&frm_real_amount=1000&frm_real_temp=64.57&frm_real_dens=821 &base_prod_c_of_e=0.00085  
//    var urlStr:String = "/cgi-bin/en/calcvcf.cgi?frm_baseCd="+ Number(bs_prod_cd) +"&";  
//http://sh.mobhk.om5000/cgi-bin/en/calcvcf.cgi?frm_baseCd=00002&frm_which_type=LT&frm_real_amount=1000&frm_real_temp=64.57&frm_real_dens=821  
//http://xx.mobhk.om5000/cgi-bin/en/calcvcf.cgi?frm_baseCd=00002&frm_which_type=LT&frm_real_amount=1000&frm_real_temp=64.57&frm_real_dens=821 &base_prod_c_of_e=0.00085  

calcvcf.cgi?frm_baseCd="+baseCode+"&frm_which_type="+type+"&frm_real_amount="+qty+"&frm_real_temp="+TEMP_AMB+"&frm_real_dens="+DENS_COR;  
calcvcf.cgi?frm_baseCd="+bases[i].BASE_CODE+"&frm_which_type="+type+"&frm_real_amount="+_qty+"&frm_real_temp="+bases[i].Temperature+"&frm_real_dens="+bases[i].TANK_DENS;  

calcvcf.cgi?frm_baseCd="+baseCode+"&frm_which_type="+type+"&frm_real_amount="+qty+"&frm_real_temp="+TEMP_AMB+"&frm_real_dens="+DENS_COR;  
*/	
    public function calculateTankVolumes($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
		// decide which density will be used as frm_real_dens
		$ref_density = $data->tank_density;
		$cfgs = new ScreenFormButtonService();
		if ( $cfgs->getScreenFieldStatus("TANK_STATUS", "fld__tank_15_density") < 0 )
		{
			$ref_density = $data->tank_density;
		}
		else
		{
			$ref_density = $data->tank_15_density;
		}
		/**************************************************************************************************
        Call CGI to re-calculate Tank Volume
        ***************************************************************************************************/
        logMe("Info: ++++++Re-calculating Tank Volume++++++",TANKCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'frm_baseCd'=>urlencode($data->tank_base),
            'frm_which_type'=>urlencode($data->tank_qty_type),
            'frm_real_amount'=>urlencode($data->tank_qty_amount),
            'frm_real_temp'=>urlencode($data->tank_temp),
            'frm_real_dens'=>urlencode($ref_density)
        );
        $thunkObj = new Thunk($this->host, $this->cgi_vcf, $fields);
        $thunkObj->writeToClient($this->cgi_vcf);

        $response = $thunkObj->read();
		return $response;
		
        logMe("CGI Re-calculating Tank Volume!!!",TANKCONFIG);

        //return $data;
    }  
	
    public function updateTankName($term, $code, $name)
	{
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "update TANKS set TANK_NAME=:tkname where TANK_CODE=:tkcode and TANK_TERMINAL=:tkterm";
		$sql['sql_data'] = array( $name, $code, $term );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateTankAPI($term, $code, $api, $density15)
	{
		$cfgs = new ScreenFormButtonService();
		if ( $cfgs->getScreenFieldStatus("TANK_STATUS", "fld__tank_api") < 0 )
		{
			return "OK";
		}
		if ( $cfgs->getScreenFieldStatus("TANK_STATUS", "fld__tank_15_density") < 0 )
		{
			return "OK";
		}
		
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "update TANKS set TANK_API=:tank_api, TANK_15_DENSITY=:tank_15_density where TANK_CODE=:tkcode and TANK_TERMINAL=:tkterm";
		$sql['sql_data'] = array( $api, $density15, $code, $term );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateTankCofE($term, $code, $cofe)
	{
		$cfgs = new ScreenFormButtonService();
		if ( $cfgs->getScreenFieldStatus("TANK_STATUS", "fld__tank_prod_c_of_e") < 0 )
		{
			return "OK";
		}
		
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "update TANKS set TANK_PROD_C_OF_E=:tank_cofe where TANK_CODE=:tkcode and TANK_TERMINAL=:tkterm";
		$sql['sql_data'] = array( $cofe, $code, $term );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateTankUllage($term, $code, $ullage)
	{
		$cfgs = new ScreenFormButtonService();
		if ( $cfgs->getScreenFieldStatus("TANK_STATUS", "fld__tank_ullage") < 0 )
		{
			return "OK";
		}
		
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "update TANKS set TANK_ULLAGE=:tank_ullage where TANK_CODE=:tkcode and TANK_TERMINAL=:tkterm";
		$sql['sql_data'] = array( $ullage, $code, $term );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateTankManualDate($term, $code)
	{
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "update TANKS set TANK_ATG_MANCHG=SYSDATE where TANK_CODE=:tkcode and TANK_TERMINAL=:tkterm";
		$sql['sql_data'] = array( $code, $term );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateTankSulphur($term, $code, $sulphur)
	{
		$cfgs = new ScreenFormButtonService();
		if ( $cfgs->getScreenFieldStatus("TANK_STATUS", "fld__tank_sulphur") < 0 )
		{
			return "OK";
		}
		
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "update TANKS set TANK_SULPHUR=:tank_sulphur where TANK_CODE=:tkcode and TANK_TERMINAL=:tkterm";
		$sql['sql_data'] = array( $sulphur, $code, $term );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateTankFlashpoint($term, $code, $flashpoint)
	{
		$cfgs = new ScreenFormButtonService();
		if ( $cfgs->getScreenFieldStatus("TANK_STATUS", "fld__tank_flashpoint") < 0 )
		{
			return "OK";
		}
		
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "update TANKS set TANK_FLASHPOINT=:tank_flashpoint where TANK_CODE=:tkcode and TANK_TERMINAL=:tkterm";
		$sql['sql_data'] = array( $flashpoint, $code, $term );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateConfigTankColumn($term, $code, $cln_value, $cln_name)
	{
		$cfgs = new ScreenFormButtonService();
		if ( $cfgs->getScreenFieldStatus("TANK_STATUS", "fld__".$cln_name) < 0 )
		{
			return "OK";
		}
		
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "update TANKS set " . strtoupper($cln_name) . "=:" . $cln_name . " where TANK_CODE=:tkcode and TANK_TERMINAL=:tkterm";
		$sql['sql_data'] = array( $cln_value, $code, $term );
		
        $result = $mydb->update($sql);
		
        return $result;
    }


    public function getExactTankVolume( $tank_code, $tank_site, $height )
	{
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "
			select 	STRAP_HEIGHT, STRAP_VOL
			from	STRAPS
			where 
				STR_TK_TANKCODE = :str_tk_tankcode 
				and STR_TK_TANKDEPO = :str_tk_tankdepo 
				and STRAP_HEIGHT = :strap_height 
		";
		$sql['sql_data'] = array( $tank_code, $tank_site, $height );

        $rows = $mydb->query($sql, "N");
		
		return $rows;
	}

    public function getNextTankVolume( $tank_code, $tank_site, $height, $op )
	{
		$sort = "ASC";
		if ( $op == "<" )
		{
			$sort = "DESC";
		}
		if ( $op == ">" )
		{
			$sort = "ASC";
		}
		
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "
			select ts.STRAP_HEIGHT, ts.STRAP_VOL
			from
			(
				select * from STRAPS 
				where 
					STR_TK_TANKCODE = :str_tk_tankcode 
					and STR_TK_TANKDEPO = :str_tk_tankdepo 
					and STRAP_HEIGHT $op :strap_height 
				order by STRAP_HEIGHT $sort
			) ts
			where ROWNUM=1
		";
		$sql['sql_data'] = array( $tank_code, $tank_site, $height );
		
        $rows = $mydb->query($sql, "N");
		
		return $rows;
	}

    public function getTankVolumeFromHeight( $tank_code, $tank_site, $height )
	{
		$volume = -1;
		// try to get the volume from the exact height
		$rows = $this->getExactTankVolume( $tank_code, $tank_site, $height );
		if ( count($rows) > 0 )
		{
			// found the volume at the exact height
			$volume = $rows[0]->STRAP_VOL;
			logMe("Found the volume [" . $volume . "] at the exact height [" . $height . "]!!!",TANKSTRAP);
			
			return $volume; 
		}
		
		// no volume found at the exact height
		// try to work out volume by linear calculation

		$low_height = -1;
		$low_volume = -1;
		// get the volume at the heght lower than the current one
		$rows = $this->getNextTankVolume( $tank_code, $tank_site, $height, "<" );
		if ( count($rows) > 0 )
		{
			// found the volume at the lower height
			$low_height = $rows[0]->STRAP_HEIGHT;
			$low_volume = $rows[0]->STRAP_VOL;
		}

		$high_height = -1;
		$high_volume = -1;
		// get the volume at the heght higher than the current one
		$rows = $this->getNextTankVolume( $tank_code, $tank_site, $height, ">" );
		if ( count($rows) > 0 )
		{
			// found the volume at the higher height
			$high_height = $rows[0]->STRAP_HEIGHT;
			$high_volume = $rows[0]->STRAP_VOL;
		}
		
		// formular: ($volume - $low_volume) / ($height - $low_height) = ($high_volume - $low_volume) / ($high_height - $low_height)
		
		if ( $low_height>=0 && $low_volume>=0 && $high_height>=0 && $high_volume>=0 )
		{
			// current position is within the range: low_height < height < high_height
			// do calculation
			$volume = (($high_volume - $low_volume) / ($high_height - $low_height) * ($height - $low_height)) + $low_volume;
			
			logMe("Calculate the volume [$volume] at the height [$height] from [$low_height:$low_volume--$high_height:$high_volume]!!!",TANKSTRAP);
			
			return $volume; 
		}
		else
		{
			// current position is outside of strapping range
			if ( $low_height>=0 && $low_volume>=0 && $high_height<0 && $high_volume<0 )
			{
				// beyond TOP: low_low_height < low_height < height < high_height NA
				// need to find the volume below low_height
				$low_low_height = -1;
				$low_low_volume = -1;
				// get the volume at the heght lower than the low_height
				$rows = $this->getNextTankVolume( $tank_code, $tank_site, $low_height, "<" );
				if ( count($rows) > 0 )
				{
					// found the volume at the lower lower height
					$low_low_height = $rows[0]->STRAP_HEIGHT;
					$low_low_volume = $rows[0]->STRAP_VOL;
				}
				else
				{
					return -1;
				}
				
				// before we start the process, we have checked to make sure the total number of strapping data is at least 2, so we will find the low_low_height/volume 
				$volume = (($low_low_volume - $low_volume) / ($low_low_height - $low_height) * ($height - $low_height)) + $low_volume;
			
				logMe("Calculate the volume [$volume] at the height [$height] from [$low_low_height:$low_low_volume--$low_height:$low_volume]!!!",TANKSTRAP);
				
				return $volume; 
			}
			if ( $low_height<0 && $low_volume<0 && $high_height>=0 && $high_volume>=0 )
			{
				// beyond BOTTOM: low_height NA < height < high_height < high_high_height
				// need to find the volume above high_height
				$high_high_height = -1;
				$high_high_volume = -1;
				// get the volume at the heght higher than the high_height
				$rows = $this->getNextTankVolume( $tank_code, $tank_site, $high_height, ">" );
				if ( count($rows) > 0 )
				{
					// found the volume at the higher higher height
					$high_high_height = $rows[0]->STRAP_HEIGHT;
					$high_high_volume = $rows[0]->STRAP_VOL;
				}
				else
				{
					return -1;
				}
				
				// before we start the process, we have checked to make sure the total number of strapping data is at least 2, so we will find the high_high_height/volume 
				$volume = (($high_high_volume - $high_volume) / ($high_high_height - $high_height) * ($height - $high_height)) + $high_volume;
			
				logMe("Calculate the volume [$volume] at the height [$height] from [$high_height:$high_volume--$high_high_height:$high_high_volume]!!!",TANKSTRAP);
				
				return $volume; 
			}
			
		}
		
        return -1;
	}

    public function countTankStraps( $tank_code, $tank_site )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * from STRAPS 
			where 
				STR_TK_TANKCODE = :str_tk_tankcode 
				and STR_TK_TANKDEPO = :str_tk_tankdepo 
		";
		$sql['sql_data'] = array( $tank_code, $tank_site );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}
	
    public function calculateTankVolumesByLevelUsingPHP($data)
	{
		$strapCnt = $this->countTankStraps( $data->tank_code, $data->tank_terminal );
		if ( $strapCnt < 2 )
		{
			return "-2";
		}
		
		$volume = $this->getTankVolumeFromHeight( $data->tank_code, $data->tank_terminal, $data->tank_prod_lvl );
		
		if ( $volume == -1 )
		{
			return "-1";
		}
		else
		{
            $data->tank_qty_type = "LT";
            $data->tank_qty_amount = $volume;
			
			return $this->calculateTankVolumes($data);
		}
    }
	
    public function calculateTankVolumesByLevelUsingCGI($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
		// decide which density will be used as frm_real_dens
		$ref_density = $data->tank_density;
		$cfgs = new ScreenFormButtonService();
		if ( $cfgs->getScreenFieldStatus("TANK_STATUS", "fld__tank_15_density") < 0 )
		{
			$ref_density = $data->tank_density;
		}
		else
		{
			$ref_density = $data->tank_15_density;
		}
		/**************************************************************************************************
        Call CGI to re-calculate Tank Volume
        ***************************************************************************************************/
        logMe("Info: ++++++Re-calculating Tank Volume by Level++++++",TANKCONFIG);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'frm_baseCd'=>urlencode($data->tank_base),
            'frm_which_type'=>urlencode($data->tank_qty_type),
            'frm_real_amount'=>urlencode($data->tank_qty_amount),
            'frm_real_temp'=>urlencode($data->tank_temp),
            'frm_real_dens'=>urlencode($ref_density),
//            'frm_prod_c_of_e'=>urlencode($data->tank_prod_c_of_e),
            'frm_tank_trm'=>urlencode($data->tank_terminal),
            'frm_tank_cd'=>urlencode($data->tank_code),
            'frm_strap_height_mm'=>urlencode($data->tank_prod_lvl)
        );
        $thunkObj = new Thunk($this->host, $this->cgi_vcf, $fields);
        $thunkObj->writeToClient($this->cgi_vcf);

        $response = $thunkObj->read();
		return $response;
		
        logMe("CGI Re-calculating Tank Volume by Level!!!",TANKCONFIG);

        //return $data;
    }  
	
    public function calculateTankVolumesByLevel($data)
	{
		$byPHP = $this->calculateTankVolumesByLevelUsingPHP($data);
        logMe("Info: ++++++Re-calculating Tank Volume by Level using PHP++++++\n".$byPHP,TANKCONFIG);
		
		$byCGI = $this->calculateTankVolumesByLevelUsingCGI($data);
        logMe("Info: ++++++Re-calculating Tank Volume by Level using CGI++++++\n".$byCGI,TANKCONFIG);
		
		//return $this->calculateTankVolumesByLevelUsingPHP($data);
		return $this->calculateTankVolumesByLevelUsingCGI($data);
    }
	
}
?>