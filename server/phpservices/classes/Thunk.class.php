<?php
require_once 'Zend/Uri/Http.php';
require_once 'Zend/Http/Client.php';
require_once 'Zend/Http/Client/Adapter/Curl.php';
require_once 'Zend/Http/Client/Adapter/Exception.php';
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('THUNKCLASS')) define('THUNKCLASS','Thunk.class');

class Thunk
{
	protected $host;
	protected $page_uri;	
	protected $page_port;
	protected $method;	
	protected $result;
	protected $fields;
	protected $protocol;
	/**
     	* Connect to the remote server
     	*
     	* @param string  $host
     	* @param int     $port
     	* @param boolean $secure
     	*/
	//public function Thunk($host='localhost',$page_uri="",$fields=null, $method="GET",  $port=80, $secure = false)
	public function Thunk($host='localhost',$page_uri="",$fields=null, $method="POST",  $port=80, $secure = true)
	{
		//$this->host = $host;
		$this->host = $_SERVER['SERVER_NAME'];
		$this->port = $port;
		
		// force to use the 127.0.0.1 as the IP host
		/* $this->host = "127.0.0.1";
		$this->port = $port;
		if( isset($_SERVER['SERVER_PORT']) )
		{
			$this->port = $_SERVER['SERVER_PORT'];
		}
		$this->host = $this->host. ":" . $this->port; */
		
		$this->secure = $secure;
		$this->page_uri = $page_uri;
		$this->method = $method;
		$this->fields = $fields;
		$this->options = array(
				'CURLOPT_RETURNTRANSFER' => 1,
				'CURLOPT_MAXREDIRS'=>4,
				'CURLOPT_CUSTOMREQUEST'=>$this->method
				);
		
		if ( $this->secure == true )
		{
			$this->protocol = "https://";
		}
		else
		{
			$this->protocol = "http://";
		}
		
	}
	
	public function writeToClient($uri)
	{
		$fields_string ="";
		$this->page_uri = $uri;
		//url-ify the data for the POST
		foreach($this->fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
		$fields_string = rtrim($fields_string,'&');
		try
		{
/*			$client = new Zend_Http_Client("http://".$this->host."/".$this->page_uri."?".$fields_string,array(
				'adapter' => 'Zend_Http_Client_Adapter_Curl',
				'curloptions' => $this->options)
			);*/
			$client = new Zend_Http_Client($this->protocol.$this->host."/".$this->page_uri."?".$fields_string
			);
			logMe($this->protocol.$this->host."/".$this->page_uri."?".$fields_string,THUNKCLASS);
			$this->result = $client->request();
			logMe("after client->request()",THUNKCLASS);
			return RETURN_OK;
		}
		catch (Zend_Http_Client_Adapter_Exception $e) 
		{
			/*echo "Something went wrong";*/
			$this->result = "";
			logMe("Failed to invoke CGI.",THUNKCLASS);
            return RETURN_FAIL;
		}		
	}
	public function read() 
    { 
        return $this->result->getBody(); 
    }
}
