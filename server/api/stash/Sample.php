<?php
// echo "hello";
include_once 'Router.php';
include_once 'Request.php';
include_once 'shared/log.php';

write_log("Sample.php invoked", __FILE__, __LINE__);

$router = new Router(new Request);
$router->get('/profile', function($request) {
  return <<<HTML
  <h1>Profile</h1>
HTML;
});
// echo "hello";