<?php
    function getFuncName() {
        if (is_array($_GET) && count($_GET) > 0) {
            if (isset($_GET['func'])) {
                $func = $_GET['func'];
                return $func;
            }
        }
        return null;
    }

    function getParamVal($paramName) {
        if (is_array($_GET) && count($_GET) > 0) {
            if (isset($_GET[$paramName])) {
                $param = $_GET[$paramName];
				if ( $param == null || $param == "") {
					$param="-1";
				}
                return $param;
            }
        }
        return "-1";
    }

    function getParamValByPost($paramName) {
        if (is_array($_POST) && count($_POST) > 0) {
            if (isset($_POST[$paramName])) {
                $param = $_POST[$paramName];
				if ( $param == null || $param == "") {
					$param="-1";
				}
                return $param;
            }
        }
        return "-1";
    }

    function filter($arr, $key, $val) {
		if ( $val == "-1" || $val == null || $val == "" ) {
			return $arr;
		}
        if (empty($arr)) {
            return $arr;
        }
        if (empty($key)) {
            return $arr;
        }
        $res = array();
        for ($i = 0; $i < count($arr); $i++) {                        
            if (array_key_exists($key, $arr[$i]) && $arr[$i][$key] == $val) {
                array_push($res, $arr[$i]);
            }                        
        }
        return $res;
    }

    function filterByPartialMatch($arr, $key, $val, $delimiter='') {
		if ( $val == "-1" || $val == null || $val == "" ) {
			return $arr;
		}
        if (empty($arr)) {
            return $arr;
        }
        if (empty($key)) {
            return $arr;
        }
        $res = array();
        for ($i = 0; $i < count($arr); $i++) {                        
            if (array_key_exists($key, $arr[$i]) && strstr($arr[$i][$key].$delimiter, $val.$delimiter)!==FALSE ) {
                array_push($res, $arr[$i]);
            }                        
        }
        return $res;
    }
?>