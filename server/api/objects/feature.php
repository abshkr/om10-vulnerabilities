<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/role_service.php';
include_once 'common_class.php';

class Feature extends CommonClass
{
    protected $TABLE_NAME = 'DUMMY';
    
    public function read()
    {
        $file = null;
        if (file_exists("../../config/FeatureSettings.json")) {
            $file = "../../config/FeatureSettings.json";
        } else {
            $file = "../../config/FeatureSettings.default";
        }
        $feature_array = json_decode(file_get_contents($file));
        foreach ($feature_array as $item) {
            foreach ($item as $key => $value) {
                if ($key === "feature_gui" || $key === "feature_flag") {
                    if ($value === "Y" || $value === true) {
                        $item->$key = true;
                    } else {
                        $item->$key = false;
                    }
                }
            }
        }
        $result = array();
        $result["records"] = $feature_array;
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function save()
    {
        $fp = fopen('../../config/FeatureSettings.json', 'w');
        fwrite($fp, json_encode($this->data, JSON_PRETTY_PRINT));
        fclose($fp);

        $error = new EchoSchema(200, response("__SAVE_SUCCEEDED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }
}