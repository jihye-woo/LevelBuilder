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

var scaleX;
var scaleY;
function zoomIn(){
    scaleX = 2;
    scaleY = 2;
    redrawWorkspace(editor.currentMap.LayerList);
}

function zoomOut(){
    scaleX = 0.5;
    scaleY = 0.5;
    redrawWorkspace(editor.currentMap.LayerList);
}

function redrawWorkspace(layers){
    for (let [layerId, layer] of layers) {
        var can = layer.canvasLayer.canvas;
        var ctx = can.getContext("2d");
        ctx.clearRect(0,0,can.width, can.height);
        ctx.scale(can.width*scaleX, can.height*scaleY);
      layer.paintTiles();
    }
  }