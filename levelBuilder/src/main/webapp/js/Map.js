class Map{
    constructor(id, mapWidth, mapHeight, tileWidth, tileHeight, layer){
        this.id = id;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.LayerList = new Array(layer);
    }

    addLayer(layerType, name){
        var newLayer;
        var id = this.LayerList.length;
        // if (layerType == true){ // tiledLayer
        if (layerType === "tile-layer"){ 
          newLayer = new TiledLayer(id, name, this.mapWidth, this.mapHeight, this.tileWidth, this.tileHeight);
        } else {
          newLayer = new ObjectLayer(id, name, this.mapWidth, this.mapHeight);
        }
        this.LayerList.push(newLayer);
    }

    removeLayer(id){
        for( var i = 0; i<this.LayerList.length; i++){
            if ( this.LayerList[i].id === id){
                this.LayerList.splice(i,1);
            }
        }
    }

    duplicateLayers(id){
        this.LayerList.splice(id, 0, this.LayerList[id]);
    }

    //createGroup(){
    //
    //}
}

function createNewLayer(layerType, name) {
	var currentMap = editor.currentMap;
	currentMap.addLayer(layerType, name);
    var layers = currentMap.LayerList;
    showList(layers);
	//showLayers(layers);
}

function removeLayer(){
    let id = 2;
	var currentMap = editor.currentMap;
    currentMap.removeLayer(id);
    var layers = currentMap.LayerList;
    showList(layers);
}

function showList(Llist){
      var list = document.getElementById("myUL");
        //var list = document.getElementById("myList");
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
    // for (i = 0; i < list.length; i++) {
    //     console.log("@@"+list.childElementCount +"!"+list.childNodes[i]);
    // }
            // var list = document.getElementById("myUL");
            //    list.removeChild(list.childNodes[i]);
    for (i = 0; i < Llist.length; i++) {
        var li = document.createElement("li");
        var inputValue = Llist[i].name;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        document.getElementById("myUL").appendChild(li);
    }
    
}

function duplicateLayer(){
    let id = 1;
	var currentMap = editor.currentMap;
    currentMap.duplicateLayers(id);
    var layers = currentMap.LayerList;
    showList(layers);

}

function showLayers(layers){
    // show the layers (UI)
}

class Layer{
    constructor(id, name, width, height, mapName){
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
        this.order = id;
        this.mapName = mapName;
        this.layerProp = new LayerProperties(id);
        this.tilesets = new Array();
    }

   // clone(){

    //}
}

class TiledLayer extends Layer{
    constructor(id, name, width, height, mapName, tileW, tileH){
        super(id, name, width, height, mapName);
        this.tileW = tileW;
        this.tileH = tileH;
        this.csv = Array.from(Array((width)), () => Array((height)));
        this.type = "TiledLayer";
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
    constructor(id, name, width, height, mapName){
        super(id, name, width, height);
        this.objects = new Array(); // insert the MapObject later
        this.type = "ObjectLayer";
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

class LayerProperties{
    constructor(){
        this.id = 0;
        this.visible = 1;
        this.locked = 0;
        this.opacity = 1;
        this.verticalOffset = 0;
        this.horizontalOffset = 0;
    }
}

