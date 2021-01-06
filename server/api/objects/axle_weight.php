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
                AXLE_LIMIT_TYPE_CODE = NVL((
                        SELECT CONFIG_VALUE FROM SITE_CONFIG WHERE CONFIG_KEY='AXLE_WEIGHT_LIMIT_TYPE'
                    ), 'GML')                    
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
}
