import jquery=require('jquery')

let c = 0

window.addEventListener("load", function(){
  
  $("#lpsval").hide()
  $("#cursval").hide()    
  $("#msg").hide()   

  let rutinput:any = document.querySelector('#rut')
  let telinput:any = document.querySelector('#telefono')
  let cursT:any= document.querySelector("#otraT")
  let chbxs1 = document.querySelectorAll('input[name=lps]')
  let chbxs2 = document.querySelectorAll('input[name=cursos]')

  chbxs1.forEach(Element => 
    Element.addEventListener("change", function(){
      if(c == 1){
        checkbox("input[name='lps']",$("#lpsval"),"#lp", false)
      }
    }) 
  )

  chbxs2.forEach(Element => 
    Element.addEventListener("change", function(){
      if(c == 1){
        checkbox("input[name='cursos']",$("#cursval"),"#cursos", true)
      }
    }) 
  )
  cursT.addEventListener("change", function(){
    if(c == 1){
      checkbox("input[name='cursos']",$("#cursval"),"#cursos", true)
    }
  })

  rutinput.addEventListener("change", function(){
    if(c == 1){
      rutCheck()
    }
  })
  
  telinput.addEventListener("change", function(){
    if(c == 1){
      telV()
    }
  })  

})

function rutCheck(){
  let rutEx = new RegExp('^[0-9]+-[0-9kK]{1}')
  let rut:any = $("input[id='rut']")
  if(rutEx.test(rut.val())){
    rut.removeClass("is-invalid")
    rut.addClass("is-valid")
    return true
  }
  rut.removeClass("is-valid")
  rut.addClass("is-invalid")
  return false
}

function telV(){
  let cel = new RegExp('[0-9]{9}')
  let tel:any = $("#telefono")
  if(cel.test(tel.val())){
    tel.removeClass("is-invalid")
    tel.addClass("is-valid")
    return true 
  }
  tel.removeClass("is-valid")
  tel.addClass("is-invalid")
  return false
}

function checkbox(name:any,msg:any, id:any, bo:any){
  if($(name + ":checkbox:checked").length > 0){
    if (bo == true){
      let valC:any= $("#otraT").val()
      if(!$("#otraC").is(":checked") || ($("#otraC").is(":checked") &&  valC.length > 2) ){
        $(id + " :input").removeClass("border-danger")
        $(id + " :input").addClass("border-success")
        if(msg.is(":visible")){msg.hide()}
        return true
      }
    }else{
      $(id + " :input").removeClass("border-danger")
      $(id + " :input").addClass("border-success")
      if(msg.is(":visible")){msg.hide()}
      return true
    }
    
  } 
  $(id + " :input").removeClass("border-success")
  $(id + " :input").addClass("border-danger");
  if(!msg.is(":visible")){msg.show()}
  return false
}

function formV(){
  let tcheck:boolean = true
  let form = document.querySelectorAll('input')
  let ta:any = document.querySelector('textarea')  
  let nv:any = document.querySelector('input[name=inlineRadioOptions]')  
  form.forEach(function(e){ 
      if( e.classList.contains("nv")){
        console.log(e);
        
        if(!e.checkValidity()){
          tcheck = false
        }
      } 
    }
  )
  if(!nv.checkValidity()){
    tcheck = false
  }
  if(!ta.checkValidity()){
    tcheck = false
  }
  return tcheck;
}

$('#enviar').on('click',function(e:any){
  c = 1 
  let rc = rutCheck()
  let telc = telV()
  let cb1c = checkbox("input[name='lps']",$("#lpsval"),"#lp", false)
  let cb2c = checkbox("input[name='cursos']",$("#cursval"),"#cursos", true)
  $('.needs-validation').addClass("was-validated")
  
  if(!formV() || !telc || !rc || !cb1c || !cb2c) {
    e.preventDefault();
    e.stopPropagation()
  }else{
    $("#formulario").hide()
    $("#msg").show() 
    e.preventDefault();
    e.stopPropagation()
  }  
  
})

//LimpiarDatos
$("#cancelar").on('click',function limpiarDatos(e){
  $(".needs-validation").removeClass('was-validated')
  let form = document.querySelectorAll('input')
  form.forEach(function(e){ 
      e.classList.remove("is-valid") 
      e.classList.remove("is-invalid") 
      e.classList.remove("border-danger") 
      e.classList.remove("border-success")
    }
  )
  $("#lpsval").hide()
  $("#cursval").hide()    
  c=0
})