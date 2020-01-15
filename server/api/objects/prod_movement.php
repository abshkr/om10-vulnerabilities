<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class ProdMovement extends CommonClass
{
    protected $TABLE_NAME = 'PRODUCT_MVMNTS';

    public $NUMBER_FIELDS = array(
        "PMV_INTENDED_QTY",
        "PMV_EXPCTD_DENS",
        "PMV_OBSVD_DENS"
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

    // read personnel
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
                UNIT_SCALE_VW.DESCRIPTION UNIT_NAME,
                PMV_INTENDED_QTY,
                PMV_MOVED_QTY,
                PMV_EXPCTD_DENS,
                PMV_OBSVD_DENS,
                PMV.PMV_DST_TERMINAL,
                PMV.PMV_DSTTYPE,
                PMV_TRANS_TYPE,
                PMV_TRANSFER_CLASS_NAME,
                PMV_TYP2.PMV_NAME PMV_DSTTYPE_NAME,
                PMV.PMV_DSTCODE,
                PMV.PMV_PRDCTLNK,
                PMV.PMV_BATCHCODE,
                PMV.PMV_STATUS,
                PMV_STATE_TYP.PMV_STATE_NAME
            FROM PRODUCT_MVMNTS PMV, PMV_STATE_TYP, PMV_TYP PMV_TYP1, PMV_TYP PMV_TYP2, UNIT_SCALE_VW, PMV_TRANSFER_CLASS_TYP
            WHERE PMV.PMV_STATUS = PMV_STATE_TYP.PMV_STATE_ID
                AND PMV_SRCTYPE = PMV_TYP1.PMV_ID
                AND PMV_DSTTYPE = PMV_TYP2.PMV_ID
                AND PMV_UNIT = UNIT_ID
                AND PMV_TRANS_TYPE = PMV_TRANSFER_CLASS_TYP.PMV_TRANSFER_CLASS_ID
            ORDER BY NVL(PMV.PMV_DATE2, SYSDATE) DESC, PMV.PMV_STATUS DESC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }
}
