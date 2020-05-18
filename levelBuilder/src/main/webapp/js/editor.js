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

var ratioX;
var ratioY;
function zoomIn(){
    // ratioX =2;
    // ratioY =2;

    console.log("scale "+ editor.canScaleX+editor.canScaleY);
    if (editor.zoomcount < 3){
        editor.zoomcount += 1;
        ratioX = Math.pow(editor.canScaleX, editor.zoomcount);
        ratioY = Math.pow(editor.canScaleY, editor.zoomcount);
        console.log("hmm "+ Math.pow(editor.canScaleX, editor.zoomcount));
        zoomRedraw(editor.currentMap.LayerList, ratioX, ratioY);
    }else{
        alert("Cannot zoom in anymore!");
    }
}

function zoomOut(){
    // ratioX =0.5;
    // ratioY =0.5;
    console.log("scale "+ editor.canScaleX+editor.canScaleY);
    if (ratioX > -2){
        editor.zoomcount -= 1;
        ratioX = Math.pow(editor.canScaleX, editor.zoomcount);
        ratioY = Math.pow(editor.canScaleY, editor.zoomcount);
        zoomRedraw(editor.currentMap.LayerList, ratioX, ratioY);
    }else{
        alert("Cannot zoom out anymore!");
    }
}

function zoomRedraw(layers, x, y){
    for (let [layerId, layer] of layers) {
        layer.canvasLayer.removeEvent();
        var can = layer.canvasLayer.canvas;
        var ctx = can.getContext("2d");
        ctx.clearRect(0,0,can.width, can.height);
        can.height = can.height *y;
        can.width = can.width *x;
        editor.grid.zoomGrid();
        // editor.canScaleX = editor.canScaleX *x;
        // editor.canScaleY = editor.canScaleY *y;
        ctx.scale(x,y);
        // console.log("S "+editor.canScaleX + editor.canScaleY);
      layer.paintTiles();
      layer.canvasLayer.zoomInEvent(layer);
    }
  }