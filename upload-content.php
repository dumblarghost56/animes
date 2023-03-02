<?php require("layout/head.php")?>
  <main>
    <section>
      <h2>Subida de Contenido</h2>
      <div class="method">
        <label>Por Json</label><label data-textDefault="Subir un archivo" class="btn btn-normal" id="label-json" for="input-json">Subir un archivo</label><input data-label="label-json" id="input-json" type="file" accept="application/JSON">
      </div>
      <form id="form-upload" class="form-upload" enctype="x-www-form-urlencoded"  method="post" onSubmit="return false">
        <h3 class="form-upload__title">Subir Contenido</h3>
        <div class="form-upload__content">
          <div class="form-upload__group"><label>Titulo del Post:</label><input name="post_title" type="text" required></div>
          <div class="form-upload__group"><label for="post_portada_url">Portada: </label><input id="post_portada_url" type="text" placeholder="Portada por url" >
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
  </main>

  <template id="chapter-template">
    <div class="chapter-option">
      <h4>capitulo</h4>
      <div><label>Portada:</label><input data-info="portada" type="text" placeholder="Portada por url"></input><label data-textDefault="Elegir Portada" for="chapter-portada" id="" class="btn btn-normal">Elegir Portada</label><input data-label="" id="chapter-portada" type="file" accept="image/jpeg, image/png, image/gif, image/webp"></div>
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

<script src="assets/js/main.js"></script>
<script src="assets/js/upload.js" type="module"></script>
<?php require("layout/footer.php") ?>