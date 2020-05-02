<?php

include_once __DIR__ . '/../shared/log.php';

class AddressService
{
    // public function carriers($plus_any = false)
    // {
    //     $query = "";
    //     if ($plus_any) {
    //         $query .= " SELECT 'ANY' CMPY_CODE, 'ALL' CMPY_NAME FROM DUAL UNION ";
    //     }
    //     $query .= "
    //         SELECT CMPY_CODE, CMPY_NAME
    //         FROM GUI_COMPANYS
    //         WHERE BITAND(CMPY_TYPE, POWER(2, 2)) != 0
    //         ORDER BY CMPY_NAME ASC";
    //     // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
    //     $stmt = oci_parse($this->conn, $query);
    //     if (oci_execute($stmt)) {
    //         return $stmt;
    //     } else {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return null;
    //     }
    // }
}
