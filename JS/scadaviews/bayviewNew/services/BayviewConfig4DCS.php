<?php
function getBayviewServerConfiguration()
{
	// cfg in DCS
	$bayviewBayServers=array(
		'BAY01'=>array(
			'bay_code'=>'BAY01', 
			'cfg_file'=>'data_config4bay1.json', 
			'server_url'=>'http://localhost:3000/point_data/', 
			'bay_unit'=>17,
			'action'=>1,
			'active'=>true
		),
		'BAY02'=>array(
			'bay_code'=>'BAY02', 
			'cfg_file'=>'data_config4bay2.json', 
			'server_url'=>'http://localhost:4000/point_data/', 
			'bay_unit'=>17,
			'action'=>1,
			'active'=>true
		)
	);
	
	return $bayviewBayServers;
}
?>