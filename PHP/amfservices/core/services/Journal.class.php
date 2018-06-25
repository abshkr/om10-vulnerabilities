<?php
require_once( 'bootstrap.php' );

/* define the module name for calling logMe() to output */
if(!defined('JOURNALCLASS')) define('JOURNALCLASS','Journal.class');

class Journal
{
    public $gen_date;
    public $region_code;
    public $msg_event;
    public $msg_class;     
    public $message;      
    public $seq; 
    public $jnl_cat;
    public $rn;
    public $company_code;    
    public $print_date;    
}

class JournalClass {
    protected $gendate_from;	
    protected $jnlstart;
    protected $jnlend;
    protected $mylang;

    public function JournalClass($start_date, $end_date){
		session_start();
        $this->jnlstart = $start_date;
        $this->jnlend = $end_date;
        $this->mylang ='ENG';
    }

    public function getRecordCount($filter){
        $mydb = DB::getInstance();
		/*
        $sql = "select count(*) REC_COUNT from GUI_SITE_JOURNAL where (REGION_CODE = '" . $this->mylang . "')";
        if ($this->jnlstart != NULL){
            $sql .= " AND (GEN_DATE > '" . $this->jnlstart . "'";
            if ($this->jnlend != NULL) $sql .= " AND GEN_DATE < '" . $this->jnlend . "'"; 
            $sql .= ")";
        }            
        if ($filter != ""){
            $arr = explode(':',$filter);
            $tmpStr = "";
            for ($i = 0; $i < count($arr); $i++){
                $tmpStr = $tmpStr . " MSG_EVENT='" . $arr[$i] . "'";
                if ($i != count($arr) - 1) $tmpStr = $tmpStr . " OR ";
            }
            if ($tmpStr != "") $sql = $sql . " AND (" . $tmpStr . ")";
        }            
		*/
		$sql = array();
		$sql['sql_text'] = "select count(*) REC_COUNT from GUI_SITE_JOURNAL where (REGION_CODE = :my_lang)";
		$sql['sql_data'] = array($this->mylang);
        if ($this->jnlstart != NULL)
		{
            $sql['sql_text'] .= " AND (GEN_DATE > :jnl_start ";
			$sql['sql_data'][] = $this->jnlstart;
            if ($this->jnlend != NULL) 
			{
				$sql['sql_text'] .= " AND GEN_DATE < :jnl_end "; 
				$sql['sql_data'][] = $this->jnlend;
			}
            $sql['sql_text'] .= ")";
        }            
        if ($filter != "")
		{
            $arr = explode(':',$filter);
            $tmpStr = "";
            for ($i = 0; $i < count($arr); $i++)
			{
                $tmpStr = $tmpStr . " MSG_EVENT=:msg_event".$i . " ";
				$sql['sql_data'][] = $arr[$i];
                if ($i != count($arr) - 1) 
				{
					$tmpStr = $tmpStr . " OR ";
				}
            }
            if ($tmpStr != "") 
			{
				$sql['sql_text'] = $sql['sql_text'] . " AND (" . $tmpStr . ")";
			}
        }            
		
        $res = $mydb->query($sql, 'N');
        return ((integer)$res[0]->REC_COUNT);
    }
    
    public function getLastSequenceNumber(){
        $mydb = DB::getInstance();
        //$sql="SELECT MAX(SEQ) AS LAST FROM GUI_SITE_JOURNAL WHERE REGION_CODE='".$this->mylang."' ORDER BY GEN_DATE DESC,SEQ DESC";
		
		$sql = array();
		$sql['sql_text'] = "SELECT MAX(SEQ) AS LAST FROM GUI_SITE_JOURNAL WHERE REGION_CODE=:my_lang ORDER BY GEN_DATE DESC,SEQ DESC";
		$sql['sql_data'] = array($this->mylang);
		
        $res = $mydb->query($sql, 'N');
        return $res[0]->LAST;
    }
    
    public function getLatestAlarms($seq){
        $seq=$seq;
        $mydb = DB::getInstance();
        //$sql="SELECT * FROM GUI_SITE_JOURNAL WHERE REGION_CODE='".$this->mylang."' AND SEQ>'$seq' AND MSG_EVENT='ALARM' ORDER BY GEN_DATE DESC,SEQ DESC";        
		
		$sql = array();
		$sql['sql_text'] = "SELECT * FROM GUI_SITE_JOURNAL WHERE REGION_CODE=:my_lang  AND SEQ>:seq_no AND MSG_EVENT='ALARM' ORDER BY GEN_DATE DESC,SEQ DESC"; 
		$sql['sql_data'] = array($this->mylang, $seq);
		
        $res = $mydb->query($sql);
        return $res;
    }    
        
