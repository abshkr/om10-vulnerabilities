
<?php
session_start();

require_once(dirname(__FILE__) . '/common.php');

if (isset($_POST['AddNewArea']))
{   //Add new area
    echo http_post_cgi("/cgi-bin/en/access_ctrl/area.cgi");
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if (isset($_GET["op"]) && $_GET["op"] == 2)
    {   
        $html = http_get_cgi('cgi-bin/en/access_ctrl/gate.cgi');
        echo str_replace(
                "gate.js",
                "gate_phpwrapper.js", 
                $html);
    }
    else if (isset($_GET["op"]))
    {   //All the rest. op:6-select MODIFY;18-DELETE;17-Add New Area submit;16-Modify submit
        echo http_get_cgi('cgi-bin/en/access_ctrl/area.cgi');
    }
    else
    {   //Display area screen. Need to do some replacement to embed php
        $orig_html = file_get_contents($PROTOCOL . $HOST . "/cgi-bin/en/access_ctrl/area.cgi?sess_id=".
            $_SESSION["SESSION"]);
        // $pos = strpos($orig_html, 'Add New Area');
        // if ($pos === false)
        // {
        //     //Error handling
        // }
        // else
        // {
        //     $new_html = substr($orig_html, 0, $pos - 77);
        //     $new_html = $new_html . '<form action="" method="post">
        //     <input type="submit" name="AddNewArea" value="Add New Area" />
        //     <input type="hidden" value="7" name="op">
        //     </form>';
        //     $new_html = $new_html . substr($orig_html, $pos + 38);
            echo str_replace(
                "form.action='gate.cgi';",
                "form.action='gate.php';", 
                $orig_html);
                // $new_html);
        // }
    }
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if (isset($_GET["op"]) && $_GET["op"] == 2)
    {   
        $html = http_post_cgi('cgi-bin/en/access_ctrl/gate.cgi');
        echo str_replace(
                "gate.js",
                "gate_phpwrapper.js", 
                $html);
    }
    else if (isset($_GET["op"]))
    {   //All the rest. op:6-select MODIFY;18-DELETE;17-Add New Area submit;16-Modify submit
        echo http_post_cgi('cgi-bin/en/access_ctrl/area.cgi');
    }
    else
    {   //Display area screen. Need to do some replacement to embed php
        $orig_html = http_post_cgi('cgi-bin/en/access_ctrl/area.cgi');
            echo str_replace(
                "form.action='gate.cgi';",
                "form.action='gate.php';", 
                $orig_html);
    }
}

?>

