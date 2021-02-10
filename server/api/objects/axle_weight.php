<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class AxleWeight extends CommonClass
{
    protected $TABLE_NAME = 'AXLE_WEIGHT_LIMIT_LOOKUP';
    // protected $VIEW_NAME = 'AXLE_WEIGHT_LIMIT_LOOKUP_VW';
    protected $primary_keys = array("limit_type_id", "axle_group");
    protected $view_keys = array("axle_limit_type_id", "axle_group_id");


    public $NUMBER_FIELDS = array(
        "AXLE_LIMIT_TYPE_ID",
        "AXLE_GROUP_ID",
        "AXLE_WEIGHT_LIMIT",

        "EQPT_ID",
        "AXLE_ID",
        "LIMIT_TYPE_ID",
        "AXLE_GROUP",
        "USER_WEIGHT_LIMIT",
        "AXLE_WEIGHT_LIMIT",
    );

    protected $table_view_map = array(
        "LIMIT_TYPE_ID" => "AXLE_LIMIT_TYPE_ID",
        "AXLE_GROUP" => "AXLE_GROUP_ID",
        "WEIGHT_LIMIT" => "AXLE_WEIGHT_LIMIT",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
    );
    
    
    public function axle_weight_limit_types()
    {
        $query = "
            SELECT 
                AXLE_LIMIT_TYPE_ID, 
                AXLE_LIMIT_TYPE_CODE, 
                AXLE_LIMIT_TYPE_NAME 
            FROM AXLE_WEIGHT_LIMIT_VW 
            ORDER BY AXLE_LIMIT_TYPE_ID
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
    
    public function avail_axle_weight_limit_types()
    {
        $query = "
            SELECT 
                AWLV.AXLE_LIMIT_TYPE_ID, 
                AWLV.AXLE_LIMIT_TYPE_CODE, 
                AWLV.AXLE_LIMIT_TYPE_NAME,
                AWLL.COUNT_AXLE_GROUPS
            FROM 
                AXLE_WEIGHT_LIMIT_VW AWLV
                , (
                    SELECT 
                        LIMIT_TYPE_ID, 
                        COUNT(AXLE_GROUP) AS COUNT_AXLE_GROUPS
                    FROM AXLE_WEIGHT_LIMIT_LOOKUP
                    GROUP BY LIMIT_TYPE_ID
                ) AWLL
            WHERE AWLV.AXLE_LIMIT_TYPE_ID = AWLL.LIMIT_TYPE_ID(+)
            ORDER BY AXLE_LIMIT_TYPE_ID
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
    
    public function count_axle_weight_limit_types()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM AXLE_WEIGHT_LIMIT_VW 
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
    
    public function axle_groups()
    {
        $query = "
            SELECT 
                AXLE_GROUP_ID, 
                AXLE_GROUP_CODE, 
                AXLE_GROUP_NAME
            FROM AXLE_GROUP_VW 
            ORDER BY AXLE_GROUP_ID
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
    
    public function avail_axle_groups()
    {
        $query = "
            SELECT 
                AGV.AXLE_GROUP_ID, 
                AGV.AXLE_GROUP_CODE, 
                AGV.AXLE_GROUP_NAME,
                AWLL.COUNT_LIMIT_TYPES
            FROM 
                AXLE_GROUP_VW  AGV
                , (
                    SELECT 
                        AXLE_GROUP, 
                        COUNT(LIMIT_TYPE_ID) AS COUNT_LIMIT_TYPES
                    FROM AXLE_WEIGHT_LIMIT_LOOKUP
                    GROUP BY AXLE_GROUP
                ) AWLL
            WHERE AGV.AXLE_GROUP_ID = AWLL.AXLE_GROUP(+)
            ORDER BY AGV.AXLE_GROUP_ID
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
    
    public function count_axle_groups()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM AXLE_GROUP_VW 
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

    public function check_axle_weight_limit()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM AXLE_WEIGHT_LIMIT_LOOKUP 
            WHERE LIMIT_TYPE_ID=:limit_type AND AXLE_GROUP=:axle_group
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':limit_type', $this->limit_type);
        oci_bind_by_name($stmt, ':axle_group', $this->axle_group);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_limit_type_by_group()
    {
        $query = "
            SELECT LIMIT_TYPE_ID 
            FROM AXLE_WEIGHT_LIMIT_LOOKUP 
            WHERE AXLE_GROUP=:axle_group
        ";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':axle_group', $this->axle_group);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_group_by_limit_type()
    {
        $query = "
            SELECT AXLE_GROUP 
            FROM AXLE_WEIGHT_LIMIT_LOOKUP 
            WHERE LIMIT_TYPE_ID=:limit_type
        ";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':limit_type', $this->limit_type);
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
        $query = "
            SELECT 
                AXLE_LIMIT_TYPE_ID,
                AXLE_LIMIT_TYPE_CODE,
                AXLE_LIMIT_TYPE_NAME,
                AXLE_GROUP_ID,
                AXLE_GROUP_NAME,
                AXLE_WEIGHT_LIMIT
            FROM 
                AXLE_WEIGHT_LIMIT_LOOKUP_VW
            WHERE 
                1 = 1
            ORDER BY AXLE_LIMIT_TYPE_ID, AXLE_GROUP_ID
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

    public function read_by_type()
    {
        if (!isset($this->limit_type)) {
            $this->limit_type = -1;
        }
        $query = "
            SELECT 
                AXLE_LIMIT_TYPE_ID,
                AXLE_LIMIT_TYPE_CODE,
                AXLE_LIMIT_TYPE_NAME,
                AXLE_GROUP_ID,
                AXLE_GROUP_NAME,
                AXLE_WEIGHT_LIMIT, 
                LPAD(AXLE_WEIGHT_LIMIT, 6, ' ')||' ['||AXLE_GROUP_NAME||']'  AS AXLE_GROUP_DESC
            FROM 
                AXLE_WEIGHT_LIMIT_LOOKUP_VW
            WHERE 
                (
                    -1=:limit_type and AXLE_LIMIT_TYPE_CODE = NVL((
                        SELECT CONFIG_VALUE FROM SITE_CONFIG WHERE CONFIG_KEY='AXLE_WEIGHT_LIMIT_TYPE'
                    ), 'GML') 
                ) or (AXLE_LIMIT_TYPE_ID = :limit_type)                    
            ORDER BY AXLE_LIMIT_TYPE_ID, AXLE_GROUP_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':limit_type', $this->limit_type);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_etyp_axle_weights()
    {
        $query = "
            SELECT FRONT_WEIGH_LIMIT, REAR_WEIGH_LIMIT
            FROM EQUIP_TYPES
            WHERE ETYP_ID = :etyp_id
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_id', $this->etyp_id);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_eqpt_axle_weights()
    {
        $query = "
            SELECT 
                EQPT_ID,
                AXLE_ID,
                LIMIT_TYPE_ID,
                AXLE_GROUP,
                USER_WEIGHT_LIMIT,
                LIMIT_TYPE_CODE,
                LIMIT_TYPE_NAME,
                AXLE_GROUP_NAME,
                AXLE_WEIGHT_LIMIT
            FROM EQPT_AXLES_VW
            WHERE EQPT_ID = :eqpt_id
            ORDER BY AXLE_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_id', $this->eqpt_id);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_tnkr_axle_weights()
    {
        $query = "
            SELECT 
                TA.TNKR_CODE
                , TA.TNKR_AXLE_ID
                , TA.EQPT_SEQ
                , TA.EQPT_ID
                , TE.EQPT_CODE || '[' || NVL(TE.EQPT_TITLE, TE.EQPT_CODE) || ']'   AS EQPT_NAME
                , TA.EQPT_AXLE_ID
                , TA.LIMIT_TYPE_ID
                , TA.AXLE_GROUP
                , TA.USER_WEIGHT_LIMIT
                , TA.LIMIT_TYPE_CODE
                , TA.LIMIT_TYPE_NAME
                , TA.AXLE_GROUP_NAME
                , TA.AXLE_WEIGHT_LIMIT            
            FROM 
                TNKR_AXLES_VW TA, 
                TRANSP_EQUIP TE
            WHERE TA.TNKR_CODE = :tnkr_code AND TA.EQPT_ID=TE.EQPT_ID
            ORDER BY TA.TNKR_AXLE_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_trip_axle_weights()
    {
        $query = "
            SELECT *
            FROM TRIP_AXLES_VW
            WHERE SUPP_CODE = :supp_code AND TRIP_NO=:trip_no
            ORDER BY SUPP_CODE, TRIP_NO, TNKR_AXLE_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supp_code', $this->supplier_code);
        oci_bind_by_name($stmt, ':trip_no', $this->shls_trip_no);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