    public function getLatestPagedJournalLines($startIndex, $numItems, $filter){
        $mydb = DB::getInstance();
		/*
        $sql="SELECT * FROM (SELECT GUI_SITE_JOURNAL.*, ROW_NUMBER() over (order by GEN_DATE DESC) RN from GUI_SITE_JOURNAL WHERE REGION_CODE='".$this->mylang."'";
        if ($this->jnlstart != NULL){
            $sql .= " AND (GEN_DATE > '" . $this->jnlstart . "'";
            if ($this->jnlend != NULL) $sql .= " AND GEN_DATE < '" . $this->jnlend . "'"; 
            $sql .= ")";
        }
        
        
        if ($filter != ""){
            $arr = explode(':',$filter);
            $tmpStr = "";
            for ($i=0; $i<count($arr);$i++){
                $tmpStr = $tmpStr . " MSG_EVENT='" . $arr[$i] . "'";
                if ($i!=count($arr)-1) $tmpStr = $tmpStr . " OR ";
            }
            if ($tmpStr != "")$sql.= " AND (".$tmpStr .")";
        }
        $sql .= " ) WHERE (RN between ".($startIndex+1)." and ".($numItems+$startIndex).")";
        $sql .= " ORDER BY SEQ DESC";
		*/
		$sql = array();
		$sql['sql_text'] = "SELECT * FROM (SELECT GUI_SITE_JOURNAL.*, ROW_NUMBER() over (order by GEN_DATE DESC) RN from GUI_SITE_JOURNAL WHERE REGION_CODE=:my_lang ";
		$sql['sql_data'] = array($this->mylang);
        if ($this->jnlstart != NULL)
		{
            $sql['sql_text'] .= " AND (GEN_DATE > :jnl_start ";
			$sql['sql_data'][] = $this->jnlstart;
            if ($this->jnlend != NULL)
			{
				$sql['sql_text'] .= " AND GEN_DATE < :jnl_end "; 
				$sql['sql_data'][] = $this->jnlend;
			}
            $sql['sql_text'] .= ")";
        }
        
        if ($filter != "")
		{
            $arr = explode(':',$filter);
            $tmpStr = "";
            for ($i=0; $i<count($arr);$i++)
			{
                $tmpStr = $tmpStr . " MSG_EVENT=:msg_event".$i . " ";
				$sql['sql_data'][] = $arr[$i];
                if ($i!=count($arr)-1) 
				{
					$tmpStr = $tmpStr . " OR ";
				}
            }
            if ($tmpStr != "")
			{
				$sql['sql_text'] .= " AND (".$tmpStr .")";
			}
        }
        $sql['sql_text'] .= " ) WHERE (RN between ".($startIndex+1)." and ".($numItems+$startIndex).")";
        $sql['sql_text'] .= " ORDER BY SEQ DESC";
		
        $res = $mydb->query($sql);
        return $res;
    }
    
    public function getCSVJournalLines($filter){
        $mydb = DB::getInstance();
		/*
        $sql="SELECT * FROM GUI_SITE_JOURNAL";
        if ($this->jnlstart != NULL){
            $sql .= " WHERE (GEN_DATE > '" . $this->jnlstart . "'";
            if ($this->jnlend != NULL) $sql .= " AND GEN_DATE < '" . $this->jnlend . "'"; 
            $sql .= ")";
        }
        $sql .= " AND REGION_CODE='".$this->mylang."'";
        
        if ($filter != ""){
            $arr = explode(':',$filter);
            $tmpStr = "";
            for ($i=0; $i<count($arr);$i++){
                $tmpStr = $tmpStr . " MSG_EVENT='" . $arr[$i] . "'";
                if ($i!=count($arr)-1) $tmpStr = $tmpStr . " OR ";
            }
            if ($tmpStr != "")$sql.= " AND (".$tmpStr.")";
        }
        
        $sql .= " ORDER BY SEQ DESC";
		*/
		$sql = array();
		$sql['sql_text'] = "SELECT * FROM GUI_SITE_JOURNAL";
		$sql['sql_data'] = array();
        if ($this->jnlstart != NULL)
		{
            $sql['sql_text'] .= " WHERE (GEN_DATE > :jnl_start ";
			$sql['sql_data'][] = $this->jnlstart;
            if ($this->jnlend != NULL) 
			{
				$sql['sql_text'] .= " AND GEN_DATE < :jnl_end "; 
				$sql['sql_data'][] = $this->jnlend;
			}
            $sql['sql_text'] .= ")";
        }
        $sql['sql_text'] .= " AND REGION_CODE=:my_lang ";
		$sql['sql_data'][] = $this->mylang;
        
        if ($filter != "")
		{
            $arr = explode(':',$filter);
            $tmpStr = "";
            for ($i=0; $i<count($arr);$i++)
			{
                $tmpStr = $tmpStr . " MSG_EVENT=:msg_event".$i . " ";
				$sql['sql_data'][] = $arr[$i];
                if ($i!=count($arr)-1) 
				{
					$tmpStr = $tmpStr . " OR ";
				}
            }
            if ($tmpStr != "")
			{
				$sql['sql_text'] .= " AND (".$tmpStr.")";
			}
        }
        $sql['sql_text'] .= " ORDER BY SEQ DESC";
		
        $res = $mydb->query($sql);
        return $res;  
    }    

