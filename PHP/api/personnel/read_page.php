<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/core.php';
include_once '../shared/utilities.php';
include_once '../config/database.php';
include_once '../objects/personnel.php';
 
// utilities
$utilities = new Utilities();
 
// instantiate database and personnel object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$personnel = new Personnel($db);
 
// query personnels
$stmt = $personnel->readPaging($from_record_num, $records_per_page);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // personnels array
    $personnels_arr=array();
    $personnels_arr["records"]=array();
    $personnels_arr["paging"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $personnel_item=array(
            "id" => $id,
            "name" => $name,
            "description" => html_entity_decode($description),
            "price" => $price,
            "category_id" => $category_id,
            "category_name" => $category_name
        );
 
        array_push($personnels_arr["records"], $personnel_item);
    }
 
 
    // include paging
    $total_rows=$personnel->count();
    $page_url="{$home_url}personnel/read_paging.php?";
    $paging=$utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
    $personnels_arr["paging"]=$paging;
 
    echo json_encode($personnels_arr);
}
 
else{
    echo json_encode(
        array("message" => "No personnels found.")
    );
}
