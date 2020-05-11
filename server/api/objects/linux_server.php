<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class LinuxServer extends CommonClass
{
    protected $VIEW_NAME = 'DUMMY';
    
    public function server_date()
    {
        $feature_array = array();

        $feature_array['time_zone'] = preg_replace("/\r|\n/", "", shell_exec("date +'%:z'")); 
        $feature_array['date'] = preg_replace("/\r|\n/", "", shell_exec("date +'%F %H:%M:%S'"));

        $result = array();
        $result["records"] = $feature_array;
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
}
