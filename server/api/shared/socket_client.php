<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/exceptions.php';

class SocketClient
{
    private $fp;
    private $respond;

    public function __construct($conn, $bay = "BAY999" /*By default, use BAY999 as the manual transaction server bay */)
    {
        $this->conn = $conn;
        $this->open_socket_client($bay);
    }

    public function __destruct()
    {
        $this->close_socket_client();
    }

    private function open_socket_client($bay)
    {
        $query = "SELECT BA_INSTANCE, BA_CHANNEL FROM BAY_AREA WHERE BA_CODE = :ba_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ba_code', $bay);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $service = sprintf("BAY_%02d_%02d", $row['BA_INSTANCE'], $row['BA_CHANNEL']);

        $host = gethostname();
        $port = getservbyname($service, 'tcp');

        $timeout = 30;
        write_log("Try to connect to server. host:" . $host . ", port:" . $port, 
                __FILE__, __LINE__);
        $this->fp = @fsockopen($host, $port, $errnum, $errstr, $timeout);
        if (!$this->fp) {
            write_log("Failed to connect to server. errnum:" . $errnum . ", errstr:" . $errstr, 
                __FILE__, __LINE__, LogLevel::WARNING);
            throw new Bay999Exception("Failed to connect to server. errnum:" . $errnum . ", errstr:" . $errstr);
        }
    }

    private function close_socket_client()
    {
        if ($this->fp) {
            fclose($this->fp);
        }
    }

    public function send($str)
    {
        if (!$this->fp) {
            return;
        }

        fwrite($this->fp, $str);

        $this->respond = "";
        $BUF_SIZE = 4096;
        while (!feof($this->fp)) {
            $reads = fread($this->fp, $BUF_SIZE);
            $this->respond = $this->respond . $reads;
            if (strlen($reads) < $BUF_SIZE) {
                break;
            }

        }
    }

    public function get_repond()
    {
        return $this->respond;
    }
}