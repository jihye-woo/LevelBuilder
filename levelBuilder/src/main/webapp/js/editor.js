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

function zoomIn(){
    var zoomFeature = editor.zoomFeature;
    if (zoomFeature.zoomcount < 3){
        zoomFeature.zoomcount += 1;
        zoomFeature.scaleX = 2;
        zoomFeature.scaleY = 2;
        zoomFeature.ratioX = Math.pow(zoomFeature.canScaleX, zoomFeature.zoomcount);
        zoomFeature.ratioY = Math.pow(zoomFeature.canScaleY, zoomFeature.zoomcount);
        zoomRedraw(editor.currentMap.LayerList, zoomFeature.ratioX, zoomFeature.ratioY);
    }else{
        alert("Cannot zoom in anymore!");
    }
}

function zoomOut(){
    var zoomFeature = editor.zoomFeature;
    if (editor.zoomcount > -3){
        editor.zoomcount -= 1;
        zoomFeature.scaleX = 0.5;
        zoomFeature.scaleY = 0.5;
        zoomFeature.ratioX = Math.pow(zoomFeature.canScaleX, zoomFeature.zoomcount);
        zoomFeature.ratioY = Math.pow(zoomFeature.canScaleY, zoomFeature.zoomcount);
        zoomRedraw(editor.currentMap.LayerList, zoomFeature.ratioX, zoomFeature.ratioY);
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
        can.height = can.height * scaleY;
        can.width = can.width * scaleX;
        editor.grid.zoomGrid(parseInt((can.style.left).replace("px", "")), parseInt((can.style.left).replace("px", "")));
        ctx.scale(x,y);
      layer.paintTiles();
      layer.canvasLayer.zoomInEvent(layer);
    }
  }