/* map pin */
$(document).ready(function(){

    $('#image-map').css({'width':$('#image-map img').width(),
                      'height':$('#image-map img').height()
    })
    
    var tooltipDirection;
                 
    for (i=0; i<$(".pin").length; i++)
    {               
        if ($(".pin").eq(i).hasClass('pin-down')) {
            tooltipDirection = 'tooltip-down';
        } else {
            tooltipDirection = 'tooltip-up';
            }
    
        $("#image-map").append("<div style='left:"+$(".pin").eq(i).data('xpos')+"px;top:"+$(".pin").eq(i).data('ypos')+"px' class='" + tooltipDirection +"'>\
                                            <div class='tooltip'>" + $(".pin").eq(i).html() + "</div>\
                                    </div>");
    }    
    
    $('.tooltip-up, .tooltip-down').mouseenter(function(){
                $(this).children('.tooltip').fadeIn(100);
            }).mouseleave(function(){
                $(this).children('.tooltip').fadeOut(100);
            })
  });
  
  /* puzzle game */
  function swapTiles(cell1, cell2) {
    var tempC = document.getElementById(cell1).className;
    var tempS = document.getElementById(cell1).style.cssText;
  
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell1).style.cssText = document.getElementById(cell2).style.cssText;
  
    document.getElementById(cell2).className = tempC;
    document.getElementById(cell2).style.cssText = tempS;
  }
  
  function clickTile(row, column) {
    var cell = document.getElementById("cell"+row+column);
    var tile = cell.className;
    if (tile.includes("tile9")) return; 
  
    if (column < 3) {
      if (document.getElementById("cell"+row+(column+1)).className.includes("tile9")) {
        swapTiles("cell"+row+column,"cell"+row+(column+1));
        return;
      }
    }
    if (column > 1) {
      if (document.getElementById("cell"+row+(column-1)).className.includes("tile9")) {
        swapTiles("cell"+row+column,"cell"+row+(column-1));
        return;
      }
    }
    if (row > 1) {
      if (document.getElementById("cell"+(row-1)+column).className.includes("tile9")) {
        swapTiles("cell"+row+column,"cell"+(row-1)+column);
        return;
      }
    }
    if (row < 3) {
      if (document.getElementById("cell"+(row+1)+column).className.includes("tile9")) {
        swapTiles("cell"+row+column,"cell"+(row+1)+column);
        return;
      }
    }
  }
  
  function shuffle() {
      for (var row=1;row<=3;row++) {
        for (var column=1;column<=3;column++) {
        
          var row2=Math.floor(Math.random()*3 + 1);
          var column2=Math.floor(Math.random()*3 + 1);
          
          swapTiles("cell"+row+column,"cell"+row2+column2);
      } 
    }
  }
  
  function changeBackgroundImage(imageUrl) {
    var tiles = document.getElementsByClassName('tile');
    var positions = [
      '0% 0%', '50% 0%', '100% 0%',
      '0% 50%', '50% 50%', '100% 50%',
      '0% 100%', '50% 100%', '100% 100%'
    ];
  
    for (var i = 0; i < tiles.length; i++) {
      if (i === 8) { 
        tiles[i].style.backgroundImage = 'none';
        tiles[i].style.background = 'white';
        tiles[i].className = 'tile tile9';
      } else {
        tiles[i].style.backgroundImage = `url('${imageUrl}')`;
        tiles[i].style.backgroundPosition = positions[i];
        tiles[i].style.backgroundSize = '300% 300%';
        tiles[i].className = 'tile';
      }
    }
    shuffle();
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    changeBackgroundImage('https://media.australian.museum/media/dd/images/Some_image.width-800.ad79258.jpg'); // default to Ardipithecus
});