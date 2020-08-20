
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');
require_once(dirname(__FILE__) . '/../phpservices/bootstrap.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
/*
    $html = http_get_cgi('cgi-bin/en/access_ctrl/gate.cgi');
    echo str_replace(
        "gate.js",
        "gate_phpwrapper.js", 
        $html);
*/
	gate_page();
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	if (isSet($_POST['gate']))
	{
		/* Use gate to find out its type and in turn decide which method to use */
		$mydb = DB::getInstance();
        $sql = "select krdc_type from krd_cfg kcfg, gate_rc grc, accdev ad where grc.gate_dvce = ad.adv_code and ad.adv_code = kcfg.krdc_name and grc.gate_k='".$_POST['gate']."'";
        $rows = $mydb->query($sql);
		if ($rows->KRDC_TYPE == null)
		{
			echo open_gate_using_wsentry();
			gate_page();
		}
		else
		{
			echo open_gate_using_sentry();
		}
	}
	else if (isSet($_POST['op']) && $_POST['op'] == 3)
	{
		/* op=3 means open all gates. In this case, get the list of gates, and use the corresponding function.
		** NOTE: Due to current implementation of gate.cgi (i.e. it generates the resultant html page, it is not possible to
		** combine boolean result in a the situation where a combination of old-style-sentry devices and wsentry devices are
		** present in the system. Therefore, for now, just display final result.
		*/	
		$mydb = DB::getInstance();
        $sql = "select gate_k, krdc_type from krd_cfg kcfg, gate_rc grc, accdev ad where grc.gate_dvce = ad.adv_code and ad.adv_code = kcfg.krdc_name";
        $rows = $mydb->query($sql);
		foreach ($rows as $gate)
		{
			$_POST['op'] = "16";
			$_POST['gate'] = $gate->GATE_K;
			if (isSet($gate->KRDC_TYPE))
			{
				$respage = open_gate_using_sentry();
			}
			else
			{
				$respage = open_gate_using_wsentry();
			}
		}

		echo $respage;
		gate_page();
	}
	else
	{
		echo '<center><p style="color:red;">'.'ERROR: Invalid option.'.'</p></center>';
		gate_page();
	}
}


function gate_page()
{
    $html = http_get_cgi('cgi-bin/en/access_ctrl/gate.cgi');
    echo str_replace(
        "gate.js",
        "gate_phpwrapper.js", 
        $html);
}


function open_gate_using_sentry()
{
	$page_html = http_post_cgi('cgi-bin/en/access_ctrl/gate.cgi');
	return str_replace(
		"gate.js",
		"gate_phpwrapper.js", 
		$page_html);
}


function open_gate_using_wsentry()
{
	$res_html = NULL;

	$sport = getenv( "WSENTRY_PORT" );
	if ( $sport === FALSE )
	{
		$res_html .= '<center><p style="color:red;">'.'ERROR: Bad configuration. SENTRY_PORT is undefined.'.'</p></center>';
	}
	else
	{
     	global $PROTOCOL;
		global $HOST;

		/* wsentry is running as a http service because of limitation in FlexLinc-AC.
		** In addition, it is a significant overhead to build a version of php that
		** works properly with openssl and Linux redhat.
		** Therefore, use http here for now...
		*/
		$purl = "http" . "://" . $HOST . ":" . $sport . "/gatecontrol";

		$result = http_post($purl);
		$res = json_decode($result);
		if ($res == NULL)
		{
			$res_html .= '<center><p style="color:red;">'.'ERROR: Failed to send request'.'</p></center>';
		}
		else
		{
			$res_html .= '<center><p style="color:red;">'.$res->message.'</p></center>';
		}
	}

	return $res_html;
}


?>

