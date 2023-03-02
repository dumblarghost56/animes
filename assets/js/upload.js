import {sendForm} from "./sendForm.js"
import {autoComplete,reset,addChapter} from "./functions.js"
import {formDinamicActions} from  "./formDinamicOptions.js"

const $form = d.getElementById("form-upload"),
  $btnSubmit = d.getElementById("btn-submit"),
  $btnAddChapter = d.getElementById("add-chapter"),
  $deleteChapter = d.getElementById("delete-chapter"),
  $templateLink = d.getElementById("link-template"),
  $template = d.getElementById("chapter-template").content,
  $inputJson = d.getElementById("input-json")

formDinamicActions($form,$btnAddChapter,$deleteChapter,$template,$templateLink)
$btnSubmit.onclick = e=>{sendForm($form,e.target,()=>{reset($form)})}
$inputJson.addEventListener("change",e=>{
  reset($form)
  let json = e.target.files[0]
  json.text(json)
  .then(text=>{
    let content = JSON.parse(text)
    if(content instanceof Array){
      function cargaMaziva(arreglo){
        var siguienteIndice = 0;
        return {
          next: function(){
            return siguienteIndice < arreglo.length ?
            {value: arreglo[siguienteIndice++], done: false} :
            {done: true};
          }
        }
      }
      let aCargar = cargaMaziva(content)
      if(content[0].capitulos){
        autoComplete($form,function(){addChapter($form,$template,$templateLink)},aCargar.next().value)
        $btnSubmit.onclick =e=>{
          sendForm($form,e.target,()=>{
            reset($form)
            autoComplete($form,function(){addChapter($form,$template,$templateLink)},aCargar.next().value)
          },"upload-post")
        }
      }else{
        autoComplete($form,{$template,$templateLink},aCargar.next().value)
        $btnSubmit.onclick =e=>{
          sendForm($form,e.target,()=>{
            reset($form)
            autoComplete($form,{$template,$templateLink},aCargar.next().value)
          },"upload-post")
        }
      }
      
    }else{
      let content = JSON.parse(text)
      autoComplete($form,{$template,$templateLink},content)
    }
  })
  .catch(err=>console.log(err))
})