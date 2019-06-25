<?php
$content = "some text here";
$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "pending/myText.txt","wb");
fwrite($fp,$content);
fclose($fp);
?>
