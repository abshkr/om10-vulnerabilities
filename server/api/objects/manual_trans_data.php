<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class MT_GUI_Data 
{
	public $gud_id;
	public $gud_module_id;
	public $gud_module_name;
	public $gud_head_data;
	public $gud_body_data;
	public $gud_user;
	public $gud_create_date;
	public $gud_update_date;
	public $gud_status;
}


class ManualTransData extends CommonClass
{
    protected $TABLE_NAME = 'GUI_USER_DATA';
    protected $primary_keys = array("gud_id");

    public $BOOLEAN_FIELDS = array(
        
    );

    protected $table_view_map = array(
    );

    public $NUMBER_FIELDS = array(
        "GUD_ID",
    );

    public $CLOB_FIELDS = array(
        "GUD_HEAD_DATA",
        "GUD_BODY_DATA",
    );

    // do not use strip_tags to the fields in this array
    public $TAG_FIELDS = array(
        "GUD_HEAD_DATA",
        "GUD_BODY_DATA",
    );

    // Read manual transaction data - head only
    public function read_mt_head_data()
    {
        if (!isset($this->seq_id)) {
            $this->seq_id = -1;
        }

        $query = "
            SELECT
                GUD_ID,
                GUD_MODULE_ID,
                GUD_MODULE_NAME,
                GUD_HEAD_DATA,
                GUD_USER,
                GUD_CREATE_DATE,
                GUD_UPDATE_DATE,
                GUD_STATUS
            FROM
                GUI_USER_DATA
            WHERE
                GUD_MODULE_ID='MANUAL_TRANSACTIONS'
                AND (-1 = :seq_id OR GUD_ID = :seq_id)
            ORDER BY
                GUD_ID DESC
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':seq_id', $this->seq_id);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_mt_head_data_decorate(&$result_array)
    {
        write_log('in read_mt_head_data_decorate', __FILE__, __LINE__);
        foreach ($result_array as $key => $value) {
            //write_log($value['gud_id'], __FILE__, __LINE__);
            //write_log('validate xml ' . Utilities::is_valid_xml(htmlspecialchars_decode($value['gud_head_data'])) . ' - '. $value['gud_id'] , __FILE__, __LINE__);

            if (isset($value) && isset($value['gud_head_data'])) {
                if (strstr($value['gud_head_data'], '<') === FALSE && 
                strstr($value['gud_head_data'], '>') === FALSE && 
                strstr($value['gud_head_data'], '&lt;') === FALSE && 
                strstr($value['gud_head_data'], '&gt;') === FALSE) {
                    $result_array[$key]['gud_head_data'] = str_replace('&amp;quot;', '"', $result_array[$key]['gud_head_data']);
                    $result_array[$key]['gud_head_data'] = str_replace('&quot;', '"', $result_array[$key]['gud_head_data']);
                } else {
                    //write_log('read_mt_head_data_decorate xml_to_json gud_head_data '.$value['gud_id'], __FILE__, __LINE__);
                    $result_array[$key]['gud_head_data'] = Utilities::xml_to_json($result_array[$key]['gud_head_data']);
                }
            }
            
        }
    }

