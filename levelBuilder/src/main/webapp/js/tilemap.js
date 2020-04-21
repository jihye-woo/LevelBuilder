class MapSpace{
    constructor(w, h, tileSize){
        this.w = w || 400;
        this.h = h || 400;
        this.tileSize = tileSize || 20;
        this.canvas = new Canvas(this.w, this.h);
    }

    updateCells(){
        // this.canvas.clear();
        this.canvas.drawGrid(this.w, this.h, this.tileSize);
    }

}
class Canvas{
    constructor(w, h){
        let canvas = document.createElement("canvas");
        this.w = canvas.width = w;
        this.h = canvas.height = h;
        document.getElementsByClassName("editor-border")[0].appendChild(canvas);
        this.ctx = canvas.getContext("2d");
    }
    drawGrid(w, h, s){
                let cols = (this.w / s) | 0;
                let rows = (this.h / s) | 0;
        
                this.ctx.save();
                this.ctx.strokeStyle = "lightgrey";
                this.ctx.beginPath();
        
                for(let x =0 ; x<=cols * s ; x+=s) this.drawLine(x, 0, x, this.w);
                for(let y =0 ; y<=rows * s ; y+=s) this.drawLine(0, y, this.h, y);
        
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.strokeStyle = "lightgrey";
                this.ctx.strokeRect(0, 0, this.w, this.h);
                this.ctx.restore();
        
            }
            drawLine(x1, y1, x2, y2){
                        this.ctx.moveTo(x1, y1);
                        this.ctx.lineTo(x2, y2);
                    }
}

var mapspace = new MapSpace(300, 300, 30);
mapspace.updateCells();
