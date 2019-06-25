<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmMovementReason.php");

class dmMovementReasons extends dmCollection{

	/**
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
 		// this is a relationship table, no particular table is being used.
		$this->model    = "dmMovementReason";
		$this->dmClass  = "dmMovementReasons";

		//required data;
		$this->types    = array("Transfer",	"Receipt", "Disposal");
	
		parent::__construct($params);
		$this->getData($params);
		
	}

	public function getInstance($params = false){
		
		$mtObj = new dmMovementReasons($params);
		$json_flag=1;
        $objData = (json_encode($mtObj));
		if ( $objData === FALSE )
		{
			$zip_on=0;
			$json_flag=0;
        	$objData = $mtObj;
		}
		else
		{
			$zip_mthd="zlib";
			$zip_on=0;
			$org_len = strlen($objData);
			if ( $zip_on == 1 )
			{
				// Do compressing, return compressed string or FALSE if an error occurred. 
				$compress_data = gzcompress($objData, 9);
				//$compress_data = zlib_encode($objData, 15);
				if ( $compress_data === FALSE )
				{
					// no change of data, return JSON string
					$zip_on=0;
				}
				else
				{
					// The compressed data must be binary format, need to encode before transfering online
					$zip_len = strlen($compress_data);
					// Do encoding, return the encoded data as a string or FALSE on failure
					$encode_data = base64_encode( $compress_data );
					if ( $encode_data === FALSE )
					{
						// no change of data, return JSON string
						$zip_on=0;
					}
					else
					{
						// Compress and encode successfully, return new data
						$objData = $encode_data;
						$enc_len = strlen($encode_data);
					}
				}
			}
		}
		
        return new dmMesg(array("data" => $objData, "json_on"=>$json_flag, "zip_on"=>$zip_on, "zip_mthd"=>$zip_mthd, "org_len"=>$org_len, "zip_len"=>$zip_len, "enc_len"=>$enc_len ));
		
        //return new dmMesg(array("data" => $objData, "json_on"=>$json_flag ));
		//return new dmMesg(array("data" => new dmMovementReasons($params)));
	}
	
	/**
	 * (non-PHPdoc)
	 * @see dmCollection::getData()
	 */
	public function getData( $params = false ){
		$sql = "SELECT * FROM MOV_REASONS";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$this->collection = $chk->data;
		// type casting
		$tArray = array();
		foreach($this->collection as $movementReason){	
			$tArray[] = new dmMovementReason((object)array("payload" => (object)$movementReason));

		}
		$this->collection = $tArray;
		
		//$this->types    = array("Transfer",	"Receipt", "Disposal");
		$sql = "SELECT MOVITEM_TYPE_ID, decode(MOVITEM_TYPE_ID, 0, 'R', 1, 'D', 2, 'T', 'R') as MOVITEM_TYPE_CODE, MOVITEM_TYPE_NAME FROM MOVITEM_TYPES";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$this->types = $chk->data;
		
		return new dmMesg();	
	}
}
?>