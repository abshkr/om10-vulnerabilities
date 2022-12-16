<?php
/**
 * Created by Joe of ExchangeCore.com
 */
if(isset($_POST['username']) && isset($_POST['password'])){

    //$adServer = "ldap://domaincontroller.mydomain.com";
    $adServer = "ldap://10.2.20.253";

    $ldap = ldap_connect($adServer);
	
    $username = $_POST['username'];
    $password = $_POST['password'];

    //$ldaprdn = 'mydomain' . "\\" . $username;
    $ldaprdn = $username;

    ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

    $bind = @ldap_bind($ldap, $ldaprdn, $password);
//echo $ldap; echo $adServer; echo $bind;
    if ($bind) {
        $filter="(|(sAMAccountName=$username)(userprincipalname=$username))";
        //$filter="(cn=*)";
        //$filter="(sAMAccountName=bz)";
		//$ldaptree = "OU=SBSUsers,OU=Users,OU=MyBusiness,DC=myDomain,DC=local";
		//$ldaptree = "CN=Users,OU=Users,DC=MyDomain,DC=COM";
		$ldaptree = "OU=Rowville,DC=corp,DC=diamondkey,DC=com";
        //$result = ldap_search($ldap,"dc=MYDOMAIN,dc=COM",$filter);
        $result = ldap_search($ldap,$ldaptree,$filter);
		
        //ldap_sort($ldap,$result,"sn");
        $info = ldap_get_entries($ldap, $result);
		echo $info['count'];
        $entries = array(
            "samaccountname" => $info[0]["samaccountname"][0],
            "userprincipalname" => $info[0]["userprincipalname"][0],
            "distinguishedname" => $info[0]["distinguishedname"][0],
            "objectcategory" => $info[0]["objectcategory"][0],
            "cn" => $info[0]["cn"][0],
            "displayname" => $info[0]["displayname"][0],
            "name" => $info[0]["name"][0],
            "sn" => $info[0]["sn"][0],
            "givenname" => $info[0]["givenname"][0],
            "c" => $info[0]["c"][0],
            "co" => $info[0]["co"][0],
            "countrycode" => $info[0]["countrycode"][0],
            "title" => $info[0]["title"][0],
            "physicaldeliveryofficename" => $info[0]["physicaldeliveryofficename"][0],
            "company" => $info[0]["company"][0],
            "telephonenumber" => $info[0]["telephonenumber"][0],
            "mail" => $info[0]["mail"][0],
            "memberof" => $info[0]["memberof"],
            "proxyaddresses" => $info[0]["proxyaddresses"],
        );
        //echo json_encode($entries, JSON_PRETTY_PRINT);
		//echo print_r($info, true);
        for ($i=0; $i<$info["count"]; $i++)
        {
            //if($info['count'] > 1)
            //    break;
            echo "<p>You are accessing <strong> ". $info[$i]["sn"][0] .", " . $info[$i]["givenname"][0] ."</strong><br /> (" . $info[$i]["samaccountname"][0] .")</p>\n";
            echo '<pre>';
            //var_dump($info);
            echo json_encode($entries, JSON_PRETTY_PRINT);
			//echo print_r($info, true);
            echo '</pre>';
            $userDn = $info[$i]["distinguishedname"][0]; 
            echo $info[$i]["dn"];
        }
        @ldap_close($ldap);
    } else {
        $msg = "Invalid email address / password";
        echo $msg;
    }

}else{
?>
    <form action="#" method="POST">
        <label for="username">Username: </label><input id="username" type="text" name="username" /> 
        <label for="password">Password: </label><input id="password" type="password" name="password" />        <input type="submit" name="submit" value="Submit" />
    </form>
<?php } ?> 