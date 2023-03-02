<?php
function getRequest($mysql,$request,$tabla,$complete=false){
  $columnsName = "SHOW COLUMNS FROM $tabla";
  $send_request = $mysql->query($columnsName);
  while($registro= $send_request->fetch_assoc()){
    $columns[$registro["Field"]]= ""; 
  }
  $respuesta = [];
  $send_request = $mysql->query($request);
  while($registro=$send_request->fetch_assoc()){
    $newObj = new stdClass();
    foreach($columns as $clave=>$valor){
      $newObj->$clave = $registro["$clave"];
      if($complete){
        getLink($newObj,$registro,$mysql);
      }
    }
    $respuesta[]= $newObj;
  }
  return $respuesta;
}

function getLink($obj,$registro,$mysql){
  $id_link = $registro["id_link"];
  $obj->links= [];
  $queryLinks = 'SELECT * FROM links WHERE id_link="'.$id_link.'"';
  $result=$mysql->query($queryLinks);
  while($row=$result->fetch_assoc()){
    $link = new stdClass();
    $link->server = $row["server"];
    $link->link = $row["link"];
    array_push($obj->links,$link);
  }
}

function sendPost($mysql,$update=false,$id_old=false,$oldFilename=false){
  $title = $_POST["title"];
  $filename = strtolower($title);
  preg_match_all("/[a-z0-9\s]+/",$filename,$match);
  $filename = implode($match[0]);
  $filename = preg_replace("/\s+/","-",$filename);
  mkdir("../viewer/".$filename);
  $indexViewer = fopen("../viewer/".$filename.'/index.php',"w");
  if(isset($_FILES["thumbnail"])){
    mkdir("../assets/thumbnails/".$filename);
    $thumbnailFile = $_FILES["thumbnail"];
    $extension = preg_match("/(.jpg|.webp|.png|.gif)$/",$thumbnailFile["name"],$matches);
    $extension = $matches[0]; 
    move_uploaded_file($thumbnailFile["tmp_name"],"../assets/thumbnails/".$filename."/portada".$extension);
    $thumbnail = "http://localhost/my_projects/ero-animesfree/assets/thumbnails/".$filename."/portada".$extension;
  }else{
    $thumbnail = $_POST["thumbnail"];
  }
  $num_chapters = $_POST["num_chapters"];
  if($num_chapters>0){
    $id_chapter = $filename;
    fwrite($indexViewer,'<script>document.title="Ver '.$title.'";id_chapter="'.$id_chapter.'"</script><?php require("../../layout/view.php")?>');
    $queryChapters = 'INSERT INTO chapters (id_chapter,indice,fecha,thumbnail,id_link) VALUES ';
    $queryLinks = "INSERT INTO links (id_link,server,link) VALUES ";
    for($i=0;$i<$num_chapters;$i++){
      $indice = ($i+1);
      $fecha = $_POST["fecha"];
      if(isset($_FILES["chapter".$i."-thumbnail"])){
        if(!file_exists("../assets/thumbnails/".$filename)){
          mkdir("../assets/thumbnails/".$filename);
        }
        $thumbnailChapterFile = $_FILES["chapter".$i."-thumbnail"];
        $extension = preg_match("/(.jpg|.webp|.png|.gif)$/",$thumbnailChapterFile["name"],$matches);
        $extension = $matches[0]; 
        move_uploaded_file($thumbnailChapterFile["tmp_name"],"../assets/thumbnails/".$filename.'/chapter_'.($i+1).$extension);
        $thumbnailChapter = "http://localhost/my_projects/ero-animesfree/upload-content.php/assets/thumbnails/".$filename.'/chapter_'.($i+1).$extension;
      }else{
        $thumbnailChapter = $_POST["chapter".$i."-thumbnail"];
      }
      $num_links = $_POST["chapter".$i."-num_links"];
      $id_link = $filename.'-'.($i+1);
      for($e=0;$e<$num_links;$e++){
        $server = $_POST["chapter".$i."-server".$e];
        $link = $_POST["chapter".$i."-link".$e];
        $queryLinks.= '("'.$id_link.'","'.$server.'",'."'".$link."'".'),';
      }	
      $queryChapters.= '("'.$id_chapter.'","'.$indice.'","'.$fecha.'","'.$thumbnailChapter.'","'.$id_link.'"),';
    }	
    if($queryLinks!="INSERT INTO links (id_link,server,link) VALUES "){
      $queryLinks = preg_replace("/,$/",";",$queryLinks);
      $mysql->query($queryLinks);
    }
    $queryChapters = preg_replace("/,$/",";",$queryChapters);
    $mysql->query($queryChapters);
    $query = 'INSERT INTO posts (title,thumbnail,id_chapter) VALUES ("'.$title.'","'.$thumbnail.'","'.$id_chapter.'");';
  }else{
    fwrite($indexViewer,'<script>documen.title="'.$title.'";let id_chapter=""</script><?php require("../../layout/view.php")?>');
    $query = 'INSERT INTO posts (title,thumbnail) VALUES ("'.$title.'","'.$thumbnail.'");';
  }
  fclose($indexViewer);
  $mysql->query($query);
}

function updatePost($mysql,$id=false,$oldFilename=false){
  $sets = "UPDATE post SET (";
  $value = "";
  if(isset($_POST["title"])){
    $sets.= "title";
    $value.= '"'.$_POST["title"].'"';
  }
  if(isset($_POST["thumbnail"])){
    
  }
}
?>
