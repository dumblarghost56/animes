const d = document,
 $links = d.querySelectorAll(".nav__link")

if(/upload-content.php$/.test(location.href)){
  $links[1].classList.add("active")
}else if(/edit-post.php$/.test(location.href)){
  $links[2].classList.add("active")
}else{
  $links[0].classList.add("active")
}





