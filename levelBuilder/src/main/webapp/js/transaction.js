class transaction{
    constructor(paint) {
        this.undoStack = [];
        this.redoStack = [];
        this._shapes = shapes;
      }

    undo() {
        if (this.undoStack.length > 0) {
          const dump = this._undoStack.pop();
          const snapshot = this._shapes.snapshot();
          this.redoStack.push(snapshot);
          this._shapes.restore(dump);
        }
    }
    
    redo() {
        if (this.redoStack.length > 0) {
          const dump = this.redoStack.pop();
          const snapshot = this._shapes.snapshot();
          this.undoStack.push(snapshot);
          this._shapes.restore(dump);
    }
}
    
}