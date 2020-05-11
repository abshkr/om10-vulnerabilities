<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once __DIR__ . '/../service/tank_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class ProdMovement extends CommonClass
{
    protected $TABLE_NAME = 'PRODUCT_MVMNTS';

    public $NUMBER_FIELDS = array(
        "PMV_INTENDED_QTY",
        "PMV_EXPCTD_DENS",
        "PMV_OBSVD_DENS",
        "PMV_OPENING_QTY",
        "PMV_MOVED_QTY"
    );

    public function target_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->prod_movement_types();
    }

    public function prodmvnt_classes()
    {
        $serv = new EnumService($this->conn);
        return $serv->prod_movement_classes();
    }

    public function prodmvnt_states()
    {
        $serv = new EnumService($this->conn);
        return $serv->prod_movement_states();
    }

    public function tanks()
    {
        $serv = new TankService($this->conn);
        return $serv->tanks_by_base($this->base_code);
    }

    //op=206&h_PMV_NUMBER=2&pmvDepot=MOBPET&sess_id=GDyaQelbVjls
    public function start()
    {
        if (!isset($this->pmv_number)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: pmv_number not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "pmvDepot=" . $site_code . "&h_PMV_NUMBER=" . $this->pmv_number .
            "&op=206";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/stck_mgmt/prod_movement.cgi", $query_string);
        if (strpos($res, "op=\"206\"") === false) {
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        // write_log($res, __FILE__, __LINE__);

        echo '{';
        echo '"message": "' . response("__PRODUCTMOVEMENT_STARTED__"). '"';
        echo '}';
    }

    //op=207&h_PMV_NUMBER=2&pmvDepot=MOBPET&sess_id=GDyaQelbVjls
    public function halt()
    {
        if (!isset($this->pmv_number)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: pmv_number not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "pmvDepot=" . $site_code . "&h_PMV_NUMBER=" . $this->pmv_number .
            "&op=207";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/stck_mgmt/prod_movement.cgi", $query_string);
        if (strpos($res, "op=\"207\"") === false) {
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        // write_log($res, __FILE__, __LINE__);

        echo '{';
        echo '"message": "' . response("__PRODUCTMOVEMENT_HALTED__") . '"';
        echo '}';
    }


    public function pre_create()
    {
        $query = "SELECT COUNT(*) CNT FROM PRODUCT_BATCH 
            WHERE PRB_BATCHCODE = :prb_batchcode";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prb_batchcode', $this->pmv_batchcode);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ((int)$row['CNT'] > 0) {
            return true;
        }

        $query = "INSERT INTO PRODUCT_BATCH (PRB_BATCHCODE, PRB_STRT_DATE)
            VALUES (:prb_batchcode, SYSDATE)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prb_batchcode', $this->pmv_batchcode);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $err_msg = "DB error:" . $e['message'];
            return false;
        }

        return true;
    }

    public function progress()
    {
        $query = "
            SELECT 
                PMV.PMV_NUMBER,
                PMV.PMV_SRC_TERMINAL,
                PMV.PMV_SRCTYPE,
                PMV_TYP1.PMV_NAME PMV_SRCTYPE_NAME,
                PMV.PMV_SRCCODE,
                PMV_UNIT,
                UNIT_SCALE_VW.DESCRIPTION PMV_UNIT_NAME,
                NVL(PMV_OPENING_QTY, 0) PMV_OPENING_QTY,
                PMV_INTENDED_QTY,
                NVL(PMV_MOVED_QTY, 0) PMV_MOVED_QTY,
                PMV_EXPCTD_DENS,
                PMV_OBSVD_DENS,
                PMV.PMV_DST_TERMINAL,
                PMV.PMV_DSTTYPE,
                PMV_TYP2.PMV_NAME PMV_DSTTYPE_NAME,
                PMV_TRANS_TYPE,
                PMV_TRANSFER_CLASS_NAME PMV_TRANS_TYPE_NAME,
                PMV.PMV_DSTCODE,
                PMV.PMV_PRDCTLNK,
                PMV.PMV_BATCHCODE,
                PMV.PMV_STATUS,
                PMV_STATE_TYP.PMV_STATE_NAME PMV_STATUS_NAME
            FROM PRODUCT_MVMNTS PMV, PMV_STATE_TYP, PMV_TYP PMV_TYP1, PMV_TYP PMV_TYP2, UNIT_SCALE_VW, PMV_TRANSFER_CLASS_TYP
            WHERE PMV_NUMBER= :pmv_number
                AND PMV.PMV_STATUS = PMV_STATE_TYP.PMV_STATE_ID
                AND PMV_SRCTYPE = PMV_TYP1.PMV_ID
                AND PMV_DSTTYPE = PMV_TYP2.PMV_ID
                AND PMV_UNIT = UNIT_ID
                AND PMV_TRANS_TYPE = PMV_TRANSFER_CLASS_TYP.PMV_TRANSFER_CLASS_ID
            ORDER BY NVL(PMV.PMV_DATE2, SYSDATE) DESC, PMV.PMV_STATUS DESC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':pmv_number', $this->pmv_number);
        if (oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }

    public function read()
    {
        $query = "
        SELECT 
                PMV.PMV_NUMBER,
                PMV.PMV_SRC_TERMINAL,
                PMV.PMV_SRCTYPE,
                PMV_TYP1.PMV_NAME PMV_SRCTYPE_NAME,
                PMV.PMV_SRCCODE,
                PMV_UNIT,
                UNIT_SCALE_VW.DESCRIPTION PMV_UNIT_NAME,
                PMV_INTENDED_QTY,
                PMV_MOVED_QTY,
                PMV_EXPCTD_DENS,
                PMV_OBSVD_DENS,
                PMV.PMV_DST_TERMINAL,
                PMV.PMV_DSTTYPE,
                PMV_TYP2.PMV_NAME PMV_DSTTYPE_NAME,
                PMV_TRANS_TYPE,
                PMV_TRANSFER_CLASS_NAME PMV_TRANS_TYPE_NAME,
                PMV.PMV_DSTCODE,
                PMV.PMV_PRDCTLNK,
                PMV.PMV_BATCHCODE,
                PMV.PMV_STATUS,
                PMV_STATE_TYP.PMV_STATE_NAME PMV_STATUS_NAME
            FROM PRODUCT_MVMNTS PMV, PMV_STATE_TYP, PMV_TYP PMV_TYP1, PMV_TYP PMV_TYP2, UNIT_SCALE_VW, PMV_TRANSFER_CLASS_TYP
            WHERE PMV.PMV_STATUS = PMV_STATE_TYP.PMV_STATE_ID
                AND PMV_SRCTYPE = PMV_TYP1.PMV_ID
                AND PMV_DSTTYPE = PMV_TYP2.PMV_ID
                AND PMV_UNIT = UNIT_ID
                AND PMV_TRANS_TYPE = PMV_TRANSFER_CLASS_TYP.PMV_TRANSFER_CLASS_ID
            ORDER BY NVL(PMV.PMV_DATE2, SYSDATE) DESC, PMV.PMV_STATUS DESC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }
}
