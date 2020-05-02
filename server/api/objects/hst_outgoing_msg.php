<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/manual_trans_service.php';
include_once __DIR__ . '/../service/specialmv_service.php';
include_once 'common_class.php';

//Old php: amfphp dmMessagingService.php
class OutogingMsg extends CommonClass
{
    protected $TABLE_NAME = 'HST_OUT_MSGS';
    
    public $NUMBER_FIELDS = array(
        
    );

    public $BOOLEAN_FIELDS = array(
        "VALID_FLAG" => 1
    );


    public function read()
    {
        $query = "SELECT REC_ID,
                OM_MSGS_ID,
                HST_COMP_CODE,
                OM_MSG_TYPE,
                OM_STATUS,
                OM_PROCS_DTIME,
                OM_SENT_TYPE,
                ACK_STATUS,
                FILE_SENT_DTIME,
                TEMP_ID,
                HST_FILE_TYPE,
                SFTP_STATUS,
                OM_IN_RECID,
                VALID_FLAG,
                NOM_TECH_KEY,
                EXT_BOL_NO
            FROM HST_OUT_MSGS";
            
        if (isset($this->start_date) && isset($this->end_date)) {
            $query = $query . " WHERE OM_PROCS_DTIME > :start_date and OM_PROCS_DTIME < :end_date ";
        }
        
        $query = $query . " ORDER BY OM_PROCS_DTIME DESC";  
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
        $query = "SELECT HST_FILE_TYPE
            FROM HST_OUT_MSGS
            WHERE REC_ID = :rec_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':rec_id', $this->rec_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);

        $host_path = HST_OUTGOING_FOLDER . $row['HST_FILE_TYPE'];
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