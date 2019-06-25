<?php
require_once 'Zend/Session/Namespace.php';
class GetSessionService {

        public function getSession($key){
                $namespace = new Zend_Session_Namespace(); // default namespace

                echo ($namespace->$key);

                if (!isset($namespace->$key)) {
                        echo "\$namespace->\$key not set\n";
                }

        }

}
$mysession = new GetSessionService();
$mysession->getSession('users');
