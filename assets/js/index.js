const $template = d.getElementById("post-template").content,
 $posts = d.getElementById("posts"),
 $postIndex = d.getElementById("post-index"),
 $pagination = d.querySelector(".pagination"),
 $btnIndex = d.getElementById("btn-index")

let posts
const getContent = (json,index=0)=>{
  $posts.innerHTML = ""
  let content = json.slice(index,index+20)
  const $fragment = d.createDocumentFragment()
  content.forEach(el=>{
    const $post = $template.cloneNode(true)
    let filterTitle = el.title.toLowerCase()
    let filterTitle2 = filterTitle.match(/[a-z0-9\s]+/g).join("")
    let filterTitle3 = filterTitle2.replace(/\s+/g,"-")
    $post.querySelector("a").href = `viewer/${filterTitle3}/`
    $post.querySelector("figcaption").textContent = el.title
    $post.querySelector(".post__img img").src = el.thumbnail
    $fragment.appendChild($post)
  }) 
  $posts.appendChild($fragment)
}

$pagination.addEventListener("click",e=>{
  if(e.target.matches("button")) {
    $posts.innerHTML = ""
    $pagination.querySelector(".active").classList.remove("active")
    e.target.classList.add("active")
    localStorage.setItem("page",e.target.dataset.index*20)
    getContent(posts,e.target.dataset.index*20)
  }
})

const pagination = array=>{
  let numPages = Math.ceil(array.length/20)
  if(numPages>1){
    const $fragment = d.createDocumentFragment()
    for(let i=0;i<numPages;i++){
      const button = d.createElement("button")
      button.innerHTML = i+1
      button.dataset.index = i
      $fragment.appendChild(button)
    }
    let page = localStorage.getItem("page")
    page ? $fragment.children[page/20].classList.add("active") : $fragment.children[0].classList.add("active")
  $pagination.appendChild($fragment)  
}
}
fetch(`apis/api.php?table=posts`)
.then(res=>res.ok ? res.json() : Promise.reject(res))
.then(json=>{
  let page = localStorage.getItem("page")
  page ? getContent(json,page) : getContent(json);
  pagination(json) 
})
.catch(err=>{
  console.log(err)
  $posts.innerHTML = "<h4>No hay post subidos todavia</h4>"
})


