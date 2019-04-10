<?php

header('Content-Type: text/plain; charset=utf-8');

try {
   
    // Undefined | Multiple Files | $_FILES Corruption Attack
    // If this request falls under any of them, treat it invalid.
    if (
        !isset($_FILES['upfile']['error']) ||
        is_array($_FILES['upfile']['error'])
    ) {
        throw new RuntimeException('UPLOAD_ERR_INVALID:::Invalid parameters.', 6);
    }

    // Check $_FILES['upfile']['error'] value.
    switch ($_FILES['upfile']['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            throw new RuntimeException('UPLOAD_ERR_FILE:::No file sent.', 2);
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            throw new RuntimeException('UPLOAD_ERR_SIZE:::Exceeded filesize limit.', 5);
        default:
            throw new RuntimeException('UPLOAD_ERR_UNKNOWN:::Unknown errors.', 4);
    }

    // You should also check filesize here.
    if ($_FILES['upfile']['size'] > 1000000) {
        throw new RuntimeException('UPLOAD_ERR_SIZE:::Exceeded filesize limit.', 5);
    }

    // DO NOT TRUST $_FILES['upfile']['mime'] VALUE !!
    // Check MIME Type by yourself.
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    if (false === $ext = array_search(
        $finfo->file($_FILES['upfile']['tmp_name']),
        array(
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
        ),
        true
    )) {
        throw new RuntimeException('UPLOAD_ERR_FORMAT:::Invalid file format.', 3);
    }

    // You should name it uniquely.
    // DO NOT USE $_FILES['upfile']['name'] WITHOUT ANY VALIDATION !!
    // On this example, obtain safe unique name from its binary data.
	//$new_name = sprintf( './assets/%s.%s', sha1_file($_FILES['upfile']['tmp_name']), $ext );
	//$new_name = sprintf( './assets/%s', ($_FILES['upfile']['tmp_name']) );
	$new_name = 'assets/products/' . ($_FILES['upfile']['name']);
	//$new_name = '../reports/' . ($_FILES['upfile']['name']);

    if ( !move_uploaded_file( $_FILES['upfile']['tmp_name'], $new_name ) ) {
        throw new RuntimeException('UPLOAD_FAILURE:::Failed to move uploaded file.['.$new_name.']', 1);
    }
	
	//exec('mv '.$new_name.' assets/products/', $output);

    echo '0:::UPLOAD_SUCCESS:::File is uploaded successfully.';

} catch (RuntimeException $e) {

    echo $e->getCode().':::'.$e->getMessage();

}

?>