    public function getJournalEventClassList(){
        $mydb = DB::getInstance();
        //$sql="SELECT MSG_LOOKUP.MESSAGE FROM ENUMITEM JOIN MSG_LOOKUP ON (ENUMITEM.ENUM_TMM=MSG_LOOKUP.MSG_ID) WHERE ENUMITEM.ENUMTYPENAME='JNL_EVENT' AND ENUMITEM.ENUM_NO!=0 AND MSG_LOOKUP.LANG_ID='".$this->mylang."'";
		
		$sql = array();
		$sql['sql_text'] = "SELECT MSG_LOOKUP.MESSAGE FROM ENUMITEM JOIN MSG_LOOKUP ON (ENUMITEM.ENUM_TMM=MSG_LOOKUP.MSG_ID) WHERE ENUMITEM.ENUMTYPENAME='JNL_EVENT' AND ENUMITEM.ENUM_NO!=0 AND MSG_LOOKUP.LANG_ID=:my_lang ";
		$sql['sql_data'] = array($this->mylang);
		
        $res = $mydb->query($sql);
        return $res;
    } 
    
    public function getRecord($code){
        $mydb = DB::getInstance();        
        $key = getTableKey($tbl_name);
        //$sql="SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ='$code'";
		
		$sql = array();
		$sql['sql_text'] = "SELECT * FROM GUI_SITE_JOURNAL WHERE SEQ=:seq_code";
		$sql['sql_data'] = array($code);
		
        $res = $mydb->query($sql);
        return $res;
    }

	public function getMessageArray($txt, $step)
	{
		$arr = array();
		$len = strlen($txt);
		for($i=0; $i<$len; $i+=$step)
		{
			$msg = substr($txt, $i, $step);
			$arr[] = $msg;
		}
		return $arr;
	}
	
	public function create($data) {
		$mydb = DB::getInstance();
		$mysqldate = date( 'Y-m-d H:i:s', $phpdate );
		$phpdate = strtotime( $mysqldate );
		//$msgstr = str_replace("'", "''", $data->message);
		$msgtxt = $data->message;
		$msgarr = $this->getMessageArray( $msgtxt, 512 );

		foreach ($msgarr as $msgstr) 
		{
			$sql = array();
			$sql['sql_text'] = "INSERT INTO SITE_JOURNAL (COMPANY_CODE, REGION_CODE, MSG_EVENT, MSG_CLASS, MESSAGE, SEQ) VALUES (:company_code, :region_code, :msg_event, :msg_class, :msgstr, journal_seq.nextval)";
			$sql['sql_data'] = array( $data->company_code, $data->region_code, $data->msg_event, $data->msg_class, $msgstr);
			logMe("INSERT STRING IS: " . $sql['sql_text'], JOURNALCLASS);
			
			$res = $mydb->insert($sql);
		}

		return $res;
	}
	
