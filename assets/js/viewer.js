import sendAlert from "./custome-alert.js"

const d = document,
  $chapterTemplate = d.getElementById("chapter-template").content,
  $viewer = d.getElementById("chapter-viewer"),
  $chapters = d.getElementById("chapters")

let chaptersContent
fetch(`../../apis/api.php?table=chapters&method=id_chapter&value="${id_chapter}"&chapters-complete`)
.then(res=>res.ok? res.json() : Promise.reject(res))
.then(json=>{
  chaptersContent = json
  let title = document.title.replace("Ver ","")
  d.querySelector(".post-title").textContent = title
  const $fragment = d.createDocumentFragment()
  json.forEach((el,i)=>{
    const $chapter = $chapterTemplate.cloneNode(true)
    $chapter.querySelector(".chapter").dataset.index = i
    $chapter.querySelector(".chapter-img img").src = `../../${el.thumbnail}` 
    $chapter.querySelector(".chapter-info h3").textContent = `${title} Capitulo ${i+1}`
    $chapter.querySelector(".chapter-info p").textContent = el.fecha
  $fragment.appendChild($chapter)
  })
  $chapters.appendChild($fragment)
})
.catch(err=>console.log(`Error ${err.status}: ${err.statusText}\n${err}`))

$chapters.addEventListener("click",e=>{
  if(e.target.matches(".chapter") || e.target.matches(".chapter *")){
    let chapter = chaptersContent[e.target.closest(".chapter").dataset.index]
    try{
      $viewer.querySelector(".chapter-viewer__servers").innerHTML = ""    
      $viewer.querySelector(".chapter-viewer__video").innerHTML = ""
      const $fragment = d.createDocumentFragment()
      d.querySelector(".chapter-index").textContent= `Capitulo ${chapter.indice}`
      chapter.links.forEach((el,i)=>{
        const $server = d.createElement("div")
        $server.classList.add("chapter-viewer__server")
        $server.textContent = el.server
        if(el.server==="Server"){
          throw new Error("No hay un link para visualizar un capitulo")
        }
        $server.dataset.embed = el.link || ""
        if(i===0){
          $server.classList.add("active")
          if(el.link){
            $viewer.querySelector(".chapter-viewer__video").innerHTML = el.link
          }else{
            $viewer.querySelector(".chapter-viewer__video").innerHTML = `<h4 class="title">No hay un link para este servidor</h4>`
          }
        }
        $fragment.appendChild($server)
      })
      $viewer.querySelector(".chapter-viewer__servers").appendChild($fragment)
      $viewer.classList.remove("none")
      $chapters.style.marginTop = "5rem"
      
    }catch(err){
      sendAlert({
        title:"Aviso",
        text:err,
        darkmode:true
      })
    }
  }
})

$viewer.addEventListener("click",e=>{
  if(e.target.matches(".chapter-viewer__server")){
    $viewer.querySelector(".active").classList.remove("active")
    e.target.classList.add("active")
    let embed = e.target.dataset.embed
    const $video = $viewer.querySelector(".chapter-viewer__video")
    if(embed){
      $video.innerHTML = embed
    }else{
      $video.innerHTML = `<h4 class="title">No hay un link para este servidor</h4>`
    }
  }
})