    // Read manual transaction data
    public function read_mt_data()
    {
        if (!isset($this->seq_id)) {
            $this->seq_id = -1;
        }

        $query = "
            SELECT
                GUD_ID,
                GUD_MODULE_ID,
                GUD_MODULE_NAME,
                GUD_HEAD_DATA,
                GUD_BODY_DATA,
                GUD_USER,
                GUD_CREATE_DATE,
                GUD_UPDATE_DATE,
                GUD_STATUS
            FROM
                GUI_USER_DATA
            WHERE
                GUD_MODULE_ID='MANUAL_TRANSACTIONS'
                AND (-1 = :seq_id OR GUD_ID = :seq_id)
            ORDER BY
                GUD_ID DESC
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':seq_id', $this->seq_id);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_mt_data_decorate(&$result_array)
    {
        write_log('in read_mt_data_decorate', __FILE__, __LINE__);
        foreach ($result_array as $key => $value) {
            //write_log($value['gud_id'], __FILE__, __LINE__);

            if (isset($value) && isset($value['gud_head_data'])) {
                if (strstr($value['gud_head_data'], '<') === FALSE && 
                strstr($value['gud_head_data'], '>') === FALSE && 
                strstr($value['gud_head_data'], '&lt;') === FALSE && 
                strstr($value['gud_head_data'], '&gt;') === FALSE) {
                    $result_array[$key]['gud_head_data'] = str_replace('&amp;quot;', '"', $result_array[$key]['gud_head_data']);
                    $result_array[$key]['gud_head_data'] = str_replace('&quot;', '"', $result_array[$key]['gud_head_data']);
                } else {
                    //write_log('read_mt_head_data_decorate xml_to_json gud_head_data '.$value['gud_id'], __FILE__, __LINE__);
                    $result_array[$key]['gud_head_data'] = Utilities::xml_to_json($result_array[$key]['gud_head_data']);
                }
            }

            if (isset($value) && isset($value['gud_body_data'])) {
                if (strstr($value['gud_body_data'], '<') === FALSE && 
                strstr($value['gud_body_data'], '>') === FALSE && 
                strstr($value['gud_body_data'], '&lt;') === FALSE && 
                strstr($value['gud_body_data'], '&gt;') === FALSE) {
                    $result_array[$key]['gud_body_data'] = str_replace('&amp;quot;', '"', $result_array[$key]['gud_body_data']);
                    $result_array[$key]['gud_body_data'] = str_replace('&quot;', '"', $result_array[$key]['gud_body_data']);
                } else {
                    //write_log('read_mt_data_decorate xml_to_json gud_body_data '.$value['gud_id'], __FILE__, __LINE__);
                    $result_array[$key]['gud_body_data'] = Utilities::xml_to_json($result_array[$key]['gud_body_data']);
                }
            }
            
        }
    }

    public function pre_create()
    {
        if (isset($this->save_format) && $this->save_format === "JSON") {
            write_log("SAVE FORMAT: " . $this->save_format . '****' . $this->gud_head_data, __FILE__, __LINE__);
            return;
        }

        $query = "SELECT NVL(MAX(GUD_ID), 0) + 1 NEW_SEQ FROM GUI_USER_DATA";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->gud_id = $row['NEW_SEQ'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        write_log("GUD_ID: ".$this->gud_id, __FILE__, __LINE__);

        write_log("before gud_head_data: ".$this->gud_head_data, __FILE__, __LINE__);
        if (isset($this->gud_head_data)) {
            // quotation &amp;quot; 
            $this->gud_head_data = str_replace('&quot;', '"', $this->gud_head_data);
            $this->gud_head_data = Utilities::json2xml($this->gud_head_data, 'MANUALTRANSACTIONDATA_HEAD');
            $this->gud_head_data = str_replace('&amp;quot;', '"', $this->gud_head_data);
            $this->gud_head_data = str_replace(' type="object"', '', $this->gud_head_data);
            $this->gud_head_data = str_replace(' type="string"', '', $this->gud_head_data);
            $this->gud_head_data = str_replace(' type="number"', '', $this->gud_head_data);
            $this->gud_head_data = str_replace(' type="array"', '', $this->gud_head_data);
            $this->gud_head_data = str_replace(' type="null"', '', $this->gud_head_data);
            $this->gud_head_data = str_replace('"', '&quot;', $this->gud_head_data);
        }
        write_log("after gud_head_data: ".$this->gud_head_data, __FILE__, __LINE__);

        write_log("before gud_body_data: ".$this->gud_body_data, __FILE__, __LINE__);
        if (isset($this->gud_body_data)) {
            // quotation &amp;quot; 
            $this->gud_body_data = str_replace('&quot;', '"', $this->gud_body_data);
            $this->gud_body_data = Utilities::json2xml($this->gud_body_data, 'MANUALTRANSACTIONDATA_BODY');
            $this->gud_body_data = str_replace('&amp;quot;', '"', $this->gud_body_data);
            $this->gud_body_data = str_replace(' type="object"', '', $this->gud_body_data);
            $this->gud_body_data = str_replace(' type="string"', '', $this->gud_body_data);
            $this->gud_body_data = str_replace(' type="number"', '', $this->gud_body_data);
            $this->gud_body_data = str_replace(' type="array"', '', $this->gud_body_data);
            $this->gud_body_data = str_replace(' type="null"', '', $this->gud_body_data);
            $this->gud_body_data = str_replace('"', '&quot;', $this->gud_body_data);
        }
        write_log("after gud_body_data: ".$this->gud_body_data, __FILE__, __LINE__);
    }

}
