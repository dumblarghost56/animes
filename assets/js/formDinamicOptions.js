import { addChapter,deleteChapter} from "./functions.js"
export const formDinamicActions =($form,$btnAddChapter,$deleteChapter,$template,$templateLink)=>{
  fetch(`apis/api.php?table=servers`)
  .then(res=>res.ok? res.json() : Promise.reject(res))
  .then(json=>{
    const $select = $templateLink.querySelector("select")
    const $fragment = d.createDocumentFragment()
    json.forEach(el=>{
      const $option = d.createElement("option")
      $option.textContent = el.server
      $fragment.appendChild($option)
    })
    $select.appendChild($fragment)
  })
  .catch(err=>{
    console.log(err)
  })
  $form.addEventListener("submit",e=>e.preventDefault())
  $btnAddChapter.addEventListener("click",e=>addChapter($form,$template,$templateLink))
  $deleteChapter.addEventListener("click",e=>deleteChapter($form))

  d.addEventListener("click",e=>{
    if(e.target.matches(".add-link")){
      const $chapterLink = $templateLink.querySelector(".chapter-link").cloneNode(true)
      const $parent = e.target.closest(".chapter-option")
      const $links = $parent.querySelector(".chapter-links")
      $links.appendChild($chapterLink)
    }
    if(e.target.matches(".delete-link")){
      const $parent = e.target.closest(".chapter-option")
      const $chapterLinks = $parent.querySelector(".chapter-links")
      if($chapterLinks.children.length>1) $chapterLinks.removeChild($chapterLinks.lastElementChild)
    }
  })

  d.addEventListener("change",e=>{
    if(e.target.matches('input[type="file"]')){
      let name = e.target.files[0].name
      let $label = d.querySelector(`#${e.target.dataset.label}`)
      // e.target.parentElement.querySelector(`input[type="text"]`).value = ""
      $label.textContent = name
    }
  })
}
