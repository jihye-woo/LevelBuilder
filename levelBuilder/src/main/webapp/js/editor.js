function selectEditorTool(commendAction){
    if(commendAction == 'move'){
        editor.grid.onDragEvent();
        document.getElementById('btn-editor-move').onclick = selectEditorTool('donotMove');
    } 
    else if(commendAction == 'donotMove'){
        editor.grid.offDragEvent();
        document.getElementById('btn-editor-move').onclick = selectEditorTool('move');
    }
}