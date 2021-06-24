
<?php
include_once __DIR__ . '/../shared/utilities.php';

echo str_replace(".cgi", ".php", Utilities::http_cgi_invoke('cgi-bin/en/gantry/load_bays.cgi'));
?>
