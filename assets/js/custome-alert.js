const d = document

const sendAlert = (data)=>{
  let {title,text,btnText="Aceptar",darkmode=false,action=false} = data

  const $alert = d.createElement("div"),
  $title = d.createElement("h3"),
  $div = d.createElement("div"),
  $p = d.createElement("p"),
  $btnClose = d.createElement("button"),
  $btnAccept = d.createElement("button")

  $title.textContent = title
  $p.textContent = text
  $div.appendChild($p)
  $btnAccept.textContent = btnText
  $btnClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentcolor" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>'

  $btnClose.onclick = ()=>d.body.removeChild($btnClose.parentNode)
  $btnAccept.onclick = ()=>{
    d.body.removeChild($btnClose.parentNode)
    if(action) action();
  }
  $alert.classList.add("alert")
  if(darkmode) $alert.classList.add("dark");
  $title.classList.add("alert__title")
  $p.classList.add("alert__text")
  $btnClose.classList.add("alert__btn-close")
  $btnAccept.classList.add("alert__btn")
  $alert.appendChild($title)
  $alert.appendChild($div)
  $alert.appendChild($btnAccept)
  $alert.appendChild($btnClose)
  d.body.appendChild($alert)
}

export default sendAlert