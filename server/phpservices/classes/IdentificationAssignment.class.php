<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Thunk.class.php');
require_once(dirname(__FILE__) . '/Journal.class.php');

/* define the module name for calling logMe() to output */
if(!defined('IDASSIGNMENTCLASS')) define('IDASSIGNMENTCLASS','IdentificationAssignment.class');

class IdentificationAssignmentClass{
    public function IdentificationAssignmentClass()
    {
		session_start();
		
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "access_ctrl/id_assignment.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/access_ctrl/id_assignment.cgi";
        }
    }
         
    public function getPaged($offset,$tot,$filter='',$sort='')
    {
        $mydb = DB::getInstance();
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY KYA_KEY_ISSUER, KYA_KEY_NO";

        /*
		$sql="
            select
                KYA_KEY_NO
                , KYA_KEY_ISSUER
                , KYA_ISSUER_NAME
                , KYA_TYPE
                , KYA_TYPE_NAME
                , KYA_PHYS_TYPE
                , KYA_PHYS_NAME
                , KYA_TIMECODE
                , KYA_LOCK
                , KYA_ADHOC
                , KYA_TXT
                , DECODE(KYA_KEY_CREATED, NULL, '', TO_CHAR(KYA_KEY_CREATED, 'YYYY-MM-DD')) as KYA_KEY_CREATED
                , KYA_PIN
                , DECODE(KYA_PIN_CHANGED, NULL, '', TO_CHAR(KYA_PIN_CHANGED, 'YYYY-MM-DD')) as KYA_PIN_CHANGED
                , NVL(KYA_PERSONNEL, '') as KYA_PERSONNEL
                , NVL(KYA_PSNL_NAME, '') as KYA_PSNL_NAME
                , KYA_PSNL_CMPY
                , KYA_PSNL_CMPY_NAME
                , NVL(KYA_ROLE, '') as KYA_ROLE
                , NVL(KYA_ROLE_NAME, '') as KYA_ROLE_NAME
                , KYA_DRAWER
                , KYA_DRAW_NAME
                , KYA_SUPPLIER
                , KYA_SUPP_NAME
                , KYA_TANKER
                , KYA_TNKR_NAME
                , DECODE(KYA_TNKR_NAME, NULL, KYA_TANKER, KYA_TANKER||'['||KYA_TNKR_NAME||']') as KYA_TNKR_DESC
                , KYA_TNKR_CMPY
                , KYA_TNKR_CMPY_NAME
                , KYA_EQUIPMENT
                , KYA_EQPT_NAME
                , DECODE(KYA_EQPT_NAME, NULL, TO_CHAR(KYA_EQPT_CODE), KYA_EQPT_CODE||'['||KYA_EQPT_NAME||']') as KYA_EQPT_DESC
                , KYA_EQPT_CMPY
                , KYA_EQPT_CMPY_NAME
                , KYA_ETYP_NAME
                , KYA_LOAD_SITE
                , KYA_SITE_NAME
                , KYA_LOAD_ID
                , KYA_TRIP_NO 
                , KYA_ALLOC_TYPE
                , KYA_ALLOC_TYPE_NAME
                , KYA_ALLOC_CMPY
                , KYA_ALLOC_CMPY_NAME
                , KYA_ORDER_NO
                , KYA_CUST_ORDNO
                , KYA_CUST_NAME
                , (KYA_ORDER_NO||'['||KYA_CUST_NAME||':'||KYA_CUST_ORDNO||']') as KYA_ORDER_DESC
                , RN
            from
                (
                SELECT res.*, ROWNUM RN
                FROM(SELECT * FROM GUI_ACCESS_KEYS $filter $sort) res
                )
            where RN between ".($offset+1)." and ".($offset+$tot); //." $sort";
		*/
		$sql = array();
        $sql['sql_text'] = "
            select
                KYA_KEY_NO
                , KYA_KEY_ISSUER
                , KYA_ISSUER_NAME
                , KYA_TYPE
                , KYA_TYPE_NAME
                , KYA_PHYS_TYPE
                , KYA_PHYS_NAME
                , KYA_TIMECODE
                , KYA_LOCK
                , KYA_ADHOC
                , KYA_TXT
                , DECODE(KYA_KEY_CREATED, NULL, '', TO_CHAR(KYA_KEY_CREATED, 'YYYY-MM-DD')) as KYA_KEY_CREATED
                , KYA_PIN
                , DECODE(KYA_PIN_CHANGED, NULL, '', TO_CHAR(KYA_PIN_CHANGED, 'YYYY-MM-DD')) as KYA_PIN_CHANGED
                , NVL(KYA_PERSONNEL, '') as KYA_PERSONNEL
                , NVL(KYA_PSNL_NAME, '') as KYA_PSNL_NAME
                , KYA_PSNL_CMPY
                , KYA_PSNL_CMPY_NAME
                , NVL(KYA_ROLE, '') as KYA_ROLE
                , NVL(KYA_ROLE_NAME, '') as KYA_ROLE_NAME
                , KYA_DRAWER
                , KYA_DRAW_NAME
                , KYA_SUPPLIER
                , KYA_SUPP_NAME
                , KYA_TANKER
                , KYA_TNKR_NAME
                , DECODE(KYA_TNKR_NAME, NULL, KYA_TANKER, KYA_TANKER||'['||KYA_TNKR_NAME||']') as KYA_TNKR_DESC
                , KYA_TNKR_CMPY
                , KYA_TNKR_CMPY_NAME
                , KYA_EQUIPMENT
                , KYA_EQPT_NAME
                , DECODE(KYA_EQPT_NAME, NULL, TO_CHAR(KYA_EQPT_CODE), KYA_EQPT_CODE||'['||KYA_EQPT_NAME||']') as KYA_EQPT_DESC
                , KYA_EQPT_CMPY
                , KYA_EQPT_CMPY_NAME
                , KYA_ETYP_NAME
                , KYA_LOAD_SITE
                , KYA_SITE_NAME
                , KYA_LOAD_ID
                , KYA_TRIP_NO 
                , KYA_ALLOC_TYPE
                , KYA_ALLOC_TYPE_NAME
                , KYA_ALLOC_CMPY
                , KYA_ALLOC_CMPY_NAME
                , KYA_ORDER_NO
                , KYA_CUST_ORDNO
                , KYA_CUST_NAME
                , (KYA_ORDER_NO||'['||KYA_CUST_NAME||':'||KYA_CUST_ORDNO||']') as KYA_ORDER_DESC
                , RN
            from
                (
                SELECT res.*, ROWNUM RN
                FROM(SELECT * FROM GUI_ACCESS_KEYS " . $filter['sql_text'] . " $sort) res
                )
            where RN between ".($offset+1)." and ".($offset+$tot); //." $sort";
		$sql['sql_data'] = $filter['sql_data'];
		
        $rows = $mydb->query($sql);
        //error_log( "\n".$sql, 3, "temp.log");
		
//                SELECT res.*, ROW_NUMBER() over ($sort) RN
//                FROM(SELECT * FROM GUI_ACCESS_KEYS $filter) res
		
        
        $arr = array();
        foreach($rows as $x){
            $arr[] = $x;
        }
        
        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => "GUI_AccessKeys")));        
    }
    

    public function lookupKeyCompany($type=-1)
    {
        if ($type == -1)
        {
            $bitAnd = 255;
        }
        else
        {
            $bitAnd = pow(2, $type);
        }
        
        $mydb = DB::getInstance();
		/*
        $sql="
            select CMPY_CODE, CMPY_NAME, CMPY_TYPE 
            from COMPANYS 
            where (-1=$type or bitand(CMPY_TYPE,$bitAnd)<>0 )
            order by CMPY_NAME asc
            ";
		*/
		/*
		$sql = array();
        $sql['sql_text'] = "
			select CMPY_CODE, CMPY_NAME, CMPY_TYPE 
			from COMPANYS 
			where (-1=:cmpytype or bitand(CMPY_TYPE,:type_bitAnd)<>0 )
			order by CMPY_NAME asc
			";
		*/
		if ( $type != 2 && $type != 6 ) 
		{
			$sql['sql_text'] = "
				select CMPY_CODE, CMPY_NAME, CMPY_TYPE 
				from GUI_COMPANYS 
				where (-1=:cmpytype or bitand(CMPY_TYPE,:type_bitAnd)<>0 )
				order by CMPY_NAME asc
			";
		}
		else
		{
			$sql['sql_text'] = "
				SELECT distinct 
					CMPY_CODE, CMPY_NAME, CMPY_TYPE 
				FROM 
					GUI_COMPANYS 
				WHERE 
					(-1=:cmpytype or bitand(CMPY_TYPE,:type_bitAnd)<>0 ) 
					and ( 
					( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
						and ( CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')
						or ( CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=$type and status=1) ) ) 
					)
					or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
					or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
					or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
				ORDER BY CMPY_NAME ASC
			";
		}
		$sql['sql_data'] = array( $type, $bitAnd );
			
        $rows = $mydb->query($sql);        
        
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyCmpyLookup')));
    }
    
    public function lookupKeyType(){
        $mydb = DB::getInstance();
        $sql="select KEY_ID as TYPE_ID, KEY_NAME as TYPE_NAME from KEY_TYP where KEY_ID in (1,3,4,5,8,9) order by KEY_ID";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyTypeLookup')));
    }
    
    public function lookupKeyPhysType(){
        $mydb = DB::getInstance();
        $sql="select KEY_PHYS_ID as PHYS_TYPE_ID, KEY_PHYS_NAME as PHYS_TYPE_NAME from KEY_PHYS_TYP order by KEY_PHYS_ID";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyPhysTypeLookup')));
    }
    
    public function lookupKeyRole(){
        $mydb = DB::getInstance();
       // $sql="select AUTH_LEVEL_ID as ROLE_ID, AUTH_LEVEL_NAME as ROLE_NAME from AUTH_LEVEL_TYP where AUTH_LEVEL_ID in (3, 7, 8, 9) order by AUTH_LEVEL_NAME";
        $sql="select AUTH_LEVEL_ID as ROLE_ID, AUTH_LEVEL_NAME as ROLE_NAME from AUTH_LEVEL_TYP order by AUTH_LEVEL_NAME";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyRoleLookup')));
    }
    
    public function lookupKeyPsnl($employer="-1", $role=-1){
        $mydb = DB::getInstance();
		/*
        $sql="
            select 
                PER_CODE as PSNL_CODE
                , PER_NAME as PSNL_NAME
                , PER_AUTH as PSNL_ROLE
                , PER_CMPY as PSNL_CMPY_CODE
                , CMPY_NAME as PSNL_CMPY_NAME
                , PER_DEPARTMENT as PSNL_DEPT 
            from GUI_PERSONNEL 
            where 
                (PER_CMPY='$employer') 
                and (-1=$role or PER_AUTH=$role) 
            order by PER_CODE asc
            ";
		*/
               // ('-1'='$employer' or PER_CMPY='$employer') 
               // and (-1=$role or PER_AUTH=$role) 
			
		$sql = array();
        $sql['sql_text'] = "
            select 
                PER_CODE as PSNL_CODE
                , PER_NAME as PSNL_NAME
                , PER_AUTH as PSNL_ROLE
                , PER_CMPY as PSNL_CMPY_CODE
                , CMPY_NAME as PSNL_CMPY_NAME
                , PER_DEPARTMENT as PSNL_DEPT 
            from GUI_PERSONNEL 
            where 
                (PER_CMPY=:employer_code) 
                and (-1=:per_role or PER_AUTH=:per_role) 
            order by PER_NAME asc
            ";
		$sql['sql_data'] = array( $employer, $role );
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyPsnlLookup')));
    }
    
    public function lookupKeyTnkr($owner="-1"){
		$cmpy_filter = "";
		if ( strpos( $owner, "||||" ) === FALSE )
		{
			//$cmpy_filter = "TNKR_OWNER='" . $owner . "'";
			$cmpy_filter = "TNKR_OWNER=:tnkr_cmpy ";
			$tnkr_cmpy = $owner;
		}
		else
		{
			$arr = explode( "||||", $owner );
			$arr_len = count( $arr );
			if ( $arr[0] == "0" )
			{
				//$cmpy_filter = "TNKR_CARRIER='" . $arr[1] . "'";
				$cmpy_filter = "TNKR_CARRIER=:tnkr_cmpy ";
			}
			else
			{
				//$cmpy_filter = "TNKR_OWNER='" . $arr[1] . "'";
				$cmpy_filter = "TNKR_OWNER=:tnkr_cmpy ";
			}
			$tnkr_cmpy = $arr[1];
			
		}
	
        $mydb = DB::getInstance();
		/*
        $sql="
            select  
                TNKR_CODE
                , TNKR_NAME
                , TNKR_ETP as TNKR_ETYP_ID
                , TNKR_EQPT_NAME as TNKR_ETYP_NAME
                , TNKR_CARRIER as TNKR_CARR_CODE
                , TNKR_CARRIER_NAME as TNKR_CARR_NAME
                , TNKR_OWNER as TNKR_OWNR_CODE
                , TNKR_OWNER_NAME as TNKR_OWNR_NAME
                , DECODE(TNKR_NAME, NULL, TNKR_CODE, TNKR_CODE||'['||TNKR_NAME||']') as TNKR_DESC
            from GUI_TANKERS 
            where ($cmpy_filter) 
            order by TNKR_CODE asc
            ";
		*/
            //where ('-1'='$owner' or TNKR_OWNER='$owner') 
			
		$sql = array();
        $sql['sql_text'] = "
            select  
                TNKR_CODE
                , TNKR_NAME
                , TNKR_ETP as TNKR_ETYP_ID
                , TNKR_EQPT_NAME as TNKR_ETYP_NAME
                , TNKR_CARRIER as TNKR_CARR_CODE
                , TNKR_CARRIER_NAME as TNKR_CARR_NAME
                , TNKR_OWNER as TNKR_OWNR_CODE
                , TNKR_OWNER_NAME as TNKR_OWNR_NAME
                , DECODE(TNKR_NAME, NULL, TNKR_CODE, TNKR_CODE||'['||TNKR_NAME||']') as TNKR_DESC
            from GUI_TANKERS 
            where ($cmpy_filter) 
            order by TNKR_CODE asc
            ";
		$sql['sql_data'] = array( $tnkr_cmpy );
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyTnkrLookup')));
    }
    
    public function lookupKeyEqpt($owner="-1", $sched="-1"){
        $mydb = DB::getInstance();
		/*
        $sql="
            select  
                el.EQPT_ID
                , el.EQPT_CODE
                , el.EQPT_TITLE as EQPT_NAME
                , el.EQPT_ETP as EQPT_ETYP_ID
                , el.EQPT_ETP_TITLE as EQPT_ETYP_NAME
                , el.EQPT_OWNER as EQPT_OWNR_CODE
                , el.EQPT_OWNER_NAME as EQPT_OWNR_NAME
                , DECODE(el.EQPT_TITLE, NULL, el.EQPT_CODE, el.EQPT_CODE||'['||el.EQPT_TITLE||']') as EQPT_DESC
            from 
                GUI_EQUIPMENT_LIST el
                , EQUIP_TYPES et
            where 
                (el.EQPT_OWNER='$owner') 
                and el.EQPT_ETP = et.ETYP_ID 
                and ('-1'='$sched' or UPPER(et.ETYP_SCHEDUL)='$sched') 
            order by EQPT_CODE 
            ";
		*/
                //('-1'='$owner' or el.EQPT_OWNER='$owner') 
		
		$sql = array();
        $sql['sql_text'] = "
            select  
                el.EQPT_ID
                , el.EQPT_CODE
                , el.EQPT_TITLE as EQPT_NAME
                , el.EQPT_ETP as EQPT_ETYP_ID
                , el.EQPT_ETP_TITLE as EQPT_ETYP_NAME
                , el.EQPT_OWNER as EQPT_OWNR_CODE
                , el.EQPT_OWNER_NAME as EQPT_OWNR_NAME
                , DECODE(el.EQPT_TITLE, NULL, el.EQPT_CODE, el.EQPT_CODE||'['||el.EQPT_TITLE||']') as EQPT_DESC
            from 
                GUI_EQUIPMENT_LIST el
                , EQUIP_TYPES et
            where 
                (el.EQPT_OWNER=:owner_code) 
                and el.EQPT_ETP = et.ETYP_ID 
                and ('-1'=:sched_flag or UPPER(et.ETYP_SCHEDUL)=:sched_flag) 
            order by EQPT_CODE 
            ";
		$sql['sql_data'] = array( $owner, $sched );
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyEqptLookup')));
    }
   
    public function lookupKeyTerminal(){
        $mydb = DB::getInstance();
        $sql="select TERM_CODE, TERM_NAME, TERM_CODE||' - '||TERM_NAME as TERM_DESC from TERMINAL";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyTerminalLookup')));
    }
    
    public function lookupKeyTrip($supplier="-1", $status="-1")
    {
        $mydb = DB::getInstance();
		/*
        $sql="
            select 
                sc.SHLS_SUPP as TRIP_SUPPLIER 
                , sc.SHLS_TRIP_NO as TRIP_NO 
                , NVL(sc.STATS, 'F') AS TRIP_STATUS
                , tk.TNKR_CARRIER as TRIP_CARRIER 
                , tk.TNKR_OWNER as TRIP_OWNER 
                , sc.SHL_TANKER as TRIP_TANKER 
                , ld.LD_TERMINAL as LOAD_TERMINAL 
                , ld.LOAD_ID as LOAD_ID 
                , ld.LOAD_NUMBER as LOAD_NUMBER 
                , ld.LOAD_OPER as LOAD_OPERATOR 
            from 
                LOADS ld 
                , TANKERS tk 
                , SCHEDULE sc
            where 
                sc.SHL_TANKER = tk.TNKR_CODE 
                and sc.SHLSLOAD_LD_TRM = ld.LD_TERMINAL(+) 
                and sc.SHLSLOAD_LOAD_ID = ld.LOAD_ID(+) 
                and (sc.SHLS_SUPP='$supplier') 
                and ('-1'='$status' or NVL(sc.STATS, 'F')='$status') 
            order by sc.SHLS_SUPP, sc.SHLS_TRIP_NO            
            ";
		*/
             //   and ('-1'='$supplier' or sc.SHLS_SUPP='$supplier') 
		
		$sql = array();
        $sql['sql_text'] = "
            select 
                sc.SHLS_SUPP as TRIP_SUPPLIER 
                , sc.SHLS_TRIP_NO as TRIP_NO 
                , NVL(sc.STATS, 'F') AS TRIP_STATUS
                , tk.TNKR_CARRIER as TRIP_CARRIER 
                , tk.TNKR_OWNER as TRIP_OWNER 
                , sc.SHL_TANKER as TRIP_TANKER 
                , ld.LD_TERMINAL as LOAD_TERMINAL 
                , ld.LOAD_ID as LOAD_ID 
                , ld.LOAD_NUMBER as LOAD_NUMBER 
                , ld.LOAD_OPER as LOAD_OPERATOR 
            from 
                LOADS ld 
                , TANKERS tk 
                , SCHEDULE sc
            where 
                sc.SHL_TANKER = tk.TNKR_CODE 
                and sc.SHLSLOAD_LD_TRM = ld.LD_TERMINAL(+) 
                and sc.SHLSLOAD_LOAD_ID = ld.LOAD_ID(+) 
                and (sc.SHLS_SUPP=:supplier_code) 
                and ('-1'=:trip_status or NVL(sc.STATS, 'F')=:trip_status) 
            order by sc.SHLS_SUPP, sc.SHLS_TRIP_NO            
            ";
		$sql['sql_data'] = array( $supplier, $status );
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyTripLookup')));
    }
    
    public function lookupKeyAllocType(){
        $mydb = DB::getInstance();
        $sql="select COMPANY_ID as ALLOC_TYPE_ID, COMPANY_NAME as ALLOC_TYPE_NAME from COMPANY_TYP order by COMPANY_ID";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyAllocTypeLookup')));
    }
    
    public function lookupKeyCustomer($supplier="-1"){
        $mydb = DB::getInstance();
		/*
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
                and (cust.CUST_SUPP='$supplier') 
            order by cust.CUST_SUPP, cust.CUST_CODE            
            ";
		*/
               // and ('-1'='$supplier' or cust.CUST_SUPP='$supplier') 
		
		$sql = array();
        $sql['sql_text'] = "
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
                and (cust.CUST_SUPP=:supplier_code) 
            order by cust.CUST_SUPP, cust.CUST_CODE            
            ";
		$sql['sql_data'] = array( $supplier );
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyCustomerLookup')));
    }
    
    public function lookupKeyOrder($customer="-1"){
        $mydb = DB::getInstance();
		/*
        $sql="
            select 
                co.ORDER_NO as ORDER_ID
                , co.ORDER_CUST_ORDNO as ORDER_CUST_NO
                , cust.CUST_SUPP as ORDER_SUPP_CODE
                , scmp.CMPY_NAME as ORDER_SUPP_NAME
                , co.ORDER_CUST as ORDER_CUST_ACNT
                , cust.CUST_CODE as ORDER_CUST_CODE
                , ccmp.CMPY_NAME as ORDER_CUST_NAME
                , (co.ORDER_NO||'['||ccmp.CMPY_NAME||':'||co.ORDER_CUST_ORDNO||']') as ORDER_DESC
            from 
                CUST_ORDER co
                , CUSTOMER cust
                , COMPANYS scmp
                , COMPANYS ccmp
            where 
                co.ORDER_CUST = cust.CUST_ACCT
                and cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and (co.ORDER_CUST='$customer') 
            order by co.ORDER_NO            
            ";
		*/
                //and ('-1'='$customer' or co.ORDER_CUST='$customer') 
		
		$sql = array();
        $sql['sql_text'] = "
            select 
                co.ORDER_NO as ORDER_ID
                , co.ORDER_CUST_ORDNO as ORDER_CUST_NO
                , cust.CUST_SUPP as ORDER_SUPP_CODE
                , scmp.CMPY_NAME as ORDER_SUPP_NAME
                , co.ORDER_CUST as ORDER_CUST_ACNT
                , cust.CUST_CODE as ORDER_CUST_CODE
                , ccmp.CMPY_NAME as ORDER_CUST_NAME
                , (co.ORDER_NO||'['||ccmp.CMPY_NAME||':'||co.ORDER_CUST_ORDNO||']') as ORDER_DESC
            from 
                CUST_ORDER co
                , CUSTOMER cust
                , COMPANYS scmp
                , COMPANYS ccmp
            where 
                co.ORDER_CUST = cust.CUST_ACCT
                and cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and (co.ORDER_CUST=:customer_code) 
            order by co.ORDER_NO            
            ";
		$sql['sql_data'] = array( $customer );
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyOrderLookup')));
    }
    
    public function lookupKeyTimeCode(){
        $mydb = DB::getInstance();
        $sql="
            select 
                TCD_TITLE
                , TCD_MON
                , TCD_TUE
                , TCD_WED
                , TCD_THU
                , TCD_FRI
                , TCD_SAT
                , TCD_SUN
            from
                TIMECODE
            order by TCD_TITLE
            ";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'KeyTimeCodeLookup')));
    }
    
  

