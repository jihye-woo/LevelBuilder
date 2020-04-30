var idL=0;
var selectedLayerName;
class TiledMap{
    constructor(id, mapWidth, mapHeight, tileWidth, tileHeight){
        this.id = id;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.LayerList = new Map();
    }

    addLayer(layerType, name){
        var newLayer;
        var id = idL + 1;
        console.log("idL "+ idL + "id: " +id);
        if (layerType === "tile-layer"){ 
          newLayer = new TiledLayer(id, name, this.mapWidth, this.mapHeight, this.id, this.tileWidth, this.tileHeight);
         
        } else {
          newLayer = new ObjectLayer(id, name, this.mapWidth, this.mapHeight);
        }
        // newLayer.canvas.style.zIndex = 0;
        this.LayerList.set(this.LayerList.size, newLayer);
        idL = idL + 1;
    }

    removeLayer(Lname){
        console.log("removeL"+Lname);
        for( var i = 0; i<this.LayerList.length; i++){
            if ( this.LayerList.get(i).name === Lname){
                this.LayerList.splice(i,1);
            }
        }
    }

    duplicateLayers(Lname){
        var index;
        for( var i = 0; i<this.LayerList.length; i++){
            if ( this.LayerList.get(i).name === Lname){
                index = i;
                console.log("print index "+ index);
            }
        }
        var nameL = this.LayerList.get(index).name + " 2";
        var Lid = this.LayerList.get(index).id + 20;
        var newLayer = new TiledLayer(Lid, nameL, this.mapWidth, this.mapHeight, this.mapName, this.tileWidth, this.tileHeight);
        this.LayerList.splice(index+1, 0, newLayer);
    }

    findLocation(Lname){
        var find;
        for( var i = 0; i<this.LayerList.length; i++){
            if ( this.LayerList.get(i).name === Lname){
                console.log("f"+i);
                find = i;
                return find;
            }
        }
    }
    
    lowerLayer(){
        var selectedLayerId = editor.selectedLayerId;
        var layers = editor.currentMap.LayerList;

        if(selectedLayerId < layers.size-1){
            // update order value in Layer object
            layers.get(selectedLayerId).order = selectedLayerId+1;
            layers.get(selectedLayerId+1).order = selectedLayerId;

            // update LayerList order
            var temp = layers.get(selectedLayerId);
            layers.set(selectedLayerId, layers.get(selectedLayerId+1));
            layers.set(selectedLayerId+1, temp);

            editor.selectedLayerId = selectedLayerId+1;
            showList(layers);
        }
    }
    // lowerLayer(Lname){
    //     var selected;
    //     var selectedBelow;

    //     var index = this.findLocation(Lname);
    //     console.log("index clicked "+index);
    //     selected = this.LayerList[index];
    //     selectedBelow = this.LayerList[index+1];
    //     this.LayerList.splice(index+1,1);
    //     this.LayerList.splice(index,1);
    //     this.LayerList.splice(index, 0, selectedBelow);
    //     this.LayerList.splice(index+1, 0, selected);
    // }

    upperLayer(selectedLayerId){
        var selectedLayerId = editor.selectedLayerId;
        var layers = editor.currentMap.LayerList;
        if(selectedLayerId> 0){
            // update order value in Layer object
            layers.get(selectedLayerId).order  = selectedLayerId-1;
            layers.get(selectedLayerId-1).order  = selectedLayerId;
            
            // update LayerList order
            var temp = layers.get(selectedLayerId);
            layers.set(selectedLayerId, layers.get(selectedLayerId-1));
            layers.set(selectedLayerId-1, temp);
            console.log(selectedLayerId);
            editor.selectedLayerId = selectedLayerId -1;
            console.log(selectedLayerId);

            showList(layers);
        }
    }
    // upperLayer(Lname){
    //     var selected;
    //     var selectedAbove;
    //     for( var i = 0; i<this.LayerList.length; i++){
    //         if ( this.LayerList[i].name === Lname){
    //             //console.log("select index "+ i);
    //             selected = this.LayerList[i];
    //             selectedAbove = this.LayerList[i-1];
    //             this.LayerList.splice(i,1);
    //             this.LayerList.splice(i-1,1); 
    //             this.LayerList.splice(i-1, 0, selected);
    //             this.LayerList.splice(i, 0, selectedAbove);
               
