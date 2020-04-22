
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
        var id = this.Layer.length
        // if (layerType == true){ // tiledLayer
        if (layerType === "tile-layer"){ 
          newLayer = new TiledLayer(id, name, width, height);
        } else {
          newLayer = new ObjectLayer(id, name, width, height);
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
        this.hegiht = height;
    }

   // clone(){

    //}
}

class TiledLayer extends Layer{
    constructor(id, name, width, height){
        super(id, name, width, height);
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
