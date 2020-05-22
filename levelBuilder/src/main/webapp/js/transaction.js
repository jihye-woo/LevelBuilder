class Transaction{
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
      }

    undo() {
        if (this.undoStack.length > 0) {
          const action = this._undoStack.pop();
          action.undo();
          this.redoStack.push(action);
        }
    }
    
    redo() {
        if (this.redoStack.length > 0) {
        const action = this.redoStack.pop();
        action.redo();
        this.undoStack.push(action);
        }
    }

    doAction(newAction){
        document.getElementById("redoButton").disabled = true;
        this.redoStack = [];
        this.undoStack.push(newAction);
    }

    updateButtonState(){
        if(this.redoStack.length == 0){
            document.getElementById("redoButton").disabled = true;
        } else{
            document.getElementById("redoButton").disabled = false;
        }
        if(this.undoStack.length == 0){
            document.getElementById("undoButton").disabled = true;
        } else{
            document.getElementById("undoButton").disabled = false;
        }
        
    }
}

class PaintAction {
    constructor (layerId, position, oldcsv, newcsv) {
        this.layerId = layerId;
        this.position = position;
        this.oldcsv = oldcsv;
        this.newcsv = newcsv;
    }
    undo () {
    }
    redo () {
    }
}

class EraseAction {
    constructor (layerId, position, oldcsv, newcsv) {
        this.layerId = layerId;
        this.position = position;
        this.oldcsv = oldcsv;
        this.newcsv = newcsv;
    }
    undo () {
    }
    redo () {
    }
}

class ResizeAction {
    constructor (oldX, oldY, x, y) {
        this.oldX =  oldX;
        this.oldY =  oldY;
        this.x = x;
        this.y = y;
    }

    undo () {
        resizeMap_Helper(oldX, oldY);
    }
    redo () {
        resizeMap_Helper(x, y);
    }
}