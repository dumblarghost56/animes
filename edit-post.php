<?php require("layout/head.php")?>
<main>
  <section>
    <script src="assets/js/main.js"></script>
    <h2>Edición de Post</h2>
    <form id="form-upload" class="form-upload none" enctype="x-www-form-urlencoded"  method="post" onSubmit="return false">
        <button class="btn btn-close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentcolor" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
        </button>
        <h3 class="form-upload__title">Subir Contenido</h3>
        <div class="form-upload__content">
          <input type="hidden" name="oldFilename" >
          <div class="form-upload__group"><label>Titulo del Post:</label><input name="post_title" type="text"><button class="btn btn-normal change-title">Cambiar</div>
          <div class="form-upload__group"><label for="post_portada_url">Portada: </label><input data-input id="post_portada_url" name="post_portada_url" type="text" placeholder="Portada por url" >
          <label data-textDefault="Elegir Portada" for="post-portada" id="label-portada" class="btn btn-normal">Portada por Imagen</label><input name="post_portada" id="post-portada" type="file" accept="image/png,image/jpeg,image/webp,image/gif"  data-label="label-portada"></div>
          <div class="form-upload__group">
            <label>Capitulos: </label><button class="btn btn-normal"id="add-chapter">+</button>
            <button class="btn btn-normal" id="delete-chapter">-</button>
              <div class="chapter-options"></div><!--chapter-options-->
          </div> 
        </div>
        <button class="btn btn-normal" id="btn-submit">Subir<button>
      </form><!--form-->
    </section>
    <section>
      <h3>Post Subidos</h3>
      <button class="btn btn-normal" id="save-changes">Resetear Posts</button><br/><br/>
      <div class="posts-subidos" id="post-subidos"></div>
    <section>
  </main>
<template id="chapter-template">
  <div class="chapter-option">
    <h4>capitulo</h4>
    <div><label>Portada:</label><input data-info="portada" data-input type="text" placeholder="Portada por url"></input><label data-textDefault="Elegir Portada" for="chapter-portada" id="" class="btn btn-normal">Elegir Portada</label><input data-label="" id="chapter-portada" type="file" accept="image/jpeg, image/png, image/gif, image/webp"></div>
    <div class="chapter-links"></div>
  </div><!--chapter-option-->
</template>
<div id="link-template">
  <div class="chapter-link">
    <select class="btn btn-normal">
      <option>Server</option>
    </select>
    <input type="text" placeholder="Embed..." data-pattern="^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$">
    <button class="btn btn-normal add-link">+<button><button class="btn btn-normal delete-link">-<button>
  </div>
</div>
</section>
<template id="post-subido-template">
  <div class="post-subido">
    <div class="general">
      <p>Nombre</p>
      <div class="options">
        <button class="btn btn-transparent edit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentcolor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
        </button>  
        <button class="btn btn-transparent delete">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentcolor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
        </button>
      </div>
    </div><!--general-->
    <div class="data none">
      <input type="text" class="title" placeholder="Nombre del Post..."><br/></br>
      <div>
        <select class="btn btn-normal portada-upload-method">
          <option>Url</option>
          <option>File</option>
        </select>
        <div style="display:inline-block; margin-left:1.5rem" class="portada-choice"><input class="portada" style="width:100%;max-width:40rem" type="text" placeholder="Portada por url"></div>
      </div><br/>
      <button class="btn btn-normal send-fast-changes">Guardar Cambios</button>
    </div><!--data-->
  </div><!--post-subido-->
</template>
</main>
<script src="assets/js/edit-post.js" type="module"></script>
<?php require("layout/footer.php")?>