/*
kya_key_no=id
kya_key_issuer=issuer code
kya_type=type code
kya_phys_type=phys type code
kya_timecode=time code
kya_lock=locked?
kya_txt=physical tag
kya_key_created=date created
kya_pin=pin
kya_pin_changed=pin changed
kya_personnel=psnl code
kya_role=role id
kya_drawer=drawer code
kya_supplier=supp code
ya_tanker=tnkr code
kya_equipment=eqpt code
kya_load_site=terminal code
kya_load_id=load id
kya_alloc_type=alloc type code
kya_alloc_cmpy=alloc cmpy code
ya_order_no=order id
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
        Call CGI to CREATE ID Assignment
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new ID assignment++++++",IDASSIGNMENTCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'selKeyNo'=>urlencode($data->kya_key_no),
            'selKeyCo'=>urlencode($data->kya_key_issuer),
            'selKeyType'=>urlencode($data->kya_type),
            'key_typ_id'=>urlencode($data->kya_type),
            'selKeyPtype'=>urlencode($data->kya_phys_type),
            'selKeyTcd'=>urlencode($data->kya_timecode),
            'selLock'=>urlencode($data->kya_lock),
            'selKeyAdhoc'=>urlencode($data->kya_adhoc),
            'selKeyText'=>urlencode($data->kya_txt),
//            ''=>urlencode($data->kya_key_created),
            
            'selKeyPin'=>urlencode($data->kya_pin),
//            ''=>urlencode($data->kya_pin_changed),
            'selKeyPsn'=>urlencode($data->kya_personnel),
            'selKeyRole'=>urlencode($data->kya_role),
            'selKeyDrwr'=>urlencode($data->kya_drawer),
            'selKeySupplier'=>urlencode($data->kya_supplier),
            'selKeyTanker'=>urlencode($data->kya_tanker),
            'selKeyEquipment'=>urlencode($data->kya_equipment),
            
            'selKeyTripNo'=>urlencode($data->kya_trip_no),

//            ''=>urlencode($data->kya_load_site),
//            ''=>urlencode($data->kya_load_id),
//            ''=>urlencode($data->kya_alloc_type),
//            ''=>urlencode($data->kya_alloc_cmpy),
//            ''=>urlencode($data->kya_order_no),

            'op'=>urlencode("201"),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=1;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add ID Assignment failed!!!",IDASSIGNMENTCLASS);
                return "ERROR";
        }
        logMe("CGI Add ID Assignment succeeded!!!",IDASSIGNMENTCLASS);

        return "OK";
    }  
    
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
		$keys = array ("KYA_KEY_NO"=>($data->kya_key_no), "KYA_KEY_ISSUER"=>($data->kya_key_issuer));
		$excludes = array ("KYA_DMY"=>0, "KYA_PIN"=>0, "KYA_LAST_PIN_CHG"=>0);
		$upd_journal = new UpdateJournalClass( "ID Assignment", "ACCESS_KEYS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to add ID Assignment 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating ID Assignment++++++",IDASSIGNMENTCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'selKeyNo'=>urlencode($data->kya_key_no),
            'selKeyCo'=>urlencode($data->kya_key_issuer),
            'selKeyType'=>urlencode($data->kya_type),
            'selKeyPtype'=>urlencode($data->kya_phys_type),
            'selKeyTcd'=>urlencode($data->kya_timecode),
            'selLock'=>urlencode($data->kya_lock),
            'selKeyAdhoc'=>urlencode($data->kya_adhoc),
            'selKeyText'=>urlencode($data->kya_txt),
//            ''=>urlencode($data->kya_key_created),
            
            'selKeyPin'=>urlencode($data->kya_pin),
//            ''=>urlencode($data->kya_pin_changed),
            'selKeyPsn'=>urlencode($data->kya_personnel),
            'selKeyRole'=>urlencode($data->kya_role),
            'selKeyDrwr'=>urlencode($data->kya_drawer),
            'selKeySupplier'=>urlencode($data->kya_supplier),
            'selKeyTanker'=>urlencode($data->kya_tanker),
            'selKeyEquipment'=>urlencode($data->kya_equipment),
            
            'selKeyTripNo'=>urlencode($data->kya_trip_no),
            
            'reset_pin'=>urlencode($data->kya_reset_pin),
            'remove_pin'=>urlencode($data->kya_remove_pin),

//            ''=>urlencode($data->kya_load_site),
//            ''=>urlencode($data->kya_load_id),
//            ''=>urlencode($data->kya_alloc_type),
//            ''=>urlencode($data->kya_alloc_cmpy),
//            ''=>urlencode($data->kya_order_no),

            'op'=>urlencode("501"),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=1;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update ID Assignment!!!",IDASSIGNMENTCLASS);
                return "ERROR";
        }
        logMe("CGI Update ID Assignment!!!",IDASSIGNMENTCLASS);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        return "OK";
    }  

	
    public function deleteAccessMovement($key_no, $key_issuer)
	{
        $mydb = DB::getInstance();
        //$sql="delete from ACCESS_MOVEMENT where ACM_KEY_NO=$key_no and ACM_KEY_ISSUER='$key_issuer'";
		$sql = array();
        $sql['sql_text'] = "delete from ACCESS_MOVEMENT where ACM_KEY_NO=:key_no and ACM_KEY_ISSUER=:key_issuer ";
		$sql['sql_data'] = array( $key_no, $key_issuer );
		
        $result = $mydb->delete($sql);
        return $result;
    }

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
		
        logMe("Info: ++++++Deleting ID Assignment++++++",IDASSIGNMENTCLASS);
		
		// delete the child records in table ACCESS_MOVEMENT
		$AMresult = $this->deleteAccessMovement( $data->kya_key_no, $data->kya_key_issuer );
		if ( $AMresult == RETURN_OK )
		{
			logMe("Child records in ACCESS_MOVEMENT deleted successfully!",IDASSIGNMENTCLASS);
		}
		else
		{
			logMe("Child records in ACCESS_MOVEMENT failed to delete!",IDASSIGNMENTCLASS);
		}
        
		
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'selKeyNo'=>urlencode($data->kya_key_no),
            'selKeyCo'=>urlencode($data->kya_key_issuer),
            'op'=>urlencode("401"),
            'callerTyp'=>urlencode('flex')
        );
       $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=411;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("Delete ID Assignment failed!!!",IDASSIGNMENTCLASS);
            $patternFailed = "var op=421;";
            $failed = strstr($response, $patternFailed);            
            if($failed){
                return "DEPENDENCIES";
            }else{                
                return "ERROR";
            }
        }
        logMe("CGI Delete ID Assignment succeeded!!!",IDASSIGNMENTCLASS);

        return "OK";
    }      
    
    public function updateAdhocKey($data)
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
		$keys = array ("KYA_TXT"=>($data->kya_txt));
		$excludes = array ("KYA_DMY"=>0, "KYA_PIN"=>0, "KYA_LAST_PIN_CHG"=>0);
		$upd_journal = new UpdateJournalClass( "ID Assignment", "ACCESS_KEYS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to add ID Assignment 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Adhoc ID Assignment++++++",IDASSIGNMENTCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
//            'selKeyNo'=>urlencode($data->kya_key_no),
//            'selKeyCo'=>urlencode($data->kya_key_issuer),
            'selKeyText'=>urlencode($data->kya_txt),
            'selKeyTanker'=>urlencode($data->kya_tanker),

            'op'=>urlencode("601"),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=611;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Adhoc ID Assignment!!!",IDASSIGNMENTCLASS);
                return "ERROR";
        }
        logMe("CGI Update Adhoc ID Assignment!!!",IDASSIGNMENTCLASS);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        return "OK";
    }  
}
?>