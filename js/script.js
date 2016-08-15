$(document).ready(function() {
    var posx;
    var posy;
function salvar (div){
 localStorage.setItem('divPersona', div);
}
var person;
  function cargar(){
    person= localStorage.getItem('divPersona') || 0;
        $('#contdrop').append(person);

  }
  cargar();

 //var divp= localStorage.divPersona;

 
  /*realiza la funcion de eliminar y editar los div de personas y proyectos*/
 function habilitarEdit(){

$('.edit').click(function(){
  var nom = $(this).attr("id"); 
  $('#modal3').openModal();
  $('.text3').val(nom);
  
  $('#btnaceptar').click(function(){
/*se obtiene el nombre de la persona o proyecto */	
     var nombrea = $('.text3').val();
     if($('.'+nombrea+'').length === 0){
     
      $('#'+nom+'').attr("id",''+nombrea+'');
      $('#'+nom+'').html(''+nombrea+'');
      $('#'+nom+'').attr("id",''+nombrea+'');
      $('#'+nom+'').attr("id",''+nombrea+'');
       CambiaClassCont(nom,nombrea);
}
});
});	
}
function CambiaClassCont(nom,nomnew){
     $('.'+nom+'').addClass(nomnew);
     $('.'+nom+'').removeClass(nom);
}
function deletee(){
  $('.delete').click(function(){
  var nompersona = $(this).attr("id"); 
/*si hay personas los copia al area de espera*/
  $('.'+nompersona+'').find('.div_persona').appendTo('#panel');
  $('.'+nompersona+'').remove();
});
}
/* crea el contairne y demas de los proyectos*/

$('.crearp').click(function(){
  var proyecto = $('.texto').val();
  if(proyecto===""){
  	alert('Debe escribir un nombre');
  }else{
  	if ($('.'+proyecto+'').length === 0) {
    $('.containerstyle').append('<div id="dp" class="div_proyecto '+proyecto+'" ></div>');
  	$('.'+proyecto+'').append('<button id="'+proyecto+'" class="delete "></button>');
    $('.'+proyecto+'').append('<div id="'+proyecto+'"class="headerdivP" >'+proyecto+'</div>');
    $('.'+proyecto+'').append('<button id="'+proyecto+'" class="edit" ></button>');
    // aun no se edita
   $('.'+proyecto+'').append('<div id="conp" ondrop="dropConte(event)" ondragover="dropContP(event)" class="divContPe"></div>');
     
     $('.'+proyecto+'').css({
        'position':'absolute',
        'left': posx,
        'top':posy
     });
    habilitarEdit();
     deletee();
     dragSelect(); 
    /*local storage*/
    var divAtual = document.getElementById('dp');
    salvar(divAtual);

    
   }else{
      alert("Este proyecto ya Exite");
     }
     $('.texto').val('');

    // DragDrop("drop", "drop");
}
   });
   $('.crearP').click(function(){
  var persona = $('.text').val();
  if(persona==="")
  {
  	alert('Debe escribir un nombre');
  } else{
     if($('.'+persona+'').length === 0){
          $('.areaes').append('<div id="dra" draggable=true  ondragstart=" dragStart(event)" class=" div_persona  '+persona+'" >'+" "+ '</div>');
          $('.'+persona+'').append('<button id="'+persona+'" class="delete"></button>'); 
          $('.'+persona+'').append('<div id="'+persona+'" class="headerdivP">'+persona+'</div>');
          $('.'+persona+'').append('<button id="'+persona+'"  class="edit" ></button>');
          $('.'+persona+'').append('<button  class="move" ></button>');

            deletee();
            habilitarEdit();
        }else{
        	alert("Esta persona ya exite");
        }
     $('.texto').val('');
  }
     
  });
    $('#menu').hide();
    /* mostramos el menú si hacemos click derecho
    con el ratón */
    $(document).bind("contextmenu", function(evento) {
        $("#menu").css({
            'display': 'block',
            'left': evento.pageX,
            'top': evento.pageY
            });   
       positionProyect(evento.pageX,evento.pageY);
        return false;
    });
    //cuando hagamos click, el menú desaparecerá
    $(document).click(function(e) {
        if (e.button == 0) {
            $('#menu').css("display", "none");
        }
    });
    //controlamos los botones del menú
    $('#menu').click(function(e) {
        // El switch utiliza los IDs de los <li> del menú
        switch (e.target.id) {
            case "crearproyecto":

                 $('#modal1').openModal();
                   $('.texto').focus();

                 break;
            case "crearpersona":
                $('#modal2').openModal();
                $('.text').focus();
                 break;
        }
    });
  /* obtiene los valores de la posicion */
function positionProyect(x,y){
   posx=x;
   posy=y;
}


/*realiza el desplazamiento de panel*/
  $('#flip').click(function(){
     $('#panel').slideToggle("slow");
    });
  /* limpia el imput del modal*/
 
 
});


