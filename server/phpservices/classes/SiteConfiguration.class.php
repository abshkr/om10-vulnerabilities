<?php
require_once dirname(__FILE__) . '/../bootstrap.php';
require_once dirname(__FILE__) . '/Tankers.class.php';
require_once dirname(__FILE__) . '/GlobalCfg.php';
require_once dirname(__FILE__) . '/Journal.class.php';

if (!defined('SITECONFIGCLASS')) {
    define('SITECONFIGCLASS', 'SiteConfiguration.class');
}

class SiteConfigurationClass
{

    public $tblname = "SITE_CONFIG";

    public function SiteConfigurationClass()
    {
        if (defined('HOST')) {
            $this->host = HOST;
        } else {
            $this->host = "localhost";
        }

        if (defined('CGIDIR')) {
            $this->cgi = CGIDIR . "cust_ord/term_locs.cgi";
        } else {
            $this->cgi = "cust_ord/term_locs.cgi";
        }
    }

    public function update($data)
    {
        // logMe(sprintf("%s::%s START", __CLASS__, __FUNCTION__),
        //     sprintf("%s:%d", basename(__FILE__), __LINE__));

        // logMe(json_encode($data),
        //     sprintf("%s:%d", basename(__FILE__), __LINE__));

        $keys = array("CONFIG_KEY" => ($data->config_key));
        $excludes = array("CONFIG_VAL_LAST_CHG" => 0);
        $upd_journal = new UpdateJournalClass("Site Configuration", "SITE_CONFIG", $keys, $excludes);
        $upd_journal->setOldValues($upd_journal->getRecordValues());

        // update the configuration
        $mydb = DB::getInstance();
        $config_key = urlencode($data->config_key);

        //For some of the configs, like email, do not do urlencode.
        if (in_array($config_key, array('SITE_2FA_DOMAINS'))) {
            $config_value = $data->config_value;
        } else {
            $config_value = urlencode($data->config_value);
        }

        $sql = "UPDATE SITE_CONFIG SET CONFIG_VALUE='$config_value', CONFIG_VAL_LAST_CHG=SYSTIMESTAMP WHERE CONFIG_KEY='$config_key'";
        $res = $mydb->update($sql);

        $upd_journal->setNewValues($upd_journal->getRecordValues());
        $upd_journal->log();

        return ($res);
    }

    public function getByFieldValue($tbl_name, $field_name, $value)
    {
        $mydb = DB::getInstance();
        $sql = "SELECT * FROM $tbl_name WHERE $field_name=$value";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => $tbl_name)));
    }

}
