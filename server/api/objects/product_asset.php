<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class ProductAsset extends CommonClass
{
    protected $TABLE_NAME = 'PRODUCTS';
    protected $VIEW_NAME = 'GUI_PRODUCTS';
    protected $primary_keys = array("prod_code", "prod_cmpy");

    private $image_path = "/../assets/products/";

    protected $table_view_map = array(
        "PROD_CMPY" => "PROD_CMPYCODE",
        "PROD_TXT_COLOUR" => "PROD_TEXTCOLOR",
        "PROD_BACK_COLOUR" => "PROD_BACKCOLOR",
    );

    public function read()
    {
        $query = "SELECT PROD_CODE,
                PROD_CMPYCODE,
                PROD_CMPYNAME,
                PROD_NAME,
                PROD_DESC,
                PROD_GROUP,
                PROD_GROUPNAME,
                PROD_CLASS,
                PROD_CLASSDESC,
                PROD_TEXTCOLOR,
                PROD_BACKCOLOR,
                'ASSETS/PRODUCTS/' IMAGE_PATH,
                PROD_IMAGE
            FROM GUI_PRODUCTS
            ORDER BY PROD_CMPYCODE, PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function images()
    {
        $dir = __DIR__ . '/../assets/products';
		$files = scandir($dir);
		
		$arr = array();
		foreach ($files as $name)
		{	
			if (strpos($name, '.jpg') === FALSE && strpos($name, '.png') === FALSE && strpos($name, '.gif') === FALSE) {
				continue;
			}
			
			$arr[] = array('icon'=>'api/assets/products/'. $name, 'name'=>$name);
		}
		
        echo json_encode(array('records'=>$arr), JSON_PRETTY_PRINT);
    }

    public function delete_image()
    {
        $target_file = __DIR__ . $this->image_path . $this->image_file;
        if (!file_exists($target_file)) {
            $error = new EchoSchema(500, response("__FILE_NOT_EXIST__"));
            echo json_encode($error, JSON_PRETTY_PRINT);

            return;
        }

        unlink($target_file);

        $error = new EchoSchema(200, response("__DELETE_SUCCEEDED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    public function upload($field = 'file')
    {
        write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $target_dir = __DIR__ . $this->image_path;
        $target_file = $target_dir . basename($_FILES[$field]["name"]);
        write_log(json_encode($_FILES), __FILE__, __LINE__);
        write_log($_FILES[$field]["name"], __FILE__, __LINE__);
        $uploadOk = 1;
        // $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        write_log(json_encode($_FILES), __FILE__, __LINE__);

        // Check if image file is a actual image or fake image
        if (isset($_POST["submit"])) {
            $check = getimagesize($_FILES[$field]["tmp_name"]);
            write_log($check, __FILE__, __LINE__);
            if($check !== false) {
                write_log("File is an image - " . $check["mime"], __FILE__, __LINE__);
            } else {
                write_log(sprintf("File %s is not an image", $_FILES[$field]["tmp_name"]), __FILE__, __LINE__);
                $error = new EchoSchema(500, response("__NOT_IMAGE__"));
                echo json_encode($error, JSON_PRETTY_PRINT);

                return;
            }
        }
        // Check if file already exists
        if (file_exists($target_file)) {
            write_log("Target file " . $target_file . " already exists.", __FILE__, __LINE__);
            $error = new EchoSchema(500, response("__FILE_ALREADY_EXIST__"));
            echo json_encode($error, JSON_PRETTY_PRINT);

            return;
        }
        // Check file size
        if ($_FILES[$field]["size"] > 500000) {
            $error = new EchoSchema(500, response("__FILE_TOO_LARGE__"));
            echo json_encode($error, JSON_PRETTY_PRINT);

            return;
        }

        // Allow certain file formats
        // if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        //     && $imageFileType != "gif" ) {
        //     echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        //     $uploadOk = 0;
        // }
        
        if (move_uploaded_file($_FILES[$field]["tmp_name"], $target_file)) {
            write_log("The file ". basename($_FILES[$field]["name"]). " has been uploaded.", __FILE__, __LINE__);
            $error = new EchoSchema(200, response("__FILE_UPLOADED__",
                "The file ". basename($_FILES[$field]["name"]). " has been uploaded."));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        } else {
            write_log("The file ". basename($_FILES[$field]["name"]). " upload failed", __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__FILE_UPLOAD_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }
    }
}
