<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class MovementReason extends CommonClass
{
    protected $TABLE_NAME = 'MOV_REASONS';
    
    public $NUMBER_FIELDS = array(
        "MR_ID",
    );

    public $BOOLEAN_FIELDS = array(
        "MR_FLAG" => 1,
        "MR_SHOW_COMMENT" => 0
    );

    public function types()
    {
        $service = new EnumService($this->conn);
        return $service->movement_types();
    }
    
    public function read()
    {
        $query = "
            SELECT MR_ID,
                MR_ACTION,
                MR_TYPE,
                MOVITEM_TYPE_NAME MR_TYPE_NAME,
                MR_MOV_TYPE_ORI,
                MR_REASON_CODE_ORI,
                MR_MOV_TYPE_REV,
                MR_REASON_CODE_REV,
                MR_FLAG,
                DECODE(MR_FLAG, 0, 'Active, Do not send to host',
                    1, 'Active, Send to host',
                    2, 'Active, Read only, Send to host',
                    'Unknown') MR_FLAG_DESC,
                MR_SHOW_COMMENT
            FROM MOV_REASONS,
                (SELECT MOVITEM_TYPE_ID, 
                DECODE(MOVITEM_TYPE_ID, 0, 'R', 1, 'D', 2, 'T', 'R') MOVITEM_TYPE_CODE, 
                MOVITEM_TYPE_NAME 
                FROM MOVITEM_TYPES)
            WHERE MR_TYPE = MOVITEM_TYPE_CODE(+)
            ORDER BY MR_ID
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
        $query = "SELECT NVL(MAX(MR_ID), 0) + 1 MR_ID FROM MOV_REASONS";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $this->mr_id = $row['MR_ID'];
    }

    public function check_existence()
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);
            
        if (isset($this->mr_id)) {
            $query = "SELECT COUNT(*) CN FROM MOV_REASONS
                WHERE MR_ID = :mr_id";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':mr_id', $this->mr_id);
            if (oci_execute($stmt, $this->commit_mode)) {
                $this->record_str = sprintf("mr_id:%s", $this->mr_id);
                
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
        } else if (isset($this->mr_id)) {
            return parent::check_existence();
        }

        return false;
    }
}
