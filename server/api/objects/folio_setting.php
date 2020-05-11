<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

//Old php: amfphp dmsFolioService.php::getFolioScheduling
class FolioSetting extends CommonClass
{
    protected $TABLE_NAME = 'CLOSEOUT_DATE_SETTINGS';
    
    public $NUMBER_FIELDS = array(
        
    );

    public $BOOLEAN_FIELDS = array(
        
    );

    public function read()
    {
        $query = "SELECT * FROM CLOSEOUT_DATE_SETTINGS ORDER BY PARAM_KEY";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function post_update()
    {
        $query = "UPDATE CLOSEOUT_DATE_SETTINGS
            SET LAST_CHG_TIME = SYSDATE,
                LAST_CHG_USER = :last_chg_user
            WHERE PARAM_KEY = :param_key";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':param_key', $this->param_key);
        $this->user_code = Utilities::getCurrPsn();
        oci_bind_by_name($stmt, ':last_chg_user', $this->user_code);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    public function freeze_closeout()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        $query = "UPDATE SITE
            SET NEXT_MANUAL_FREEZE_DATETIME = SYSDATE, NEXT_CLOSEOUT_REQ_USER = :cur_user";
        $stmt = oci_parse($this->conn, $query);
        $cur_user = Utilities::getCurrPsn();
        oci_bind_by_name($stmt, ':cur_user', $cur_user);
        
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__DATABASE_EXCEPTION__", "DB error:" . $e['message']));
            echo json_encode($error, JSON_PRETTY_PRINT);

            oci_rollback($this->conn);

            return;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = sprintf("User %s triggers to run manual closeout freeze", Utilities::getCurrPsn());
        if (!$journal->jnlLogEvent(Lookup::TMM_TEXT_ONLY, $jnl_data,
            JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);

            $error = new EchoSchema(500, response("__JOURNAL_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);

            oci_rollback($this->conn);
            
            return;
        }

        oci_commit($this->conn);

        $error = new EchoSchema(200, response("__CLOSEOUT_FREEZE__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    public function close_closeout()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        $query = "UPDATE SITE SET NEXT_MANUAL_CLOSE = 'Y', NEXT_CLOSEOUT_REQ_USER = :cur_user";
        $stmt = oci_parse($this->conn, $query);
        $cur_user = Utilities::getCurrPsn();
        oci_bind_by_name($stmt, ':cur_user', $cur_user);
        
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__DATABASE_EXCEPTION__", "DB error:" . $e['message']));
            echo json_encode($error, JSON_PRETTY_PRINT);

            oci_rollback($this->conn);

            return;
        }

        $query = "UPDATE CLOSEOUT_TANK 
            SET CLOSE_STD_TOT = NVL(CLOSE_STD_TOT, 0),
                CLOSE_MASS_TOT = NVL(CLOSE_MASS_TOT, 0),
                CLOSE_AMB_TOT = NVL(CLOSE_AMB_TOT, 0)
            WHERE CLOSEOUT_NR = (SELECT MIN(CLOSEOUT_NR) FROM CLOSEOUTS WHERE STATUS = 1)";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__DATABASE_EXCEPTION__", "DB error:" . $e['message']));
            echo json_encode($error, JSON_PRETTY_PRINT);
            oci_rollback($this->conn);
            return;
        }

        $query = "UPDATE CLOSEOUT_METER 
            SET CLOSE_STD_TOT = NVL(CLOSE_STD_TOT, 0),
                CLOSE_MASS_TOT = NVL(CLOSE_MASS_TOT, 0),
                CLOSE_AMB_TOT = NVL(CLOSE_AMB_TOT, 0)
            WHERE CLOSEOUT_NR = (SELECT MIN(CLOSEOUT_NR) FROM CLOSEOUTS WHERE STATUS = 1)";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__DATABASE_EXCEPTION__", "DB error:" . $e['message']));
            echo json_encode($error, JSON_PRETTY_PRINT);
            oci_rollback($this->conn);
            return;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = sprintf("User %s triggers to close first frozen folio", Utilities::getCurrPsn());
        if (!$journal->jnlLogEvent(Lookup::TMM_TEXT_ONLY, $jnl_data,
            JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);

            $error = new EchoSchema(500, response("__JOURNAL_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);

            oci_rollback($this->conn);
            
            return;
        }

        oci_commit($this->conn);

        $error = new EchoSchema(200, response("__CLOSEOUT_CLOSE__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }
}