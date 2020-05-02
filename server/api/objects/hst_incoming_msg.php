<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/manual_trans_service.php';
include_once __DIR__ . '/../service/specialmv_service.php';
include_once 'common_class.php';

//Old php: amfphp dmMessagingService.php
class IncomingMsg extends CommonClass
{
    protected $TABLE_NAME = 'HST_IN_MSGS';
    
    public $NUMBER_FIELDS = array(
        
    );

    public $BOOLEAN_FIELDS = array(
        "OM_VALID" => 1,
        "IGNORE_FLAG" => 1
    );


    public function read()
    {
        $query = "SELECT REC_ID,
            HST_MSG_ID,
            HST_MSG_ID2,
            HST_SITE_CODE,
            OM_RECV_DTIME,
            HST_MSG_TYPE,
            OM_VALID,
            OM_STATUS,
            LAST_UPD_DTIME,
            TEMP_ID,
            HST_FILE_TYPE,
            HST_PLANT_CODE,
            OUT_DIR_PATH,
            IN_DIR_PATH,
            DESCRIPTION,
            IGNORE_FLAG,
            LAST_MOD_BYID,
            ACK_RECID 
        FROM HST_IN_MSGS";
            
        if (isset($this->start_date) && isset($this->end_date)) {
            $query = $query . " WHERE OM_RECV_DTIME > :start_date and OM_RECV_DTIME < :end_date ";
        }
        
        $query = $query . " ORDER BY OM_RECV_DTIME DESC";  
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->start_date) && isset($this->end_date)) {
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function content()
    {
        $query = "SELECT OUT_DIR_PATH, HST_FILE_TYPE
            FROM HST_IN_MSGS
            WHERE REC_ID = :rec_id
                AND HST_MSG_ID2 = :hst_msg_id2";
            
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':rec_id', $this->rec_id);
        oci_bind_by_name($stmt, ':hst_msg_id2', $this->hst_msg_id2);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);

        if ($row['OUT_DIR_PATH'] == null) {
            $host_path = $row['OUT_DIR_PATH'] . $row['HST_FILE_TYPE'];
        } else {
            $host_path = HST_INCOMING_FOLDER . $row['HST_FILE_TYPE'];
        }
        
        if (!file_exists($host_path)) {
            write_log(sprintf("File %s does not exist", $host_path), __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, sprintf("File %s does not exist", $host_path));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return array();
        }

        $file = fopen($host_path, "r");
        $info = "";
        while (true)
        {
            if($line = fgets($file)) {
                $info .= $line;
            } else {
                break;
            }
        }
        fclose($file);
        echo $info;
        return array();
    }
}