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
    // $( '.'+proyecto+'' ).draggable({ containment: "#contdrop", scroll: false });

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

//     $('drag').click(function(){
// DragDrop("drag","container");
//     });
    
/*drag and drop*/

 //   function DragDrop(){
 //   $("#dp").draggable();
 //   }
 // $('crearP').click(function(e){
//      DragDrop("drag","drop");
//     });

// function DragDrop(drag, drop) {

// var drag = document.getElementById(drag);
// var drop = document.getElementById(drop);

// drag.ondragstart = function(e)
// {
// //Guardamos el id del elemento para transferirlo al elemento drop
// //Contenido es una clave que nos permitirá acceder al valor asignado
// e.dataTransfer.setData("contenido", e.target.id);
// }

// drop.ondragover = function(e){
// //Cancelar el evento que impide que podamos soltar el elemento drag
// e.preventDefault();
// }

// drop.ondrop = function(e){
// //Obtenemos los datos a través de la clave contenido, en este caso el id
// var id= e.dataTransfer.getData("contenido");
// e.target.appendChild(document.getElementById(id));
// }
// }
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


