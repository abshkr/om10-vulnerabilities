<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class TimeCode extends CommonClass
{
    protected $TABLE_NAME = 'TIMECODE';

    public $desc = "time code";

    protected $primary_keys = array("tcd_title");

    // read personnel
    public function read()
    {
        Utilities::sanitize($this);

        if (isset($this->tcd_title)) {
            $query = "
            SELECT TCD_TITLE,
                TCD_MON,
                TCD_TUE,
                TCD_WED,
                TCD_THU,
                TCD_FRI,
                TCD_SAT,
                TCD_SUN
            FROM TIMECODE
            WHERE TCD_TITLE = :tcd_title
            ORDER BY TCD_TITLE";
        } else {
            $query = "
            SELECT TCD_TITLE,
                TCD_MON,
                TCD_TUE,
                TCD_WED,
                TCD_THU,
                TCD_FRI,
                TCD_SAT,
                TCD_SUN
            FROM TIMECODE
            ORDER BY TCD_TITLE";
        }

        $stmt = oci_parse($this->conn, $query);
        if (isset($this->tcd_title)) {
            oci_bind_by_name($stmt, ':tcd_title', $this->tcd_title);
        }
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function update()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        $query = "
            SELECT *
            FROM TIMECODE
            WHERE TCD_TITLE = :tcd_title";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tcd_title', $this->tcd_title);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            // write_log(json_encode($row), __FILE__, __LINE__);
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $stmt = $this->prepare_update($stmt);
        if (!$stmt) {
            return false;
        } else if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "time code";
        $jnl_data[2] = $this->tcd_title;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = "TIMECODE";
        $record = sprintf("title:%s", $this->tcd_title);
        foreach ($this as $key => $value) {
            if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] &&
                !$journal->valueChange(
                    $module, $record, $key, $row[strtoupper($key)], $value)) {
                return false;
            }
        }

        oci_commit($this->conn);

        return true;
    }
}