	public function createByTrunc($data) {
		$mydb = DB::getInstance();
		$mysqldate = date( 'Y-m-d H:i:s', $phpdate );
		$phpdate = strtotime( $mysqldate );
		//$msgstr = str_replace("'", "''", $data->message);
		$msgstr = $data->message;
		$msgstr = substr( $msgstr, 0, 512 );
		
		//$sql="INSERT INTO SITE_JOURNAL (COMPANY_CODE, REGION_CODE, MSG_EVENT, MSG_CLASS, MESSAGE, SEQ) VALUES ('$data->company_code', '$data->region_code', '$data->msg_event', '$data->msg_class', '$msgstr', journal_seq.nextval)";
		//logMe("INSERT STRING IS: " . $sql, JOURNALCLASS);
		
		$sql = array();
        $sql['sql_text'] = "INSERT INTO SITE_JOURNAL (COMPANY_CODE, REGION_CODE, MSG_EVENT, MSG_CLASS, MESSAGE, SEQ) VALUES (:company_code, :region_code, :msg_event, :msg_class, :msgstr, journal_seq.nextval)";
		$sql['sql_data'] = array( $data->company_code, $data->region_code, $data->msg_event, $data->msg_class, $msgstr);
		logMe("INSERT STRING IS: " . $sql['sql_text'], JOURNALCLASS);
		
		$res = $mydb->insert($sql);
		return $res;
	}
	
}


class UpdateJournalClass 
{
    protected $update_journal;
	protected $old_values;
	protected $new_values;
	protected $key_values;
	protected $excludes;
	protected $conditions;
	protected $key_message;
	protected $screen_name;
	protected $table_name;
	
	protected $langList;
	protected $langColumns;
	protected $langMessages;
	protected $langEnums;
	protected $langColumnEnums;

    public function UpdateJournalClass($screen, $table, $keys, $flags)
	{
		$langClnFile = dirname(__FILE__) . "/../../../settings/langColumns.json";
		$jsonColumns = file_get_contents($langClnFile);
		// convert json to an associated array
		$this->langColumns = json_decode( $jsonColumns, true );
		
		$langMsgFile = dirname(__FILE__) . "/../../../settings/langMessages.json";
		$jsonMessages = file_get_contents($langMsgFile);
		// convert json to an associated array
		$this->langMessages = json_decode( $jsonMessages, true );
		
		$langEnumFile = dirname(__FILE__) . "/../../../settings/langEnums.json";
		$jsonEnums = file_get_contents($langEnumFile);
		// convert json to an associated array
		$this->langEnums = json_decode( $jsonEnums, true );
		
		$langClnEnumFile = dirname(__FILE__) . "/../../../settings/langColumnEnums.json";
		$jsonClnEnums = file_get_contents($langClnEnumFile);
		// convert json to an associated array
		$this->langColumnEnums = json_decode( $jsonClnEnums, true );
		
		$this->langList = $this->getLanguages();
		
		session_start();
		$this->screen_name = $screen;
		$this->table_name = $table;
		$this->excludes = $flags;
		
		$this->setKeyValues ($keys);
		
        $this->old_values = array();
        $this->new_values = array();
        $this->update_journal = new JournalClass(null,null);
		
    }
	
	public function getLanguages()
	{
		$sql = array();
		/*
        $sql['sql_text'] = "
			select 
				LANGUAGE_CODE as LANG_ID, LANGUAGE_NAME as LANG_NAME
			from 
				LANGUAGES
			where 
				1=1
			order by LANGUAGE_CODE desc
			";
		*/
		
        $sql['sql_text'] = "
			select 
				LANG_ID, LANG_NAME
			from 
				LANG_TYP
			where 
				1=1
			order by LANG_ID desc
			";
		
		$sql['sql_data'] = array();
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, 'U');
		$rows = $data->data;
		
		$languages = array();
		$i = 0;
		foreach( $rows as $line )
		{
			$languages[$i] = $line['LANG_ID'];
			$i += 1;
		}
		
