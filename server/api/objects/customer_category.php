<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class CustomerCategory extends CommonClass
{
    protected $TABLE_NAME = 'CST_PRCE_CATEGOR';

    public $BOOLEAN_FIELDS = array(
        
    );

    protected $table_view_map = array(
        "CATEG_CODE" => "CATEGORY_CODE",
        "CATEG_DESCRIPT" => "CATEGORY_NAME",
    );

    public $NUMBER_FIELDS = array(
        "CATEGORY_COUNT",
    );

    public $category_code;
    public $category_name;

    // read personnel
    public function read()
    {
        $query = "
            SELECT
                CATEG_CODE CATEGORY_CODE,
                CATEG_DESCRIPT CATEGORY_NAME,
                NVL(CU.CATEG_COUNT, 0) CATEGORY_COUNT
            FROM
                CST_PRCE_CATEGOR CG,
                (
                SELECT CUST_CATEGORY, COUNT(*) CATEG_COUNT
                FROM CUSTOMER
                GROUP BY CUST_CATEGORY
                ) CU
            WHERE
                CG.CATEG_CODE = CU.CUST_CATEGORY(+)
            ORDER BY CATEGORY_CODE";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function customers_by_category()
    {
        $query = "
            select 
                cust.CUST_ACCT                                  as CUST_ACNT 
                , cust.CUST_SUPP                                as CUST_SUPP_CODE
                , scmp.CMPY_NAME                                as CUST_SUPP_NAME
                , cust.CUST_CODE                                as CUST_CMPY_CODE
                , ccmp.CMPY_NAME                                as CUST_CMPY_NAME
                , cust.CUST_ACCT||' - '||ccmp.CMPY_NAME         as CUST_DESC
                , cust.CUST_CATEGORY                            as CUST_CTGR_CODE
                , catg.CATEG_DESCRIPT                           as CUST_CTGR_TEXT
            from 
                CUSTOMER                cust
                , GUI_COMPANYS              scmp
                , GUI_COMPANYS              ccmp
                , CST_PRCE_CATEGOR      catg
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and cust.CUST_CATEGORY = catg.CATEG_CODE(+)
                and ('-1'=:category or cust.CUST_CATEGORY=:category) 
            order by CUST_CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':category', $this->category);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // pure php function
    public function create()
    {
        $query = "INSERT INTO CST_PRCE_CATEGOR
                (CATEG_CODE,
                CATEG_DESCRIPT)
        VALUES (:categ_code,
                :categ_descript)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        oci_bind_by_name($stmt, ':categ_descript', $this->category_name);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = $this->TABLE_NAME; // "customer catetory";
        $jnl_data[2] = sprintf("categ_code:%s", $this->category_code); // $this->category_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function update()
    {
        $query = "
            SELECT CATEG_CODE CATEGORY_CODE,
                CATEG_DESCRIPT CATEGORY_NAME
            FROM CST_PRCE_CATEGOR
            WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            // write_log(json_encode($row), __FILE__, __LINE__);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "UPDATE CST_PRCE_CATEGOR
                SET CATEG_DESCRIPT = :categ_descript
                WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        oci_bind_by_name($stmt, ':categ_descript', $this->category_name);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = $this->TABLE_NAME; // "customer category";
        $jnl_data[2] = sprintf("categ_code:%s", $this->category_code); // $this->category_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = $this->TABLE_NAME; // "customer category";
        $record = sprintf("categ_code:%s", $this->category_code);
        foreach ($this as $key => $value) {
            $clnkey = $key;
            foreach ($this->table_view_map as $code => $alias ) {
                if (strtoupper($key) === strtoupper($alias)) {
                    $clnkey = $code;
                    break;
                }
            }
            if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] &&
                !$journal->valueChange(
                    $module, $record, $clnkey, $row[strtoupper($key)], $value)) {
                return false;
            }
        }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        $query = "DELETE FROM CST_PRCE_CATEGOR
                WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = $this->TABLE_NAME; // "customer category";
        $jnl_data[2] = sprintf("categ_code:%s", $this->category_code); // $this->category_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }
}
