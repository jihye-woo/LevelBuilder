 
 
function myCheck() {
  var checkBox = document.getElementById("collectionOfImg");
  var checkBox2 = document.getElementById("basedOnTileSetImg");
  var text = document.getElementById("text");
  var text2 = document.getElementById("txt");
  if (checkBox.checked == true){
    text.style.display = "block";
  } else if (checkBox2.checked == true){
     text2.style.display = "block";
  } else {
     text.style.display = "none";
     text2.style.display = "none";
  }
}

let windowBackgroundTint = document.querySelector(".window-tint");
let createMapWindow = document.querySelector("#create-map-window");
let createTileSetWindow = document.querySelector("#create-tileset-window");
let createLayerWindow = document.querySelector("#create-layer-window");
let aboutWindow = document.querySelector("#about");

function newMap() {  
showWindow(createMapWindow);
}

function newTileSet() {  
showWindow(createTileSetWindow);
}
function newLayer() {  
  showWindow(createLayerWindow);
  }

function cancelCreateMap() {  
  closeWindow(createMapWindow);
}

function cancelCreateTileSet() {  
  closeWindow(createTileSetWindow);
}

function cancelCreateLayer() {  
  closeWindow(createLayerWindow);
}
function saveAs() {  
showWindow(saveas);
}

function cancelSaveAs() {  
  closeWindow(saveas);
}

function aboutLB() {  
  console.log("about");
  showWindow(aboutWindow);
  }
  
  function cancelAbout() {  
    closeWindow(aboutWindow);
  }

function createMap() {
  let mapType = "top";

  var mapWidth = document.getElementById("map-width").value;
  var mapHeight = document.getElementById("map-height").value;
  var tileWidth = document.getElementById("tile-width").value;
  var tileHeight = document.getElementById("tile-height").value;
  // var mapName = document.getElementById("map-name").value;
  var mapName = "test.tmx";
  //var mapName = document.getElementById("map-name").value;

  // 1. create Map and Layer objects
  var newLayer = new TiledLayer(1, "Tile Layer 1", mapWidth, mapHeight);
  console.log(newLayer);
  var newMap = new Map(mapName, mapWidth, mapHeight, tileWidth, tileHeight, newLayer);
  console.log(newMap);
  // 2. save data ( ajax request )
  var mapXML = MapXML(newMap.mapWidth, newMap.mapHeight, newMap.tileWidth, newMap.tileheight, newLayer);
  console.log(mapXML);
  var jsonMap = getMapJSON(newMap);
  console.log(jsonMap);
  save(jsonMap);

  // 3. load map
  // load(newMap.name);

  // 4. create XML File
  //createMapXMLFile(mapXML, mapName);

  // create map object and load 
  closeWindow(createMapWindow);
    // 1. create Map and Layer objects
    var newLayer = new TiledLayer(1, "Tile Layer 1", mapWidth, mapHeight);
    console.log(newLayer);
    var newMap = new Map(mapName, mapWidth, mapHeight, tileWidth, tileHeight, newLayer);
    console.log(newMap);
    // 2. save data ( ajax request )
    var mapXML = MapXML(newMap.mapWidth, newMap.mapHeight, newMap.tileWidth, newMap.tileheight, newLayer);
    console.log(mapXML);
    var jsonMap = getMapJSON(newMap);
    console.log(jsonMap);
    save(jsonMap);

  // for(let radio of document.getElementsByClassName("map-perspective")) {if (window.CP.shouldStopExecution(29)){break;}    
  //   if (radio.checked) {
  //     mapType = radio.value;
  //     break;
  //   }   
  //   }
}
// window.CP.exitedLoop(29);

function createSingleTileSet() {  
  var imageSource = document.getElementById("myFile").value;
  console.log(imageSource);
  closeWindow(createTileSetWindow);
  createTilesetXML("filename", "20", "20", "1", "1", "15", "3");
  
 // createImageTilesetXML(name, tilewidth, tilehegiht, spacing, margin, imagesource)
 // createCollectionTilesetXML(name)
}
function createCollectionTileSet() {  
  var tilesetcollectionName = document.getElementById("TilesetName").value;
  console.log(tilesetcollectionName);
  closeWindow(createTileSetWindow);
  createTilesetXML("filename", "20", "20", "1", "1", "15", "3");
 // createImageTilesetXML(name, tilewidth, tilehegiht, spacing, margin, imagesource)
 // createCollectionTilesetXML(name)
}

