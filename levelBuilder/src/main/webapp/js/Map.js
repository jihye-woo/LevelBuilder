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

function createNewLayer(layerType, name) {
	var currentMap = editor.currentMap;
	currentMap.addLayer(layerType, name);
    var layers = currentMap.layerlist;
    showList();
	showLayers(layers);
}

function removeLayer(id){
	var currentMap = editor.currentMap;
    currentMap.removeLayer(id);
    showLayers(layers);
    //showList();
}

function showList(type, name){
    var li = document.createElement("li");
    //var inputValue = document.getElementById("myInput").value;
    //var inputValue ="Layer";
    var inputValue = name +"   "+ type;
   // <i class="fa fa-files-o"></i>
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    // if (inputValue === '') {
    //   alert("You must write something!");
    // } else { 
      document.getElementById("myUL").appendChild(li);
   // }
  
//     for (i = 0; i < llist.length; i++) {
//      var showlist = llist[i].name;
        // var t = document.createTextNode(inputValue);
        // li.appendChild(t);

//= function() {
//         var div = this.parentElement;
//         div.style.display = "none";
//       }
//     }
 }

function showLayers(layers){
    // show the layers (UI)
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
        this.csv = Array.from(Array((width)), () => Array((height)));
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
