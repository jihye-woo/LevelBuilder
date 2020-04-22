
class Map{
    constructor(id, mapWidth, mapHeight, tileWidth, tileHeight, layer){
        this.id = id;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.Layer = new Array(layer);
    }

    addLayer(layerType, name){
        var newLayer;
        var id = this.Layer.length;
        // if (layerType == true){ // tiledLayer
        if (layerType === "tile-layer"){ 
          newLayer = new TiledLayer(id, name, this.mapWidth, this.mapHeight, this.tileWidth, this.tileHeight);
        } else {
          newLayer = new ObjectLayer(id, name, this.mapWidth, this.mapHeight);
        }
        this.Layer.push(newLayer);
    }

    removeLayer(id){
        for( var i = this.Layer.length-1; i--;){
            if ( this.Layer[i].id == id)
             this.Layer.splice(i, 1);
            }
    }

    //createGroup(){
    //
    //}
         
    // clone(){
    //     if (!item.type) {    
    //     }
    // }
        
}

function createLayer(layerType) {
	var currentMap = editor.currentMap;
	currentMap.layerlist.addLayer(layerType, name);
	var layers = currentMap.layerlist;
	showLayers(layers);
}

function removeLayer(id){
	var currentMap = editor.currentMap;
    currentMap.layerlist.removeLayer(id);
    showLayers(layers);
}

function showLayers(layers){
    // show the layers (UI)
    var li = document.createElement("li");
    //var inputValue = document.getElementById("myInput").value;
    var inputValue ="Layer";
   // <i class="fa fa-files-o"></i>
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
     document.getElementById("myInput").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
  
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
}


class Layer{
    constructor(id, name, width, height){
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
    }

   // clone(){

    //}
}

class TiledLayer extends Layer{
    constructor(id, name, width, height, tileW, tileH){
        super(id, name, width, height);
        this.tileW = tileW;
        this.tileH = tileH;
        // Array.from(Array(M), () => new Array(N));
        this.csv = Array.from(Array((width/tileW)), () => Array((height/tileH)));
        var lengthOfCSV = this.csv.length;
        for (var i = 0; i < lengthOfCSV; i += 2) {
            for(var j = 0; j < this.csv[0].length; j +=2){
                this.csv[i][j] = 1;
            }
        }
    }
    fillTiles(x, y, canvas){
        var mapGrid = this.csv;
        var tileW = this.tileW;
        var tileH = this.tileH;
        canvas.getContext("2d").fillStyle = "#800000";
        canvas.getContext("2d").fillRect(tileW*x, tileH*y, tileW, tileH);
        console.log("call fillTiles");
        this.csv[x][y] = 1;
    }
    

}

class ObjectLayer extends Layer{
    constructor(id, name, width, height){
        super(id, name, width, height);
        this.objects = new Array(); // insert the MapObject later
    }
}

class MapObject{
    constructor(id, xcoordinate, ycoordinate, height, width, image, properties){
        this.id = id;
        this.xcoordinate = xcoordinate;
        this.ycoordinate = ycoordinate;
        this.visibility = true;
        this.height = height;
        this.width = width;
        this.image = image;
        this.properties = properties;
    }
}
