<?php
	if($_SERVER["REQUEST_METHOD"]=="GET"){
		include("functions.php");		
		$mysql = new mysqli("localhost","root","","hentai");
		$table = $_GET["table"];
		if(!isset($_GET["id"])){
			$query = "SELECT * FROM $table";
			$data = json_encode(getRequest($mysql,$query,$table));
		}
		if(isset($_GET["method"]) && isset($_GET["value"])){
			$query = "SELECT * FROM $table WHERE ".$_GET["method"]."=".$_GET["value"];
			if(!isset($_GET["chapters-complete"])){
				$data = json_encode(getRequest($mysql,$query,$table));
			}else{
				$data = json_encode(getRequest($mysql,$query,$table,true));
			}
		}
		$mysql->close();
		header("HTTP/1.1 200 OK");
		echo $data;
	}
	if($_SERVER["REQUEST_METHOD"]=="POST"){
		$mysql = new mysqli("localhost","root","","hentai");
		if($_POST["action"]=="post"){
			sendPost($mysql);
			$mysql->close();
		}else{
			sendPost($mysql);
			$mysql->close();
		}
		header("HTTP/1.1 200 OK");
	}
	if($_SERVER["REQUEST_METHOD"]=="DELETE"){
		$mysql = new mysqli("localhost","root","","hentai");
		$id = $_GET["id"];
		$filename = $_GET["filename"];
		$queryChapter = "SELECT id_chapter FROM posts WHERE id=$id";
		$result = $mysql->query($queryChapter);
		echo json_encode($result);
		// $query = "DELETE FROM posts WHERE id=$id;";

		// $result = $mysql->query($query);
		// if($result){
		// 	$viewer= opendir("../viewer/$filename");
		// 	while($f=readdir($viewer)){
		// 		if($f!="." && $f!=".."){
		// 			unlink("../viewer/$filename/$f");
		// 		}
		// 	}
		// 	rmdir("../viewer/$filename");
		// 	if(is_dir("../assets/thumbnails/$filename")){
		// 		$thumbnail= opendir("../assets/thumbnails/$filename");
		// 		while($f=readdir($thumbnail)){
		// 			if($f!="." && $f!=".."){
		// 				unlink("../assets/thumbnails/$filename/$f");
		// 			}
		// 		}
		// 		rmdir("../assets/thumbnails/$filename");	
		// 	}
		// 	header("HTTP/1.1 200 OK");
		// }
	}
?>