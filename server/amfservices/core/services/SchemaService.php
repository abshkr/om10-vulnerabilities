<?php
require_once( 'bootstrap.php' );
//require_once( 'Thunk.class.php' );
//require_once( 'Journal.class.php' );

if(!defined('SCHEMASERVICE')) define('SCHEMASERVICE','SchemaService.class');

class SchemaService
{
	var $useCGI=0;
    var $mylang='ENG';
	var $myview="
	";
	var $DATA_ONLY=1;
	
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
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) DLVIEW ";
			
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
		else $sort="ORDER BY DELV_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) DLVIEW ";
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
		$data->sql2=$queryPaged['sql_text'];
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 
	
	
	public function initLanguageColumns()
	{
		$contents = $this->lookupLanguageList('U', 0);
		
		$langFile = dirname(__FILE__) . "/languageColumns.json";
		file_put_contents($langFile, json_encode($contents, JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE));
		
		return $contents;
	}
	
	public function initLanguageTables()
	{
		$contents = $this->lookupLanguageList2('U', 0);
		
		$langFile = dirname(__FILE__) . "/languageTables.json";
		file_put_contents($langFile, json_encode($contents, JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE));
		
		return $contents;
	}
	
	public function initLanguageEnums()
	{
		$contents = $this->lookupEnumItemsList("-1", "-1", 'U', 0);
		//$this->arrayEncodingConversion(&$contents, 'UTF-8', 'GB2312');
		
		$langFile = dirname(__FILE__) . "/languageEnums.json";
		file_put_contents($langFile, json_encode($contents, JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE));
		
		return $contents;
	}
	
	public function initLanguageColumnEnums()
	{
		$contents = $this->lookupColumnBlankList("TABLE", "-1", 'U', 0);
		
		$langFile = dirname(__FILE__) . "/languageColumnEnums.json";
		file_put_contents($langFile, json_encode($contents, JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE));
		
		return $contents;
	}
	
	public function lookupLanguageList2($caseType='U', $jsonFlag=1)
	{
		// get the table details for once, since they are same for each language when initializing
		$tables = $this->lookupTableList2("-1", $caseType, $jsonFlag);
		
		$sql = array();
        $sql['sql_text'] = "
			select 
				LANGUAGE_CODE, LANGUAGE_NAME
			from 
				LANGUAGES
			where 
				1=1
			order by LANGUAGE_CODE desc
			";
		$sql['sql_data'] = array();
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;
		
		$languages = array();
		foreach( $rows as $line )
		{
			$languages[$line['LANGUAGE_CODE']] = $tables;
		}
		
		return $languages;
    } 
	
	public function lookupTableList2($obj_name="-1", $caseType='U', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				ut.TABLE_NAME
			from 
				USER_TABLES			ut
			where 
				1=1
				and ('-1'=:obj_name or ut.TABLE_NAME=:obj_name)
			order by ut.TABLE_NAME
			";
		$sql['sql_data'] = array($obj_name);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;

		$tables = array();
		foreach( $rows as $line )
		{
			$obj_name = $line['TABLE_NAME'];
			$tables[$obj_name] = ucwords( strtolower(str_replace('_', ' ', $obj_name)) );
		}
		
		return $tables;
    } 
	
	public function lookupLanguageList($caseType='U', $jsonFlag=1)
	{
		// get the column details for once, since they are same for each language when initializing
		$tableColumns = $this->lookupTableList("-1", $caseType, $jsonFlag);
		
		$sql = array();
        $sql['sql_text'] = "
			select 
				LANGUAGE_CODE, LANGUAGE_NAME
			from 
				LANGUAGES
			where 
				1=1
			order by LANGUAGE_CODE desc
			";
		$sql['sql_data'] = array();
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;
		
		$languages = array();
		foreach( $rows as $line )
		{
			echo 'before 111111'.$line['LANGUAGE_CODE'].'\n';
			//$languages[$line['LANGUAGE_CODE']] = $this->lookupTableList("-1", $caseType, $jsonFlag);
			$languages[$line['LANGUAGE_CODE']] = $tableColumns;
			echo 'after 1111'.$line['LANGUAGE_CODE'].'\n';
		}
		
		return $languages;
    } 
	
	public function lookupTableList($obj_name="-1", $caseType='U', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				ut.TABLE_NAME
			from 
				USER_TABLES			ut
			where 
				1=1
				and ('-1'=:obj_name or ut.TABLE_NAME=:obj_name)
			order by ut.TABLE_NAME
			";
		$sql['sql_data'] = array($obj_name);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;

		$tables = array();
		foreach( $rows as $line )
		{
			$obj_name = $line['TABLE_NAME'];
			$obj_rows = $this->lookupColumnList("TABLE", $obj_name, $caseType, 0);
			$tables[$obj_name] = array();
			foreach( $obj_rows as $row )
			{
				$txt = ucwords( strtolower(str_replace('_', ' ', $row['COLUMN_NAME'])) );
				$tables[$obj_name][$row['COLUMN_NAME']] = $txt;
			}
		}
		
		return $tables;
    } 
	
	public function lookupColumnList($obj_type="-1", $obj_name="-1", $caseType='U', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				cln.TABLE_NAME					as COLUMN_TABLE
				, cln.COLUMN_NAME				as COLUMN_NAME
				, cln.COLUMN_ID					as COLUMN_ID
				, cln.DATA_TYPE					as COLUMN_DATA_TYPE
				, cln.DATA_LENGTH				as COLUMN_DATA_LENGTH
				, cln.DATA_PRECISION			as COLUMN_DATA_PRECISION
				, cln.DATA_SCALE				as COLUMN_DATA_SCALE
				, cln.NULLABLE					as COLUMN_NULLABLE
				, cln.CHARACTER_SET_NAME		as COLUMN_CHAR_SET
				, cln.CHAR_COL_DECL_LENGTH		as COLUMN_CHAR_DECL
				, cln.CHAR_LENGTH				as COLUMN_CHAR_LENGTH
				, cln.CHAR_USED					as COLUMN_CHAR_USED
			from 
				USER_TAB_COLS					cln
			where 
				1=1
				and ('-1'=:obj_type 
					or ('TABLE'=:obj_type and cln.TABLE_NAME in (select TABLE_NAME from USER_TABLES))
					or ('VIEW'=:obj_type and cln.TABLE_NAME in (select VIEW_NAME from USER_VIEWS))
					)
				and ('-1'=:obj_name or cln.TABLE_NAME=:obj_name)
			order by cln.TABLE_NAME, cln.COLUMN_ID
			";
		$sql['sql_data'] = array($obj_type, $obj_name);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	public function lookupEnumItemsList($obj_lang="-1", $obj_name="-1", $caseType='U', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select
				mlu.LANG_ID		as ENUM_LANG
				, eit.ENUMTYPENAME	as ENUM_TYPE
				, eit.ENUM_NO		as ENUM_NO
				, mlu.MESSAGE 		as ENUM_TEXT
			from 
				ENUMITEM		eit
				, MSG_LOOKUP	mlu
			where 
				eit.ENUM_TMM = mlu.MSG_ID
				and ('-1'=:obj_lang or mlu.LANG_ID=:obj_lang)
				and ('-1'=:obj_name or eit.ENUMTYPENAME=:obj_name)
			order by mlu.LANG_ID, eit.ENUMTYPENAME, eit.ENUM_NO
			";
		$sql['sql_data'] = array($obj_lang, $obj_name);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;

		$from = 'GB2312';
		$to = 'UTF-8';
		$items = array();
		foreach( $rows as $line )
		{
			$enum_num = 'NO__'.$line['ENUM_NO'];
			$enum_txt = $line['ENUM_TEXT'];
			//$enum_num = mb_convert_encoding($line['ENUM_NO'], $to, $from);
			//$enum_txt = mb_convert_encoding($line['ENUM_TEXT'], $to, $from);
			if ( isset($items[$line['ENUM_LANG']]) )
			{
				if ( isset($items[$line['ENUM_LANG']][$line['ENUM_TYPE']]) )
				{
					$items[$line['ENUM_LANG']][$line['ENUM_TYPE']][$enum_num] = $enum_txt;
					//$items[$line['ENUM_LANG']][$line['ENUM_TYPE']]['ENUM_NO'] = $enum_num;
					//$items[$line['ENUM_LANG']][$line['ENUM_TYPE']]['ENUM_TEXT'] = $enum_txt;
				}
				else
				{
					$items[$line['ENUM_LANG']][$line['ENUM_TYPE']] = array();
					$items[$line['ENUM_LANG']][$line['ENUM_TYPE']][$enum_num] = $enum_txt;
					//$items[$line['ENUM_LANG']][$line['ENUM_TYPE']]['ENUM_NO'] = $enum_num;
					//$items[$line['ENUM_LANG']][$line['ENUM_TYPE']]['ENUM_TEXT'] = $enum_txt;
				}
			}
			else
			{
				$items[$line['ENUM_LANG']] = array();
				$items[$line['ENUM_LANG']][$line['ENUM_TYPE']] = array();
				$items[$line['ENUM_LANG']][$line['ENUM_TYPE']][$enum_num] = $enum_txt;
				//$items[$line['ENUM_LANG']][$line['ENUM_TYPE']]['ENUM_NO'] = $enum_num;
				//$items[$line['ENUM_LANG']][$line['ENUM_TYPE']]['ENUM_TEXT'] = $enum_txt;
			}
		}
		
		return $items;
    } 
	
	public function lookupColumnBlankList($obj_type="-1", $obj_name="-1", $caseType='U', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				cln.TABLE_NAME					as COLUMN_TABLE
				, cln.COLUMN_NAME				as COLUMN_NAME
				, cln.COLUMN_ID					as COLUMN_ID
				, cln.DATA_TYPE					as COLUMN_DATA_TYPE
				, cln.DATA_LENGTH				as COLUMN_DATA_LENGTH
				, cln.DATA_PRECISION			as COLUMN_DATA_PRECISION
				, cln.DATA_SCALE				as COLUMN_DATA_SCALE
				, cln.NULLABLE					as COLUMN_NULLABLE
				, cln.CHARACTER_SET_NAME		as COLUMN_CHAR_SET
				, cln.CHAR_COL_DECL_LENGTH		as COLUMN_CHAR_DECL
				, cln.CHAR_LENGTH				as COLUMN_CHAR_LENGTH
				, cln.CHAR_USED					as COLUMN_CHAR_USED
			from 
				USER_TAB_COLS					cln
			where 
				1=1
				and ('-1'=:obj_type 
					or ('TABLE'=:obj_type and cln.TABLE_NAME in (select TABLE_NAME from USER_TABLES))
					or ('VIEW'=:obj_type and cln.TABLE_NAME in (select VIEW_NAME from USER_VIEWS))
					)
				and ('-1'=:obj_name or cln.TABLE_NAME=:obj_name)
			order by cln.TABLE_NAME, cln.COLUMN_ID
			";
		$sql['sql_data'] = array($obj_type, $obj_name);
			
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;

		$items = array();
		foreach( $rows as $line )
		{
			if ( isset($items[$line['COLUMN_TABLE']]) )
			{
				$items[$line['COLUMN_TABLE']][$line['COLUMN_NAME']] = "NA";
			}
			else
			{
				$items[$line['COLUMN_TABLE']] = array();
				$items[$line['COLUMN_TABLE']][$line['COLUMN_NAME']] = "NA";
			}
		}
		
		return $items;
    } 

}
?>