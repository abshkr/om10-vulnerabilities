<?php
require_once( "bootstrap.php" );

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
	
	function httpGet($url,$params)
	{
		$getData = '';
		//create name value pairs separated by &
		foreach($params as $k => $v)
		{
			$getData .= $k . '='.$v.'&';
		}
		$getData = rtrim($getData, '&');
		
		$options 	= array(
    				'http' 	  => array(
        			'header'  => "Content-type: text/html\r\n",
        			'method'  => 'GET',
        			'content' => ($getData)
    				)
    	);
		
		$context  	= stream_context_create($options);
				// create request to CGI
		$output 	= file_get_contents($url, false, $context);
 
		if($output === false)
		{
			logMe("Failed to process CGI",THUNKCLASS);
		}
 
		return $output;
	}

	function httpPost($url,$params)
	{
		$postData = '';
		//create name value pairs separated by &
		foreach($params as $k => $v)
		{
			$postData .= $k . '='.$v.'&';
		}
		$postData = rtrim($postData, '&');
		
		$options 	= array(
    				'http' 	  => array(
        			'header'  => "Content-type: text/html\r\n",
        			'method'  => 'POST',
        			'content' => ($postData)
    				)
    	);
		
		$context  	= stream_context_create($options);
				// create request to CGI
		$output 	= file_get_contents($url, false, $context);
 
		if($output === false)
		{
			logMe("Failed to process CGI",THUNKCLASS);
		}
 
		return $output;
	}
	
	function httpGetByCurl($url,$params)
	{
		$getData = '';
		//create name value pairs separated by &
		foreach($params as $k => $v)
		{
			$getData .= $k . '='.$v.'&';
		}
		$getData = rtrim($getData, '&');
 
		$ch = curl_init(); 
 
		curl_setopt($ch,CURLOPT_URL,$url."?".$getData);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch,CURLOPT_HEADER, false);
 
		$output=curl_exec($ch);
 
		if($output === false)
		{
			//echo "Error Number:".curl_errno($ch)."<br>";
			//echo "Error String:".curl_error($ch);
            throw new Exception( "service called failed. server response: \n $output \nrequest: \n \n$getData"."\n"."Error Number:".curl_errno($ch)."Error String:".curl_error($ch) );
		}
 
		curl_close($ch);
		return $output;
	}

	function httpPostByCurl($url,$params)
	{
		$postData = '';
		//create name value pairs separated by &
		foreach($params as $k => $v)
		{
			$postData .= $k . '='.$v.'&';
		}
		$postData = rtrim($postData, '&');
 
		$ch = curl_init(); 
 
		curl_setopt($ch,CURLOPT_URL,$url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch,CURLOPT_HEADER, false);
		curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch,CURLOPT_SSL_VERIFYHOST, 1);
		//curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, true);
		//curl_setopt($ch,CURLOPT_SSL_VERIFYHOST, 2);
		curl_setopt($ch, CURLOPT_SSLCERT, '/certificate/diamondkey.local.cert.pem');
		curl_setopt($ch, CURLOPT_SSLCERTPASSWD, '');
		curl_setopt($ch, CURLOPT_SSLCERTTYPE, 'PEM'); 
		curl_setopt($ch, CURLOPT_SSLKEY, '/certificate/diamondkey.local.key.pem'); 
		
		curl_setopt($ch, CURLOPT_POST, count($postData));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);   
 
		$output=curl_exec($ch);
 
		if($output === false)
		{
			logMe("Error Number:".curl_errno($ch),THUNKCLASS);
			logMe("Error String:".curl_error($ch),THUNKCLASS);
			logMe($output,THUNKCLASS);
			//echo "Error Number:".curl_errno($ch)."<br>";
			//echo "Error String:".curl_error($ch);
            throw new Exception( "service called failed. server response: \n $output \nrequest: \n \n$postData"."\n"."Error Number:".curl_errno($ch)."Error String:".curl_error($ch) );
		}
 
		curl_close($ch);
		return $output;
	}

    function httpJson($url, $parameters = array()) 
	{
        $jsonEncodedParams = json_encode($parameters);
        $requestString = "{\"parameters\":$jsonEncodedParams}";
        //echo $requestString;

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
        curl_setopt($curl, CURLOPT_POST, 1);

        curl_setopt($curl, CURLOPT_POSTFIELDS, $requestString);
        curl_setopt($curl, CURLOPT_HEADER, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        $response = curl_exec($curl);
        $decoded = json_decode($response);
        //echo $response;
        if(!$decoded){
            throw new Exception("service called failed. server response: \n $response \nrequest: \n \n$requestString"."\n"."Error Number:".curl_errno($ch)."Error String:".curl_error($ch) );
        }
        return $decoded;
        
    }

	public function writeToClient($uri)
	{
		$this->page_uri = $uri;
		//url-ify the data for the POST
		$fields_string ="";
		foreach($this->fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
		$fields_string = rtrim($fields_string,'&');
		
		try
		{
			//$http_url = "http://".$this->host."/".$this->page_uri;
			$http_url = $this->protocol.$this->host."/".$this->page_uri;
			//$http_url = "https://".$this->host."/".$this->page_uri;
			logMe($http_url."?".$fields_string,THUNKCLASS);
			if ( $this->method == "GET" )
			{
				$this->result = $this->httpGet( $http_url, $this->fields );
			}
			else
			{
				$this->result = $this->httpPost( $http_url, $this->fields );
			}
			
			logMe("after client->request()",THUNKCLASS);
			return RETURN_OK;
		}
		catch ( Exception $e ) 
		{
			/*echo "Something went wrong";*/
			$this->result = "";
			logMe("Failed to invoke CGI.",THUNKCLASS);
            return RETURN_FAIL;
		}		
	}
	public function read() 
    { 
        return $this->result; 
    }
}
