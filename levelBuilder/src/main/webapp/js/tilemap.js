
class Grid{
    constructor(w, h, tileWidth, tileHeight){
        this.w = w;
        this.h = h;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.canvas = new Canvas(this.w, this.h);

        // let centerTileX = this.w / this.tileWidth / 2 - 1;
        // let centerTileY = this.h / this.tileHeight / 2 - 1;
        
        // this.tileCursor = new Tilecursor(
        //     this.canvas,
        //     centerTileX,
        //     centerTileY,
        //     this.tileWidth,
        //     this.tileHeight
        // );
    }

    updateCells(){
        // this.canvas.clear();
        this.canvas.drawGrid(this.w, this.h, this.tileWidth, this.tileHeight);
        // this.tileCursor.draw();
    }

}
class Canvas{
    constructor(w, h){ // should be get a layer
        let canvas = document.createElement("canvas");
        canvas.addEventListener('mousemove', function(event) {
            var mousePos = getMousePos(canvas, event);
            var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
            console.log(message);
        });
        this.w = canvas.width = w;
        this.h = canvas.height = h;
        document.getElementsByClassName("Layer1")[0].appendChild(canvas);
        this.ctx = canvas.getContext("2d");
    }
    drawGrid(w, h, tileWidth, tileHeight){
        let cols = (this.w / tileWidth) | 0;
        let rows = (this.h / tileHeight) | 0;

        this.ctx.save();
        this.ctx.strokeStyle = "lightgrey";
        this.ctx.beginPath();

        for(let x =0 ; x<=cols * tileWidth ; x+=tileWidth) {
            this.drawLine(x, 0, x, this.w);
        }

        for(let y =0 ; y<=rows * tileHeight ; y+=tileHeight) {
            this.drawLine(0, y, this.h, y);
        }
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(0, 0, this.w, this.h);
        this.ctx.restore();

    }
    drawLine(x1, y1, x2, y2){
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
    }
}

class Tilecursor{
        constructor(canvas, x, y, tileWidth, tileHeight){
            this.canvas = canvas;
            this.x= x;
            this.y = y;
            this.tileWidth = tileWidth;
            this.tileHeight = tileHeight;
        }
        draw(){
            let[s, ctx] = [this.tileSize, this.canvas.ctx];
    
            ctx.save();
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.strokeRect(this.x*s, this.y*s, s,s);
            ctx.stroke();
            ctx.restore();
        }
    }

function getMousePos(canvasNode, event) {
    var rect = canvasNode.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}


