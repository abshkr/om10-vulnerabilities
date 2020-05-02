<?php
/*
 * Schema returns to REST caller
 */ 
class EchoSchema
{
    public function __construct($code, $msg, $type = null)
    {
        if (HTTP_CODE_ENABLED) {
            http_response_code($code);
        } else {
            http_response_code(200);
        }

        if (!isset($type)) {
            switch ($code) {
                case 200:
                    $type = "OK";
                    break;
                case 400:
                    $type = "Base Request";
                    break;
                case 401:
                    $type = "Unauthorized";
                    break;
                case 405:
                    $type = "Method Not Allowed";
                    break;
                case 500:
                    $type = "Internal Server Error";
                    break;
                default:
                    write_log(sprintf("Undefined http code:%d", $code), __FILE__, __LINE__);
                    $type = "Internal Server Error";;
            }
        }

        if ($code == 200) {
            $this->result = array();
            $this->result[0] = new stdClass();
            $this->result[0]->code = $code;
            $this->result[0]->type = $type;
            $this->result[0]->message = $msg;
        } else {
            $this->errors = array();
            $this->errors[0] = new stdClass();
            $this->errors[0]->code = $code;
            $this->errors[0]->type = $type;
            $this->errors[0]->message = $msg;
        }
    }
}
