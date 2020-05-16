function moveGrid(element){
    var currentState = element.getAttribute('value');
    
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
        document.getElementsByClassName('Grid')[0].style.zIndex = 0;
    }
}

editor.currentMap.LayerList.get(0).canvasLayer.canvas
// editor.currentMap.LayerList.get(editor.selectedLayerId).canvasLayer.canvas;