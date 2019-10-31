<?php
require_once 'Zend/Date.php';
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../models/DbTable/Personnel.php');
require_once(dirname(__FILE__) . '/../models/DbTable/PasswordCheck.php');

/* define the module name for calling logMe() to output */
if(!defined('PASSWORDCHECKCLASS')) define('PASSWORDCHECKCLASS','PasswordCheck.class');

class PasswordCheckClass 
{
	/*
	 * Get password rule setting value from SITE_CONFIG table
	 */
	public function getPwdRuleSettings($search_key)
	{
		$mydb = DB::getInstance();
		$sql = "select CONFIG_VALUE VAL from SITE_CONFIG where CONFIG_KEY='" . $search_key . "'";
		$rows = $mydb->query($sql);
		
		/* Check the number of rows that match the SELECT statement */
		if (count($rows) > 0) {
			$ret = $rows[0]->VAL;
		}
		else {
			$ret = null;
		}
		
		return $ret;
	}

	/*
	 * Get user status from  URBAC_USERS table
	 */
	public function getUserStatus($userid)
	{
		$mydb = DB::getInstance();
		$sql = "select USER_STATUS_FLAG FLAG from URBAC_USERS,PERSONNEL where USER_CODE=PER_CODE and PER_CODE='" . $userid . "'";
		$rows = $mydb->query($sql);
		
		/* Check the number of rows that match the SELECT statement */
		if (count($rows) > 0) {
			$ret = $rows[0]->FLAG;
		}
		else {
			$ret = null;
		}
		
		return $ret;
	}

	/*
	 * Get last password change time from URBAC_PWD_TRACES table
	 */
	public function getLastPwdChgTime($userid)
	{
		$mydb = DB::getInstance();
		$sql = "select to_char(PWDTRACE_LAST_CHG,'yyyy/mm/dd hh24:mi:ss') LCT from URBAC_PWD_TRACES,URBAC_USERS,PERSONNEL where PWDTRACE_USERID=USER_ID and USER_CODE=PER_CODE and PER_CODE='" . $userid . "'" . " ORDER BY PWDTRACE_LAST_CHG DESC";
		$rows = $mydb->query($sql);
		
		/* Check the number of rows that match the SELECT statement */
		if (count($rows) > 0) {
			$ret = $rows[0]->LCT;
		}
		else {
			$ret = null;
		}
		
		return $ret;
	}

	/*
	 * Get latest n passwords from URBAC_PWD_TRACES table
	 */
	public function getLatestPwds($userid)
	{
		$mydb = DB::getInstance();
		$sql = "select PWDTRACE_PWD from URBAC_PWD_TRACES,URBAC_USERS,PERSONNEL where PWDTRACE_USERID=USER_ID and USER_CODE=PER_CODE and PER_CODE='" . $userid . "'" . " ORDER BY PWDTRACE_LAST_CHG DESC";
		$rows = $mydb->query($sql);
		
		/* Check the number of rows that match the SELECT statement */
		if (count($rows) > 0) {
			$ret = $rows;
		}
		else {
			$ret = null;
		}
		
		return $ret;
	}

	/*
	 * Check if each char' ASCII in given string is in the range given
	 * Param: $string is the one need to check
	 *        $start is the start ascii value
	 *        $end is the end ascii value 
	 */
	public function checkASCII($string, $start, $end)
	{
		$ret = false;
		$len =  strlen($string);
		for ($i = 0; $i < $len; $i++)
		{
			$ascii = ord(substr($string, $i, 1));
			if ($ascii >= $start and $ascii <= $end) {
				logMe("Info: string[". $i. "] = " . substr($string, $i, 1) . " ASCII is within " . $start . " and " . $end, PASSWORDCHECKCLASS);
				$ret = true;
				break;
			}
			logMe("Info: string[". $i. "] = " . substr($string, $i, 1), PASSWORDCHECKCLASS);
		}
		
		return $ret;
	}


















	public function getAllRecords()
	{
		$table = new Application_Model_DbTable_Personnel();
		$sql="select PERSONNEL.PER_EXP_D1_DMY,PERSONNEL.PER_EXP_D2_DMY,PERSONNEL.PER_EXP_D3_DMY,PERSONNEL.PER_CODE,PERSONNEL.PER_NAME,PERSONNEL.PER_CMPY,PERSONNEL.PER_AUTH,PERSONNEL.PER_LOCK,PERSONNEL.PER_LAST_DMY,PERSONNEL.PER_DEPARTMENT,PERSONNEL.PER_PASSWD,PERSONNEL.PER_LICENCE_NO,PERSONNEL.PER_NEXT_MSG,PERSONNEL.PER_PASSWD_2,PERSONNEL.PER_LEVEL_NUM,PERSONNEL.PER_TERMINAL,COMPANYS.CMPY_NAME per_cmpy_name,AUTH_LEVEL_TYP.AUTH_LEVEL_NAME per_role,PER_TIMECODE.PT_TIMECD per_timecode from PERSONNEL,COMPANYS,AUTH_LEVEL_TYP,PER_TIMECODE where PERSONNEL.PER_CMPY=COMPANYS.CMPY_CODE(+) and PERSONNEL.PER_LEVEL_NUM=AUTH_LEVEL_TYP.AUTH_LEVEL_ID(+) and PERSONNEL.PER_CODE=PER_TIMECODE.PT_PSNCODE(+)";
		$personnelrows = $table->getAdapter()->fetchAll($sql);
        return $personnelrows;
	}
	
	public function getRecordCount($filter)
	{
        $table = new Application_Model_DbTable_Personnel();
        $sql = "select count(*) REC_COUNT from PERSONNEL";
		$tmpStr=$filter;
        if ($filter != "")
        {
            $sql =  $sql." where PER_CMPY='".$tmpStr."'";
		}
        $rows = $table->getAdapter()->fetchAll($sql);
        return ((integer)$rows[0]['REC_COUNT']);
	}
	
	public function getCurrentPage($startIndex, $numItems, $filter) 
    {
        $table = new Application_Model_DbTable_Personnel();
        $db_temp = $table->getAdapter();
        $select = $db_temp->select()
            ->from(array('PERSONNEL'))
			->order(array('PER_NAME'))
            ->limit($numItems, $startIndex);

        if ($filter != "")
        {
            $select->where('PER_CMPY=?',$filter);
        }
        
        $stmt = $db_temp->query($select);
        $journalrows = $stmt->fetchAll();
		
        return $journalrows;
    }	
}
