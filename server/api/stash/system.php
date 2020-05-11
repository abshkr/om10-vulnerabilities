<?php

$temp = shell_exec("cat /proc/cpuinfo | grep model\ name");
// echo $temp;
$pieces = explode(":", $temp);
// echo $pieces;
$cpu_model = $pieces[1];

// echo $cpu_model;

$temp = shell_exec("free -m | grep Mem");
// echo $temp;
$pieces = preg_split("/[\s,]+/", $temp);
$mem_total = $pieces[1];
$mem_used = $pieces[2];
$mem_free = $pieces[3];
$mem_shared = $pieces[4];
$mem_cache = $pieces[5];
$mem_available = $pieces[6];
// echo $mem_available;

$temp = shell_exec("free -m | grep Swap");
// echo $temp;
$pieces = preg_split("/[\s,]+/", $temp);
$swap_total = $pieces[1];
$swap_used = $pieces[2];
$swap_free = $pieces[3];
// echo $swap_total;

$stat['hdd_free'] = round(disk_free_space("/") / 1024 / 1024 / 1024, 2);
$stat['hdd_total'] = round(disk_total_space("/") / 1024 / 1024/ 1024, 2);
// echo $stat['hdd_total'];

$up_time = shell_exec("uptime"); 
// echo $up_time;

$linux_ver = shell_exec("uname -mrs");
// echo $linux_ver;

$os_release = shell_exec("cat /etc/os-release | grep PRETTY_NAME");
$pieces = explode("=", $os_release);
// echo $pieces;
$os_release = str_replace('"', '', $pieces[1]);
echo $os_release;