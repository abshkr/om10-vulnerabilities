<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class WRI extends CommonClass
{
    protected $TABLE_NAME = 'WRI';
    /*
        WRI_NUMBER               VARCHAR2(20)    NOT NULL,
        ID_STATUS                NUMBER(4)       DEFAULT 2,
        PRODUCER_NAME            VARCHAR2(60),
        PICKUP_LOCATION          VARCHAR2(100),
        WASTE_CLASSIFICATION     VARCHAR2(20),
        VEHICLE_REGISTRATION     VARCHAR2(10),
        CONTRACT_NUMBER          NUMBER(9),
        WRI_EFFECTIVE_DATE       DATE            DEFAULT SYSDATE NOT NULL,
        WRI_EXPIRY_DATE          DATE            DEFAULT SYSDATE+3 NOT NULL,
        WRI_STATUS               NUMBER(4)       DEFAULT 2,
    */
    
    /*
        The column MR_FLAG is not a Boolean type
        -1: Deleted
        0: Active, Do not send to host
        1: Active, Send to host
        2: Active, Read only, Send to host
        other: Unknown status
    */
    public $NUMBER_FIELDS = array(
        "ID_STATUS",
        "CONTRACT_NUMBER",
        "WRI_STATUS",
    );

    public $BOOLEAN_FIELDS = array(
    );

    

    public function wri_id_stats()
    {
        $query = "
            SELECT * FROM WRI_ID_STATS
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function wri_status_types()
    {
        $query = "
            SELECT * FROM WRI_STATUS_TYPES
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function tankers()
    {
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("SITE_HIDE_ARCHIVE_TANKER", "N");
        $archive_flag = ($config_value === 'Y' || $config_value === 'y');
        $archive_cond = "";
        if ($archive_flag) { 
            // hide the archived tanker
            $archive_cond = " AND TNKR_ARCHIVE != 'Y' ";
        }

        $query = "
            SELECT TNKR_CODE,
                TNKR_NAME,
                TNKR_ETP AS TNKR_ETYP_ID,
                TNKR_EQPT_NAME AS TNKR_ETYP_NAME,
                TNKR_CARRIER,
                TNKR_CARRIER_NAME,
                TNKR_OWNER,
                TNKR_OWNER_NAME,
                DECODE(TNKR_NAME, NULL, TNKR_CODE, TNKR_CODE||'['||TNKR_NAME||']') AS TNKR_DESC,
                TNKR_NUMBER,
                TNKR_ACTIVE, 
                TNKR_LOCK, 
                TNKR_ARCHIVE, 
                TNKR_BAY_LOOP_CH
            FROM GUI_TANKERS
            WHERE (1=1) $archive_cond
            ORDER BY TNKR_CODE ASC";

        $stmt = oci_parse($this->conn, $query);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
    public function read()
    {
        if (!isset($this->order_id) || $this->order_id == '' || $this->order_id == "undefined") {
            $this->order_id = -1;
        }
        $query = "
            SELECT 
                WRI_NUMBER          
                , ID_STATUS           
                , PRODUCER_NAME       
                , PICKUP_LOCATION     
                , WASTE_CLASSIFICATION
                , VEHICLE_REGISTRATION
                , CONTRACT_NUMBER     
                , WRI_EFFECTIVE_DATE  
                , WRI_EXPIRY_DATE     
                , WRI_STATUS
                , wis.WRI_ID_STAT_NAME        as ID_STATUS_NAME
                , wst.WRI_STATUS_NAME         as WRI_STATUS_NAME
                , ID_STATUS || ' - ' || wis.WRI_ID_STAT_NAME        as ID_STATUS_DESC
                , WRI_STATUS || ' - ' || wst.WRI_STATUS_NAME        as WRI_STATUS_DESC
            FROM
                WRI, 
                WRI_ID_STATS     wis,
                WRI_STATUS_TYPES wst
            WHERE
                WRI.ID_STATUS = wis.WRI_ID_STAT_ID(+)
                AND WRI.WRI_STATUS = wst.WRI_STATUS_ID(+)
                AND (-1 = :order_id OR WRI.CONTRACT_NUMBER = :order_id)
            ORDER BY WRI.WRI_EFFECTIVE_DATE, WRI.WRI_EXPIRY_DATE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_id', $this->order_id);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function find_wri($wri_key)
    {
        $query = "
            SELECT * 
            FROM WRI
            WHERE WRI_NUMBER=:code 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $wri_key);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row;
    }

    protected function insert_wri($wri_obj)
    {
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("WRI_EXPIRY_DAYS", "3");

        $query = "
            INSERT INTO WRI (
                WRI_NUMBER          
                , ID_STATUS           
                , PRODUCER_NAME       
                , PICKUP_LOCATION     
                , WASTE_CLASSIFICATION
                , VEHICLE_REGISTRATION
                , CONTRACT_NUMBER     
                , WRI_EFFECTIVE_DATE  
                , WRI_EXPIRY_DATE     
                , WRI_STATUS          
            ) VALUES(
                :wri_number          
                , :id_status           
                , :producer_name       
                , :pickup_location     
                , :waste_classification
                , :vehicle_registration
                , NULL    
                , SYSDATE  
                , SYSDATE+" . $config_value . "      
                , 2
            )
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':wri_number', $wri_obj->wri_number);
        oci_bind_by_name($stmt, ':id_status', $wri_obj->id_status);
        oci_bind_by_name($stmt, ':producer_name', $wri_obj->producer_name);
        oci_bind_by_name($stmt, ':pickup_location', $wri_obj->pickup_location);
        oci_bind_by_name($stmt, ':waste_classification', $wri_obj->waste_classification);
        oci_bind_by_name($stmt, ':vehicle_registration', $wri_obj->vehicle_registration);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    protected function update_wri($wri_obj)
    {
        $query = "
            UPDATE WRI SET
                ID_STATUS = :id_status,
                PRODUCER_NAME = :producer_name,
                PICKUP_LOCATION = :pickup_location,
                WASTE_CLASSIFICATION = :waste_classification,
                VEHICLE_REGISTRATION = :vehicle_registration
            WHERE WRI_NUMBER = :wri_number 
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':wri_number', $wri_obj->wri_number);
        oci_bind_by_name($stmt, ':id_status', $wri_obj->id_status);
        oci_bind_by_name($stmt, ':producer_name', $wri_obj->producer_name);
        oci_bind_by_name($stmt, ':pickup_location', $wri_obj->pickup_location);
        oci_bind_by_name($stmt, ':waste_classification', $wri_obj->waste_classification);
        oci_bind_by_name($stmt, ':vehicle_registration', $wri_obj->vehicle_registration);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    protected function delete_wri($wri_key)
    {
        $query = "
            DELETE 
            FROM WRI
            WHERE WRI_NUMBER=:code 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $wri_key);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    public function batch_import()
    {
        // write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__), 
        //     __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);

        if (!$this->data || count($this->data) <= 0) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: data"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            write_log("Data not set, cannot continue", __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        $result = true;
        foreach ($this->data as $k => $v ) {
            // convert enum string to value
            if ($v->id_status == "Assigned") $v->id_status = 0;
            if ($v->id_status == "In-Transit") $v->id_status = 1;
            if ($v->id_status == "Open") $v->id_status = 2;
            if ($v->id_status == "Rejected") $v->id_status = 3;
            
            // find if the WRI in $v exists in DB
            $row_existed = $this->find_wri($v->wri_number);
            if ($row_existed !== false) {
                // the WRI from CSV exists in DB
                // check the id status in CSV
                if ($v->id_status != 3) {
                    // Assigned, In-Transit, or Open => update the record in DB with values from CSV
                    $result = $this->update_wri($v);
                    if ($result === false) {
                        // oci_rollback($this->conn);
                        break;
                    }
                } else {
                    // 3 = Rejected => remove the WRI from DB
                    $result = $this->delete_wri($v->wri_number);
                    if ($result === false) {
                        // oci_rollback($this->conn);
                        break;
                    }
                }
            } else {
                // the WRI from CSV does not exist in DB
                // check the id status in CSV
                if ($v->id_status != 3) {
                    // Assigned, In-Transit, or Open => add the record to DB
                    $result = $this->insert_wri($v);
                    if ($result === false) {
                        // oci_rollback($this->conn);
                        break;
                    }
                } else {
                    // 3 = Rejected => do nothing 
                    continue;
                }
            }
        }

        if (!$result) {
            $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("database storage error:%s", $e['message'])));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        } else {
            $journal = new Journal($this->conn, false);
            $jnl_data[0] = Utilities::getCurrPsn();

            if (!$journal->jnlLogEvent(
                Lookup::WRI_IMPORTED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", sprintf("database storage error:%s", $e['message'])));
                echo json_encode($error, JSON_PRETTY_PRINT);
                oci_rollback($this->conn);
                return;
            }

            oci_commit($this->conn);
            $error = new EchoSchema(200, response("__WRIS_IMPORTED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

    }
}
