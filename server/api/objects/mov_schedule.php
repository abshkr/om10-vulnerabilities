<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class MovementSchedule extends CommonClass
{
    protected $TABLE_NAME = 'SCHEDULE';
    protected $VIEW_NAME = 'GUI_NOM_SCHEDULES';

    public $NUMBER_FIELDS = array(
        "SHLS_TRIP_NO",
        // "LOAD_REVERSE_FLAG",
        "MV_ID",
        "SHLSLOAD_LOAD_ID",
        "SHLS_LD_TYPE",
        "SHLS_PRIORITY",
        "SHLS_SHIFT",
        // "TRSF_QTY_AMB",
        // "TRSF_QTY_COR",
        // "TRSF_LOAD_KG",
        // "TRSA_ALT_QTY",
    );

    protected $table_view_map = array(
        "SHLS_SUPP" => "SUPPLIER_CODE"
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "CMPY_SCHD_ARCHIVE" => "Y",
        "CMPY_SCHD_REV_REPOST" => "Y",
        "REVERSED" => "Y",
        "ARCHIVED" => "Y",
        "UNLOAD" => "Y",
    );

    public function pagination_count()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->shls_trip_no)) {
            $shls_trip_no = '%' . $this->shls_trip_no . '%';
        } else {
            $shls_trip_no = '%';
        }

        if (isset($this->mv_key) && $this->mv_key!='') {
            $query = "
                SELECT COUNT(*) CN
                FROM GUI_NOM_SCHEDULES gns
                WHERE (MV_KEY = :mv_key OR MV_KEY LIKE '%'||:mv_key||'%')
                    AND SHLS_TRIP_NO LIKE :shls_trip_no
            ";
            if (isset($this->mvitm_item_id) && $this->mvitm_item_id!='') {
                $query = $query . "
                    AND SHLS_TRIP_NO IN (
                        select msi.MSITM_SHLSTRIP 
                        from 
                            MOV_SCHD_ITEMS msi, 
                            MOVEMENT_ITEMS mvi 
                        where 
                            msi.MSITM_SHLSSUPP=SUPPLIER_CODE 
                            and msi.MSITM_MOVEID=mvi.MVITM_MOVE_ID 
                            and msi.MSITM_MOVITEM=mvi.MVITM_LINE_ID 
                            and mvi.MVITM_ITEM_ID=:mvitm_item_id
                    ) 
                ";
            }
        } else {
            $query = "
                SELECT COUNT(*) CN
                FROM GUI_NOM_SCHEDULES gns
                WHERE SHLS_TRIP_NO LIKE :shls_trip_no
            ";
        }

        if (isset($this->supplier_code) && $this->supplier_code!='') {
            $query = $query . " AND SUPPLIER_CODE = :supplier_code";
        }

        if (isset($this->carrier_code) && $this->carrier_code!='') {
            $query = $query . " AND CARRIER_CODE = :carrier_code";
        }

        if (isset($this->shls_terminal) && $this->shls_terminal!='') {
            $query = $query . " AND SHLS_TERMINAL = :shls_terminal";
        }

        if (isset($this->tnkr_code) && $this->tnkr_code!='') {
            $query = $query . " AND TNKR_CODE LIKE :tnkr_code";
        }

        if (isset($this->status) && $this->status!='') {
            $query = $query . " AND STATUS = :status ";
        }

        $stmt = oci_parse($this->conn, $query);

        if (isset($this->mv_key) && $this->mv_key!='') {
            oci_bind_by_name($stmt, ':mv_key', $this->mv_key); 
            if (isset($this->mvitm_item_id) && $this->mvitm_item_id!='') {
                oci_bind_by_name($stmt, ':mvitm_item_id', $this->mvitm_item_id); 
            }
        }
    
        oci_bind_by_name($stmt, ':shls_trip_no', $shls_trip_no);

        if (isset($this->supplier_code) && $this->supplier_code!='') {
            oci_bind_by_name($stmt, ':supplier_code', $this->supplier_code);
        }

        if (isset($this->carrier_code) && $this->carrier_code!='') {
            oci_bind_by_name($stmt, ':carrier_code', $this->carrier_code);
        }

        if (isset($this->shls_terminal) && $this->shls_terminal!='') {
            oci_bind_by_name($stmt, ':shls_terminal', $this->shls_terminal);
        }

        if (isset($this->tnkr_code) && $this->tnkr_code!='') {
            $tnkr_code = '%' . $this->tnkr_code . '%';
            oci_bind_by_name($stmt, ':tnkr_code', $tnkr_code);
        }

        if (isset($this->status) && $this->status!='') {
            oci_bind_by_name($stmt, ':status', $this->status);
        }
    
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error111:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function read()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->shls_trip_no)) {
            $shls_trip_no = '%' . $this->shls_trip_no . '%';
        } else {
            $shls_trip_no = '%';
        }

        if (isset($this->mv_key) && $this->mv_key!='') {
            $query = "
                SELECT 
                    gns.*, 
                    'Y' as CMPY_SCHD_REV_REPOST,
                    DECODE(LOAD_REVERSE_FLAG, 
                        1, 'Y',
                        3, 'Y',
                        'N'
                    ) REVERSED,
                    DECODE(LOAD_REVERSE_FLAG, 
                        3, 'Y',
                        'N'
                    ) ARCHIVED,
                    DECODE(SHLS_LD_TYPE, 
                        6, 'Y',
                        'N'
                    ) UNLOAD
                FROM GUI_NOM_SCHEDULES gns
                WHERE (MV_KEY = :mv_key OR MV_KEY LIKE '%'||:mv_key||'%')
                    AND SHLS_TRIP_NO LIKE :shls_trip_no
            ";
            if (isset($this->mvitm_item_id) && $this->mvitm_item_id!='') {
                $query = $query . "
                    AND SHLS_TRIP_NO IN (
                        select msi.MSITM_SHLSTRIP 
                        from 
                            MOV_SCHD_ITEMS msi, 
                            MOVEMENT_ITEMS mvi 
                        where 
                            msi.MSITM_SHLSSUPP=SUPPLIER_CODE 
                            and msi.MSITM_MOVEID=mvi.MVITM_MOVE_ID 
                            and msi.MSITM_MOVITEM=mvi.MVITM_LINE_ID 
                            and mvi.MVITM_ITEM_ID=:mvitm_item_id
                    ) 
                ";
            }
        } else {
            $query = "
                SELECT 
                    gns.*, 
                    'Y' as CMPY_SCHD_REV_REPOST,
                    DECODE(LOAD_REVERSE_FLAG, 
                        1, 'Y',
                        3, 'Y',
                        'N'
                    ) REVERSED,
                    DECODE(LOAD_REVERSE_FLAG, 
                        3, 'Y',
                        'N'
                    ) ARCHIVED,
                    DECODE(SHLS_LD_TYPE, 
                        6, 'Y',
                        'N'
                    ) UNLOAD
                FROM GUI_NOM_SCHEDULES gns
                WHERE SHLS_TRIP_NO LIKE :shls_trip_no
            ";
        }

        if (isset($this->supplier_code) && $this->supplier_code!='') {
            $query = $query . " AND SUPPLIER_CODE = :supplier_code";
        }

        if (isset($this->carrier_code) && $this->carrier_code!='') {
            $query = $query . " AND CARRIER_CODE = :carrier_code";
        }

        if (isset($this->shls_terminal) && $this->shls_terminal!='') {
            $query = $query . " AND SHLS_TERMINAL = :shls_terminal";
        }

        if (isset($this->tnkr_code) && $this->tnkr_code!='') {
            $query = $query . " AND TNKR_CODE LIKE :tnkr_code";
        }

        if (isset($this->status) && $this->status!='') {
            $query = $query . " AND STATUS = :status ";
        }

        $query = $query . " ORDER BY SHLS_TRIP_NO ";
        $query = $this->pagination_query($query);

        $stmt = oci_parse($this->conn, $query);

        if (isset($this->mv_key) && $this->mv_key!='') {
            oci_bind_by_name($stmt, ':mv_key', $this->mv_key); 
            if (isset($this->mvitm_item_id) && $this->mvitm_item_id!='') {
                oci_bind_by_name($stmt, ':mvitm_item_id', $this->mvitm_item_id); 
            }
        }
    
        oci_bind_by_name($stmt, ':shls_trip_no', $shls_trip_no);

        if (isset($this->supplier_code) && $this->supplier_code!='') {
            oci_bind_by_name($stmt, ':supplier_code', $this->supplier_code);
        }

        if (isset($this->carrier_code) && $this->carrier_code!='') {
            oci_bind_by_name($stmt, ':carrier_code', $this->carrier_code);
        }

        if (isset($this->shls_terminal) && $this->shls_terminal!='') {
            oci_bind_by_name($stmt, ':shls_terminal', $this->shls_terminal);
        }

        if (isset($this->tnkr_code) && $this->tnkr_code!='') {
            $tnkr_code = '%' . $this->tnkr_code . '%';
            oci_bind_by_name($stmt, ':tnkr_code', $tnkr_code);
        }

        if (isset($this->status) && $this->status!='') {
            oci_bind_by_name($stmt, ':status', $this->status);
        }

        $this->pagination_binds($stmt);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error222:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }


    public function pagination_count_without_filters()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->mv_key) && $this->mv_key!='') {
            $query = "
                SELECT COUNT(*) CN
                FROM GUI_NOM_SCHEDULES gns
                WHERE MV_KEY = :mv_key
            ";
            if (isset($this->mvitm_item_id) && $this->mvitm_item_id!='') {
                $query = $query . "
                    AND SHLS_TRIP_NO IN (
                        select msi.MSITM_SHLSTRIP 
                        from 
                            MOV_SCHD_ITEMS msi, 
                            MOVEMENT_ITEMS mvi 
                        where 
                            msi.MSITM_SHLSSUPP=SUPPLIER_CODE 
                            and msi.MSITM_MOVEID=mvi.MVITM_MOVE_ID 
                            and msi.MSITM_MOVITEM=mvi.MVITM_LINE_ID 
                            and mvi.MVITM_ITEM_ID=:mvitm_item_id
                    ) 
                ";
            }

            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':mv_key', $this->mv_key); 
            if (isset($this->mvitm_item_id) && $this->mvitm_item_id!='') {
                oci_bind_by_name($stmt, ':mvitm_item_id', $this->mvitm_item_id); 
            }
        } else {
            $query = "
                SELECT COUNT(*) CN
                FROM GUI_NOM_SCHEDULES gns
            ";
            $stmt = oci_parse($this->conn, $query);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function read_without_filters()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->mv_key) && $this->mv_key!='') {
            $query = "
                SELECT 
                    gns.*, 
                    'Y' as CMPY_SCHD_REV_REPOST,
                    DECODE(LOAD_REVERSE_FLAG, 
                        1, 'Y',
                        3, 'Y',
                        'N'
                    ) REVERSED,
                    DECODE(LOAD_REVERSE_FLAG, 
                        3, 'Y',
                        'N'
                    ) ARCHIVED,
                    DECODE(SHLS_LD_TYPE, 
                        6, 'Y',
                        'N'
                    ) UNLOAD
                FROM GUI_NOM_SCHEDULES gns
                WHERE MV_KEY = :mv_key
            ";
            if (isset($this->mvitm_item_id) && $this->mvitm_item_id!='') {
                $query = $query . "
                    AND SHLS_TRIP_NO IN (
                        select msi.MSITM_SHLSTRIP 
                        from 
                            MOV_SCHD_ITEMS msi, 
                            MOVEMENT_ITEMS mvi 
                        where 
                            msi.MSITM_SHLSSUPP=SUPPLIER_CODE 
                            and msi.MSITM_MOVEID=mvi.MVITM_MOVE_ID 
                            and msi.MSITM_MOVITEM=mvi.MVITM_LINE_ID 
                            and mvi.MVITM_ITEM_ID=:mvitm_item_id
                    ) 
                ";
            }
            $query = $query . "ORDER BY SHLS_TRIP_NO";
            $query = $this->pagination_query($query);

            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':mv_key', $this->mv_key); 
            if (isset($this->mvitm_item_id) && $this->mvitm_item_id!='') {
                oci_bind_by_name($stmt, ':mvitm_item_id', $this->mvitm_item_id); 
            }
        } else {
            $query = "
                SELECT 
                    gns.*, 
                    'Y' as CMPY_SCHD_REV_REPOST,
                    DECODE(LOAD_REVERSE_FLAG, 
                        1, 'Y',
                        3, 'Y',
                        'N'
                    ) REVERSED,
                    DECODE(LOAD_REVERSE_FLAG, 
                        3, 'Y',
                        'N'
                    ) ARCHIVED,
                    DECODE(SHLS_LD_TYPE, 
                        6, 'Y',
                        'N'
                    ) UNLOAD
                FROM GUI_NOM_SCHEDULES gns
                ORDER BY SHLS_TRIP_NO";
            $query = $this->pagination_query($query);
            
            $stmt = oci_parse($this->conn, $query);
        }
        
        $this->pagination_binds($stmt);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
}