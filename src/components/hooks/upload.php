<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
$folderPath = "/var/www/html/Bak.newFrontend2/src/components/assets/Uploads/";

set_time_limit(600000);

$success = true;

foreach ($_FILES as $file) {
    // Perform the upload
    $t = move_uploaded_file($file['tmp_name'], "$folderPath{$file['name']}");
}

echo json_encode([
   'success' => $success,
   'message' => $success ? 'Files successfully uploaded' : 'Failed to upload files'
]);

/*
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
//$folderPath = "/var/www/html/Bak.newFrontend2/src/uploads/";
$folderPath = "/var/www/html/Bak.newFrontend2/src/components/assets/Uploads/";
 
$total = count($_FILES);

//echo 'Total number of files to upload: ';
//print_r($total);

for( $i=0 ; $i < $total ; $i++ ) 
{
    $file_tmp = $_FILES['file']['tmp_name'][$i];
    $file_ext = strtolower(end(explode('.',$_FILES['file']['name'][$i])));
    $base_name = $_FILES['file']['name'][$i];
    $file = $folderPath . $base_name;
    move_uploaded_file($file_tmp, $file);
}

return json_encode({
    message: "successfully uploaded image"
});
?>

*/