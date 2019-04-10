<?php
class dmpFS extends dmpBase{
	
	
	public function __construct( $params = false ){
		
		parent::__construct($params);
		$this->fileList = array();
		
	}

	/**
	 * 
	 * 
	 * 
	 * @param string $params
	 */
	public function getContents( $params = false ){

		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//validate the arguments
		if(!(isset($params->file)))						return new dmMesg(array("dev" => "No file argued"));
		if(!(file_exists(__dmRoot . $params->file)))	return new dmError(array("dev" => "Could not find argued file [" . $params->file . "]"));
		
	}
	
	/**
	 * Retrieve an instance of dmFiles (collection) populated with dmFile[s] (dmFile models).
	 * 
	 * relative to install boolean default is true.
	 * extensions to list, default is all.
	 * directory
	 * 
	 * @param string $params
	 */
	public function getFiles( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//ensure a directory was set or die.
		if(!(isset($params->directory)))		return new dmError(array("dev" => "Please specify directory, argue directory"));

		//ensure the directory exists, or die.
		if(!file_exists($params->directory))	return new dmError(array("dev" => "Directory [" . $params->directory . "] does not exist"));

		$dir = $params->directory;

		//bring in dmFiles and dmFile.
		if(!($chk = $this->requirefile(array("file" => __DIR__ . "/../collections/dmFiles.php"))) instanceOf dmMesg)	return $chk;
		if(!($chk = $this->requirefile(array("file" => __DIR__ ."/../models/dmFile.php"))) instanceOf dmMesg)			return $chk;
		
		$rFiles = new dmFiles();
		
		if(!($files = @scandir($dir)))			return new dmError(array("dev" => "Files could not be gathered, does [" . $dir . "] exist?"));
		$url = str_replace($_SERVER['DOCUMENT_ROOT'], '', $dir);
		
		foreach($files as $file){


			if($file == '.')	continue;
			if($file == '..')	continue;
			

			$iFile = new dmFile((object)array(
					
				"payload" => (object)array(
					
					"location" => $url . '/' . $file,
					"name" => $file,

		//			"size" => $fileSize
					
				)
			
			));
			
			$rFiles->addFile((object)array("file" => $iFile));
			
		}
		
		return new dmMesg(array("data" => $rFiles));
		
	}

	/**
	 * execute a shell command on omega 5k
	 * 
	 * returns it's output.
	 * 
	 * 
	 * 
	 * @param params
	 *  line : String The statement to be executed on the shell (as user omega 5k).
	 *  
	 *  
	 *  @return string.
	 */
	public function execute( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		
		//look up shell_exec on the php docs.
		
		
	}

	public function move( $params = false ){

		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		if(!($chk = $this->copy($params)) instanceOf dmMesg)			return $chk;
		$newFile = $chk->data;

		if(isset($params->file))	$fileSource = $params->source . "/" . $params->file;
		else 						$fileSource = $params->source;

		if(!@unlink($fileSource))	return new dmMesg(array("dev" => "Could not remove file [" . $fileSource . "] during a move operation"));
		else
			return new dmMesg(array("dev" => "Successfully removed [" . $fileSource . "] for move operation"));

	}

	/**
	 * 
	 * Copy a file
	 * [source]
	 * [target]
	 * [file]
	 * [name] : String :
	 * [MD5] : Boolean : Default, TRUE; once complete md5 hash check the file is identical.
	 * 
	 */
	public function copy( $params = false ){

		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		//validate the input
		if(!isset($params->source))				return new dmError(array("dev" => "Source not argued, cannot perform"));
		if(!file_exists($params->source))		return new dmError(array("dev" => "Source not found, " . $params->source));

		if(!isset($params->target))				return  new dmError(array("dev" => "Target not argued, cannot perform"));
		if(!is_writable($params->target))		return new dmError(array("dev" => "The Target location is not writable [" . $params->target . "]"));
		

		//ensure the last char is not a forwardslash and if it is, trim it.
		if(substr($params->source, -1) == "/")	$params->source = substr($params->source, 0, -1);
		if(substr($params->target, -1) == "/")	$params->target = substr($params->target, 0, -1);

		if(isset($params->file)){

			$fileSource = $params->source . "/" . $params->file;
			$fileTarget = $params->target . "/" . $params->file;

		}
		else{

			$fileTarget = $params->target;
			$fileSource = $params->source;

		}

		if(!file_exists($fileSource))			return new dmError(array("dev" => "File [" . $fileSource ."] not found, cannot perform."));

		if(!@copy($fileSource, $fileTarget))	return new dmError(array("dev" => "Errored copying [" . $fileSource . "] ==> [" . $fileTarget . "]"));

		//do details
		if(!isset($params->MD5))				$hashCheck = true;
		else 									$hashCheck = $params->MD5;

		if($hashCheck){

			if(md5(file_get_contents($fileSource)) !== md5(file_get_contents($fileTarget))){
				unlink($fileTarget);
				return new dmError(array("dev" => "Copy corrupted , and removed. [" . $fileSource ."  ==>  " . $fileTarget . "]"));
			}else
				return new dmMesg(array("dev" => "Successfully copied [" . $fileSource ."  ==>  " . $fileTarget . "]"));

		}
		else
			if(file_exists($fileTarget))	return new dmMesg(array("dev" => "Successfully copied [" . $fileSource ."  ==>  " . $fileTarget . "]", "data" => $fileTarget));
		
	}
	
}