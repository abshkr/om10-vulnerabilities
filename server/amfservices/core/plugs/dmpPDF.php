<?php
require_once("dmpFS.php");
require_once(__DIR__ . "/libs/dompdf/dompdf_config.inc.php");
class dmpPDF extends dmpFS{
	
	private $pdfHDL;
	private $pdfData;
	
	public function __construct(){
		
		parent::__construct();
		$this->pdfHDL = new DOMPDF();
		
	}
	
	/**
	 * 
	 * Render HTML contents to PDF, saving the pdf to argued file locatio
	 * 
	 * @param STRING $htmlContents
	 * @param STRING $fileLocation
	 * 
	 * 
	 */
	public function renderToPDFFile( $htmlContents, $fileLocation ){
		
		if(!$this->pdfHDL instanceOf DOMPDF) 				return new dmError(array("dev" => "PDF Plug did not initialise the dom-pdf library effectively"));

		$this->pdfHDL->load_html($htmlContents);
		$this->pdfHDL->render();
		$this->pdfData = $this->pdfHDL->output();

		if(!($chk = $this->save($fileLocation, $this->pdfData)) instanceOf dmMesg)			return $chk;
		
		if(!file_exists(__documentRoot . $fileLocation)) 	return new dmError(array("dev" => "plPDF::render failed to find rendered file at [" . __documentRoot . $fileLocation . "]"));
		else												return new dmMesg(array("dev" => "plPDF::renderToPDFFile successfully rendered contents to [" . __documentRoot . $fileLocation . "]", $fileLocation));
			
	}

}
?>