    //         }
    //     }
    // }

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
    var currentMap = editor.currentMap;
    currentMap.removeLayer(selectedLayerName);
    var layers = currentMap.LayerList;
    for (var i=0; i<layers.length; i++) {
        console.log("r"+ layers.get(i).name);
    }
    showList(layers);
}

document.getElementById("myUL").addEventListener("click", function(e) {
    if (e.target && e.target.matches("li.layerlist")) {
    //   e.target.className = "foo"; // new class name here
    //   alert("clicked " + e.target.innerText);
      editor.selectedLayerId = parseInt(e.target.id);
      selectedLayerName = e.target.innerText;
      console.log("clicked  "+e.target.innerText);
      console.log(editor.selectedLayerId);
      console.log(e.target);
    }
  });

function showList(Llist){ // Llist == layer lists in current Map
    var list1 = document.getElementById("myUL");
    while (list1.hasChildNodes()) {
        list1.removeChild(list1.firstChild);
    }
    
    Llist.forEach(function(layer){ // listing by order
        // reorder the layer list
        var li = document.createElement("li");
        li.id = layer.order;
        var inputValue = layer.name;
        var layername = document.createTextNode(inputValue);
        li.appendChild(layername);
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = 1;
        checkbox.name = "todo[]";
        li.appendChild(checkbox);
        li.className = "layerlist";
        document.getElementById("myUL").appendChild(li);

        // reorder the real canvas layer 
        layer.canvasLayer.canvas.style.zIndex = layer.order;
    });
    

}
// function showList(Llist){ // Llist == layer lists in current Map
//     var list1 = document.getElementById("myUL");
//     //var list = document.getElementById("myList");
//     while (list1.hasChildNodes()) {
//         list1.removeChild(list1.firstChild);
//     }
    
//     for (i = 0; i < Llist.length; i++) {
//         var li = document.createElement("li");
//         li.id = Llist[i].id;
//         li.setAttribute("order", Llist[i].order);
//         var inputValue = Llist[i].name;
//         var t = document.createTextNode(inputValue);
//         li.appendChild(t);
//         li.className = "layerlist";
//         document.getElementById("myUL").appendChild(li);
//     }

// }

function duplicateLayer(){
    // currentMap.duplicateLayers(selectedLayerName);
    editor.currentMap.duplicateLayers(selectedLayerName);
    showList(editor.currentMap.LayerList);

}

function moveLayerDown(){
    editor.currentMap.lowerLayer();
    // showList(editor.currentMap.LayerList);
}

function moveLayerUp(){
    editor.currentMap.upperLayer();
    // showList(editor.currentMap.LayerList);
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
        this.order = id; // order should be changed
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
        this.csv = Array.from(Array((width)), () => Array((height)).fill(0));
        this.type = "TiledLayer";
        this.canvasLayer = new Canvas(width, height, tileW, tileH, this);
    }

    // fillTiles(x, y, canvas){
    //     var tileW = this.tileW;
    //     var tileH = this.tileH;

    //     var ctx = canvas.getContext("2d");
    //     var img = document.getElementById(currentTileID);
    //     // ctx.drawImage(img, tileW*x, tileH*y);
    //     ctx.drawImage(img, tileW*x, tileH*y, 50,50);
    //     // canvas.getContext("2d").fillStyle = "#800000";
    //     // canvas.getContext("2d").fillRect(tileW*x, tileH*y, tileW, tileH);
    //     console.log("call fillTiles");
    //     this.csv[x][y] = 1;
    // }
    fillTiles(x, y){
        // this.canvasLayer.canvas.getContext("2d").fillStyle = "#FF9896";
        this.canvasLayer.canvas.getContext("2d").fillRect(this.tileW*x, this.tileH*y, this.tileW, this.tileH);
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

