$(document).ready(function() {
    var posx;
    var posy;
    
    var vector={
     'vec':[],
     'cla':[],
     'posx':[],
     'posy':[],
      'id':[]
    }

function salvar (div,no,id){

       vector.vec.push(div);
       vector.cla.push(no); 
       vector.id.push(id);
       vector.posx.push(div.offsetLeft)
       vector.posy.push(div.offsetTop)
 
         // var c= vector.cla[0];
         // var posx= vector.posx[0];
         // var posy= vector.posy[0];
         // var id = vector.id
   localStorage.setItem('divPersona',vector.cla);
   localStorage.setItem('posy', vector.posy);
   localStorage.setItem('posx', vector.posx);
   localStorage.setItem('id', vector.id);
}
     var person;
    function cargar(){
     var verifica = localStorage.getItem('divPersona')
  
     if(typeof verifica !== 'undefined' && verifica !== null){
       var divs = localStorage.getItem('divPersona').split(',');
       var posx = localStorage.getItem('posy').split(',');
       var posy = localStorage.getItem('posx').split(',');
       var id = localStorage.getItem('id').split(',');
        for (var i = 0 ; divs.length > i; i++) {
           debugger

          var tipoCont = document.getElementById(divs[i]);
          setDatos(posx[i],posy[i],divs[i],id[i]);  
       }
     }
  }
    cargar();

function setDatos(x,y,header,id){
  var tipoDiv;
   var cont;
   var dra;
if(id=='dra'){
tipoDiv = 'div_persona';
cont = 'areaes';
dra= 'draggable=true  ondragstart=" dragStart(event)"'

 $('#panel').slideToggle("slow");

}else{
tipoDiv = 'div_proyecto';
cont = 'containerstyle';
dra = ''
}
    $('.'+cont+'').append('<div id="'+id+'" '+dra+' class=" '+tipoDiv+' '+header+' " ></div>');
    $('.'+header+'').append('<button id="'+header+'" class="delete "></button>');
    $('.'+header+'').append('<div id="'+header+'"class="headerdivP" >'+header+'</div>');
    $('.'+header+'').append('<button id="'+header+'" class="edit "></button>');

    if(id=='dra'){
    $('.'+header+'').append('<button id="mov" ondragstart=" dragStart(event)"  class="move" ></button>');
    }
   if(id=='dp'){
    $('.'+header+'').append('<div id="conp" ondrop="dropConte(event)" ondragover="dropContP(event)" class="divContPe"></div>');
    }
   
   $('.'+header+'').css({
        'position':'absolute',
        'left': x,
        'top':y
     });
     habilitarEdit();
     deletee();
     dragSelect(); 

}
 $('.mov').click(function(){
  alert('a');
  dragStart();
 });
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
     salvar(divAtual,proyecto,'dp');

   
   }else{
      alert("Este proyecto ya Exite");
     }
     $('.texto').val('');

    
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
          $('.'+persona+'').append('<button id="mov" ondragstart=" dragStart(event)"  class="move" ></button>');

            deletee();
            habilitarEdit(); 
            $('.text').val('');
             /*local storage*/
          var divAtual = document.getElementById('dra');
          salvar(divAtual,persona,'dra');
        }else{
        	alert("Esta persona ya exite");
        }
    
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


