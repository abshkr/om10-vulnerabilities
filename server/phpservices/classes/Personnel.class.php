<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Thunk.class.php');
require_once(dirname(__FILE__) . '/../classes/Journal.class.php');

/* define the module name for calling logMe() to output */
if(!defined('PERSONCLASS')) define('PERSONCLASS','Personnel.class');

define ("RETURN_0",     "0");             /* Password is valid */
define ("RETURN_ERR_1", "1");             /* Parameters NOT valid */
define ("RETURN_ERR_2", "2");             /* Two passwords NOT match */
define ("RETURN_ERR_3", "3");             /* Password length invalid */
define ("RETURN_ERR_4", "4");             /* Password complexity invalid */
define ("RETURN_ERR_5", "5");             /* Password changing interval invalid */
define ("RETURN_ERR_6", "6");             /* Password reuse count invalid */
define ("RETURN_ERR_7", "7");             /* Privilege NOT enough*/
define ("RETURN_ERR_8", "8");             /* Personnel operation failed */
define ("RETURN_ERR_EXCEPTION", "-1");    /* Exception */

class PersonnelClass{
    
    public function PersonnelClass(){
        session_start();
        
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "access_ctrl/personnel.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/access_ctrl/personnel.cgi";
        }
    }
    
    public function getPaged($filter,$order, $startIndex, $numItems){
        if($order==null) $order='PER_NAME';
        //if($filter == null) $filter='';
        //logMe("Filter is " . $filter, PERSONCLASS);
        $mydb = DB::getInstance();
        /*
        $sql = "SELECT * FROM(
            SELECT res.*, ROW_NUMBER() over (order by $order) RN
                FROM(
                    SELECT * FROM GUI_PERSONNEL $filter
                ) res
            )
            where RN between ".($startIndex+1)." and ".($numItems+$startIndex);
        */
        
        $sql = array();
        $sql['sql_text'] = "SELECT * FROM(
            SELECT res.*, ROW_NUMBER() over (order by $order) RN
                FROM(
                    SELECT * FROM GUI_PERSONNEL " . $filter['sql_text'] . "
                ) res
            )
            where RN between ".($startIndex+1)." and ".($numItems+$startIndex);
        $sql['sql_data'] = $filter['sql_data'];
        
        $rows = $mydb->query($sql);
        
        // foreach($rows as $x){
            // if($x->PER_EXP_D1_DMY !=null){
                // $arr = explode("/", $x->PER_EXP_D1_DMY);
                // $n = getMonthNumber($arr[1]);
                // $x->PER_EXP_D1_DMY = date("Y-m-d", mktime(0,0,0,$n,$arr[0],$arr[2]));
            // }else{
                // $x->PER_EXP_D1_DMY = '';
            // }
            // if($x->PER_EXP_D2_DMY !=null){
                // $arr = explode("/", $x->PER_EXP_D2_DMY);
                // $n = getMonthNumber($arr[1]);
                // $x->PER_EXP_D2_DMY = date("Y-m-d", mktime(0,0,0,$n,$arr[0],$arr[2]));
            // }else{
                // $x->PER_EXP_D2_DMY = '';
            // }
            // if($x->PER_EXP_D3_DMY !=null){
                // $arr = explode("/", $x->PER_EXP_D3_DMY);
                // $n = getMonthNumber($arr[1]);
                // $x->PER_EXP_D3_DMY = date("Y-m-d", mktime(0,0,0,$n,$arr[0],$arr[2]));
            // }else{
                // $x->PER_EXP_D3_DMY = '';
            // }
        // }
        
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'GUI_Personnel')));        
    }
    
    public function create($perData,$perArray){
        if( isset($_SESSION['SESSION']) )
        {
            $perData->session_id = oracle_escape_string($_SESSION['SESSION']);
        }
        else
        {
            $perData->session_id = "";
        }
        
        logMe("Info: ++++++Running into addPersonnel()++++++",PERSONCLASS);

        /* Validate parameters */
        /*
        $errMsg = '';
        if (!integrityCheck($perData, $errMsg, 'GUI_Personnel')){
            logMe("Invalid parameter. Error message: " . $errMsg,PERSONCLASS);
            return RETURN_ERR_1;
        }
        */

        /* Check the logon user's privilege */
        /*$service = new ValidateUser($perData->session_id);
        $retArray = $service->getMyScreenPrivs("personnel");
        logMe("Info: PRIV Array [ROLE_ID] " . $retArray[0]['ROLE_ID']);
        logMe("Info: PRIV Array [CGI_ID] " . $retArray[0]['CGI_ID']);
        logMe("Info: PRIV Array [PRIV] " . $retArray[0]['PRIV']);
        if ($retArray[0]['PRIV'] < 6) {
                logMe("Info: Privilege not enough to add Personnel");
                return RETURN_ERR_7;
        } */

        /* Validate password */
        /*
        $pwdChk = new PasswordCheckService();
        $retPwdChk = $pwdChk->checkPwdValidity($perData);
        if ($retPwdChk != 0){
            logMe("Error: checkPwdValidity():" . $retPwdChk,PERSONCLASS);
            return $retPwdChk;
        }
        */

        logMe("host = " . $this->host,PERSONCLASS);
        logMe("cgi = " . $this->cgi,PERSONCLASS);

        /* Call CGI to add personnel */
        $perFields = array(
            'sess_id'=>urlencode($perData->session_id),
            'pers'=>urlencode($perData->per_code),
            'persNm'=>urlencode($perData->per_name),
            'role'=>urlencode($perData->per_auth),
            'dept'=>urlencode($perData->per_department),
            'timeCd'=>urlencode($perData->pt_timecd),
            'persLck'=>urlencode($perData->per_lock),
            'persLcnc'=>urlencode($perData->per_licence_no),
            'area'=>urlencode($perData->perl_ara),
            'op'=>urlencode("18"),
            'cmpy'=>urlencode($perData->per_cmpy),
            'callerTyp'=>urlencode('flex')
            //'newPin'=>urlencode($perData->per_password),
            //'passwd1'=>urlencode($perData->per_passconfirm)
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);
        $res = $thunkObj->read();
        logMe("************************************************GETTING THAT RESPONSE*******************************************",PERSONCLASS);
        logMe($res,PERSONCLASS);
        //$patternSuccess = ">Insert successful</span>";
        $patternSuccess = "var opStatus =180;";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Add personnel failed!!!",PERSONCLASS);
                return RETURN_ERR_8;
        }
        logMe("CGI Add personnel succeeded!!!",PERSONCLASS);

        /* Call CGI to add password if it is NOT NULL */
        /* Since creating Personnel always use default password '12345', no need to call it.
        if (strlen($perData->per_password) != 0) {
                $perFields = array(
                        'sess_id'=>urlencode($perData->session_id),
                        'newPin'=>urlencode($perData->per_password),
                        'passwd1'=>urlencode($perData->per_passconfirm),
                        'pers'=>urlencode($perData->per_code),
                        'cmpy'=>urlencode($perData->per_cmpy),
                        'op'=>urlencode("15")
                        );
                $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
                $thunkObj->writeToClient($this->cgi);

                logMe($thunkObj->read());
                $patternSuccess = ">Password set successfully</span>";
                $isFound = strstr($thunkObj->read(), $patternSuccess);
                if ($isFound == false) {
                        logMe("Add password failed!!!");
                        return RETURN_ERR_8;
                }
                logMe("CGI Add password succeeded!!!");
        }
        */

        /* Call CGI to add access number */
        $perFields = array(
            'sess_id'=>urlencode($perData->session_id),
            'lvlNu'=>urlencode($perData->per_level_num),
            'pers'=>urlencode($perData->per_code),
            'cmpy'=>urlencode($perData->per_cmpy),
            'op'=>urlencode("13"),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);

        logMe($thunkObj->read(),PERSONCLASS);
        /*$patternSuccess = "no return string???";*/
        $patternSuccess = "var opStatus =0;";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Add access number failed!!!");
                return RETURN_ERR_8;
        }
        logMe("CGI Add access number succeeded!!!",PERSONCLASS);

        /* Call CGI to add expiry date */
        $perFields = array(
                'sess_id'=>urlencode($perData->session_id),
                'pers'=>urlencode($perData->per_code),
                'persExp1'=>urlencode($perData->per_exp_d1_dmy),
                'persExp2'=>urlencode($perData->per_exp_d2_dmy),
                'persExp3'=>urlencode($perData->per_exp_d3_dmy),
                'cmpy'=>urlencode($perData->per_cmpy),
                'op'=>urlencode("14"),
                'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);

        logMe($thunkObj->read(),PERSONCLASS);
        //$patternSuccess = ">Update of expiry date succeeded</span>";
        $patternSuccess = "var opStatus =140;";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Add expiry date failed!!!",PERSONCLASS);
                return RETURN_ERR_8;
        }
        logMe("CGI Add expiry date succeeded!!!",PERSONCLASS);

        /* Call CGI to add access area */

        // this clears all lockouts from PERM_OF_AREA table
        /*
        $perOfArea = new Application_Model_DbTable_PERM_OF_AREA();
        $where = $perOfArea->getAdapter()->quoteInto('PERM_PSN = ?', $perData->per_code);
        logMe("delete from PERM_OF_AREA where PERM_PSN = " . $perData->per_code,PERSONCLASS);
        $count = $perOfArea->delete($where);
        */
        $mydb = DB::getInstance();
        //$sql = "DELETE FROM PERM_OF_AREA WHERE PERM_PSN='" . $perData->per_code . "'";
        $sql = array();
        $sql['sql_text'] = "DELETE FROM PERM_OF_AREA WHERE PERM_PSN=:per_code ";
        $sql['sql_data'] = array( $perData->per_code );
        $rows = $mydb->delete($sql);

        $arrCnt = count($perArray);
        logMe("accesslocks array count = ". $arrCnt,PERSONCLASS);
        for($loop =0; $loop < $arrCnt; $loop++) {
            //$sql = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN) VALUES (" . $perArray[$loop]->perm_area .",'" . $perData->per_code ."')";
            $sql = array();
            $sql['sql_text'] = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN) VALUES ( :perm_area, :per_code ) ";
            $sql['sql_data'] = array( $perArray[$loop]->perm_area, $perData->per_code );
            $res = $mydb->insert($sql);
        }

        /*$patternSuccess = "no return string???";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Add access area failed!!!");
                return RETURN_ERR_8;
        }*/
        logMe("CGI Add access area succeeded!!!",PERSONCLASS);
        /*
        // update comments
        //$comment_sql = "UPDATE PERSONNEL SET PER_COMMENTS='" . $perData->per_comments . "' WHERE PER_CODE='" . $perData->per_code ."' ";
        $comment_sql = array();
        $comment_sql['sql_text'] = "UPDATE PERSONNEL SET PER_COMMENTS=:per_comments WHERE PER_CODE=:per_code ";
        $comment_sql['sql_data'] = array( $perData->per_comments, $perData->per_code );
        $comment_res = $mydb->update($comment_sql);
        logMe("Update the personnel comments succeeded!!!",PERSONCLASS);
        */
        $this->updatePersonnelName( $perData->per_code, $perData->per_name );
        logMe("Update the personnel name succeeded!!!",PERSONCLASS);
        $this->updatePersonnelDepartment( $perData->per_code, $perData->per_department );
        logMe("Update the personnel department succeeded!!!",PERSONCLASS);
        $this->updatePersonnelComments( $perData->per_code, $perData->per_comments );
        logMe("Update the personnel comments succeeded!!!",PERSONCLASS);
        $this->updatePersonnelEmail( $perData->per_code, $perData->user_login_count);
        logMe("Update the personnel email succeeded!!!",PERSONCLASS);
        
        /* Link a role to a user */
        logMe("Info: Linking role to the user...",PERSONCLASS);
        //$sql = "SELECT USER_ID FROM URBAC_USERS WHERE USER_CODE='" . $perData->per_code . "'";
        $sql = array();
        $sql['sql_text'] = "SELECT USER_ID FROM URBAC_USERS WHERE USER_CODE=:per_code ";
        $sql['sql_data'] = array( $perData->per_code );
        $rows = $mydb->query($sql);
        $user_id = $rows[0]->USER_ID;
        $role_id = $perData->per_auth;
        logMe("Info: user_id = ".$user_id,PERSONCLASS);
        logMe("Info: role_id = ".$role_id,PERSONCLASS);
        //$sql = "INSERT INTO URBAC_USER_ROLES (USER_ID,ROLE_ID,USER_ROLE_ACTIVE) VALUES(" . $user_id . "," . $role_id . ",1)";
        $sql = array();
        $sql['sql_text'] = "INSERT INTO URBAC_USER_ROLES (USER_ID,ROLE_ID,USER_ROLE_ACTIVE) VALUES( :user_id, :role_id, 1 ) ";
        $sql['sql_data'] = array( $user_id, $role_id );
        $rows = $mydb->insert($sql);
        logMe("Link a role to a user succeeded!!!",PERSONCLASS);

        logMe("-----------------------------",PERSONCLASS);
        logMe("Adding personnel succeeded!!!",PERSONCLASS);
        logMe("-----------------------------",PERSONCLASS);

        $code = $perData->per_code;
                
        $sql['sql_text'] = " UPDATE PERSONNEL SET PER_LAST_MODIFIED=current_date WHERE PER_CODE=:code";

        $sql['sql_data'] = array( $code );

        $mydb = DB::getInstance();

        $data = $mydb->update($sql);

        return $rows;
    }
    
    // use this PHP function to update personnel name again so the UTF-8 text will not get corrupted
    public function updatePersonnelEmail($psnl_code, $psnl_email)
    {
       $mydb = DB::getInstance();

        $sql = array();
        $sql['sql_text'] = "UPDATE PERSONNEL SET PER_EMAIL=:psnl_email WHERE PER_CODE=:psnl_code ";
        $sql['sql_data'] = array( $psnl_email, $psnl_code );
        
        $result = $mydb->update($sql);
        
        return $result;
    }
    
    // use this PHP function to update personnel name again so the UTF-8 text will not get corrupted
    public function updatePersonnelName($psnl_code, $psnl_name)
    {
       $mydb = DB::getInstance();

        $sql = array();
        $sql['sql_text'] = "UPDATE PERSONNEL SET PER_NAME=:psnl_name WHERE PER_CODE=:psnl_code ";
        $sql['sql_data'] = array( $psnl_name, $psnl_code );
        
        $result = $mydb->update($sql);
        
        return $result;
    }
    
    // use this PHP function to update personnel department again so the UTF-8 text will not get corrupted
    public function updatePersonnelDepartment($psnl_code, $psnl_dept)
    {
       $mydb = DB::getInstance();

        $sql = array();
        $sql['sql_text'] = "UPDATE PERSONNEL SET PER_DEPARTMENT=:psnl_dept WHERE PER_CODE=:psnl_code ";
        $sql['sql_data'] = array( $psnl_dept, $psnl_code );
        
        $result = $mydb->update($sql);
        
        return $result;
    }
    
    // use this PHP function to update personnel comments again so the UTF-8 text will not get corrupted
    public function updatePersonnelComments($psnl_code, $psnl_note)
    {
       $mydb = DB::getInstance();

        $sql = array();
        $sql['sql_text'] = "UPDATE PERSONNEL SET PER_COMMENTS=:psnl_note WHERE PER_CODE=:psnl_code ";
        $sql['sql_data'] = array( $psnl_note, $psnl_code );
        
        $result = $mydb->update($sql);
        
        return $result;
    }
    
    public function getUserStatusFlag($user_id)
    {
        $sql = array();
        $sql['sql_text'] = "select USER_STATUS_FLAG from URBAC_USERS where USER_ID=:user_id ";
        $sql['sql_data'] = array( $user_id );
        
        $mydb = DB::getInstance();
        $rows = $mydb->query($sql);

        return ($rows[0]->USER_STATUS_FLAG);
    }
    
    // this function is called when user locks the personnel
    public function updateUserStatusFlag($user_id, $user_flag, $user_code)
    {
        $old_flag = $this->getUserStatusFlag($user_id);
        
        $mydb = DB::getInstance();

        $sql = array();
        $sql['sql_text'] = "
            UPDATE URBAC_USERS
                SET
                USER_STATUS_FLAG = :user_flag
                WHERE USER_ID=:user_id";
        $sql['sql_data'] = array( $user_flag, $user_id );
        
        //logMe("1----------------------------->".$user_flag."<---->".$user_id,PERSONCLASS);
        //logMe("2-----------------------------".$sql['sql_text'],PERSONCLASS);
        $result = $mydb->update($sql);
        //logMe("3-----------------------------".$result,PERSONCLASS);
        
        if ( $old_flag != $user_flag )
        {
            $keys = array ("USER_ID"=>($user_id), "USER_CODE"=>($user_code));
            $excludes = array ();
            $upd_journal = new UpdateJournalClass( "Personnel", "URBAC_USERS", $keys, $excludes );
            $msg = "";
            if ( $user_flag == 0 )
            {
                $msg .= "deactivated";
            }
            else
            if ( $user_flag == 1 )
            {
                $msg .= "activated";
            }
            else
            {
                $msg .= "locked";
            }
            $msg .= " user [" . $user_code . "] successfully";
            $upd_journal->logOneLine( $msg );
        }
        
        return $result;
    }
    
    public function updateUserStatusFlag2($user_id, $user_flag, $user_code)
    {
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////// new module to log any changes of any fields on any screen ////////////////////////
        ////////////////////// Before the updates                                        ////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        $keys = array ("USER_ID"=>($user_id), "USER_CODE"=>($user_code));
        $excludes = array ("USER_CODE"=>0, "USER_USERNAME"=>0, "USER_PASSWORD"=>0, "USER_TYPE"=>0, "USER_LOGIN_COUNT"=>0, "USER_LAST_REASON"=>0, "VALID_TIME"=>0, "EXPIRE_TIME"=>0, "RECORD_SWITCH"=>0, "RECORD_ORDER"=>0, "LOGIN_ATTEMPTS"=>0, "LAST_ATTEMPT"=>0);
        $upd_journal = new UpdateJournalClass( "Personnel", "URBAC_USERS", $keys, $excludes );
        $upd_journal->setOldValues( $upd_journal->getRecordValues() );
        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        $mydb = DB::getInstance();

        $sql = array();
        $sql['sql_text'] = "
            UPDATE URBAC_USERS
                SET
                USER_STATUS_FLAG = :user_flag
                WHERE USER_ID=:user_id";
        $sql['sql_data'] = array( $user_flag, $user_id );
        
        //logMe("1----------------------------->".$user_flag."<---->".$user_id,PERSONCLASS);
        //logMe("2-----------------------------".$sql['sql_text'],PERSONCLASS);
        $result = $mydb->update($sql);
        //logMe("3-----------------------------".$result,PERSONCLASS);
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////// new module to log any changes of any fields on any screen ////////////////////////
        ////////////////////// After the updates                                         ////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        $upd_journal->setNewValues( $upd_journal->getRecordValues() );
        $upd_journal->log();
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        return $result;
    }
    
    public function readAreaAccess($per_code)
    {
        $mydb = DB::getInstance();
        /*
        $sql = "
            select 
                pa1.PERM_PSN
                , pa2.PER_CODE
                , pa2.PER_NAME
                , pa1.PERM_AREA
                , pa2.AREA_K
                , pa2.AREA_NAME
                , decode( pa1.PERM_AREA, null, 0, 1 )  as PER_ACCESS
            from
                PERM_OF_AREA  pa1
                , (
                    select 
                        pl.PER_CODE
                        , pl.PER_NAME
                        , ar.AREA_K
                        , ar.AREA_NAME
                    from 
                        PERSONNEL pl
                        , AREA_RC ar
                    where 
                        1=1
                ) pa2
            where 
                pa2.PER_CODE = pa1.PERM_PSN(+)
                and pa2.AREA_K = pa1.PERM_AREA(+)
              and pa2.PER_CODE='$per_code'
        ";
        */
        $sql = array();
        $sql['sql_text'] = "
            select 
                pa1.PERM_PSN
                , pa2.PER_CODE
                , pa2.PER_NAME
                , pa1.PERM_AREA
                , pa2.AREA_K
                , pa2.AREA_NAME
                , decode( pa1.PERM_AREA, null, 0, 1 )  as PER_ACCESS
            from
                PERM_OF_AREA  pa1
                , (
                    select 
                        pl.PER_CODE
                        , pl.PER_NAME
                        , ar.AREA_K
                        , ar.AREA_NAME
                    from 
                        PERSONNEL pl
                        , AREA_RC ar
                    where 
                        1=1
                ) pa2
            where 
                pa2.PER_CODE = pa1.PERM_PSN(+)
                and pa2.AREA_K = pa1.PERM_AREA(+)
              and pa2.PER_CODE=:per_code
        ";
        $sql['sql_data'] = array( $per_code );
        
        $rows = $mydb->query($sql);
        
        return $rows;
    }   
    
    public function logAreaAccess( $per_code, $old_data, $new_data )
    {
        $keys = array ("PER_CODE"=>($per_code));
        $excludes = array ("PER_LAST_DMY"=>0, "PER_COMMENTS"=>0);
        $upd_journal = new UpdateJournalClass( "Personnel", "PERSONNEL", $keys, $excludes );
                
        foreach($old_data as $old_key => $old_row)
        {
            $old_value = (array)$old_row;
            foreach($new_data as $new_key => $new_row)
            {
                $new_value = (array)$new_row;
                if ( $old_value['AREA_K'] == $new_value['AREA_K'] && $old_value['PER_ACCESS'] != $new_value['PER_ACCESS'] )
                {
                    // area access permission has been changed and log the change
                    if ( $new_value['PER_ACCESS'] == 1 )
                    {
                        $msg = "has granted [". $new_value['PER_NAME'] ."] the permission to the area [". $new_value['AREA_NAME'] ."] " ;
                    }
                    else
                    {
                        $msg = "has cancelled [". $new_value['PER_NAME'] ."] the permission to the area [". $new_value['AREA_NAME'] ."] " ;
                    }
                    $upd_journal->logOneLine( $msg );
                }
            }
        }
        
    }
    
    public function updateAreaAccess( $per_code, $per_area )
    {
        $paOld = $this->readAreaAccess( $per_code );
        
        /* Use PHP to update personnel access area */
        $mydb = DB::getInstance();
        //$sql="DELETE FROM PERM_OF_AREA WHERE PERM_PSN='".$per_code."'";
        $sql = array();
        $sql['sql_text'] = "DELETE FROM PERM_OF_AREA WHERE PERM_PSN=:per_code ";
        $sql['sql_data'] = array( $per_code );
        $res = $mydb->delete($sql);
        
        //$arr = explode($per_area);
        $arrCnt = count($per_area);
        logMe("Is array set: " . isset($per_area), PERSONCLASS);
        logMe("array count = ". $arrCnt,PERSONCLASS);
        for($loop =0; $loop < $arrCnt; $loop++) {
            //$sql = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN) VALUES (" . $per_area[$loop]->perm_area .",'" . $per_code ."')";
            $sql = array();
            $sql['sql_text'] = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN) VALUES ( :perm_area, :per_code ) ";
            $sql['sql_data'] = array( $per_area[$loop]->perm_area, $per_code );
        
            $res = $mydb->insert($sql);
        }

        $paNew = $this->readAreaAccess( $per_code );
        $this->logAreaAccess( $per_code, $paOld, $paNew );
        
        logMe("CGI Update access area succeeded!!!",PERSONCLASS);        
    }
    
    
    public function update($perData, $perArray)
    { 
        if( isset($_SESSION['SESSION']) )
        {
            $perData->session_id = oracle_escape_string($_SESSION['SESSION']);
        }
        else
        {
            $perData->session_id = "";
        }
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////// new module to log any changes of any fields on any screen ////////////////////////
        ////////////////////// Before the updates                                        ////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        $keys = array ("PER_CODE"=>($perData->per_code));
        $excludes = array ("PER_LAST_DMY"=>0, "PER_COMMENTS"=>0);
        $upd_journal = new UpdateJournalClass( "Personnel", "PERSONNEL", $keys, $excludes );
        $upd_journal->setOldValues( $upd_journal->getRecordValues() );
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        logMe("Info: ++++++Running into updatePersonnel()++++++",PERSONCLASS);

        /* Validate parameters */
//        $errMsg = '';
//        if (!integrityCheck($perData, $errMsg, 'Personnel_GUI'))
//        {
//                logMe("Invalid parameter. Error message: " . $errMsg);
//                return RETURN_ERR_1;
//        }

        /* Check the logon user's privilege */
//        $service = new ValidateUser($perData->session_id);
//        $retArray = $service->getMyScreenPrivs("personnel");
//        logMe("Info: PRIV Array [ROLE_ID] " . $retArray[0]['ROLE_ID']);
//        logMe("Info: PRIV Array [CGI_ID] " . $retArray[0]['CGI_ID']);
//        logMe("Info: PRIV Array [PRIV] " . $retArray[0]['PRIV']);
//        if ($retArray[0]['PRIV'] < 6) {
//                logMe("Info: Privilege not enough to add Personnel");
//                return RETURN_ERR_7;
//        }
//
//        /* Validate password */
//        $pwdChk = new PasswordCheckService();
//        $retPwdChk = $pwdChk->checkPwdValidity($perData);
//        if ( $retPwdChk != 0) {
//                logMe("Error: checkPwdValidity():" . $retPwdChk);
//                return $retPwdChk;
//        }

        logMe("host = " . $this->host,PERSONCLASS);
        logMe("cgi = " . $this->cgi,PERSONCLASS);

        /* Call CGI to update personnel */
        $perFields = array(
                'sess_id'=>urlencode($perData->session_id),
                'pers'=>urlencode($perData->per_code),
                'persNm'=>urlencode($perData->per_name),
                'role'=>urlencode($perData->per_auth),
                'dept'=>urlencode($perData->per_department),
                'timeCd'=>urlencode($perData->pt_timecd),
                'persLck'=>urlencode($perData->per_lock),
                'persLcnc'=>urlencode($perData->per_licence_no),
                'area'=>urlencode($perData->perl_ara),
                'op'=>urlencode("17"),
                'callerTyp'=>urlencode("flex"),
                'cmpy'=>urlencode($perData->per_cmpy)
                //'newPin'=>urlencode($perData->per_password),
                //'passwd1'=>urlencode($perData->per_passconfirm)
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);

        logMe($thunkObj->read(),PERSONCLASS);
        //$patternSuccess = ">update successful</span>";
        $patternSuccess = "var opStatus =170;";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Update personnel failed!!!",PERSONCLASS);
                return RETURN_ERR_8;
        }
        logMe("CGI Update personnel succeeded!!!",PERSONCLASS);

        /* Call CGI to update password */
        /* Since updating Personnel will not update password, no need to call it.
        $perFields = array(
                'sess_id'=>urlencode($perData->session_id),
                'newPin'=>urlencode($perData->per_password),
                'passwd1'=>urlencode($perData->per_passconfirm),
                'pers'=>urlencode($perData->per_code),
                'cmpy'=>urlencode($perData->per_cmpy),
                'op'=>urlencode("15")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);

        logMe($thunkObj->read());
        $patternSuccess = ">Password set successfully</span>";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Update password failed!!!");
                return RETURN_ERR_8;
        }
        logMe("CGI Update password succeeded!!!");
        */

        /* Call CGI to update access number */
        $perFields = array(
                'sess_id'=>urlencode($perData->session_id),
                'lvlNu'=>urlencode($perData->per_level_num),
                'pers'=>urlencode($perData->per_code),
                'cmpy'=>urlencode($perData->per_cmpy),
                'callerTyp'=>urlencode("flex"),
                'op'=>urlencode("13")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);

        logMe($thunkObj->read(),PERSONCLASS);
        /*$patternSuccess = "no return string???"; */
        $patternSuccess = "var opStatus =0;";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
            logMe("Add access number failed!!!");
            return RETURN_ERR_8;
        }
        logMe("CGI Update access number succeeded!!!",PERSONCLASS);

        /* Call CGI to update expiry date */
        $perFields = array(
                'sess_id'=>urlencode($perData->session_id),
                'pers'=>urlencode($perData->per_code),
                'persExp1'=>urlencode($perData->per_exp_d1_dmy),
                'persExp2'=>urlencode($perData->per_exp_d2_dmy),
                'persExp3'=>urlencode($perData->per_exp_d3_dmy),
                'cmpy'=>urlencode($perData->per_cmpy),
                'callerTyp'=>urlencode("flex"),
                'op'=>urlencode("14")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);

        logMe($thunkObj->read(),PERSONCLASS);
        //$patternSuccess = ">Update of expiry date succeeded</span>";
        $patternSuccess = "var opStatus =140;";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Update expiry date failed!!!",PERSONCLASS);
                return RETURN_ERR_8;
        }
        logMe("CGI Update expiry date succeeded!!!",PERSONCLASS);

        /* Call CGI to update access area */
        $this->updateAreaAccess( $perData->per_code, $perArray );
        $mydb = DB::getInstance();
        /*
        $sql="DELETE FROM PERM_OF_AREA WHERE PERM_PSN='".$perData->per_code."'";
        $res = $mydb->delete($sql);
        //$arr = explode($perArray);
        $arrCnt = count($perArray);
        logMe("Is array set: " . isset($perArray), PERSONCLASS);
        logMe("array count = ". $arrCnt,PERSONCLASS);
        for($loop =0; $loop < $arrCnt; $loop++) {
            $sql = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN) VALUES (" . $perArray[$loop]->perm_area .",'" . $perData->per_code ."')";
            $res = $mydb->insert($sql);
            //$thunkObj = new Thunk($this->host, $this->cgi, $perFields);
            //$thunkObj->writeToClient($this->cgi);
            //logMe($thunkObj->read(),PERSONCLASS);
        }

        logMe("CGI Update access area succeeded!!!",PERSONCLASS);        
        */
        /*
        // update comments
        //$comment_sql = "UPDATE PERSONNEL SET PER_COMMENTS='" . $perData->per_comments . "' WHERE PER_CODE='" . $perData->per_code ."' ";
        $comment_sql = array();
        $comment_sql['sql_text'] = "UPDATE PERSONNEL SET PER_COMMENTS=:per_comments WHERE PER_CODE=:per_code ";
        $comment_sql['sql_data'] = array( $perData->per_comments, $perData->per_code );
        $comment_res = $mydb->update($comment_sql);
        logMe("Update the personnel comments succeeded!!!",PERSONCLASS);
        */
        $this->updatePersonnelName( $perData->per_code, $perData->per_name );
        logMe("Update the personnel name succeeded!!!",PERSONCLASS);
        $this->updatePersonnelDepartment( $perData->per_code, $perData->per_department );
        logMe("Update the personnel department succeeded!!!",PERSONCLASS);
        $this->updatePersonnelComments( $perData->per_code, $perData->per_comments );
        logMe("Update the personnel comments succeeded!!!",PERSONCLASS);
        $this->updatePersonnelEmail( $perData->per_code, $perData->user_login_count);
        logMe("Update the personnel email succeeded!!!",PERSONCLASS);
        
        /* Update the role linked to the user */
        logMe("Info: Update the role linked to the user...",PERSONCLASS);
        //$sql = "SELECT USER_ID FROM URBAC_USERS WHERE USER_CODE='" . $perData->per_code . "'";
        $sql = array();
        $sql['sql_text'] = "SELECT USER_ID FROM URBAC_USERS WHERE USER_CODE=:per_code ";
        $sql['sql_data'] = array( $perData->per_code );
        $rows = $mydb->query($sql);
        $user_id = $rows[0]->USER_ID;
        $role_id = $perData->per_auth;
        logMe("Info: user_id = ".$user_id,PERSONCLASS);
        logMe("Info: role_id = ".$role_id,PERSONCLASS);
        //$sql = "UPDATE URBAC_USER_ROLES SET ROLE_ID=" . $role_id . " WHERE USER_ID=" . $user_id;
        $sql = array();
        $sql['sql_text'] = "UPDATE URBAC_USER_ROLES SET ROLE_ID=:role_id WHERE USER_ID=:user_id ";
        $sql['sql_data'] = array( $role_id, $user_id );
        $rows = $mydb->update($sql);
        logMe("Update the role linked to the user succeeded!!!",PERSONCLASS);

        logMe("-------------------------------",PERSONCLASS);
        logMe("Updating personnel succeeded!!!",PERSONCLASS);
        logMe("-------------------------------",PERSONCLASS);

        // now update the URBAC_USERS.USER_STATUS_FLAG
        $this->updateUserStatusFlag( $user_id, $perData->user_status_flag, $perData->per_code );
        
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////// new module to log any changes of any fields on any screen ////////////////////////
        ////////////////////// After the updates                                         ////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        $upd_journal->setNewValues( $upd_journal->getRecordValues() );
        $upd_journal->log();
        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        $code = $perData->per_code;
                
        $sql['sql_text'] = " UPDATE PERSONNEL SET PER_LAST_MODIFIED=current_date WHERE PER_CODE=:code";

        $sql['sql_data'] = array( $code );

        $mydb = DB::getInstance();

        $data = $mydb->update($sql);
        
        return RETURN_0;
    }

    public function delete($perData){ 
        if( isset($_SESSION['SESSION']) )
        {
            $perData->session_id = oracle_escape_string($_SESSION['SESSION']);
        }
        else
        {
            $perData->session_id = "";
        }
        
        logMe("Info: ++++++Running into deletePersonnel()++++++",PERSONCLASS);

        /* Validate parameters */
        /*
        $errMsg = '';
        if (!integrityCheck($perData, $errMsg, 'Personnel_GUI'))
        {
            logMe("Invalid parameter. Error message: " . $errMsg,PERSONCLASS);
            return RETURN_ERR_1;
        }
        */
        /* Check the logon user's privilege */
        /*
        $service = new ValidateUser($perData->session_id);
        $retArray = $service->getMyScreenPrivs("personnel");
        logMe("Info: PRIV Array [ROLE_ID] " . $retArray[0]['ROLE_ID'],PERSONCLASS);
        logMe("Info: PRIV Array [CGI_ID] " . $retArray[0]['CGI_ID'],PERSONCLASS);
        logMe("Info: PRIV Array [PRIV] " . $retArray[0]['PRIV'],PERSONCLASS);
        if ($retArray[0]['PRIV'] < 6) {
            logMe("Info: Privilege not enough to delete Personnel",PERSONCLASS);
            return RETURN_ERR_7;
        }

        logMe("host = " . $this->host,PERSONCLASS);
        logMe("cgi = " . $this->cgi,PERSONCLASS);
        */
        /* Call CGI to delete personnel */
        $perFields = array(
                'sess_id'=>urlencode($perData->session_id),
                'pers'=>urlencode($perData->per_code),
                'cmpy'=>urlencode($perData->per_cmpy),
                'op'=>urlencode("19"),
                'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        //$patternSuccess = ">Delete successful</span>";
        $patternSuccess = "var opStatus =190;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("Delete personnel failed!!!",PERSONCLASS);
            return "ERROR";
            //return RETURN_ERR_8;
        }
        /*
        logMe($thunkObj->read(),PERSONCLASS);
        $patternSuccess = ">Delete successful</span>";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
            logMe("Delete personnel failed!!!",PERSONCLASS);
            return RETURN_ERR_8;
        }
        */
        logMe("CGI Delete personnel succeeded!!!",PERSONCLASS);

        //return RETURN_0;
        return "OK";
    }
    
    public function lookup(){
        $mydb = DB::getInstance();
        //$sql="SELECT CMPY_CODE,CMPY_NAME FROM GUI_COMPANYS WHERE CMPY_CODE <> 'ANY' and bitand(CMPY_TYPE,64)<>0 ORDER BY CMPY_NAME ASC";
        $sql="
            SELECT distinct 
                gc.CMPY_CODE
                , gc.CMPY_NAME 
            FROM 
                GUI_COMPANYS gc
            WHERE 
                gc.CMPY_CODE <> 'ANY' 
                and bitand(gc.CMPY_TYPE,64)<>0 
                and ( 
                    ( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
                        and ( gc.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')
                        or ( gc.CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=6 and status=1) ) ) 
                    )
                    or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
                    or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
                    or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
            ORDER BY gc.CMPY_NAME ASC
        ";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'PersonnelLookup')));
    }

    public function getOnSite($order){
        if($order==null)$order='PER_NAME';
        $mydb = DB::getInstance();
        $sql="SELECT PER_CODE,PER_NAME,CMPY_NAME,AREA_NAME per_area,PERL_ENTER_TIME per_enter_time from GUI_PERSONNEL,AREA_RC where PER_CODE=PERL_PSN and PERL_ARA <> 9999 and PERL_ARA = AREA_K order by $order";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'PersonnelOnSite')));
    }
    
    public function getSiteManager(){       
        $mydb = DB::getInstance();
        $sql="SELECT SITE_NAME from SITE";
        $res = $mydb->query($sql);
        return $res[0]->SITE_NAME;
    }
    
    public function getTimeCode(){
        $mydb = DB::getInstance();
        $sql="SELECT * FROM timecode";
        $res = $mydb->query($sql);
        return $res;
    }    
    
    public function getPersonnelRoles(){
        $mydb = DB::getInstance();
        $sql="SELECT * FROM AUTH_LEVEL_TYP";
        $res = $mydb->query($sql);
        //XarrayEncodingConversion($res);
        return $res;
    }
    
    public function getAreas(){
        $mydb = DB::getInstance();
        $sql="SELECT * FROM AREA_RC";
        $rows = $mydb->query($sql);      
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'SiteAreas')));
//        $res = $mydb->query($sql);
//        return $res;
    }    
    
    public function getAreaAccess($code){
        $mydb = DB::getInstance();
        //$sql="SELECT * FROM PERM_OF_AREA WHERE PERM_PSN='$code'";
        $sql = array();
        $sql['sql_text'] = "SELECT * FROM PERM_OF_AREA WHERE PERM_PSN=:psnl_code ";
        $sql['sql_data'] = array( $code );
        
        $rows = $mydb->query($sql);      
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'AccessPermissions_vo')));
    }    
    
    
    // search for employer company by driver code
    public function lookupCmpyByDriver($drivercode){
        $mydb = DB::getInstance();
        //$sql="SELECT CMPY_CODE,CMPY_NAME FROM GUI_PERSONNEL WHERE PER_CODE = '$drivercode'";
        $sql = array();
        $sql['sql_text'] = "SELECT CMPY_CODE,CMPY_NAME FROM GUI_PERSONNEL WHERE PER_CODE = :driver_code ";
        $sql['sql_data'] = array( $drivercode );
        
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'PersonnelLookup')));
    }
    
    //search for personnel list by company code
    public function lookupPSNListByCmpy($cmpycode){
        $mydb = DB::getInstance();
        //$sql="SELECT PER_CODE,PER_NAME FROM GUI_PERSONNEL WHERE CMPY_CODE = '$cmpycode' AND PER_AUTH IN (7,8,9)";
        $sql = array();
        $sql['sql_text'] = "SELECT PER_CODE,PER_NAME FROM GUI_PERSONNEL WHERE CMPY_CODE = :cmpy_code AND PER_AUTH IN (7,8,9)";
        $sql['sql_data'] = array( $cmpycode );
        
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'PersonnelByCmpyLookup')));
    }
    
}
?>
