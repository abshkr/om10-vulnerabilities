<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class SiteConfig extends CommonClass
{
    protected $TABLE_NAME = 'SITE_CONFIG';

    public function read()
    {
        if (isset($this->config_required_by_gui)) {
            $query = "SELECT *
                FROM SITE_CONFIG
                WHERE CONFIG_REQUIRED_BY_GUI = :config_required_by_gui
                ORDER BY CONFIG_KEY";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':config_required_by_gui', $this->config_required_by_gui);
        } else {
            $query = "SELECT * FROM SITE_CONFIG 
                -- WHERE CONFIG_REQUIRED_BY_GUI IS NOT NULl
                ORDER BY CONFIG_KEY";
            $stmt = oci_parse($this->conn, $query);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        } else {
            return $stmt;
        }
    }

    //These 3 files are in SITE table
    public function check_existence()
    {
        if ($this->config_key === "SITE_AL_ADJ" ||
            $this->config_key === "SITE_CL_ADJ" ||
            $this->config_key === "SITE_KG_ADJ" ||
            $this->config_key === "SITE_LD_RETNPRD" ||
            $this->config_key === "SITE_EXP_MONTHS" ||
            $this->config_key === "SITE_LD_RETN_NEWLDS" ||
            $this->config_key === "SITE_LD_RETNPRD_NEW_MOV" ||
            $this->config_key === "SITE_LD_RETNPRD_USED_MOV") {
            return true;
        }
        return parent::check_existence();
    }

    //site_al_adj, site_cl_adj, site_kg_adj are in SITE table. 
    public function update() 
    {
        $this->commit_mode = OCI_NO_AUTO_COMMIT;
        
        if ($this->config_key === "SITE_AL_ADJ" ||
            $this->config_key === "SITE_CL_ADJ" ||
            $this->config_key === "SITE_KG_ADJ" ||
            $this->config_key === "SITE_LD_RETNPRD" ||
            $this->config_key === "SITE_EXP_MONTHS" ||
            $this->config_key === "SITE_LD_RETN_NEWLDS" ||
            $this->config_key === "SITE_LD_RETNPRD_NEW_MOV" ||
            $this->config_key === "SITE_LD_RETNPRD_USED_MOV") {
            
            $query = "SELECT SITE_AL_ADJ, SITE_CL_ADJ, SITE_KG_ADJ, SITE_LD_RETNPRD, 
                SITE_EXP_MONTHS, SITE_LD_RETN_NEWLDS, SITE_LD_RETNPRD_NEW_MOV, SITE_LD_RETNPRD_USED_MOV FROM SITE";
            $stmt = oci_parse($this->conn, $query);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            } 
    
            $old_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);

            $query = "UPDATE SITE SET " . $this->config_key . " = :new_adjustment";
            // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
            
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':new_adjustment', $this->config_value);
            
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                
                $error = new EchoSchema(500, response("__UPDATE_FAILED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return false;
            }

            if ($old_row[$this->config_key] != $this->config_value) {
                $journal = new Journal($this->conn, false);
                $curr_psn = Utilities::getCurrPsn();
                $module = $this->VIEW_NAME;
                $record = "SITE";
                if (!$journal->valueChange(
                    $module, $record, $this->config_key, $old_row[$this->config_key], $this->config_value)) {
                    oci_rollback($this->conn);
                    return false;
                }
            }

            oci_commit($this->conn);
            return true;
        }
        return parent::update();
    }

    public function read_decorate(&$result_array)
    {
        $query = "SELECT SITE_AL_ADJ, SITE_CL_ADJ, SITE_KG_ADJ, SITE_LD_RETNPRD, 
            SITE_EXP_MONTHS, SITE_LD_RETN_NEWLDS, SITE_LD_RETNPRD_NEW_MOV, SITE_LD_RETNPRD_USED_MOV FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        } 

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        array_push($result_array, array(
            "config_key" => "SITE_AL_ADJ",
            "config_value" => $row['SITE_AL_ADJ'],
            "config_comment" => response("__AMB_ADJUSTMENT__"),
            "config_required_by_gui" => "R",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_CL_ADJ",
            "config_value" => $row['SITE_CL_ADJ'],
            "config_comment" => response("__STD_ADJUSTMENT__"),
            "config_required_by_gui" => "R",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_KG_ADJ",
            "config_value" => $row['SITE_KG_ADJ'],
            "config_comment" => response("__MASS_ADJUSTMENT__"),
            "config_required_by_gui" => "R",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_LD_RETNPRD",
            "config_value" => $row['SITE_LD_RETNPRD'],
            "config_comment" => response("__LOAD_RETENTION__"),
            "config_required_by_gui" => "M",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_EXP_MONTHS",
            "config_value" => $row['SITE_EXP_MONTHS'],
            "config_comment" => response("__PERSONNEL_EXP_MONTHS__"),
            "config_required_by_gui" => "M",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_LD_RETN_NEWLDS",
            "config_value" => $row['SITE_LD_RETN_NEWLDS'],
            "config_comment" => response("__LOAD_NEW_RETENTION__"),
            "config_required_by_gui" => "M",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_LD_RETNPRD_NEW_MOV",
            "config_value" => $row['SITE_LD_RETNPRD_NEW_MOV'],
            "config_comment" => response("__LOAD_NEW_MOV_RETENTION__"),
            "config_required_by_gui" => "M",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_LD_RETNPRD_USED_MOV",
            "config_value" => $row['SITE_LD_RETNPRD_USED_MOV'],
            "config_comment" => response("__LOAD_MOV_RETENTION__"),
            "config_required_by_gui" => "M",
            ));
    }
    
    public function read_by_key()
    {
        $query = "
            SELECT * FROM SITE_CONFIG WHERE CONFIG_KEY = :config_key
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':config_key', $this->config_key);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
