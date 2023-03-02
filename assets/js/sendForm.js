import sendAlert from "./custome-alert.js"

export const sendForm = ($form,$btn,actionToSend=false,aditionalData=false)=>{
  $btn.disabled = true
  const formData = new FormData()
  let enviar = true
    try{
      if(!$form.post_title.value) throw new Error("No has puesto un titulo al post")
      formData.append("filename",$form.post_title.value.replace(/\s+/g,"-"))
      formData.append("title",$form.post_title.value.trim());
      if(aditionalData){
        let{name,data} = aditionalData
        formData.append(`${name}`,data)
      }
      const date = new Date()
      let month = date.getMonth()
      let day = date.getDate()
      let FilterMonth = month+1>9 ? month : `0${month+1}`
      let FilterDay = day>9 ? day : `0${day}`      
      formData.append("fecha",`${date.getFullYear()}-${FilterMonth}-${FilterDay}`)
      const $portadaUrl = $form.post_portada_url
      if($portadaUrl.value===""){
        $form.post_portada.files[0]
        ? formData.append("thumbnail",$form.post_portada.files[0])
        : formData.append("thumbnail","assets/portada-default.png");
      }else{
        formData.append("thumbnail",$form.post_portada_url.value.trim())
      }
      let chapters = $form.querySelectorAll(".chapter-option")
      formData.append("num_chapters",chapters.length)

      chapters.forEach((el,i)=>{
        const $inputUrl = el.querySelector('[data-info="portada"]')
        if($inputUrl.value===""){
          el.querySelector('input[type="file"]').files[0]
          ? formData.append(`chapter${i}-thumbnail`,el.querySelector('input[type="file"]').files[0])
          : formData.append(`chapter${i}-thumbnail`,"assets/capitulo-default.png");
        }else{
          formData.append(`chapter${i}-thumbnail`,$inputUrl.value);
        }
        const links = el.querySelectorAll(".chapter-link")
        formData.append(`chapter${i}-num_links`,links.length)
        links.forEach((el,e)=>{
          const $input = el.querySelector("input")
          if($input.value===""){
            enviar = false
            throw new Error("Si añades un capitulo debes tener un enlace para verlo")
          } 
          if(el.querySelector("select").selectedIndex==0){
            enviar = false
            throw new Error("Debes de añadir minimo un servidor")
          }
          formData.append(`chapter${i}-server${e}`,el.querySelector("select").value)
          formData.append(`chapter${i}-link${e}`,el.querySelector("input").value.trim())
        })
      })

    }catch(err){
      enviar=false
      sendAlert({
        title:"Aviso",
        text:err,
        darkmode:true
      })
      $btn.disabled = false
    }
  if(enviar){
    formData.append("action","post")
    fetch("apis/api.php",{
      method:"POST",
      body:formData
    })
    .then(res=>{
      if(res.ok){
        sendAlert({
          title:"Exito!!!",
          text:"El formulario a sido enviado",
          darkmode:true
        })
        actionToSend()
        $btn.disabled = false
      }else{
        Promise.reject(res)
      }
    })
    // .then(res=>res.ok ? res.text() : Promise.reject(res))
    // .then(text=>console.log(text))
    .catch(err=>{
      console.log(err)
      $btn.disabled = false
    })
  }
}
