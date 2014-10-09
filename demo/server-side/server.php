<?php

$action = $_POST["action"];
$data = $_POST["data"];
$status = "";
switch ($action) {
	case 'getName':
		$status = "Khalil";
		break;
	case 'setName':
		$info = (array)json_decode($_POST["data"]);
		var_dump($info);
		$status = json_encode($info);
		break;
	default:
		$status = "FAILURE";
		break;
}

echo 'SERVER:{"token":"", "response": "' . $status . '"}';

?>