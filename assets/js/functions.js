export let num_chapter = 0

export const autoComplete = ($form,addChapter,data)=>{
  let {filename=false,title,portada=false,fecha=false,capitulos=0,chapters=false} = data
  $form.post_title.value = title
  if(portada){
    $form.querySelector(`#post_portada_url`).value = portada
  }
  if(capitulos>0){
    const $chapters = $form.querySelector(".chapter-options")
    const $fragment = d.createDocumentFragment()
    for(let i=0;i<capitulos;i++){
      addChapter()      
    }
  }
  if(chapters){
    let {$template,$templateLink} = addChapter
    const $fragment = d.createDocumentFragment()
    chapters.forEach((el,i)=>{
      num_chapter++
      const chapter_option = $template.cloneNode(true) 
      chapter_option.querySelector("h4").textContent += ` ${num_chapter}:`
      chapter_option.querySelector("#chapter-portada").dataset.label = `chapter${num_chapter}`
      chapter_option.querySelector("input[type='file']").id = num_chapter
      chapter_option.querySelector(`[data-info="portada"]`).value = el.portada
      chapter_option.querySelector("label.btn").setAttribute("for",num_chapter)
      chapter_option.querySelector("label.btn").id = `chapter${num_chapter}`
      el.links.forEach((el)=>{
        const $link = $templateLink.querySelector(".chapter-link").cloneNode(true)
        $link.querySelector("select").value = el.server
        $link.querySelector('input[type="text"]').value = el.link
        chapter_option.querySelector(".chapter-links").appendChild($link)
      })
      $fragment.appendChild(chapter_option)
    })
    $form.querySelector(".chapter-options").appendChild($fragment)
  }
}

export const addChapter = ($form,$template,$templateLink)=>{
  num_chapter++
  const chapter_option = $template.cloneNode(true) 
  chapter_option.querySelector("h4").textContent += ` ${num_chapter}:`
  chapter_option.querySelector("#chapter-portada").dataset.label = `chapter${num_chapter}`
  chapter_option.querySelector("input[type='file']").id = num_chapter
  chapter_option.querySelector("label.btn").setAttribute("for",num_chapter)
  chapter_option.querySelector("label.btn").id = `chapter${num_chapter}`
  const $link = $templateLink.querySelector(".chapter-link").cloneNode(true)
  chapter_option.querySelector(".chapter-links").appendChild($link)
  $form.querySelector(".chapter-options").appendChild(chapter_option)
}

export const deleteChapter = ($form)=>{
  const $chapters = $form.querySelector(".chapter-options")
  if($chapters.children.length>0){
    num_chapter--
    $chapters.removeChild($chapters.lastElementChild)
  }
}

export const reset = (form)=>{
  const $inputs  =form.querySelectorAll("input")
  $inputs.forEach(el=>el.value="")
  const $inputFile = form.querySelectorAll('[data-textDefault]')
  $inputFile.forEach(el=>el.textContent = el.dataset.textdefault)
  const $chapters = form.querySelector(".chapter-options")
  $chapters.innerHTML = ""
  num_chapter = 0
}
