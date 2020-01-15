<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class ProductGroup extends CommonClass
{
    protected $TABLE_NAME = 'PRODUCT_GROUP';
    protected $VIEW_NAME = 'PRODUCT_GROUP';

    //Because base cannot be too many, do not do limit
    public function read()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT PGR_CODE,
                PGR_DESCRIPTION,
                PGR_UNIT,
                DESCRIPTION PGR_UNITNAME,
                PGR_CODE||' - '||PGR_DESCRIPTION AS PGR_TEXT
            FROM PRODUCT_GROUP, UNIT_SCALE_VW
            WHERE PGR_UNIT = UNIT_ID
            ORDER BY PGR_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
