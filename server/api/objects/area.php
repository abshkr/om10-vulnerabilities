<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Area extends CommonClass
{
    protected $TABLE_NAME = 'AREA_RC';
    protected $primary_keys = array("area_k");
    protected $del_n_ins_children = false;  //Because area has gates, and gate has permission

    public function read()
    {
        $query = "
            SELECT AREA_K,
                AREA_NAME
            FROM AREA_RC
            ORDER BY AREA_K";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // protected function check_deletable()
    // {
    //     write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
    //         __FILE__, __LINE__);

    //     $query = "
    //         SELECT COUNT(*) CN
    //         FROM GATE_RC
    //         WHERE GATE_AREA = :area_k";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':area_k', $this->area_k);
    //     if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return null;
    //     }

    //     $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
    //     if ($row['CN'] > 0) {
    //         throw new UndeletableException(sprintf("Area %s cannot be deleted because it has gate", $this->area_k));
    //     }

    //     return true;
    // }

    public function devices()
    {
        $query = "SELECT 
                ADV.ADV_CODE,
                ADV.ADV_AREA,
                ARC.AREA_NAME ADV_AREA_NAME,
                KRDC_TYPE
            FROM ACCDEV ADV,
                AREA_RC ARC,
                KRD_CFG
            WHERE ARC.AREA_K = ADV.ADV_AREA
                AND ADV_CODE = KRD_CFG.KRDC_NAME
            ORDER BY ADV.ADV_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // public function read_hook(&$hook_item)
    // {
    //     write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
    //         __FILE__, __LINE__);

    //     $result = array();
    //     $hook_item['transfers'] = $result;
    //     // write_log(json_encode($hook_item), __FILE__, __LINE__);

    //     if (!array_key_exists('area_k', $hook_item)) {
    //         write_log("hook_item does not have trsa_id item, cannot do transactions_hook",
    //             __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     $query = "SELECT
    //             GATE_RC.GATE_K,
    //             GATE_RC.GATE_DVCE,
    //             KRD_CFG.KRDC_TYPE,
    //             G_TCD
    //         FROM GATE_RC, AREA_RC, KRD_CFG
    //         WHERE GATE_RC.GATE_AREA = :area_k
    //             AND GATE_RC.GATE_DVCE = KRD_CFG.KRDC_NAME
    //         ORDER BY GATE_K";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':area_k', $hook_item['area_k']);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
    //     $hook_item['gates'] = $result;
    // }

    public function gates()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "SELECT
                GATE_RC.GATE_K,
                GATE_RC.GATE_DVCE,
                KRD_CFG.KRDC_TYPE,
                AREA_RC.AREA_K,
                AREA_RC.AREA_NAME,
                G_TCD
            FROM GATE_RC, AREA_RC, KRD_CFG
            WHERE AREA_RC.AREA_K = :area_k
                AND GATE_RC.GATE_AREA = AREA_RC.AREA_K
                AND GATE_RC.GATE_DVCE = KRD_CFG.KRDC_NAME
            ORDER BY GATE_K";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':area_k', $this->area_k);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "DELETE FROM GATE_RC WHERE GATE_AREA = :area_k";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':area_k', $this->area_k);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->gates)) {
            return false;
        }

        foreach ($this->gates as $value) {
            // write_log(json_encode($value), __FILE__, __LINE__);
            $query = "INSERT INTO GATE_RC (
                GATE_K,
                GATE_DVCE,
                GATE_AREA,
                GATE_DDMY,
                G_TCD)
            VALUES (
                :gate_k,
                :gate_dvce,
                :gate_area,
                SYSDATE,
                :g_tcd
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':gate_area', $this->area_k);
            oci_bind_by_name($stmt, ':gate_dvce', $value->gate_dvce);
            oci_bind_by_name($stmt, ':gate_k', $value->gate_k);
            oci_bind_by_name($stmt, ':g_tcd', $value->g_tcd);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }

    protected function update_children($old_children = null)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        
        foreach ($old_children as $item_key => $item_array) {
            $still_exist = false;
            foreach ($this->gates as $gate) {
                if ($gate->gate_k == $item_key) {
                    $query = "UPDATE GATE_RC
                        SET GATE_DVCE = :gate_dvce,
                            GATE_DDMY = SYSDATE,
                            G_TCD = :g_tcd
                        WHERE GATE_K = :gate_k
                            AND GATE_AREA = :gate_area";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':gate_area', $this->area_k);
                    oci_bind_by_name($stmt, ':gate_dvce', $gate->gate_dvce);
                    oci_bind_by_name($stmt, ':gate_k', $gate->gate_k);
                    oci_bind_by_name($stmt, ':g_tcd', $gate->g_tcd);
        
                    if (!oci_execute($stmt, $this->commit_mode)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        return false;
                    }
                    $still_exist = true;
                    break;
                }
            }
            
            if ($still_exist == false) {
                $query = "DELETE FROM PRMT_RC WHERE PRMT_K IN 
                    (SELECT PRMSSN_K FROM PRMSSN_RC WHERE PRMSSN_GATE = :gate_k)";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':gate_k', $item_array['GATE_K']);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

                $query = "DELETE FROM PRMSSN_RC WHERE PRMSSN_GATE = :gate_k";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':gate_k', $item_array['GATE_K']);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

                $query = "DELETE FROM GATE_RC
                    WHERE GATE_K = :gate_k AND GATE_AREA = :gate_area";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':gate_area', $this->area_k);
                oci_bind_by_name($stmt, ':gate_k', $item_array['GATE_K']);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($this->gates as $gate) {
            if (isset($old_children[$gate->gate_k])) {
                continue;
            }
            $query = "INSERT INTO GATE_RC (
                GATE_K,
                GATE_DVCE,
                GATE_AREA,
                GATE_DDMY,
                G_TCD)
            VALUES (
                :gate_k,
                :gate_dvce,
                :gate_area,
                SYSDATE,
                :g_tcd
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':gate_area', $this->area_k);
            oci_bind_by_name($stmt, ':gate_dvce', $gate->gate_dvce);
            oci_bind_by_name($stmt, ':gate_k', $gate->gate_k);
            oci_bind_by_name($stmt, ':g_tcd', $gate->g_tcd);

            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }

    protected function retrieve_children_data()
    {
        $query = "SELECT * FROM GATE_RC WHERE GATE_AREA = :area_k";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':area_k', $this->area_k);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $gates_data = array();
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $gates_data[$row['GATE_K']] = $row;
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $gates_data;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        $module = "gate";
        foreach ($old as $item_key => $item_array) {
            
            if (isset($new[$item_key])) {
                foreach ($item_array as $field => $value) {
                    if ($field == 'GATE_DDMY') {
                        continue;
                    }

                    if ($new[$item_key][$field] != $value) {
                        $record = sprintf("area:%s, gate:%s", $this->area_k, $item_key);
                        $journal->valueChange($module, $record, $field, $value, $new[$item_key][$field]);
                    }
                }
            } 

            if (!isset($new[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("area:%s", $this->area_k);
                $jnl_data[3] = sprintf("gate:%s", $item_key);
                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($new as $item_key => $alloc_item) {
            if (!isset($old[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("area:%s", $this->area_k);
                $jnl_data[3] = sprintf("gate:%s", $item_key);
                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }
    }
}
