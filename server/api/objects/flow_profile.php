<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class FlowProfile extends CommonClass
{
    protected $TABLE_NAME = 'BA_FLOW_PROFS';
    public $desc = "Bay flow profile";

    protected $table_view_map = array(
        "BAA_BAD_LNK" => "BAD_PHYSCODE"
    );
    
    public $NUMBER_FIELDS = array(
        "BAF_MIN_QTY",
        "BAF_MAX_QTY",
        "BAF_HI_RATE",
        "BAF_LO_RATE",
        "BAF_UP_QTY",
        "BAF_DN_QTY",
        "BAF_OVER_ORD"
    );

    public function read()
    {
        if (isset($this->bad_physcode)) {
            $query = "
                SELECT BAF_ARM_LINK,
                    BAA_BAY_SEQ, 
                    BAF_MIN_QTY, 
                    BAF_MAX_QTY, 
                    BAF_HI_RATE, 
                    BAF_LO_RATE, 
                    BAF_UP_QTY, 
                    BAF_DN_QTY, 
                    BAF_OVER_ORD, 
                    BAA_BAD_LNK BAD_PHYSCODE
                FROM BA_FLOW_PROFS, BA_ARMS 
                WHERE BA_ARMS.BAA_CODE = BA_FLOW_PROFS.BAF_ARM_LINK 
                    AND BA_ARMS.BAA_BAD_LNK = :bad_physcode
                ORDER BY BAA_BAY_SEQ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':bad_physcode', $this->bad_physcode);
        } else{
            $query = "
                SELECT BAA_BAY_SEQ, 
                    BAF_MIN_QTY, 
                    BAF_MAX_QTY, 
                    BAF_HI_RATE, 
                    BAF_LO_RATE, 
                    BAF_UP_QTY, 
                    BAF_DN_QTY, 
                    BAF_OVER_ORD, 
                    BAA_BAD_LNK
                FROM BA_FLOW_PROFS, BA_ARMS 
                WHERE BA_ARMS.BAA_CODE = BA_FLOW_PROFS.BAF_ARM_LINK 
                ORDER BY BAA_BAY_SEQ";
            $stmt = oci_parse($this->conn, $query);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
}
