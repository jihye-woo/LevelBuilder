function moveGrid(element){
    var currentState = element.getAttribute('value');
    var layerList = editor.currentMap.LayerList;
    var topLayerIndex = layerList.size-1;
    var targetLayer = layerList.get(topLayerIndex);
    if(targetLayer.layerProp.locked == 0){
        if(currentState == 'doNotMove'){
            element.className += " active";
            element.setAttribute('value','move');
            editor.grid.onDragEvent();
            document.getElementsByClassName('Grid')[0].style.zIndex = 999;
        }
        else if(currentState == 'move'){
            element.className = element.className.replace(" active", "");
            element.setAttribute("value","doNotMove");
            editor.grid.offDragEvent();
            document.getElementsByClassName('Grid')[0].style.zIndex = "";
        }
    }
}

editor.currentMap.LayerList.get(0).canvasLayer.canvas;
// editor.currentMap.LayerList.get(editor.selectedLayerId).canvasLayer.canvas;

// var scaleX= editor.currentMap.mapWidth * editor.currentMap.tileWidth;
// var scaleY= editor.currentMap.mapHeight * editor.currentMap.tileHeight;
var ratioX;
var ratioY;
function zoomIn(){
     ratioX = 2;
     ratioY = 2;
    redrawWorkspace(editor.currentMap.LayerList, ratioX, ratioY);
}

function zoomOut(){
     ratioX = 0.5;
     ratioY = 0.5;
    //  scaleX = can.width;
    //  scaleY =can.height;
    //  console.log("scale "+ scaleX + " / "+scaleY);
    redrawWorkspace(editor.currentMap.LayerList, ratioX, ratioY);
}

function redrawWorkspace(layers, x, y){
    var scaleX;
    var scaleY;
    for (let [layerId, layer] of layers) {
        var can = layer.canvasLayer.canvas;
        var ctx = can.getContext("2d");
        ctx.clearRect(0,0,can.width, can.height);
        can.height = can.height *y;
        can.width = can.width *x;
        ctx.scale(x,y);
      layer.paintTiles();
    }
  }