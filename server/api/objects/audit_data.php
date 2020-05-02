<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class AuditData extends CommonClass
{
    protected $TABLE_NAME = 'ACTIONS_FOR_AUDIT';
    protected $VIEW_NAME = 'ACTIONS_FOR_AUDIT';

    public $BOOLEAN_FIELDS = array(
        
    );

    public function read()
    {
        if (isset($this->start_date) && isset($this->end_date)) {
            $query = "
                SELECT AU.AU_RECORD_KEY AS AUDIT_RECORD_KEY,
                    AU.AU_ACTION AS AUDIT_ACTION_ID,
                    AA.AUDIT_ACTION_NAME AS AUDIT_ACTION_NAME,
                    AU.AU_DATE AS AUDIT_DATETIME,
                    AU.AU_CATEGORY AS AUDIT_CATEGORY_ID,
                    AC.AC_CATEGORY_DESC AS AUDIT_CATEGORY_NAME,
                    AU.AU_BATCH_KEY AS AUDIT_BATCH_KEY,
                    AU.AU_TABLE_ACC_SEQ AS AUDIT_TABLE_ACC_SEQ,
                    AU.AU_TABLE_ACC_TIME AS AUDIT_TABLE_ACC_TIME,
                    AU.AU_TABLE_NAME AS AUDIT_TABLE,
                    NVL(TCD.TCD_COLUMN_DESC, AU.AU_COLUMN_NAME) AS AUDIT_COLUMN,
                    AU.AU_PKEYS AS AUDIT_PKEYS,
                    AU.AU_DESCRIPTION AS AUDIT_DESCRIPTION,
                    AU.AU_BEFORE_DESC AS AUDIT_VALUE_BEFORE,
                    AU.AU_AFTER_DESC AS AUDIT_VALUE_AFTER,
                    AU.AU_PER_CODE AS AUDIT_USER_CODE,
                    NVL(AU.AU_PER_NAME, PR.PER_NAME) AS AUDIT_USER_NAME,
                    AU.AU_PER_CMPY AS AUDIT_CMPY_CODE,
                    NVL(AU.AU_PER_CMPY_NAME, CP.CMPY_NAME) AS AUDIT_CMPY_NAME,
                    AU.AU_IP AS AUDIT_IP,
                    AU.AU_SESSION_ID AS AUDIT_SESSION_ID,
                    AU.AU_OSUSER AS AUDIT_OSUSER,
                    AU.AU_MACHINE AS AUDIT_MACHINE,
                    AU.AU_PROGRAM AS AUDIT_PROGRAM
                FROM ACTIONS_FOR_AUDIT AU,
                    GUI_COMPANYS CP,
                    (
                        SELECT 1 AS AUDIT_ACTION_ID, 'INS' AS AUDIT_ACTION_CODE, 'Add' AS AUDIT_ACTION_NAME FROM DUAL
                        UNION 
                        SELECT 2 AS AUDIT_ACTION_ID, 'UPD' AS AUDIT_ACTION_CODE, 'Modify' AS AUDIT_ACTION_NAME FROM DUAL
                        UNION 
                        SELECT 3 AS AUDIT_ACTION_ID, 'DEL' AS AUDIT_ACTION_CODE, 'Delete' AS AUDIT_ACTION_NAME FROM DUAL
                    ) AA,
                    AUDIT_CATEGORY AC,
                    PERSONNEL PR,
                    TABLE_COLUMN_DESC TCD
                WHERE AU.AU_DATE > :start_date AND AU.AU_DATE < :end_date
                    AND AU.AU_ACTION = AA.AUDIT_ACTION_ID(+)
                    AND AU.AU_CATEGORY = AC.AC_CATEGORY_ID(+)
                    AND AU.AU_PER_CMPY = CP.CMPY_CODE(+)
                    AND AU.AU_PER_CODE = PR.PER_CODE(+)
                    AND AU.AU_TABLE_NAME = TCD.TCD_TABLE_NAME(+)
                    AND AU.AU_COLUMN_NAME = TCD.TCD_COLUMN_NAME(+)
                    AND (TCD.TCD_LANG=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL 
                        AND TCD.TCD_LANG = 'ENG'))";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        } else {
            $query = "
                SELECT AU.AU_RECORD_KEY AS AUDIT_RECORD_KEY,
                    AU.AU_ACTION AS AUDIT_ACTION_ID,
                    AA.AUDIT_ACTION_NAME AS AUDIT_ACTION_NAME,
                    AU.AU_DATE AS AUDIT_DATETIME,
                    AU.AU_CATEGORY AS AUDIT_CATEGORY_ID,
                    AC.AC_CATEGORY_DESC AS AUDIT_CATEGORY_NAME,
                    AU.AU_BATCH_KEY AS AUDIT_BATCH_KEY,
                    AU.AU_TABLE_ACC_SEQ AS AUDIT_TABLE_ACC_SEQ,
                    AU.AU_TABLE_ACC_TIME AS AUDIT_TABLE_ACC_TIME,
                    AU.AU_TABLE_NAME AS AUDIT_TABLE,
                    NVL(TCD.TCD_COLUMN_DESC, AU.AU_COLUMN_NAME) AS AUDIT_COLUMN,
                    AU.AU_PKEYS AS AUDIT_PKEYS,
                    AU.AU_DESCRIPTION AS AUDIT_DESCRIPTION,
                    AU.AU_BEFORE_DESC AS AUDIT_VALUE_BEFORE,
                    AU.AU_AFTER_DESC AS AUDIT_VALUE_AFTER,
                    AU.AU_PER_CODE AS AUDIT_USER_CODE,
                    NVL(AU.AU_PER_NAME, PR.PER_NAME) AS AUDIT_USER_NAME,
                    AU.AU_PER_CMPY AS AUDIT_CMPY_CODE,
                    NVL(AU.AU_PER_CMPY_NAME, CP.CMPY_NAME) AS AUDIT_CMPY_NAME,
                    AU.AU_IP AS AUDIT_IP,
                    AU.AU_SESSION_ID AS AUDIT_SESSION_ID,
                    AU.AU_OSUSER AS AUDIT_OSUSER,
                    AU.AU_MACHINE AS AUDIT_MACHINE,
                    AU.AU_PROGRAM AS AUDIT_PROGRAM
                FROM ACTIONS_FOR_AUDIT AU,
                    GUI_COMPANYS CP,
                    (
                        SELECT 1 AS AUDIT_ACTION_ID, 'INS' AS AUDIT_ACTION_CODE, 'Add' AS AUDIT_ACTION_NAME FROM DUAL
                        UNION 
                        SELECT 2 AS AUDIT_ACTION_ID, 'UPD' AS AUDIT_ACTION_CODE, 'Modify' AS AUDIT_ACTION_NAME FROM DUAL
                        UNION 
                        SELECT 3 AS AUDIT_ACTION_ID, 'DEL' AS AUDIT_ACTION_CODE, 'Delete' AS AUDIT_ACTION_NAME FROM DUAL
                    ) AA,
                    AUDIT_CATEGORY AC,
                    PERSONNEL PR,
                    TABLE_COLUMN_DESC TCD
                WHERE AU.AU_DATE > TO_CHAR(SYSDATE - 7, 'YYYY-MM-DD HH24:MI:SS')
                    AND AU.AU_ACTION = AA.AUDIT_ACTION_ID(+)
                    AND AU.AU_CATEGORY = AC.AC_CATEGORY_ID(+)
                    AND AU.AU_PER_CMPY = CP.CMPY_CODE(+)
                    AND AU.AU_PER_CODE = PR.PER_CODE(+)
                    AND AU.AU_TABLE_NAME = TCD.TCD_TABLE_NAME(+)
                    AND AU.AU_COLUMN_NAME = TCD.TCD_COLUMN_NAME(+)
                    AND (TCD.TCD_LANG=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL 
                        AND TCD.TCD_LANG = 'ENG'))";
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
