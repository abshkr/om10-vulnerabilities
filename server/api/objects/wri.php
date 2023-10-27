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
}
