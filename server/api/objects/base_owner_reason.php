<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class BaseOwnerTrsaReason extends CommonClass
{
    protected $TABLE_NAME = 'OWNER_TRSA_REASONS';
    
    public $NUMBER_FIELDS = array(
        "OTR_ID",
    );

    public $BOOLEAN_FIELDS = array(
        "OTR_FLAG" => 1,
    );

    public function types()
    {
        $service = new EnumService($this->conn);
        return $service->movement_types();
    }
    
    public function read()
    {
        $query = "
            SELECT 
                OTR_ID,
                OTR_CODE,
                OTR_TEXT,
                OTR_TYPE,
                MOV_TYPES.MOVITEM_TYPE_NAME OTR_TYPE_NAME,
                OTR_FLAG,
                NVL(OTRSA_COUNTS.OTRSA_COUNT, 0)  OTRSA_COUNT
            FROM 
                OWNER_TRSA_REASONS,
                (
                    SELECT 
                        MOVITEM_TYPE_ID, 
                        DECODE(MOVITEM_TYPE_ID, 0, 'R', 1, 'D', 2, 'T', 'R') MOVITEM_TYPE_CODE, 
                        MOVITEM_TYPE_NAME 
                    FROM MOVITEM_TYPES
                ) MOV_TYPES,
                (
                    SELECT REASON, COUNT(*) OTRSA_COUNT
                    FROM PRODOWNSHIP_TRANSACT
                    GROUP BY REASON
                ) OTRSA_COUNTS
            WHERE OTR_TYPE = MOV_TYPES.MOVITEM_TYPE_ID(+) AND OTR_ID = OTRSA_COUNTS.REASON(+)
            ORDER BY OTR_ID
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

    public function pre_create()
    {
        $query = "SELECT NVL(MAX(OTR_ID), 0) + 1 OTR_ID FROM OWNER_TRSA_REASONS";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $this->otr_id = $row['OTR_ID'];
    }

    public function check_existence()
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);
            
        if (isset($this->otr_id)) {
            $query = "SELECT COUNT(*) CN FROM OWNER_TRSA_REASONS
                WHERE OTR_ID = :otr_id";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':otr_id', $this->otr_id);
            if (oci_execute($stmt, $this->commit_mode)) {
                $this->record_str = sprintf("otr_id:%s", $this->otr_id);
                
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                if ($row['CN'] > 0) {
                    return true;
                }

                return false;
                
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        } else if (isset($this->otr_id)) {
            return parent::check_existence();
        }

        return false;
    }
}
