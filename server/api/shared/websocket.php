<?php
include_once __DIR__ .  '/../shared/log.php';

class WebSocketServer 
{
    private $sockets = null;  
    
    public function __construct($ip, $port)
    {
        $this->master_socket = socket_create(AF_INET, SOCK_STREAM, 0);
        $this->sockets = array($this->master_socket);

        socket_bind($this->master_socket, $ip, $port);
        socket_listen($this->master_socket, 5);

        write_log(sprintf("[*]Listening ... ip:%s, port:%d", $ip, $port), __FILE__, __LINE__, LogLevel::INFO);
    }

    public function run()
    {
        $writes = null;
        $excepts = null;

        while (true) {
            $reads = $this->sockets;
            if (false === socket_select($reads, $writes, $excepts, null)) {
                write_log(socket_strerror(socket_last_error()), __FILE__, __LINE__, LogLevel::ERROR);
                continue;
            }

            foreach($reads as $socket) {
                if ($socket === $this->master_socket) {
                    $newsock = socket_accept($this->master_socket);
                    array_push($this->sockets, $newsock);

                    socket_getpeername($newsock, $ip);
                    write_log(sprintf("New client connected: %s", $ip), __FILE__, __LINE__, LogLevel::INFO);
                } else {

                }
            }
        }
    }
}

$server = new WebSocketServer('localhost', 80);
$server->run();