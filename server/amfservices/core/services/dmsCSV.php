<?php
require_once('dmsService.php');
require_once(__DIR__ . '/../dmController.php');

// not journaled yet//
class dmsCSV extends dmsService{
	
  public function __construct( $params = false ){
	$this->ctl = dmController::getController();
  }
  
  public function exportCSV($params){


	if(isset($params->columns))$columns 	 	= $params->columns;
	if(isset($params->dateRange))$dateRange   	= $params->dateRange;
	if(isset($params->lookup))$lookup 	 		= $params->lookup;
	if(isset($params->filters))$filters 	 	= $params->filters;
	if(isset($params->lookupTable))$lookupTable = $params->lookupTable;
	if(isset($params->sort))$sort 		 		= $params->sort;
	if(isset($params->table))$table 		 	= $params->table;


	$dateFormat	 = array();
	$SELECT		 = array();
	$FROM 		 = array();
	$WHERE		 = array();

	array_push($FROM, $table);

    if(!isset($columns))return dmError(array("data"=>"No columns"));
    $_columns = array();
    for($i=0;$i<sizeof($columns);$i++){
    	if(isset($columns[$i]->dateFormat)){
			$_columns[$columns[$i]->column]=$columns[$i]->header;
			$dateFormat[$columns[$i]->column]=$columns[$i]->dateFormat;
    	}else{
    		$_columns[$columns[$i]->column]=$columns[$i]->header;	
    	}
    }	
    $columns=$_columns;
	foreach ($columns as $i => $value){
		if(isset($lookupTable->$i)){
			$selectItem = $lookupTable->$i->TABLE.".".$lookupTable->$i->DESTINATION." as ". $i;
			if(!in_array($selectItem, $SELECT))array_push($SELECT, $selectItem);
			$fromItem = $lookupTable->$i->TABLE;
			if(!in_array($fromItem, $FROM))array_push($FROM, $fromItem);
			$whereItem = $lookupTable->$i->TABLE.".".$lookupTable->$i->SOURCE." = ". $i;
			if(!in_array($whereItem, $WHERE))array_push($WHERE, $whereItem);
		}else if (isset($dateFormat[$i])) {
			$selectItem = "to_char(".$i.",'".$dateFormat[$i]."') as ".$i;
			if(!in_array($selectItem, $SELECT))array_push($SELECT, $selectItem);
		}else{
			$selectItem = $i;
			if(!in_array($selectItem, $SELECT))array_push($SELECT, $selectItem);
		}
	} 
	for($i=0;$i<sizeof($dateRange);$i++){
		if(isset($dateRange[$i]->start)){
			array_push($WHERE, $dateRange[$i]->column." > TO_DATE('".$dateRange[$i]->start."', 'YYYY-MM-DD HH24:MI:SS')");
		}
		if(isset($dateRange[$i]->end)){
			array_push($WHERE, $dateRange[$i]->column." < TO_DATE('".$dateRange[$i]->end  ."', 'YYYY-MM-DD HH24:MI:SS')");
		}
	}

	foreach ($filters as $i => $value){
		if($value == null){
			array_push($WHERE, $i." IS NULL ");		
		}else if(strrpos(strtolower($value), "select")===false){
			array_push($WHERE, "UPPER(".$i.") LIKE UPPER('".$value. "')");		
		}else{
			array_push($WHERE, $i." IN ".$value. " ");	
		}
	} 

	$sql = "SELECT " . implode(", ", $SELECT) . " FROM ". implode(", ", $FROM);
	if(sizeof($WHERE)) $sql.= " WHERE ". implode(" AND ", $WHERE);
	if($sort)$sql .= " ORDER BY ".$sort;

	
	if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg) return $chk;

	$row = null;
	$csv = "";


	// print header 
	foreach ($columns as $key => $value) {
		$csv .= $value . ",";
	}
	$csv = substr($csv, 0, -2) . "\n" ;

	foreach($chk->data as $row){
		$line = array();
		foreach ($columns as $i => $value) {
			if(isset($lookup->$i)){
				if(isset($lookup->$i->$row[$i])){
					array_push($line, "\"".$lookup->$i->$row[$i]."\"");
				}else{
					array_push($line, "\"".$row[$i]."\"");	
				}
			}else{
				array_push($line, "\"".$row[$i]."\"");

			}
		}
    	$csv.= implode(",", $line)."\n";
	}
    
		new dmMesg(array("dev" => "*****************params in exportCSV. sql=\n".$sql ));
		new dmMesg(array("dev" => "*****************params in exportCSV. csv=\n".$csv ));
	
    return new dmMesg(array("data" => $csv));

  }

 
	
	
}