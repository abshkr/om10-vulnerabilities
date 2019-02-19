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
Utilities::update($cust_cat, "customer category");
// get id of cust_cate to be edited
// $data = json_decode(file_get_contents("php://input"));
// $cust_cat->category_code = (isset($_GET["category_code"]) ? 
//     $_GET["category_code"] : $data->category_code);
// $cust_cat->category_name = (isset($_GET["category_name"]) ? 
//     $_GET["category_name"] : $data->category_name);

// if (!isset($cust_cat->category_name) || !isset($cust_cat->category_code)) {
//     http_response_code(400);
//     echo json_encode(array("message" => "Unable to create customer category. Data is incomplete."));
// }

// $cust_cat->category_code = htmlspecialchars(strip_tags($cust_cat->category_code));
// $cust_cat->category_name = htmlspecialchars(strip_tags($cust_cat->category_name));

// // update the cust_cate
// if ($cust_cat->update()){
//     http_response_code(201);
//     echo json_encode(array("message" => "Customer category was updated."));
// } else{
//     http_response_code(503);
//     echo json_encode(array("message" => "Unable to update customer category."));
// }
