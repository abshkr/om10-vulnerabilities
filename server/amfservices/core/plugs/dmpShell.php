<?php
require_once('dmpBase.php');
/**
 * 
 * @author bn
 *
 */
class dmpShell extends dmpBase{
	
	public function __construct( $params = false ){

	}

	/**
	 * Execute a shell command
	 * 
	 * @param params | Object
	 * 
	 * [MUST] cmd |String : the command being executed as omega(system user)
	 * [MAY] copyEnv | Boolean : [Default TRUE] a toggle is provided in order to stand down $_SERVER environemnt being copied prior to execution
	 * 
	 * @return dmMesg|dmError On success, dmMesg with the data set to the output of shell_exec (see php documentation) - stdout
	 * 
	 */
	public function execute( $params = false ){

		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		//ensure we have a cmd
		if(!isset($params->cmd))			return new dmError(array("dev" => "Provide a command to execute, cmd not argued")); 

		//copy the session to the environment
		foreach ($_SERVER as $env_key => $env_value)
		    putenv("$env_key=$env_value");

		shell_exec($params->cmd);

		return new dmMesg(array("dev" => "Successfully executed [" . $params->cmd . "]"));

	}
	
}
?>