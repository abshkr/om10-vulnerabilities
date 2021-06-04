<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class TableChildren extends CommonClass
{

    public function get_json_from_txt($filename)
    {
        $childFile = dirname(__FILE__) . "/../config/" . $filename . ".txt";
		$ctables = file_get_contents($childFile);
		
        $lines = explode("\n", $ctables);
        $json = array();
        $json["CHILDREN"] = array();

        foreach ($lines as $index => $line) {
            $columns = explode("\t", trim($line));
            $item = array();
            $item["TABLE_NAME"] = $columns[0];
            $item["CKEYS"] = array();
            $item["TYPE"] = $columns[2];
            $column = array();
            $column["COLUMN_NAME"] = $columns[1];
            $column["DATA_TYPE"] = "VARCHAR(16)";
            $column["COLUMN_ID"] = 1;
            $item["CKEYS"][] = $column;
            $json["CHILDREN"][] = $item;
        }

        $jsonFile = dirname(__FILE__) . "/../config/" . $filename . ".json";
        $fp = fopen($jsonFile, 'w');
        fwrite($fp, json_encode($json, JSON_PRETTY_PRINT));
        fclose($fp);

    }

    public function check_one_child($child_table, $ckeys, $pkeys, $type_condition="" )
    {
        // write_log("JSON child: " . $child_table, __FILE__, __LINE__, LogLevel::INFO);
        // write_log("JSON child: " . print_r($ckeys, true), __FILE__, __LINE__, LogLevel::INFO);
        // write_log("JSON child: " . print_r($pkeys, true), __FILE__, __LINE__, LogLevel::INFO);
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM $child_table
            WHERE 1=1 
        ";

        if (isset($type_condition) && strlen(trim($type_condition)) > 0) {
            if (strpos($type_condition, "=:") !== FALSE) {
                $pairs = explode('=:', $type_condition);
                if (count($pairs) >= 2) {
                    $cln = $pairs[1];
                } else {
                    $cln = "cmpy_type";
                }
                if (isset($this->$cln)) {
                    $query .= "    AND " . $type_condition . "\n";
                }
            } else {
                // we may have conditions with hard-coded values such as QTY <= 0
                $query .= "    AND " . $type_condition . "\n";
            }
        }

        /*
            "PKEYS": [
                {
                    "COLUMN_NAME": "CMPY_CODE",
                    "DATA_TYPE": "VARCHAR(16)",
                    "COLUMN_ID": 1
                }
            ],
            "CHILDREN": [
                {
                    "TABLE_NAME": "ACCESS_KEYS",
                    "CKEYS": [
                        {
                            "COLUMN_NAME": "KYA_ALLOC_CMPY",
                            "DATA_TYPE": "VARCHAR(16)",
                            "COLUMN_ID": 1
                        }
                    ],
                    "TYPE": "Supplier, Carrier, Customer, Drawer"
                },
        */
        foreach ($ckeys as $cid => $ckey) {
            foreach ($pkeys as $pid => $pkey) {
                if ($pkey["COLUMN_ID"] == $ckey["COLUMN_ID"]) {
                    $query .= "    AND " . $ckey["COLUMN_NAME"] . " = :" . strtolower($pkey["COLUMN_NAME"]) . "\n";
                    break;
                }
            }
        }
        // write_log("Query children: " . $query, __FILE__, __LINE__, LogLevel::INFO);

        $stmt = oci_parse($this->conn, $query);

        // oci_bind_by_name($stmt, ':code', $this->tank_batch_no);
        if (isset($type_condition) && strlen(trim($type_condition)) > 0) {
            if (strpos($type_condition, "=:") !== FALSE) {
                $pairs = explode('=:', $type_condition);
                if (count($pairs) >= 2) {
                    $cln = $pairs[1];
                } else {
                    $cln = "cmpy_type";
                }
                if (isset($this->$cln)) {
                    oci_bind_by_name($stmt, ':' . $cln, $this->$cln);
                }
            }
        }

        foreach ($pkeys as $pid => $pkey) {
            // write_log("Query children param: " . $this[strtolower($pkey["COLUMN_NAME"])], __FILE__, __LINE__, LogLevel::INFO);
            //oci_bind_by_name($stmt, ':' . strtolower($pkey["COLUMN_NAME"]), $this[strtolower($pkey["COLUMN_NAME"])]);
            $cln = strtolower($pkey["COLUMN_NAME"]);
            oci_bind_by_name($stmt, ':' . $cln, $this->$cln);
        }

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $cnt = (int)$row['CNT'];
        if ($cnt > 0) {
            write_log("Query children: " . $query, __FILE__, __LINE__, LogLevel::INFO);
        }

        return $cnt;
    }

    public function check_children()
    {
        // $this->get_json_from_txt("companyChildren");
        $lang = Utilities::getCurrLang();
		
        $langClnFile = dirname(__FILE__) . "/../config/langColumns.json";
		$jsonColumns = file_get_contents($langClnFile);
		// convert json to an associated array
		$langColumns = json_decode( $jsonColumns, true );
		
		$langMsgFile = dirname(__FILE__) . "/../config/langMessages.json";
		$jsonMessages = file_get_contents($langMsgFile);
		// convert json to an associated array
		$langMessages = json_decode( $jsonMessages, true );

        $jsonFile = dirname(__FILE__) . "/../config/childTableColumns.json";
		$jsonData = file_get_contents($jsonFile);
		// convert json to an associated array
		$arrData = json_decode( $jsonData, true );

        $parent = $this->parent;
        // $parent = "COMPANYS";
        $pkeys = $arrData[$parent]["PKEYS"];
        $children = $arrData[$parent]["CHILDREN"];

        // write_log("JSON children: " . print_r($children, true), __FILE__, __LINE__, LogLevel::INFO);
        $counts = array();
        foreach ($children as $index => $child) {
            /*
                {
                    "TABLE_NAME": "ACCESS_KEYS",
                    "CKEYS": [
                        {
                            "COLUMN_NAME": "KYA_ALLOC_CMPY",
                            "DATA_TYPE": "VARCHAR(16)",
                            "COLUMN_ID": 1
                        }
                    ],
                    "TYPE_COLUMN": "DECODE(KYA_ALLOC_TYPE, 1, 'Supplier', 2, 'Carrier', 3, 'Customer', 4, 'Drawer', '-1' )=:cmpy_type",
                    "TYPE": "Supplier, Carrier, Customer, Drawer"
                },
            */
            $child_table = $child["TABLE_NAME"];
            $ckeys = $child["CKEYS"];
            $type_condition = "";
            if (isset($child["TYPE_COLUMN"])) {
                $type_condition = $child["TYPE_COLUMN"];
            }
            $cnt = $this->check_one_child($child_table, $ckeys, $pkeys, $type_condition);
            if ($cnt > 0) {
                $child_title = $child_table;
                if (isset($langMessages[$lang]["SCREENS"][$child_table])) {
                    $child_title = $langMessages[$lang]["SCREENS"][$child_table];
                }
                $item = array();
                $item["table"] = $child_table;
                $item["title"] = $child_title;
                $item["child"] = $cnt;
                $item["type"] = $child["TYPE"];
                // $item["typeCln"] = $child["TYPE_COLUMN"];
                $item["language"] = $lang;
                $column_names = array();
                $column_titles = array();
                foreach ($ckeys as $cid => $ckey) {
                    $column_names[] = $ckey["COLUMN_NAME"];
                    $column_title = $ckey["COLUMN_NAME"];
                    if (isset($langColumns[$lang][$child_table][$ckey["COLUMN_NAME"]])) {
                        $column_title = $langColumns[$lang][$child_table][$ckey["COLUMN_NAME"]];
                    }
                    $column_titles[] = $column_title;
                }
                $item["column_names"] = $column_names;
                $item["column_titles"] = $column_titles;
                $counts[] = $item;
            }
        }

        $result = array();
		$result["records"] = $counts;
        $result["total"] = count($counts);

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
        return $result;
    }
}
