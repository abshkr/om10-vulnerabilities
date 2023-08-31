<?php

include_once 'common_class.php';

//Old PHP: LoadSchedules.class.php
class OrderAttachment extends CommonClass
{
    protected $TABLE_NAME = 'ORD_DOCS';
    protected $VIEW_NAME = 'ORD_DOCS';
    protected $primary_keys = array("od_order_no", "od_doc_name");

    private $attachment_path = "/../attachments/orders/";
    private $attachment_dir = "/../attachments/orders";

    public $NUMBER_FIELDS = array(
        "OD_ORDER_NO",
        "OD_DOC_SIZE",
        "OD_DOC_DNLDCOUNTS",
    );
    public $BOOLEAN_FIELDS = array(
        
    );

    public function read()
    {
        $query = "
            SELECT 
                OD.OD_ORDER_NO,
                OD.OD_DOC_NAME,
                OD.OD_DOC_FOLDER,
                OD.OD_DOC_SIZE,
                OD.OD_DOC_CREATED,
                OD.OD_DOC_DOWNLOADED,
                OD.OD_DOC_DNLDCOUNTS,
                OD.OD_DOC_CREATOR,
                PSNL.PER_NAME  AS OD_DOC_CREATOR_NAME
            FROM 
                ORD_DOCS OD,
                PERSONNEL PSNL
            WHERE OD.OD_DOC_CREATOR = PSNL.PER_CODE(+)
                AND OD.OD_ORDER_NO = :order_no
            ORDER BY OD.OD_DOC_NAME
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':order_no', $this->order_no);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function attachments()
    {
        $dir = __DIR__ . $this->attachment_dir;
		$files = scandir($dir);
		
		$arr = array();
		foreach ($files as $name)
		{	
			// if (strpos($name, '.jpg') === FALSE && strpos($name, '.png') === FALSE && strpos($name, '.gif') === FALSE) {
			// 	continue;
			// }
			
			$arr[] = array('path'=>'api/attachments/orders/'. $name, 'name'=>$name);
		}
		
        echo json_encode(array('records'=>$arr), JSON_PRETTY_PRINT);
    }

    public function delete_file()
    {
        $target_file = __DIR__ . $this->attachment_path . $this->od_doc_name;
        if (!file_exists($target_file)) {
            $error = new EchoSchema(500, response("__FILE_NOT_EXIST__"));
            echo json_encode($error, JSON_PRETTY_PRINT);

            return;
        }

        unlink($target_file);

        $error = new EchoSchema(200, response("__DELETE_SUCCEEDED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    protected function post_delete()
    {
        $target_file = __DIR__ . $this->attachment_path . $this->od_doc_name;
        if (!file_exists($target_file)) {
            return true;
        }

        unlink($target_file);
        return true;
    }

    public function upload($field = 'file')
    {
        write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        // check if the folder is created
        $folder = __DIR__ . $this->attachment_dir;
        if (!file_exists($folder)) {
            write_log("create folder " . $folder, __FILE__, __LINE__);
            mkdir($folder, 0755, true);
        }

        $target_dir = __DIR__ . $this->attachment_path;
        $target_file = $target_dir . basename($_FILES[$field]["name"]);
        write_log(json_encode($_FILES), __FILE__, __LINE__);
        write_log($_FILES[$field]["name"], __FILE__, __LINE__);
        $uploadOk = 1;
        // $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        write_log(json_encode($_FILES), __FILE__, __LINE__);

        // Check if image file is a actual image or fake image
        /* if (isset($_POST["submit"])) {
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
        } */
        // Check if file already exists
        if (file_exists($target_file)) {
            write_log("Target file " . $target_file . " already exists.", __FILE__, __LINE__);
            $error = new EchoSchema(500, response("__FILE_ALREADY_EXIST__"));
            echo json_encode($error, JSON_PRETTY_PRINT);

            return;
        }
        // Check file size
        if ($_FILES[$field]["size"] > 50000000) {
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