function createLayer() {  
    var ele = document.getElementsByName('layerType'); 
    let layerType = "tile-layer";
    var layerName = document.getElementById("input-layer").value;

    for(i = 0; i < ele.length; i++) { 
      if(ele[i].checked) {
        layerType = ele[i].value;
      }
    } 
    // console.log(layerType);
    // console.log(layerName);

  closeWindow(createLayerWindow);
  showList(layerType, layerName);
  //createNewLayer(layerType, layerName);
  console.log("!!");

  // if (layerType === "object-layer") {
  //   let layer = Map.addLayer(layerType, layerName);
  // } else {
  //   let layer = Map.addLayer(layerType, layerName);
  // }

//     var li = document.createElement("li");
// e(layerName);
//     li.appendChild(t);

//     if (layerName === '') {
//       alert("You must write something!");
//     } else {
//       document.getElementById("myUL").appendChild(li);
//     }
  
}

function showWindow(hwnd) {
      hwnd.style.display = "block";
      windowBackgroundTint.style.display = "block";
      isWindowOpen = true;
    }

    function closeWindow(hwnd) {
      hwnd.style.display = "none";
      windowBackgroundTint.style.display = "none";
      isWindowOpen = false;
    }

  function myFunction() {
  var x = document.getElementById("myFile");
  x.disabled = true;
}

function mySelect() {
  var tileSetType = document.forms[0];
  var txt = "";
  var i;
  for (i = 0; i < tileSetType.length; i++) {
    if (tileSetType[i].checked) {
      txt = txt + tileSetType[i].value + " ";
    }
  }
  document.getElementById("order").value = "You ordered a coffee with: " + txt;
}

    function openTab(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }
    document.getElementById("defaultOpen").click();
    
    function createMapXMLFile(xmlFile, name) {
        var xml = new XMLSerializer().serializeToString(xmlFile);
        var blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
        saveAs(blob, name+".tmx");
  }

    function about(){

    }


  function MapXML(width, height, tilewidth, tileheight, layer)
  {
      var doc = document.implementation.createDocument(null, null);
      var mapElem = doc.createElement("map");
      mapElem.setAttribute("version", "1.2");
      mapElem.setAttribute("tiledversion", "1.3.2");
      mapElem.setAttribute("orientation", "isometric");
      mapElem.setAttribute("renderoreder", "right-down");
      mapElem.setAttribute("compressionlevel", "-1");
      mapElem.setAttribute("width", width);
      mapElem.setAttribute("height", height);
      mapElem.setAttribute("tilewidth", width);
      mapElem.setAttribute("tileheight", height);
      mapElem.setAttribute("infinite", "0");
      mapElem.setAttribute("nextlayerid", "2");
      mapElem.setAttribute("nextobjectid", "1");  

      var layerElem = doc.createElement("layer");
      layerElem.setAttribute("id", "1");
      layerElem.setAttribute("name", "Tile Layer 1");
      layerElem.setAttribute("width", width);
      layerElem.setAttribute("height", height);
      
      var dataElem = doc.createElement("data");
      dataElem.setAttribute("encoding", "csv");
      var csvArr = Array(width*height).fill(0);
      var csv = csvArr.join(",");
      var node = doc.createTextNode(csv);

      mapElem.appendChild(layerElem);
      layerElem.appendChild(dataElem);
      dataElem.appendChild(node);
      doc.appendChild(mapElem);
      return doc;
  }

   function createImageTilesetXML(name, tilewidth, tilehegiht, spacing, margin, imagesource) {
         var xml = new XMLSerializer().serializeToString(ImageTilesetXML(name, tilewidth, tilehegiht, spacing, margin, imagesource));
         var blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
         saveAs(blob, name+".tsx");
   }

   function ImageTilesetXML(name, tilewidth, tilehegiht, spacing, margin, imagesource)
 {
     var doc = document.implementation.createDocument(null, null);
     var tilesetElem = doc.createElement("tileset");
     tilesetElem.setAttribute("version", "1.2");
     tilesetElem.setAttribute("tiledversion", "1.3.2");
     tilesetElem.setAttribute("name", name);
     tilesetElem.setAttribute("tilewidth", tilewidth);
     tilesetElem.setAttribute("tilehegiht", tilehegiht);
     tilesetElem.setAttribute("spacing", spacing);
     tilesetElem.setAttribute("margin", margin);
     tilesetElem.setAttribute("tilecount", tilecount);
     tilesetElem.setAttribute("columns", "3"); 
     var imageElem = doc.createElement("image");
     imageElem.setAttribute("source", imagesource);
     // function for getting imagewidth, imageHeight from the source
     var newImg = getImage(imagesource);
     imageElem.setAttribute("width", newImg.width);
     imageElem.setAttribute("height", newImg.height);
    
     tilesetElem.appendChild(imageElem);
     doc.appendChild(tilesetElem);
     return doc;
 }


 function createCollectionTilesetXML(name) {
         var xml = new XMLSerializer().serializeToString(CollectionTilesetXML(name));
         var blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
         saveAs(blob, name+".tsx");
   }

   function CollectionTilesetXML(name)
 {
   // tilewidth, tileheght
     var doc = document.implementation.createDocument(null, null);
     var tilesetElem = doc.createElement("tileset");
     tilesetElem.setAttribute("version", "1.2");
     tilesetElem.setAttribute("tiledversion", "1.3.2");
     tilesetElem.setAttribute("name", name);
     tilesetElem.setAttribute("tilewidth", 1);
     tilesetElem.setAttribute("tilehegiht", 1);
     tilesetElem.setAttribute("tilecount", 0);
     tilesetElem.setAttribute("columns", 0);
    
     doc.appendChild(tilesetElem);
     return doc;
 }

 function createImageTilesetXML(name, tilewidth, tilehegiht, spacing, margin, imagesource) {
  var xml = new XMLSerializer().serializeToString(ImageTilesetXML(name, tilewidth, tilehegiht, spacing, margin, imagesource));
  var blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
  saveAs(blob, name+".tsx");
}

