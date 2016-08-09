$(document).ready(function() {
	
/*realiza la funcion de eliminar y editar los div de personas y proyectos*/
 function habilitarEdit(){

$('.edit').click(function(){
  var nom = $(this).attr("id"); 
  var nomrespaldo=""; 
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
  $('.'+nompersona+'').remove();
         

});
}
/* crea el contairne y demas de los proyectos*/

$('.crearp').click(function(evento){
  var proyecto = $('.texto').val();
  if(proyecto===""){
  	alert('Debe escribir un nombre');
  }else{
  	if ($('.'+proyecto+'').length === 0) {
    $('.containerstyle').append('<div id="dp" class="div_proyecto   '+proyecto+'" ></div>');
  	$('.'+proyecto+'').append('<button id="'+proyecto+'" class="delete "></button>');
    $('.'+proyecto+'').append('<div id="'+proyecto+'"class="headerdivP" >'+proyecto+'</div>');
    $('.'+proyecto+'').append('<button id="'+proyecto+'" class="edit" ></button>');
    habilitarEdit();
     deletee();
     drag_drop(''+proyecto+'');
    
   }else{
      alert("Este proyecto ya Exite");
     }
     clear($('.texto'));
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
          $('.areaes').append('<div id="drag " class="div_persona  '+persona+'" >'+" "+ '</div>');
          $('.'+persona+'').append('<button id="'+persona+'" class="delete"></button>'); 
          $('.'+persona+'').append('<div id="'+persona+'" class="headerdivP">'+persona+'</div>');
          $('.'+persona+'').append('<button id="'+persona+'"  class="edit" ></button>');
            deletee();
            habilitarEdit();
           $('#drag').draggable();
        }else{
        	alert("Esta persona ya exite");
        }
        clear($('.text')); 
  //DragDrop("drag", "drop");
  }
  // $('.divproyecto').css({
     //    'position':'absolute',
     //    'left': evento.pageX,
     //    'top':evento.pageY
     // });
   
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
                 break;
            case "crearpersona":
                $('#modal2').openModal();
                 break;
        }
    });


/*realiza el desplazamiento de panel*/
  $('#flip').click(function(){
     $('#panel').slideToggle("slow");
    });
  /* limpia el imput del modal*/
  function clear(selector){
  	selector.val('');
  }
    function focus(selector){
  	selector.focus();
}
});


