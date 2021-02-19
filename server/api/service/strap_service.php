<?php

include_once __DIR__ . '/../shared/log.php';

class StrapService
{
    public function __construct($db, $auto_commit = false)
    {
        $this->conn = $db;
        $this->auto_commit = $auto_commit;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function get_amb($tank_code, $tank_level)
    {
        write_log(sprintf("%s::%s() START. tank_code:%s, tank_level:%d", 
            __CLASS__, __FUNCTION__, $tank_code, $tank_level),
            __FILE__, __LINE__);

        $query = "
            SELECT STRAP_HEIGHT, STRAP_VOL
            FROM STRAPS
            WHERE STR_TK_TANKCODE = :tank_code
            ORDER BY STRAP_HEIGHT";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $tank_code);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        } 

        $prev_vol = 0;
        $prev_level = 0;
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            if ($row['STRAP_HEIGHT'] == $tank_level) {
                write_log(sprintf("Tank level found, amb:%f", $row['STRAP_VOL']), __FILE__, __LINE__);
                return $row['STRAP_VOL'];
            } else if ($row['STRAP_HEIGHT'] < $tank_level) {
                $prev_vol = $row['STRAP_VOL'];
                $prev_level = $row['STRAP_HEIGHT'];
            } else {
                if ($prev_vol <= 0) {
                    write_log(sprintf("Minimal tank level is %d, cannot get amb", $row['STRAP_HEIGHT']), 
                        __FILE__, __LINE__, LogLevel::WARNING);
                    return 0;
                } else {
                    write_log(sprintf("x2:%d, y2%d, x1:%d, y1%d", 
                        $row['STRAP_HEIGHT'], $row['STRAP_VOL'], $prev_level, $prev_vol), __FILE__, __LINE__);
                    return $row['STRAP_VOL'] - (($row['STRAP_HEIGHT'] - $tank_level)*($row['STRAP_VOL'] - $prev_vol)) / ($row['STRAP_HEIGHT'] - $prev_level);
                }
            }
        }

        return 0;
    }

    public function get_amb_by_type($tank_code, $tank_level, $strap_type=0)
    {
        write_log(sprintf("%s::%s() START. tank_code:%s, tank_level:%d, strap_type:%d", 
            __CLASS__, __FUNCTION__, $tank_code, $tank_level, $strap_type),
            __FILE__, __LINE__);

        $query = "
            SELECT STRAP_HEIGHT, STRAP_VOL
            FROM STRAPS
            WHERE STR_TK_TANKCODE = :tank_code and STRAP_TYPE = :strap_type
            ORDER BY STRAP_HEIGHT";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_code', $tank_code);
        oci_bind_by_name($stmt, ':strap_type', $strap_type);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        } 

        $prev_vol = 0;
        $prev_level = 0;
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            if ($row['STRAP_HEIGHT'] == $tank_level) {
                write_log(sprintf("Tank level found, amb:%f", $row['STRAP_VOL']), __FILE__, __LINE__);
                return $row['STRAP_VOL'];
            } else if ($row['STRAP_HEIGHT'] < $tank_level) {
                $prev_vol = $row['STRAP_VOL'];
                $prev_level = $row['STRAP_HEIGHT'];
            } else {
                if ($prev_vol <= 0) {
                    write_log(sprintf("Minimal tank level is %d, cannot get amb", $row['STRAP_HEIGHT']), 
                        __FILE__, __LINE__, LogLevel::WARNING);
                    return 0;
                } else {
                    write_log(sprintf("x2:%d, y2%d, x1:%d, y1%d", 
                        $row['STRAP_HEIGHT'], $row['STRAP_VOL'], $prev_level, $prev_vol), __FILE__, __LINE__);
                    return $row['STRAP_VOL'] - (($row['STRAP_HEIGHT'] - $tank_level)*($row['STRAP_VOL'] - $prev_vol)) / ($row['STRAP_HEIGHT'] - $prev_level);
                }
            }
        }

        return 0;
    }
}