function ImageTilesetXML(name, tilewidth, tilehegiht, spacing, margin, imagesource)
{
var doc = document.implementation.createDocument(null, null);
var tilesetElem = doc.createElement("tileset");
tilesetElem.setAttribute("version", "1.2");
tilesetElem.setAttribute("tiledversion", "1.3.2");
tilesetElem.setAttribute("name", name);
tilesetElem.setAttribute("tilewidth", tilewidth);
tilesetElem.setAttribute("tilehegiht", tilehegiht);
tilesetElem.setAttribute("spacing", spacing);
tilesetElem.setAttribute("margin", margin);
tilesetElem.setAttribute("tilecount", tilecount);
tilesetElem.setAttribute("columns", "3"); 
var imageElem = doc.createElement("image");
imageElem.setAttribute("source", imagesource);
// function for getting imagewidth, imageHeight from the source
var newImg = getImage(imagesource);
imageElem.setAttribute("width", newImg.width);
imageElem.setAttribute("height", newImg.height);

tilesetElem.appendChild(imageElem);
doc.appendChild(tilesetElem);
return doc;
}


function getImage(imagesrc){
  var newImage = new Image();
  newImage.src = imagesrc;
  return newImage;
}

function getMapJSON(mapData){
  return {
          "name" : mapData.id,
          "mapwidth" : mapData.mapWidth,
          "mapheight" : mapData.mapHeight,
          "tilewidth" : mapData.tileWidth,
          "tileheight" : mapData.tileHeight,
          "tilelayerformat" : "csv",
          "orientation" : "orthogonal",
          "tilerenderorder" : "right-down",
  }
}

function save(map){
  console.log(map);
  var save_endpoint = "save_map";
  // var helper = new XMLSerializer();
  //helper.serializeToString(mapXML)
    $.ajax({
      type : "POST",
      contentType: "application/json",
      url : "/fileController/" + save_endpoint,
      data : JSON.stringify(map),
      dataType : 'json',
      processData: false, 
    
    error : function(e){
      alert("save error occurred");
       console.log("XML Saving Failed");
    },

    success : function(data) {
        console.log(data);
        console.log("save success!");
    }
  });
}

function load(fileName){
  var load_endpoint = "load_file";
  var helper = new XMLSerializer();
   $.ajax({
      type : "POST",
      url : "/fileController/" + load_endpoint,
    data : JSON.stringify({"filename" : fileName}),
    contentType: "application/json",
    dataType : 'xml',
    processData: false, 
    
    error : function(e){
      alert("save error occurred");
      console.log("XML Loading Failed");
    },

        success : function(data) {
      console.log(data);
            console.log("load success!");
    }
  });
}


// function save(mapXML){
// $.ajax({
//       type : "POST",
//       contentType: "application/xml",
//       url : "/fileController/save_map",
//       data : JSON.stringify({
//             "type" : "FeatureCollection",
//             "features" : []
//          }),
//       dataType : 'json',
   
//       success : function(data) {

//       console.log("success load");
//       }

//    });
// }

// function createLayerGroup() {
//   var li = document.createElement("li");
//   //var inputValue = document.getElementById("myInput").value;
//   var inputValue ="Group";
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//    document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");

//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// } 

// function createLayer() {
//   var li = document.createElement("li");
//   //var inputValue = document.getElementById("myInput").value;
//   var inputValue ="Layer";
//  // <i class="fa fa-files-o"></i>
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//    document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");

//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// } 

// function createTileGroup() {
//   var lis = document.createElement("li");
//   //var inputValue = document.getElementById("myInput").value;
//   var inputValue ="Group";
//   var t = document.createTextNode(inputValue);
//   lis.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(lis);
//   }
//    document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");

//   lis.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// } 
// function createTile() {
//   var lis = document.createElement("li");
//   //var inputValue = document.getElementById("myInput").value;
//   var inputValue ="Layer";
//  // <i class="fa fa-files-o"></i>
//   var t = document.createTextNode(inputValue);
//   lis.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(lis);
//   }
//    document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");

//   lis.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// } 
