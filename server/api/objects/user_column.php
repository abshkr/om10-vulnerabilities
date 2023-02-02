<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class UserColumn extends CommonClass
{
    protected $TABLE_NAME = 'URBAC_USER_COLUMNS';
    protected $primary_keys = array("column_user", "column_site", "column_page", "column_code");


    /* protected $table_view_map = array(
        "LIMIT_TYPE_ID" => "AXLE_LIMIT_TYPE_ID",
    ); */

    public $NUMBER_FIELDS = array(
        "COLUMN_ORDER",
        "COLUMN_WIDTH",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "COLUMN_VISIBLE" => 1,
        "COLUMN_EDITABLE" => 1,
        "COLUMN_SORTABLE" => 1,
        "COLUMN_RESIZABLE" => 1,
    );
    
    
    public function check_columns_by_user()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM URBAC_USER_COLUMNS
            WHERE COLUMN_SITE=:site_code AND COLUMN_PAGE=:page_code AND COLUMN_USER=:user_code 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':site_code', $this->site_code);
        oci_bind_by_name($stmt, ':page_code', $this->page_code);
        oci_bind_by_name($stmt, ':user_code', $this->user_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    private function is_user_column_existed()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM URBAC_USER_COLUMNS
            WHERE COLUMN_SITE=:site_code AND COLUMN_PAGE=:page_code AND COLUMN_USER=:user_code 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':site_code', $this->site_code);
        oci_bind_by_name($stmt, ':page_code', $this->page_code);
        oci_bind_by_name($stmt, ':user_code', $this->user_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return (int)$row['CNT'];
    }

    public function read_by_user()
    {
        $cnt = $this->is_user_column_existed();

        if ( $cnt > 0) {
            $query = "
                SELECT * 
                FROM URBAC_USER_COLUMNS
                WHERE COLUMN_SITE=:site_code AND COLUMN_PAGE=:page_code AND COLUMN_USER=:user_code 
                ORDER BY COLUMN_ORDER
            ";
        } else {
            $query = "
                SELECT *
                FROM URBAC_USER_COLUMNS
                WHERE COLUMN_SITE='ANY_SITE' AND COLUMN_PAGE=:page_code AND COLUMN_USER='ANY_USER' 
                ORDER BY COLUMN_ORDER
            ";
        }

        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':page_code', $this->page_code);
        if ($cnt > 0) {
            oci_bind_by_name($stmt, ':site_code', $this->site_code);
            oci_bind_by_name($stmt, ':user_code', $this->user_code);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    /*
        column_user              varchar2(12)    not null,
        column_site              varchar2(16)    not null,
        column_page              varchar2(100)   not null,
        column_code              varchar2(100)   not null,
        column_title             varchar2(200)   not null,
        column_visible           number(1)       default 1,
        column_order             number(9),
        column_pinned            varchar2(100),
        column_type              varchar2(100),
        column_filter            varchar2(100),
        column_editor            varchar2(1000),
        column_render            varchar2(1000),
        column_style             varchar2(100),
        column_editable          number(1)       default 0,
        column_sortable          number(1)       default 1,
        column_resizable         number(1)       default 1,
        column_width             number(9)       default 100,
    */
    public function read()
    {
        if (!isset($this->user_code) || $this->user_code == '' || $this->user_code == "undefined") {
            $this->user_code = "-1";
        }
        if (!isset($this->site_code) || $this->site_code == '' || $this->site_code == "undefined") {
            $this->site_code = "-1";
        }
        if (!isset($this->page_code) || $this->page_code == '' || $this->page_code == "undefined") {
            $this->page_code = "-1";
        }
        if (!isset($this->field) || $this->field == '' || $this->field == "undefined") {
            $this->field = "-1";
        }
        if (!isset($this->visible) || $this->visible == '' || $this->visible == "undefined") {
            $this->visible = -1;
        }

        $query = "
            SELECT * FROM " . $this->TABLE_NAME . "
            WHERE 
                1 = 1
                AND ('-1' = :user_code OR COLUMN_USER = :user_code)
                AND ('-1' = :site_code OR COLUMN_SITE = :site_code)
                AND ('-1' = :page_code OR COLUMN_PAGE = :page_code)
                AND ('-1' = :field OR COLUMN_CODE LIKE '%'||:field||'%')
                AND (-1 = :visible OR COLUMN_VISIBLE = :visible)
            ORDER BY COLUMN_USER, COLUMN_SITE, COLUMN_PAGE, COLUMN_ORDER
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':user_code', $this->user_code);
        oci_bind_by_name($stmt, ':site_code', $this->site_code);
        oci_bind_by_name($stmt, ':page_code', $this->page_code);
        oci_bind_by_name($stmt, ':field', $this->field);
        oci_bind_by_name($stmt, ':visible', $this->visible);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Delete user-defined columns by site, user, and page code
    public function delete_columns()
    {
        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        $query = "DELETE FROM URBAC_USER_COLUMNS WHERE COLUMN_USER = :user_code AND COLUMN_SITE = :site_code AND COLUMN_PAGE = :page_code";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':user_code', $this->user_code);
        oci_bind_by_name($stmt, ':site_code', $this->site_code);
        oci_bind_by_name($stmt, ':page_code', $this->page_code);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__DATABASE_EXCEPTION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $error = new EchoSchema(200, response("__DELETE_SUCCEEDED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
        oci_commit($this->conn);
    }

}
