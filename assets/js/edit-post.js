import {sendForm} from "./sendForm.js"
import {addChapter, deleteChapter,reset,autoComplete} from "./functions.js"
import {formDinamicActions} from  "./form.js"
import sendAlert from "./custome-alert.js"

const $form = d.getElementById("form-upload"),
  $btnSubmit = d.getElementById("btn-submit"),
  $btnAddChapter = d.getElementById("add-chapter"),
  $deleteChapter = d.getElementById("delete-chapter"),
  $templateLink = d.getElementById("link-template"),
  $template = d.getElementById("chapter-template").content,
  $posts = d.getElementById("post-subidos"),
  $templatePost = d.getElementById("post-subido-template").content,
  $saveChanges = d.getElementById("save-changes")

const btnClose = d.querySelector(".btn-close")
btnClose.addEventListener("click",e=>{
  $form.classList.add("none")
})

fetch("apis/api.php?table=posts")
.then(res=>res.ok ? res.json() : Promise.reject(res))
.then(json=>{
  const $fragment = d.createDocumentFragment()
  json.forEach((el,i)=>{
    const $post = $templatePost.cloneNode(true)
    let filterTitle = el.title.toLowerCase()
    let filterTitle2 = filterTitle.match(/[a-z0-9\s]/g).join("")
    let filename = filterTitle2.replace(/\s+/g,"-")
    $post.querySelector(".general p").textContent = el.title
    $post.querySelector(".post-subido").dataset.file = `${filename}`
    $post.querySelector(".delete").dataset.id = el.id
    $fragment.appendChild($post)
  })
  $posts.appendChild($fragment)
})
.catch(err=>console.log(err))

const getFilename = (text)=>{
  let titleFile = text.toLowerCase()
  let matches = [...titleFile.matchAll(/[a-z0-9\s]+/g)]
  let titleFilter = matches.map(el=>el[0])
  return titleFilter.join("").trim().replace(/\s+/g,"-")
}

formDinamicActions($form,$btnAddChapter,$deleteChapter,$template,$templateLink)
let filename 
$form.addEventListener("click",e=>{
  if(e.target.matches(".change-title")){
    let srcOriginal = $form.post_portada_url 
    let newfilename = getFilename($form.post_title.value)
    if(new RegExp(`${filename}`).test(srcOriginal.value)){
      srcOriginal.value = srcOriginal.value.replace(filename,newfilename)
    }
    let inputFiles = $form.querySelectorAll(`[data-info="portada"]`)
    inputFiles.forEach(el=>{
      if(new RegExp(`${filename}`).test(el.value)){
        el.value = el.value.replace(filename,newfilename)
      }
    })
    filename = newfilename
  }
})

$posts.addEventListener("click",e=>{
  if(e.target.matches(".delete") || e.target.matches(".delete *")){
    sendAlert({
      title:"Aviso",
      text:"Esta seguro de que desea eleminar este post",
      darkmode:true,
      action:()=>{
        fetch(`apis/api.php?id=${e.target.dataset.id || e.target.closest(".delete").dataset.id}&filename=${e.target.closest(".post-subido").dataset.file}`,{
          method:"DELETE"
        })
        .then(res=>res.ok ? $posts.removeChild(e.target.closest(".post-subido")) : Promise.reject(res))
        // .then(res=>res.ok? res.text() : Promise.reject(res))
        // .then(text=>console.log(text))
        .catch(err=>console.log(err))
      }
    })
  }
  if(e.target.matches(".edit") || e.target.matches(".edit *")){
    let $post = e.target.closest(".post-subido")
     $post.querySelector(".data").classList.toggle("none")
  }
  if(e.target.matches(".send-fast-changes")){
    e.target.disabled = true
    const $post = e.target.closest(".post-subido")
    try{
      let $portadaFile = $post.querySelector(`input[type="file"]`)
      let $portadaUrl = $post.querySelector(".portada")
      const $title = $post.querySelector(".title")
      const formData = new FormData()
      let validacion
      const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
      if(!$portadaFile){
        if($portadaUrl.value!==""){
          if(!regex.test($portadaUrl.value)) throw new Error("El link de la portada es invalido")
          formData.append("thumbnail",$portadaUrl.value)
        } 
        validacion = ($title.value!=="" || $portadaUrl.value!=="") 
      }else{
        if($portadaFile.files) formData.append("thumbnail",$portadaFile.files[0])
        validacion = ($title.value!=="" || $portadaFile.files[0])
      }
      if($title.value!=="") formData.append("title",$title.value)
      if(validacion){
        formData.append("old-filename",$post.dataset.file)
        fetch("apis/api.php",{
          method:"POST",
          body:formData
        })
        // .then(res=>{
        //   if(res.ok){
        //     sendAlert({
        //       title:"Exito!!!",
        //       text:"Se ha enviado los cambios, recuerde resetear los posts sino no va a funcionar",
        //       darkmode:true
        //     })
        //     $post.querySelector(".data").classList.add("none")
        //     e.target.disabled = false
        //   }else{
        //     Promise.reject(res)
        //   }
        // })
        .then(res=>res.ok ? res.text() : Promise.reject(res))
        .then(json=>{
          console.log(json)
          e.target.disabled = false
        })
        .catch(err=>console.log(err))
      }
    }catch(err){
      sendAlert({
        title:"Aviso",
        text:err,
        darkmode:true
      })
      e.target.disabled = false
    }
  }
  // if(e.target.matches(".general") || e.target.matches(".general p")){
  //   reset($form)
  //   let datafile = e.target.closest(".post-subido").dataset.file
  //   $form.oldFilename.value = datafile
  //   filename = datafile
  //   $form.classList.remove("none")
  //   const formData = new FormData()
  //   fetch(`database/posts/${$form.oldFilename.value}.json`)
  //   .then(res=>res.ok ? res.json() : Promise.reject(res))
  //   .then(json=>autoComplete($form,{$template,$templateLink},json))
  //   .catch(err=>console.log(err))
  // }
})

$posts.addEventListener("change",e=>{
  if(e.target.matches(".portada-upload-method")){
    const $choice = e.target.closest(".post-subido").querySelector(".portada-choice")
    if(e.target.value==="File"){
      let index = e.target.closest(".post-subido").dataset.index
      $choice.innerHTML = `<label id="label${index}" for="input${index}" class="btn btn-normal">Subir Portada por Archivo</label><input class="portada" id="input${index}" data-label="label${index}" type="file" accept="image/jpeg,image/png,image/gif,image/webp"></input>`
    }else{
      $choice.innerHTML = `<input class="portada" type="text" style="width:100%;max-width:40rem" placeholder="Portada por url">`
    }
  }
})

$saveChanges.addEventListener("click",e=>{
  const formData = new FormData()
  formData.append("action","reset-posts")
  fetch("apis/api.php",{
    method:"POST",
    body:formData
  })
  .then(res=>res.ok ? location.reload() : Promise.reject(res))
  .catch(err=>console.log(err))
})

// $btnSubmit.onclick = e=>{
//   sendForm($form,e.target,()=>{reset($form);$form.classList.add("none")},"update-post",{name:"old-filename",data:$form.oldFilename.value})
// }


