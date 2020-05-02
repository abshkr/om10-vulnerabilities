<?php
include_once 'IRequest.php';
include_once 'shared/log.php';

class Request implements IRequest
{
    function __construct() 
    {
        $this->bootstrapSelf();
    }

    private function bootstrapSelf() 
    {
        // write_log(json_encode($this), __FILE__, __LINE__);
        foreach ($_SERVER as $key => $value) {
            $this->{$this->toCamelCase($key)} = $value;
        }
        // write_log(json_encode($this), __FILE__, __LINE__);
    }
 
    private function toCamelCase($string)
    {
        $result = strtolower($string);

        preg_match_all('/_[a-z]/', $result, $matches);

        foreach($matches[0] as $match) {
            $c = str_replace('_', '', strtoupper($match));
            $result = str_replace($match, $c, $result);
        }

        return $result;
    }

    public function getBody()
    {
        if($this->requestMethod === "GET") {
            return;
        }

        if ($this->requestMethod === "POST") {
            $body = array();
            foreach($_POST as $key => $value) {
                $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
            }

            return $body;
        }
    }
}