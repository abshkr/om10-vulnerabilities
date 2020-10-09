<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class LoadMeter extends CommonClass
{
    protected $TABLE_NAME = 'BA_METERS';
    protected $VIEW_NAME = 'BA_METERS';

    public $NUMBER_FIELDS = array(
        "BAM_MIN_FLOW",
        "BAM_MAX_FLOW",
        "BAM_KFA"
    );

    //Old php: ListLibraryService.php::lookupLoadMeterUsage()
    public function meter_usages()
    {
        // $serv = new EnumService($this->conn);
        // return $serv->meter_usages();
        $query = "
            SELECT *
            FROM BAM_USAGE_TYP
            WHERE BAM_USAGE_ID IN (1, 2, 3, 7, 8)
            ORDER BY BAM_USAGE_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Old php: ListLibraryService.php::lookupMeterType()
    public function meter_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->meter_types();
    }

    public function unit_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->unit_types();
    }

    protected function post_create()
    {
        return $this->post_update();
    }

    //Old php: LoadMeterService.php::create
    public function post_update()
    {
        $query = "UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE BA_METERS 
            SET BAM_KDATE_DMY = SYSDATE
            WHERE BAM_CODE = :bam_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':bam_code', $this->bam_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return true;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
    }

    protected function check_deletable()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "SELECT COUNT(*) CN FROM PIPENODE WHERE PN_MTR = :pn_mtr";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pn_mtr', $this->bam_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] > 0) {
            throw new UndeletableException(sprintf("Meter %s cannot be deleted because there is pipenode", $this->bam_code));
        }

        return true;
    }

    protected function post_delete()
    {
        $query = "UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return true;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
    }

    public function read()
    {
        $query = "SELECT BM.BAM_CODE,
                BM.BAM_TYPE,
                BT.BA_METER_NAME BAM_TYPE_NAME,
                BM.BAM_NAME,
                BM.BAM_MIN_FLOW,
                BM.BAM_MAX_FLOW,
                BM.BAM_KFA,
                BAM_KDATE_DMY BAM_LAST_MOD,
                BAM_M_CURVE,
                BM.BAM_USAGE,
                BU.BAM_USAGE_NAME,
                BQ.QTY_ID BAM_QTY_TYPE ,
                BQ.QTY_NAME BAM_QTY_TYPENAME 
            FROM BA_METERS BM,
                BAM_USAGE_TYP BU,
                QTY_TYP BQ,
                BA_METER_TYP BT 
            WHERE BM.BAM_USAGE = BU.BAM_USAGE_ID 
                AND BT.BA_METER_ID = BM.BAM_TYPE 
                AND BQ.QTY_ID = BM.BAM_QTY_TYPE 
            ORDER BY BAM_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}