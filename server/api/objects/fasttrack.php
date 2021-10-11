<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class FastTrack extends CommonClass
{
    public function sendtoFT()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        if (isset($_SERVER["BIN"])) {
            $bin = $_SERVER["BIN"];
        } else {
            $bin = "/usr/omega/bin";
        }

        $sendtoLog = (isset($_SERVER['OMEGA_HOME']) ? $_SERVER['OMEGA_HOME'] : '/usr/omega') . '/logs/sendtoft.log';
        $sendtoCmd = $bin . "/sendto_ft.sh " . $this->supplier . " " . $this->trip_no . " debug 2>&1";
        
        write_log(sprintf("to run %s", $sendtoCmd), __FILE__, __LINE__, LogLevel::INFO);
        foreach ($_SERVER as $env_key => $env_value) {
            putenv("$env_key=$env_value");
        }
        $output = shell_exec($sendtoCmd);
        write_log(sprintf("result %s", $output), __FILE__, __LINE__, LogLevel::INFO);
        
        if (strpos($output, "Message sent")) {
            $result = array();
            $result["result"] = 0;
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $error = new EchoSchema(500, response("__INTERNAL_ERROR__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }
}
