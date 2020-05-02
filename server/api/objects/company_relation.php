<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';
include_once __DIR__ . '/../service/site_service.php';
include_once __DIR__ . '/../service/company_service.php';

//Old php: amf CompanyRelationService.php
class CompanyRelation extends CommonClass
{
    protected $TABLE_NAME = 'COMPANY_RELATION';
    protected $VIEW_NAME = 'COMPANY_RELATION';

    protected $primary_keys = array(
        "parent_cmpy_code",
        "child_cmpy_code"
    );

    public $BOOLEAN_FIELDS = array(
        "STATUS" => 1
    );

    public function companys_by_role()
    {
        $serv = new CompanyService($this->conn);
        return $serv->companys_by_role($this->cmpy_role_id);
    }

    public function parent_cmpy_roles()
    {
        $query = "SELECT COMPANY_ID CMPY_ROLE_ID,
                COMPANY_NAME CMPY_ROLE_NAME
            FROM COMPANY_TYP,
            (
                WITH SPLIT_VALUES AS 
                (SELECT CONFIG_VALUE FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_COMPANY_RELATION_PARENT_ROLES')
                SELECT REGEXP_SUBSTR (CONFIG_VALUE, '[^,]+', 1, ROWNUM) VALUES_SPLIT
                FROM SPLIT_VALUES
                CONNECT BY LEVEL <= LENGTH (REGEXP_REPLACE (CONFIG_VALUE, '[^,]+')) + 1
            ) CMPY_ROLES
            WHERE COMPANY_ID = VALUES_SPLIT
            ORDER BY COMPANY_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function child_cmpy_roles()
    {
        $query = "SELECT COMPANY_ID CMPY_ROLE_ID,
                COMPANY_NAME CMPY_ROLE_NAME
            FROM COMPANY_TYP,
            (
                WITH SPLIT_VALUES AS 
                (SELECT CONFIG_VALUE FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_COMPANY_RELATION_CHILD_ROLES')
                SELECT REGEXP_SUBSTR (CONFIG_VALUE, '[^,]+', 1, ROWNUM) VALUES_SPLIT
                FROM SPLIT_VALUES
                CONNECT BY LEVEL <= LENGTH (REGEXP_REPLACE (CONFIG_VALUE, '[^,]+')) + 1
            ) CMPY_ROLES
            WHERE COMPANY_ID = VALUES_SPLIT
            ORDER BY COMPANY_ID";
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
        if (isset($this->parent_cmpy_code)) {
            $query = "SELECT PARENT_CMPY_CODE,
                PARENT_CMPY.CMPY_NAME PARENT_CMPY_NAME,
                PARENT_CMPY_ROLE,
                PARENT_TYPE.COMPANY_NAME PARENT_CMPY_ROLE_NAME,
                CHILD_CMPY_CODE,
                CHILD_CMPY.CMPY_NAME CHILD_CMPY_NAME, 
                CHILD_CMPY_ROLE,
                CHILD_TYPE.COMPANY_NAME CHILD_CMPY_ROLE_NAME,
                STATUS,
                CREATE_DATE,
                COMMENTS 
            FROM COMPANY_RELATION, COMPANYS PARENT_CMPY, COMPANYS CHILD_CMPY, COMPANY_TYP PARENT_TYPE, COMPANY_TYP CHILD_TYPE
            WHERE PARENT_CMPY_CODE = :parent_cmpy_code
                AND PARENT_CMPY_CODE = PARENT_CMPY.CMPY_CODE
                AND CHILD_CMPY_CODE = CHILD_CMPY.CMPY_CODE
                AND PARENT_CMPY_ROLE = PARENT_TYPE.COMPANY_ID
                AND CHILD_CMPY_ROLE = CHILD_TYPE.COMPANY_ID
            ORDER BY PARENT_CMPY_CODE";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':parent_cmpy_code', $this->parent_cmpy_code);
        } else {
            $query = "SELECT PARENT_CMPY_CODE,
                PARENT_CMPY.CMPY_NAME PARENT_CMPY_NAME,
                PARENT_CMPY_ROLE,
                PARENT_TYPE.COMPANY_NAME PARENT_CMPY_ROLE_NAME,
                CHILD_CMPY_CODE,
                CHILD_CMPY.CMPY_NAME CHILD_CMPY_NAME, 
                CHILD_CMPY_ROLE,
                CHILD_TYPE.COMPANY_NAME CHILD_CMPY_ROLE_NAME,
                STATUS,
                CREATE_DATE,
                COMMENTS 
            FROM COMPANY_RELATION, COMPANYS PARENT_CMPY, COMPANYS CHILD_CMPY, COMPANY_TYP PARENT_TYPE, COMPANY_TYP CHILD_TYPE
            WHERE PARENT_CMPY_CODE = PARENT_CMPY.CMPY_CODE
                AND CHILD_CMPY_CODE = CHILD_CMPY.CMPY_CODE
                AND PARENT_CMPY_ROLE = PARENT_TYPE.COMPANY_ID
                AND CHILD_CMPY_ROLE = CHILD_TYPE.COMPANY_ID
            ORDER BY PARENT_CMPY_CODE";
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