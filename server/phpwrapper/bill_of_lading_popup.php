
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$contents = http_post_cgi('cgi-bin/en/load_scheds/bill_of_lading_popup.cgi');
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $contents = http_get_cgi('cgi-bin/en/load_scheds/bill_of_lading_popup.cgi');
}

echo $contents;

writeContents("temp.php", $contents);

	function writeContents($fileName, $contents)
	{
//		return;

		if ( file_exists($fileName) )
		{
			chmod($fileName, 0744);
			unlink($fileName);
		}

		$fd = fopen($fileName, "w+");
		$fout = fwrite($fd, $contents);
		if ($fout == FALSE)
		{
			echo "Cannot write to file " . $fileName . "<br>";
//			echo "!!!!!!!!!!!!!!!!";
//			exit;
		}
		fclose($fd);
		chmod($fileName, 0644);

		return $fout;

	}


?>

