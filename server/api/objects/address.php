<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Address extends CommonClass
{
    protected $VIEW_NAME = 'DB_ADDRESS_LINE';
    
    public function line_types()
    {
        $query = "
        SELECT ENUM_NO, MESSAGE FROM ENUMITEM, MSG_LOOKUP 
        WHERE ENUMTYPENAME = 'CONTACT_TYPE' 
            AND ENUM_TMM = MSG_ID 
            AND LANG_ID = 'ENG'
        ORDER BY ENUM_NO";
        $stmt = oci_parse($this->conn, $query);
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
        SELECT DB_ADDR_LINE_ID ADDR_CODE,
            DB_ADDRLINE_NO,
            DB_ADDR_LINE,
            DB_ADDR_LINE_TYPE, 
            MESSAGE DB_ADDR_LINE_TYPE_STR
        FROM DB_ADDRESS_LINE, 
            (
            SELECT ENUM_NO, MESSAGE FROM ENUMITEM, MSG_LOOKUP 
            WHERE ENUMTYPENAME = 'CONTACT_TYPE' 
                AND ENUM_TMM = MSG_ID 
                AND LANG_ID = 'ENG'
            ) LINE_TYPES
        WHERE LINE_TYPES.ENUM_NO(+) = DB_ADDR_LINE_TYPE
        ORDER BY DB_ADDR_LINE_ID, DB_ADDRLINE_NO";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_brief()
    {
        $query = "SELECT DB_ADDRESS.DB_ADDRESS_KEY,
                DB_ADDRESS_KEY || '[' || NVL(DL.DB_ADDR_TEXT, ' ') || ']' ADDRESS_TEXT
            FROM DB_ADDRESS,
                (
                    SELECT DB_ADDR_LINE_ID, 
                        NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO), ' ') DB_ADDR_TEXT
					FROM DB_ADDRESS_LINE
					GROUP BY DB_ADDR_LINE_ID
                ) DL
            WHERE DB_ADDRESS_KEY = DL.DB_ADDR_LINE_ID(+)
            ORDER BY DB_ADDRESS_KEY";
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
