<?php
require_once(__DIR__ . '/../dmCollection.php');

class dmPagedCollection extends dmCollection{

	public $page;
	public $seek;
	public $pageSize;
	public $pagePreResult;
	public $pagePostResult;
	public $needPaging;
	
	public function __construct( $params = false )
	{
		new dmMesg(array("dev" => "*****************params in dmPagedCollection.".print_r($params, TRUE) ));

		$this->needPaging = 1;		

		if( ($params) && (is_object($params)) )
		{

			if(isset($params->needPaging)) 
			{
				$this->needPaging = $params->needPaging;
			}
			else
			{
				$this->needPaging = 1;
			}
			if(isset($params->seek)) 
			{
				$this->seek = $params->seek;
			}		
			if(isset($params->pageSize)) 
			{
				$this->pageSize = $params->pageSize;
			}	
			
			if(isset($params->page))
			{

				$this->page = $params->page;

				if(is_string($params->page->page)) 
				{
					$this->page->page = strtoupper($this->page->page);
				}		
			
			}
			else
			{
				$this->page = (object)array("order" => "ASC",  "page" => 1);
			}									
				
		}

		parent::__construct($params);
		
	}
	
	public function getData( $params = false ){
		
		//ensure we're good to gather.
		if( (!isset($this->pageSize)) || (!$this->pageSize) || (!is_numeric($this->pageSize)) ) 
		{
			//return new dmError(array("dev" => "The pagesize on this pagedcollection is unset:\n" . print_r($this->pageSize, TRUE)));
			$this->pageSize = 100;
		}		
		
		//invoke dmCollection::getData first.
		if(!($chk = parent::getData($params)) instanceOf dmMesg) 
		{
			return $chk;
		}

		if ( $this->needPaging == 0 )
		{
			return new dmMesg(array("dev" => "Query Compilation of Paged Collection complete and paging not required."));
		}
	
		//are we autowinding to last? 
		if(isset($this->page))
		{
			
			if(isset($this->page->page))
			{
				if($this->page->page == "LAST")
				{
					$cSQL = $this->sqlCount;
					if($this->startTime) 
					{
						$cSQL .= $this->cJoin . " (" . $this->timeField . " > '" . $this->startTime . "') ";
					}	
					if($this->endTime) 
					{
						$cSQL .= $this->cJoin . " (" . $this->timeField . " < '" . $this->endTime . "') ";
					}		
					$this->cJoin = "AND";
					
					if(!($chk = $this->ctl->query(array("sql" => $cSQL))) instanceOf dmMesg) 
					{
						return $chk;
					}

					$tc = $chk->data[0]['COUNT(*)'];
					$this->seek = $tc - $this->pageSize;
				}
			}
			
			if(isset($this->page->order)) 
			{
				$rNumOrder = $this->page->order;
			}	
			else 
			{
				$rNumOrder = "";
			}							
			
		}
		else
		{
			$rNumOrder = "";
		} 
		
		//prepare the fact this is a paged collection, append it as well.
		$new_seek = $this->seek - $this->pageSize;
		$new_pageSize = $this->pageSize * 3;

		$this->pagePreResult =  "select * from ( select p.*, rownum rnum from (";
		if ( strlen($rNumOrder) <= 0 )
		{
			$this->pagePostResult = ") p where rownum <= " . ( $new_seek + $new_pageSize ) . ") where rnum > " . $new_seek ; 
		}
		else 
		{
			$this->pagePostResult = ") p where rownum <= " . ( $new_seek + $new_pageSize ) . ") where rnum > " . $new_seek . " ORDER BY rnum " . $rNumOrder; 
		}
		
		//return dmCollection method.
		return new dmMesg(array("dev" => "Query Compilation of Paged Collection complete."));
		
	}
	
	protected function compile( $params = false ){
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		if(!($chk = parent::compile($params)) instanceOf dmMesg)		return $chk;

		if ( $this->needPaging == 0 )
		{
			return new dmMesg(array("dev" => "Query Compilation of Paged Collection complete and paging not required."));
		}
		
		
		//compile the calander subclass if required.
		//we do this so we can wrap the paged SQL compilation around the result...
		if(isset($this->timePostResult) && (!empty($this->timePostResult)) )
		{
			$this->sql.= " " . $this->cJoin . " " . $this->timePostResult;
			$this->cJoin = "AND";
		}
		
		//we put up a delayed orderResult in case of the calander subclass requiring to slot in some conditions.
		if(isset($this->CCorderResult))	$this->sql .= " " . $this->CCorderResult;

		
		// check the total count of records
		new dmMesg(array("dev" => "******************************start count in pagedCollection."));
		$cSQL = $this->countSQL;
		if(!($chk = $this->ctl->query(array("sql" => $cSQL))) instanceOf dmMesg)	return $chk;
		$this->totalCount = $chk->data[0]['COUNT(*)'];
		new dmMesg(array("dev" => "******************************end count in pagedCollection.".$this->totalCount . "****" ));

		//prepare the fact this is a paged collection, append it as well.
		$new_seek = $this->seek - $this->pageSize;
		$new_pageSize = $this->pageSize * 3;
		if ( $new_seek >= $this->totalCount )
		{
			$new_seek = $this->totalCount - $this->pageSize * 1;
		}

		$this->pagePostResult = ") p where rownum <= " . ( $new_seek + $new_pageSize ) . ") where rnum > " . $new_seek ; 

		
		if(isset($this->pagePreResult) && (!empty($this->pagePreResult)) )
		{
			
			if( isset($this->pagePostResult) && (!empty($this->pagePostResult)) )
			{

				$tmp = $this->pagePreResult . $this->sql . $this->pagePostResult;
				$this->sql = $tmp;
				
			}
			else
			{
				return new dmError(array("dev" => "getData for paged collections must have produced an errant result, there is an SQL statement in pre compile - but not post; the state of the collection class during compile is:\n" . print_r($this->sql, TRUE)));
			}
				
		
		}
		
		return new dmMesg();
		
		
	}
	
	/*
	 * 
	 */
	public function parsePageSize( $params = false ){
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		
		
	}
	
}
?>