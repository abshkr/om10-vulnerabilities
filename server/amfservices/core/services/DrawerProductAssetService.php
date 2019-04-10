<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('DRAWERPRODUCTASSET')) define('DRAWERPRODUCTASSET','DrawerProductAssetService.class');

class DrawerProductAssetService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				PROD_CODE
				, PROD_CMPYCODE
				, PROD_CMPYNAME
				, PROD_NAME
				, PROD_DESC
				, PROD_GROUP
				, PROD_GROUPNAME
				, PROD_CLASS
				, PROD_CLASSDESC
				, PROD_TEXTCOLOR
				, PROD_BACKCOLOR
				, 'assets/products/'	as IMAGE_PATH
				, PROD_IMAGE
			from 
				GUI_PRODUCTS gp
			where 
				1 = 1
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
            $this->cgi = CGIDIR . "gantry/drawer_prods.cgi";
            $this->cgi_items = CGIDIR . "gantry/drawer_prods.cgi";
            $this->cgi_periods = CGIDIR . "gantry/drawer_prods.cgi";
            $this->cgi_reset = CGIDIR . "gantry/drawer_prods.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/drawer_prods.cgi";
            $this->cgi_items ="cgi-bin/en/gantry/drawer_prods.cgi";
            $this->cgi_periods ="cgi-bin/en/gantry/drawer_prods.cgi";
            $this->cgi_reset = "cgi-bin/en/gantry/drawer_prods.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) GPVIEW ";
			
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
		else $sort="ORDER BY PROD_CMPYCODE, PROD_CODE";
		
		//$query = "SELECT * FROM ( " . $this->myview . " ) GPVIEW  $filter $sort";
		$query = "SELECT * FROM ( " . $this->myview . " ) GPVIEW " . $filter['sql_text'] . " $sort";

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

	
    public function updateProductAssets($cmpy, $code, $back_color, $text_color, $image_name)
	{
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "
			update PRODUCTS 
			set 
				PROD_BACK_COLOUR = :backcolor 
				, PROD_TXT_COLOUR = :textcolor
				, PROD_IMAGE = :prodimg
			where 
				PROD_CODE=:prodcode 
				and PROD_CMPY=:prodcmpy
		";
		$sql['sql_data'] = array( $back_color, $text_color, $image_name, $code, $cmpy );
		
        $result = $mydb->update($sql);
		
        if ($result == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    }
	
	public function lookupProductImages($img_name="-1")
	{
		$dir = dirname(__FILE__) . '/../../../om5000/assets/products';
		//$dir = dirname(__FILE__) . '/../../../5000-R2/assets/products';
		//$dir = dirname(__FILE__) . '/../../../5000-debug/assets/products';
		//$dir = '/opt/bzdocs/5000-debug/assets/products';
		$files = scandir($dir);
		
		$arr = array();
		foreach( $files as $name )
		{	
			if ( strpos( $name, '.jpg' ) === FALSE 
			  && strpos( $name, '.png' ) === FALSE 
			  && strpos( $name, '.gif' ) === FALSE 
			)
			{
				continue;
			}
			// do filtering
			if ( $img_name != "-1" && stripos($name, $img_name) === FALSE )
			{
				continue;
			}
			$arr[] = array('icon'=>'assets/products/'.$name, 'name'=>$name);
		}
		
		//return($arr);
		return array('json_on'=>0, 'data'=>$arr);
    } 
	
	public function deleteProductImage($img_name)
	{

		$dir = dirname(__FILE__) . '/../../../om5000/assets/products';
		//$dir = dirname(__FILE__) . '/../../../5000-R2/assets/products';
		//$dir = dirname(__FILE__) . '/../../../5000-debug/assets/products';
		//$dir = '/opt/bzdocs/5000-debug/assets/products';
		
		exec('rm -f '.$dir.'/'.$img_name, $output);
		
		return 'OK';
    } 
	
}
?>
