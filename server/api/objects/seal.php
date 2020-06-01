<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class Seal extends CommonClass
{
    protected $TABLE_NAME = 'SEAL';

    public $NUMBER_FIELDS = array(
        
    );

    public function read()
    {
        $query = "SELECT SEAL_NR, SEAL_CMPT_NR, SEAL_PREFIX, SEAL_SUFFIX 
            FROM SEAL WHERE SEALSPEC_SHLSTRIP = :trip AND SEALSPEC_SHLSSUPP = :supplier
            ORDER BY SEAL_CMPT_NR, SEAL_NR";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip', $this->trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function next_seal()
    {
        $query = "SELECT SITE_NEXT_SEAL FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function set_next_seal()
    {
        $query = "UPDATE SITE SET SITE_NEXT_SEAL = :next_seal";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':next_seal', $this->next_seal);
        if (oci_execute($stmt, $this->commit_mode)) {
            $error = new EchoSchema(200, response("__SET_NEXT_SEAL__"));
            echo json_encode($error, JSON_PRETTY_PRINT);;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__SAVE_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);;
        }
    }

    //trip=246829219&supplier=7640114&seal_num=1
    public function allocate_seal()
    {
        if (!isset($this->trip_no)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: trip_no not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->supplier)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: supplier not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->seal_num)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: seal_num not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query_string = "seal_num=" . $this->seal_num . "&supplier=" . $this->supplier .
            "&trip=" . $this->trip_no;

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/loadspec_seal.cgi", $query_string);
        if (strpos($res, "OK") === false) {
            write_log("load_spec_compt CGI error", __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $error = new EchoSchema(200, response("__SEAL_ALLOCATED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    //trip=246829219&supplier=7640114&cmd=realloc&cmpt_nr=1
    public function allocate_one()
    {
        if (!isset($this->trip_no)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: trip_no not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->supplier)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: supplier not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->cmpt_nr)) {
            $this->cmpt_nr = 1;
        }

        $query_string = "cmpt_nr=" . $this->cmpt_nr . "&supplier=" . $this->supplier .
            "&trip=" . $this->trip_no . "&cmd=realloc";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/loadspec_seal.cgi", $query_string);
        if (strpos($res, "OK") === false) {
            write_log("load_spec_compt CGI error", __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $error = new EchoSchema(200, response("__SEAL_ALLOCATED_ONE__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    //trip=246829219&supplier=7640114&cmd=reassemble
    public function delete_seal()
    {
        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        $query = "SELECT SEALSPEC_SHLSTRIP, SEALSPEC_SHLSSUPP FROM SEAL WHERE SEAL_NR = :seal_nr";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':seal_nr', $this->seal_nr);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__DATABASE_EXCEPTION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $supplier = $row['SEALSPEC_SHLSSUPP'];
        $trip_no = $row['SEALSPEC_SHLSTRIP'];

        $query = "DELETE FROM SEAL WHERE SEAL_NR = :seal_nr";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':seal_nr', $this->seal_nr);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__DATABASE_EXCEPTION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query_string = "supplier=" . $supplier . "&trip=" . $trip_no . "&cmd=reassemble";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/loadspec_seal.cgi", $query_string);
        if (strpos($res, "OK") === false) {
            write_log("load_spec_compt CGI error", __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            oci_rollback($this->conn);
            return;
        }

        $error = new EchoSchema(200, response("__SET_DELETED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
        oci_commit($this->conn);
    }

    //== deallocate + allocate_one
    public function reallocate()
    {
        $this->commit_mode = OCI_NO_AUTO_COMMIT;
        
        if (!isset($this->trip_no)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: trip_no not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->supplier)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: supplier not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->cmpt_nr)) {
            $this->cmpt_nr = 1;
        }

        $query = "DELETE FROM SEAL WHERE SEAL_NR = :seal_nr";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':seal_nr', $this->seal_nr);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__DATABASE_EXCEPTION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query_string = "supplier=" . $this->supplier . "&trip=" . $this->trip_no . "&cmd=reassemble";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/loadspec_seal.cgi", $query_string);
        if (strpos($res, "OK") === false) {
            write_log("load_spec_compt CGI error", __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            oci_rollback($this->conn);
            return;
        }

        $query_string = "cmpt_nr=" . $this->cmpt_nr . "&supplier=" . $this->supplier .
            "&trip=" . $this->trip_no . "&cmd=realloc";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/loadspec_seal.cgi", $query_string);
        if (strpos($res, "OK") === false) {
            write_log("load_spec_compt CGI error", __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $error = new EchoSchema(200, response("__SET_REALLOCATED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
        oci_commit($this->conn);
    }

    public function deallocate_all()
    {
        $query = "DELETE FROM SEAL WHERE SEALSPEC_SHLSTRIP = :trip_no AND SEALSPEC_SHLSSUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__SAVE_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query = "UPDATE SCHEDULE SET SHLS_SEAL_NO = NULL WHERE SHLS_TRIP_NO = :trip_no AND SHLS_SUPP = :supplier";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trip_no', $this->trip_no);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__SAVE_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }
        
        $error = new EchoSchema(200, response("__SEAL_ALL_DEALLOCATED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);;
    }
}
