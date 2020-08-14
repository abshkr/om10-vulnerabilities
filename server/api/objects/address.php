<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Address extends CommonClass
{
    protected $TABLE_NAME = 'DB_ADDRESS';
    //protected $VIEW_NAME = 'DB_ADDRESS';
    //protected $VIEW_NAME = 'DB_ADDRESS_LINE';
    
    public function line_types()
    {
        $query = "
            SELECT ENUM_NO, MESSAGE FROM ENUMITEM, MSG_LOOKUP 
            WHERE ENUMTYPENAME = 'CONTACT_TYPE' 
                AND ENUM_TMM = MSG_ID 
                AND (LANG_ID = SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG'))
            ORDER BY ENUM_NO
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_address_code()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM DB_ADDRESS WHERE DB_ADDRESS_KEY=:addr_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':addr_code', $this->address_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_address_line()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM DB_ADDRESS_LINE WHERE DB_ADDR_LINE_ID=:addr_code AND DB_ADDRLINE_NO=:addr_line
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':addr_code', $this->db_addr_line_id);
        oci_bind_by_name($stmt, ':addr_line', $this->db_addrline_no);
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
        $query = "
            SELECT 
                DA.DB_ADDRESS_KEY                       AS DB_ADDRESS_KEY
                , NVL(DL.DB_ADDR_TEXT, ' ')             AS ADDRESS_TEXT
            FROM 
                DB_ADDRESS      DA
                , (
                    SELECT 
                        DB_ADDR_LINE_ID
                        , NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO), ' ')   AS DB_ADDR_TEXT
                    FROM 
                        DB_ADDRESS_LINE
                    WHERE 
                        1 = 1 
                    GROUP BY 
                        DB_ADDR_LINE_ID
                ) DL
            WHERE 
                1 = 1
                AND DA.DB_ADDRESS_KEY = DL.DB_ADDR_LINE_ID(+)
            ORDER BY DB_ADDRESS_KEY
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function lines()
    {
        $query = "
            SELECT
                DL.DB_ADDR_LINE_ID
                , DL.DB_ADDRLINE_NO
                , DL.DB_ADDR_LINE
                , DL.DB_ADDR_LINE_TYPE          
                , DT.MESSAGE          AS DB_ADDR_LINE_TYPE_NAME
            FROM
                DB_ADDRESS_LINE DL
                , (
                    SELECT ENUM_NO, MESSAGE 
                    FROM ENUMITEM, MSG_LOOKUP 
                    WHERE ENUMTYPENAME = 'CONTACT_TYPE' 
                        AND ENUM_TMM = MSG_ID 
                        AND (LANG_ID = SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG'))
                ) DT
            WHERE 
                1 = 1
                AND DL.DB_ADDR_LINE_ID = :addr_code
                AND DL.DB_ADDR_LINE_TYPE = DT.ENUM_NO(+)
            ORDER BY
                DB_ADDR_LINE_ID, DL.DB_ADDRLINE_NO
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':addr_code', $this->address_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_brief()
    {
        $query = "
            SELECT DB_ADDRESS.DB_ADDRESS_KEY,
                DB_ADDRESS_KEY || ' [' || NVL(DL.DB_ADDR_TEXT, ' ') || ']' ADDRESS_TEXT
            FROM DB_ADDRESS,
                (
                    SELECT DB_ADDR_LINE_ID, 
                        NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO), ' ') DB_ADDR_TEXT
					FROM DB_ADDRESS_LINE
					GROUP BY DB_ADDR_LINE_ID
                ) DL
            WHERE DB_ADDRESS_KEY = DL.DB_ADDR_LINE_ID(+)
            ORDER BY DB_ADDRESS_KEY
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function insert_line($value)
    {
        if (!isset($value)) {
            return true;
        }
        
        $query = "
            INSERT INTO DB_ADDRESS_LINE (
                DB_ADDR_LINE_ID
                , DB_ADDRLINE_NO 
                , DB_ADDR_LINE 
                , DB_ADDR_LINE_TYPE
            )
            VALUES (
                :addr_line_id
                , :addrline_no 
                , :addr_line 
                , :addr_line_type 
            )
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':addr_line_id', $value->db_addr_line_id);
        oci_bind_by_name($stmt, ':addrline_no', $value->db_addrline_no);
        oci_bind_by_name($stmt, ':addr_line', $value->db_addr_line);
        oci_bind_by_name($stmt, ':addr_line_type', $value->db_addr_line_type);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    protected function update_line($value)
    {
        if (!isset($value)) {
            return true;
        }
        
        $query = "
            UPDATE DB_ADDRESS_LINE SET 
                DB_ADDR_LINE = :addr_line 
                , DB_ADDR_LINE_TYPE = :addr_line_type
            WHERE 
                DB_ADDR_LINE_ID = :addr_line_id
                AND DB_ADDRLINE_NO = :addrline_no
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':addr_line_id', $value->db_addr_line_id);
        oci_bind_by_name($stmt, ':addrline_no', $value->db_addrline_no);
        oci_bind_by_name($stmt, ':addr_line', $value->db_addr_line);
        oci_bind_by_name($stmt, ':addr_line_type', $value->db_addr_line_type);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    protected function delete_line($value)
    {
        if (!isset($value)) {
            return true;
        }
        
        $query = "
            DELETE FROM DB_ADDRESS_LINE 
            WHERE 
                DB_ADDR_LINE_ID = :addr_line_id
                AND DB_ADDRLINE_NO = :addrline_no
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':addr_line_id', $value->db_addr_line_id);
        oci_bind_by_name($stmt, ':addrline_no', $value->db_addrline_no);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->addr_lines)) {
            return true;
        }
        
        foreach ($this->addr_lines as $value) {
            $result = $this->insert_line( $value );
            if ( $result === false )
            {
                return false;
            }
        }

        return true;
    }

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            DELETE FROM DB_ADDRESS_LINE 
            WHERE 
                DB_ADDR_LINE_ID = :addr_line_id
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':addr_line_id', $this->db_address_key);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    protected function update_children($old_data = null)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->addr_lines)) {
            return true;
        }
        
        foreach ($this->addr_lines as $value) {
            if ($value->address_action == '+') {
                $result = $this->insert_line( $value );
                if ( $result === false )
                {
                    return false;
                }
            }
            if ($value->address_action == '*') {
                $result = $this->update_line( $value );
                if ( $result === false )
                {
                    return false;
                }
            }
            if ($value->address_action == '-') {
                $result = $this->delete_line( $value );
                if ( $result === false )
                {
                    return false;
                }
            }
        }

        return true;
    }

    public function update_address_template()
    {
        $query = "
            UPDATE SITE_CONFIG SET CONFIG_VALUE=:cfg_value WHERE CONFIG_KEY='SITE_ADDRESS_TEMPLATE'
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cfg_value', $this->address_template);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }
}