		return $languages;
    } 
	
	public function setKeyValues ($values)
	{
		$this->key_values = $values;
		//$this->conditions = " ROWNUM=1 ";
		$this->conditions = array();
		$this->conditions['sql_text'] = " ROWNUM=1 ";
		$this->conditions['sql_data'] = array();
		$this->key_message = "";
        foreach ($this->key_values as $field_code => $field_value) 
        {
			//$this->conditions .= " and " . $field_code . " = '" . $field_value . "' ";
			$this->conditions['sql_text'] .= " and " . $field_code . " = :" . $field_code . " ";
			$this->conditions['sql_data'][] = $field_value;
			
			//$this->key_message .= "[" . $field_code . "=" . $field_value . "]";
			$this->key_message .= "[" . $field_value . "]";
		}
	}
	
	public function getKeyMessages ($langCode)
	{
		$key_message = "";
        foreach ($this->key_values as $field_code => $field_value) 
        {
			$CLN_TXT = $this->langColumns[$langCode][$this->table_name][$field_code];
			$key_message .= "[" . $CLN_TXT . "=" . $field_value . "]";
			//$key_message .= "[" . $field_value . "]";
		}
		return $key_message;
	}
	
	public function setOldValues ($values)
	{
		$this->old_values = $values;
	}
	
	public function setNewValues ($values)
	{
		$this->new_values = $values;
	}

	public function getRecordValues( $txt="" )
	{
        $mydb = DB::getInstance();
		if ($txt=="")
		{
			//$sql = "SELECT * FROM " . $this->table_name . " WHERE " . $this->conditions . " ";
		
			$sql = array();
			$sql['sql_text'] = "SELECT * FROM " . $this->table_name . " WHERE " . $this->conditions['sql_text'] . " ";
			$sql['sql_data'] = $this->conditions['sql_data'];
			//logMe("getRecordValues IS: " . $sql['sql_text'], JOURNALCLASS);
		}
		else
		{
			$sql = $txt;
		}
//error_log("\nUpdateJournal::getRecordValues\n$sql\n", 3, "temp.log");
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return $rows[0];
	}
	
	public function getValueFromTable($src_name, $cln_lang, $cln_inpt, $cln_otpt, $in_lang, $in_value)
	{
		$sql = array();
		if ( $cln_lang == 'NA' )
		{
			$sql['sql_text'] = "
				select 
					$cln_otpt
				from 
					$src_name
				where 
					1=1
					and $cln_inpt = :in_value
				";
			$sql['sql_data'] = array($in_value);
		}
		else
		{
			$sql['sql_text'] = "
				select 
					$cln_otpt
				from 
					$src_name
				where 
					1=1
					and $cln_inpt = :in_value
					and $cln_lang = :in_lang
				";
			$sql['sql_data'] = array($in_value, $in_lang);
		}
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, 'U');
		$rows = $data->data;
		
		$str = $in_value;
		if ( count( $rows ) > 0 )
		{
			$line = $rows[0];
			$str = $line[$cln_otpt];
		}
		
        return $str;
    } 
	
	public function getValueFromEnum($src_name, $cln_lang, $cln_inpt, $cln_otpt, $in_lang, $in_value)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				$cln_otpt
			from 
			(
				select
					mlu.LANG_ID		as $cln_lang
					, eit.ENUMTYPENAME	as ENUM_TYPE
					, eit.ENUM_NO		as $cln_inpt
					, mlu.MESSAGE 		as $cln_otpt
				from 
					ENUMITEM		eit
					, MSG_LOOKUP	mlu
				where 
					eit.ENUM_TMM = mlu.MSG_ID
			)
			where 
				1=1
				and ENUM_TYPE = :enum_type
				and $cln_lang = :enum_lang
				and $cln_inpt = :enum_no
			";
		$sql['sql_data'] = array($src_name, $in_lang, $in_value);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, 'U');
		$rows = $data->data;
		
		$str = $in_value;
		if ( count( $rows ) > 0 )
		{
			$line = $rows[0];
			$str = $line[$cln_otpt];
		}
		
        return $str;
    } 
	
	public function getBinaryValueFromEnum($src_name, $cln_lang, $cln_inpt, $cln_otpt, $in_lang, $in_value)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				LISTAGG($cln_otpt, ',') WITHIN group (order by $cln_inpt) as $cln_otpt
			from 
			(
				select
					mlu.LANG_ID		as $cln_lang
					, eit.ENUMTYPENAME	as ENUM_TYPE
					, eit.ENUM_NO		as $cln_inpt
					, mlu.MESSAGE 		as $cln_otpt
				from 
					ENUMITEM		eit
					, MSG_LOOKUP	mlu
				where 
					eit.ENUM_TMM = mlu.MSG_ID
			)
			where 
				1=1
				and ENUM_TYPE = :enum_type
				and $cln_lang = :enum_lang
				and BITAND(POWER(2,$cln_inpt), :enum_no)>0
			group by ENUM_TYPE, $cln_lang
			";
		$sql['sql_data'] = array($src_name, $in_lang, $in_value);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, 'U');
		$rows = $data->data;
		
		$str = $in_value;
		if ( count( $rows ) > 0 )
		{
			$line = $rows[0];
			$str = $line[$cln_otpt];
		}
		
        return $str;
    } 

	public function mapColumnValue( $cln_src, $lang_code, $value )
	{
		// check if the column has enum type
		// possible settings:
		// 1. 'NA'
		// 2. 'ENUM_TYPE_NAME'
		// 3. 'ENUM|ENUM_TYPE_NAME|LANG_OPTION|INP_CLN|OUT_CLN'
		// 4. 'TABLE|TABLE_NAME|LANG_OPTION|INP_CLN|OUT_CLN'
		// 5. 'ENUMBIT|ENUM_TYPE_NAME|LANG_OPTION|INP_CLN|OUT_CLN'
		$map_value = "";
		if ( $cln_src == 'NA' )
		{
			$map_value = $value;
		}
		else
		{
			if ( strpos( $cln_src, '|' ) === FALSE )
			{
				$map_value = $this->langEnums[$lang_code][$cln_src]['NO__'.$value];
			}
			else
			{
				$arr = explode( '|', $cln_src );
				if ( count($arr) != 5 )
				{
					$map_value = $value;
				}
				else
				{
					$src_type = $arr[0];
					$src_name = $arr[1];
					$cln_lang = $arr[2];
					$cln_inpt = $arr[3];
					$cln_otpt = $arr[4];
					if ( $src_type == 'ENUM' )
					{
						$map_value = $this->getValueFromEnum($src_name, $cln_lang, $cln_inpt, $cln_otpt, $lang_code, $value);
					}
					else
					if ( $src_type == 'TABLE' )
					{
						$map_value = $this->getValueFromTable($src_name, $cln_lang, $cln_inpt, $cln_otpt, $lang_code, $value);
					}
					else
					if ( $src_type == 'ENUMBIT' )
					{
						$map_value = $this->getBinaryValueFromEnum($src_name, $cln_lang, $cln_inpt, $cln_otpt, $lang_code, $value);
					}
					else
					{
						$map_value = $value;
					}
				}
			}
		}
		
		if ( $value != $map_value )
		{
			$map_value = $value . '::' . $map_value;
		}
		
		return $map_value;
	}
	
	public function log ()
	{
        $mydb = DB::getInstance();
		/*
		// get the person
		$sess_obj = new SetSessionService();
		$session_id = $sess_obj->getSessionVar('SESSION');
		$get_person = "
							SELECT 
								p.PER_CODE as PER_CODE
								, p.PER_NAME as PER_NAME
							FROM 
								HTTP_SESSION_TRACE h
								, PERSONNEL p
							WHERE 
								h.SESS_ID = '$session_id'
								and h.PER_CODE = p.PER_CODE 
						";
		$rows = $mydb->query($get_person, 'N');
		//XarrayEncodingConversion($rows);
		$person_code = $rows[0]->PER_CODE;
		$person_name = $rows[0]->PER_NAME;
		
		$person_code = $sess_obj->getSessionVar('PERCODE');
		$person_name = $sess_obj->getSessionVar('PERNAME');
		
		// get the journal data
		$journal_data = new Journal();
		$journal_data->company_code = $sess_obj->getSessionVar('COMPANY');
		$journal_data->region_code = 'ENG';
		$journal_data->msg_event = 'CONF';
		$journal_data->msg_class = 'EVENT';
		*/
		// get the session data
		if( isset($_SESSION['SESSION']) )
		{
			$person_code	= oracle_escape_string($_SESSION['PERCODE']);
			$person_name	= oracle_escape_string($_SESSION['PERNAME']);
			$cmpy_code		= oracle_escape_string($_SESSION['COMPANY']);
			$lang_code		= oracle_escape_string($_SESSION['LANGUAGE']);
		}
		else
		{
			$person_code	= "NA";
			$person_name	= "NA";
			$cmpy_code		= "NA";
			$lang_code		= "ENG";
		}
		
		// get the journal data
		$journal_data = new Journal();
		$journal_data->company_code = $cmpy_code;
		$journal_data->region_code = $lang_code;
		$journal_data->msg_event = 'CONF';
		$journal_data->msg_class = 'EVENT';
		
		
		// now get the journal message if the column has been changed
        foreach ($this->old_values as $old_key => $old_value) 
        {
			// check if the current column is excluded from journaling
			if ( array_key_exists( $old_key, $this->excludes ) ) 
			{
				continue;
			}
			foreach ($this->new_values as $new_key => $new_value) 
			{
				if ( $old_key == $new_key )
				{
					if ( $old_value != $new_value )
					{
						//$journal_data->message = "Person [$person_name($person_code)] changed [$old_key] from [$old_value] to [$new_value] in screen [$this->screen_name($this->table_name)]. Record key: $this->key_message.";
						if ($old_value == "" )
						{
							$old_value = "NULL";
						}
						
						foreach ($this->langList as $langCode )
						{
							$DB_PERSON = $this->langMessages[$langCode]["FIELDS"]["DB_PERSON"];
							$DB_ACTION = $this->langMessages[$langCode]["FIELDS"]["DB_ACTION"];
							$DB_RESULT = $this->langMessages[$langCode]["FIELDS"]["DB_RESULT"];
							$DB_COLUMN = $this->langMessages[$langCode]["FIELDS"]["DB_COLUMN"];
							$DB_OLDVAL = $this->langMessages[$langCode]["FIELDS"]["DB_OLDVAL"];
							$DB_NEWVAL = $this->langMessages[$langCode]["FIELDS"]["DB_NEWVAL"];
							$DB_RECVAL = $this->langMessages[$langCode]["FIELDS"]["DB_RECVAL"];
							$DB_SCREEN = $this->langMessages[$langCode]["FIELDS"]["DB_SCREEN"];
							$DB_RECKEY = $this->langMessages[$langCode]["FIELDS"]["DB_RECKEY"];
							
							$DB_INSERT = $this->langMessages[$langCode]["ACTIONS"]["DB_INSERT"];
							$DB_UPDATE = $this->langMessages[$langCode]["ACTIONS"]["DB_UPDATE"];
							$DB_DELETE = $this->langMessages[$langCode]["ACTIONS"]["DB_DELETE"];
							$SCR_TXT = $this->langMessages[$langCode]["SCREENS"][$this->table_name];
							$CLN_TXT = $this->langColumns[$langCode][$this->table_name][strtoupper($old_key)];
							$KEY_MSG = $this->getKeyMessages($langCode);
							
							// get the column source and determine the value for journaling
							$CLN_SRC = $this->langColumnEnums[$this->table_name][strtoupper($old_key)];
							$OLD_VAL = $this->mapColumnValue( $CLN_SRC, $langCode, $old_value );
							$NEW_VAL = $this->mapColumnValue( $CLN_SRC, $langCode, $new_value );
							/*
							if ( $CLN_SRC != 'NA' )
							{
								$OLD_VAL = $this->langEnums[$langCode][$CLN_SRC]['NO__'.$old_value];
								$NEW_VAL = $this->langEnums[$langCode][$CLN_SRC]['NO__'.$new_value];
							}
							else
							{
								$OLD_VAL = $old_value;
								$NEW_VAL = $new_value;
							}
							*/
							$journal_data->region_code = $langCode;
							$journal_data->msg_event = $this->langEnums[$langCode]['JNL_EVENT']['NO__11']; //'CONF';
							$journal_data->msg_class = $this->langEnums[$langCode]['JNL_CLASS']['NO__1']; //'EVENT';
							
							$journal_data->message = "$DB_PERSON [$person_name($person_code)], $DB_ACTION [$DB_UPDATE], $DB_COLUMN [$CLN_TXT], $DB_OLDVAL [$OLD_VAL], $DB_NEWVAL [$NEW_VAL], $DB_SCREEN [$SCR_TXT]. $DB_RECKEY: $KEY_MSG.";
							
							$this->update_journal->create($journal_data);
						}
						/*
						$journal_data->message = "Person [$person_name($person_code)] changed [$old_key] from [$old_value] to [$new_value] in screen [$this->screen_name]. Record key: $this->key_message.";
						$this->update_journal->create($journal_data);
						*/
					}
				}
			}
		}
	}
	
	public function logOneLine($msg)
	{
        $mydb = DB::getInstance();
		/*
		// get the person
		$sess_obj = new SetSessionService();
		$session_id = $sess_obj->getSessionVar('SESSION');
		$get_person = "
							SELECT 
								p.PER_CODE as PER_CODE
								, p.PER_NAME as PER_NAME
							FROM 
								HTTP_SESSION_TRACE h
								, PERSONNEL p
							WHERE 
								h.SESS_ID = '$session_id'
								and h.PER_CODE = p.PER_CODE 
						";
		$rows = $mydb->query($get_person, 'N');
		//XarrayEncodingConversion($rows);
		$person_code = $rows[0]->PER_CODE;
		$person_name = $rows[0]->PER_NAME;
		
		$person_code = $sess_obj->getSessionVar('PERCODE');
		$person_name = $sess_obj->getSessionVar('PERNAME');
		
		// get the journal data
		$journal_data = new Journal();
		$journal_data->company_code = $sess_obj->getSessionVar('COMPANY');
		$journal_data->region_code = 'ENG';
		$journal_data->msg_event = 'CONF';
		$journal_data->msg_class = 'EVENT';
		*/
		// get the session data
		if( isset($_SESSION['SESSION']) )
		{
			$person_code	= oracle_escape_string($_SESSION['PERCODE']);
			$person_name	= oracle_escape_string($_SESSION['PERNAME']);
			$cmpy_code		= oracle_escape_string($_SESSION['COMPANY']);
			$lang_code		= oracle_escape_string($_SESSION['LANGUAGE']);
		}
		else
		{
			$person_code	= "NA";
			$person_name	= "NA";
			$cmpy_code		= "NA";
			$lang_code		= "ENG";
		}
		
		// get the journal data
		$journal_data = new Journal();
		$journal_data->company_code = $cmpy_code;
		$journal_data->region_code = $lang_code;
		$journal_data->msg_event = 'CONF';
		$journal_data->msg_class = 'EVENT';
						
		foreach ($this->langList as $langCode )
		{
			$DB_PERSON = $this->langMessages[$langCode]["FIELDS"]["DB_PERSON"];
			$DB_ACTION = $this->langMessages[$langCode]["FIELDS"]["DB_ACTION"];
			$DB_RESULT = $this->langMessages[$langCode]["FIELDS"]["DB_RESULT"];
			$DB_COLUMN = $this->langMessages[$langCode]["FIELDS"]["DB_COLUMN"];
			$DB_OLDVAL = $this->langMessages[$langCode]["FIELDS"]["DB_OLDVAL"];
			$DB_NEWVAL = $this->langMessages[$langCode]["FIELDS"]["DB_NEWVAL"];
			$DB_RECVAL = $this->langMessages[$langCode]["FIELDS"]["DB_RECVAL"];
			$DB_SCREEN = $this->langMessages[$langCode]["FIELDS"]["DB_SCREEN"];
			$DB_RECKEY = $this->langMessages[$langCode]["FIELDS"]["DB_RECKEY"];
			
			$DB_INSERT = $this->langMessages[$langCode]["ACTIONS"]["DB_INSERT"];
			$DB_UPDATE = $this->langMessages[$langCode]["ACTIONS"]["DB_UPDATE"];
			$DB_DELETE = $this->langMessages[$langCode]["ACTIONS"]["DB_DELETE"];
			$SCR_TXT = $this->langMessages[$langCode]["SCREENS"][$this->table_name];
			$CLN_TXT = $this->langColumns[$langCode][$this->table_name][$old_key];
			$KEY_MSG = $this->getKeyMessages($langCode);
			
			$msg_action = "";
			if ( stripos($msg, "create") !== FALSE )
			{
				$msg_action = $DB_INSERT;
			}
			if ( stripos($msg, "delete") !== FALSE )
			{
				$msg_action = $DB_DELETE;
			}
			if ( stripos($msg, "update") !== FALSE )
			{
				$msg_action = $DB_UPDATE;
			}
			$stpos = stripos($msg, "[");
			$edpos = stripos($msg, "]");
			$msg_value = substr( $msg, $stpos, ($edpos-$stpos+1) );
			if ( $msg_action == $DB_UPDATE )
			{
				$stpos2 = stripos($msg, "[", $edpos+1);
				$edpos2 = stripos($msg, "]", $edpos+1);
				$msg_value2 = substr( $msg, $stpos2, ($edpos2-$stpos2+1) );
				$msg_value = $msg_value . '::' . $msg_value2;
			}
			
			$journal_data->region_code = $langCode;
			$journal_data->msg_event = $this->langEnums[$langCode]['JNL_EVENT']['NO__11']; //'CONF';
			$journal_data->msg_class = $this->langEnums[$langCode]['JNL_CLASS']['NO__1']; //'EVENT';
			
			if ( strlen( $msg_action ) > 0 )
			{
				$journal_data->message = "$DB_PERSON [$person_name($person_code)], $DB_ACTION [$msg_action], $DB_RECVAL $msg_value, $DB_SCREEN [$SCR_TXT]. $DB_RECKEY: $KEY_MSG.";
			}
			else
			{
				$journal_data->message = "$DB_PERSON [$person_name($person_code)], $DB_ACTION [$msg], $DB_SCREEN [$SCR_TXT]. $DB_RECKEY: $KEY_MSG.";
			}
			
			$this->update_journal->create($journal_data);
		}
		/*
		//$journal_data->message = "Person [$person_name($person_code)] $msg in screen [$this->screen_name($this->table_name)]. Record key: $this->key_message.";
		$journal_data->message = "Person [$person_name($person_code)] $msg in screen [$this->screen_name]. Record key: $this->key_message.";
		$this->update_journal->create($journal_data);
		*/
	}
}
