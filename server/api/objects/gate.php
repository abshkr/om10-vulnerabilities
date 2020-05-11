<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Gate extends CommonClass
{
    protected $TABLE_NAME = 'GATE_RC';

    protected $table_view_map = array(
        "GATE_AREA" => "AREA_K"
    );
    
    public function read()
    {
        $query = "SELECT
                GATE_RC.GATE_K,
                GATE_RC.GATE_DVCE,
                KRD_CFG.KRDC_TYPE,
                AREA_RC.AREA_K,
                AREA_RC.AREA_NAME,
                G_TCD
            FROM GATE_RC, AREA_RC, KRD_CFG
            WHERE GATE_RC.GATE_AREA = AREA_RC.AREA_K(+) 
                AND GATE_RC.GATE_DVCE = KRD_CFG.KRDC_NAME(+)
            ORDER BY GATE_K";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function post_create()
    {
        return $this->post_update();
    }

    protected function post_update()
    {
        $query = "UPDATE GATE_RC
            SET GATE_DDMY = SYSDATE
            WHERE GATE_K = :gate_k";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':gate_k', $this->gate_k);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    public function open_gate() 
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        $query_string = "op=16&pg=0&gate=" . rawurlencode(strip_tags($this->gate_k)) 
            . "&area=" . rawurlencode(strip_tags($this->area_k));
        $res = Utilities::http_cgi_invoke("cgi-bin/en/access_ctrl/gate.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);
        if (strpos($res, 'statusBar') === false) {
            $error = new EchoSchema(500, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        } else {
            $result = array();
            $result["result"] = 0;
            $result["message"] = response("__GATE_OPENED__", sprintf("gate %s/%s opened", $this->gate_k, $this->area_k));
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
    }

    public function open_gates() 
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        write_log(json_encode($this), __FILE__, __LINE__);

        $result = true;
        foreach ($this->gates as $key => $value) {
            $query_string = "op=16&pg=0&gate=" . 
                rawurlencode(strip_tags($value->gate_k)) . "&area=" . rawurlencode(strip_tags($value->area_k));
            $res = Utilities::http_cgi_invoke("cgi-bin/en/access_ctrl/gate.cgi", $query_string);
            // write_log($res, __FILE__, __LINE__);
            if (strpos($res, 'statusBar') === false) {
                $result = false;
            }
        }

        if ($result) {
            $error = new EchoSchema(500, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        } else {
            $result = array();
            $result["result"] = 0;
            $result["message"] = "All gates opened";
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
    }
}