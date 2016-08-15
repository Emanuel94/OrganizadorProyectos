
// function drag_drop(nom){

//  $('.'+nom+'').draggable({ containment: "#contdrop", scroll: false });

// }
function dropContP(e){
e.preventDefault();	
}

function dragStart(e){

e.dataTransfer.setData("contenido",e.target.id)
}

function dropConte(e){
   e.preventDefault();
   var conteni = e.dataTransfer.getData("contenido")
   e.target.appendChild(document.getElementById(conteni));

}


function dragSelect(){
	var selected = $([]), offset = {top:0, left:0}; 
$( "#contdrop > div" ).draggable({
	 containment: "#contdrop", scroll: false,
    start: function(ev, ui) {
        if ($(this).hasClass("ui-selected")){
        	debugger
            selected = $(".ui-selected").each(function() {
               var el = $(this);
               el.data("offset", el.offset());
            });
        }
        else {
            selected = $([]);
            $("#contdrop > div").removeClass("ui-selected");
        }
        offset = $(this).offset();
    },
    drag: function(ev, ui) {
        var dt = ui.position.top - offset.top, dl = ui.position.left - offset.left;
        // take all the elements that are selected expect $("this"), which is the element being dragged and loop through each.
        selected.not(this).each(function() {
             // create the variable for we don't need to keep calling $("this")
             // el = current element we are on
             // off = what position was this element at when it was selected, before drag
             var el = $(this), off = el.data("offset");
            el.css({top: off.top + dt, left: off.left + dl});
        });
    }
});	
}
$( "#contdrop" ).selectable();

// manually trigger the "select" of clicked elements
$( "#contdrop > div" ).click( function(e){
    if (e.metaKey == false) {
        // if command key is pressed don't deselect existing elements
        $( "#contdrop > div" ).removeClass("ui-selected");
        $(this).addClass("ui-selecting");
    }
    else {
        if ($(this).hasClass("ui-selected")) {
            // remove selected class from element if already selected
            $(this).removeClass("ui-selected");
        }
        else {
            // add selecting class if not
            $(this).addClass("ui-selecting");
        }
    }
    
    $( "#contdrop" ).data("selectable")._mouseStop(null);
});

// starting position of the divs
var i = 0;
$("#contdrop > div").each( function() {

    $(this).css({
        top: i * 42 
    });
    i++;
});

// drop.ondragcenter=  function(){
// 	alert('s');
// }
// ondragover = function(e){
// //Cancelar el evento que impide que podamos soltar el elemento drag
//  $(this).addClass( "ui-state-highlight" );
// e.preventDefault();
// }

// ondrop = function(e){
// //Obtenemos los datos a través de la clave contenido, en este caso el id
// var nom = $('#conp').html();
// e.dataTransfer.getData("contenido");

//  e.target.appendChild(document.getElementById(id));
// }
 

