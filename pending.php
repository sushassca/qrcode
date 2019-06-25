<?php
if(!empty($_POST['data'])){
$data = $_POST['data'];
$fname = mktime() . ".txt";//generates random name

$file = fopen("pending/" .$fname, 'w');//creates new file
fwrite($file, $data);
fclose($file);
}
?>
