<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="http://localhost/my_projects/ero-animesfree/assets/logo.ico" type="image/x-icon">
  <link rel="preload" href="http://localhost/my_projects/ero-animesfree/assets/css/reset.css" as="style">
  <link rel="preload" href="http://localhost/my_projects/ero-animesfree/assets/css/theme-dark.css" as="style">
  <link rel="preload" href="http://localhost/my_projects/ero-animesfree/assets/css/styles.css" as="style">
  <link rel="stylesheet" href="http://localhost/my_projects/ero-animesfree/assets/css/reset.css">
  <link rel="stylesheet" href="http://localhost/my_projects/ero-animesfree/assets/css/theme-dark.css">
  <link rel="stylesheet" href="http://localhost/my_projects/ero-animesfree/assets/css/styles.css">
  <title>Ero-animes Free</title>
</head>
<body class="anchor-complete">
  <nav class="nav">
    <div>
      <div class="nav__title">
        <img src="http://localhost/my_projects/ero-animesfree/assets/logo.png">
        <h1>my api</h1>
      </div>
      <div class="nav__links">
        <a href="http://localhost/my_projects/ero-animesfree/" class="nav__link">Home</a>
        <a href="http://localhost/my_projects/ero-animesfree/upload-content.php" class="nav__link">Upload Content</a>
        <a href="http://localhost/my_projects/ero-animesfree/edit-post.php" class="nav__link">Edit Post</a>
      </div>
    </div>
  </nav>
<main>
    <section>
      <h1 class="post-title"></h1>
      <div class="chapter-viewer none" id="chapter-viewer">
        <h4 class="chapter-index"><h4>
        <div class="chapter-viewer__servers">
        </div>
        <div class="chapter-viewer__video">
        </div>
      </div>
      <div class="chapters" id="chapters">
      </div><!--chapters-->
    </section>
  </main>
<template id="chapter-template"> 
  <div class="chapter" data-index="0">
    <div class="chapter-img">
      <img src="">
    </div>
    <div class="chapter-info">
      <h3></h3>
      <p></p>
    </div>
    <div class="chapter-play-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentcolor" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>
    </div>
  </div><!--chapter-->
</template>
<script src="../../assets/js/viewer.js" type="module"></script>
<footer class="footer">
    <div>
      <h5>Todos los derechos y politicas de privacidad pertenecen al autor bladeshadowmaster</h5>
    </div>
  </footer>
</body>
</html>