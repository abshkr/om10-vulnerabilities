<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/customer_category.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare CustomerCategory object
$cust_cat = new CustomerCategory($db);
Utilities::delete($cust_cat, "customer category");

// get id of cust_cate to be edited
// $data = json_decode(file_get_contents("php://input"));
// $cust_cat->category_code = (isset($_GET["category_code"]) ? 
//     $_GET["category_code"] : $data->category_code);

// if (!isset($cust_cat->category_code)) {
//     http_response_code(400);
//     echo json_encode(array("message" => "Unable to create customer category. Data is incomplete."));
// }

// $cust_cat->category_code = htmlspecialchars(strip_tags($cust_cat->category_code));

// // update the cust_cate
// if ($cust_cat->delete()){
//     http_response_code(201);
//     echo json_encode(array("message" => "Customer category was deleted."));
// } else{
//     http_response_code(503);
//     echo json_encode(array("message" => "Unable to delete customer category."));
// }
