
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

  var mapWidth = parseInt(document.getElementById("map-width").value);
  var mapHeight = parseInt(document.getElementById("map-height").value);
  var tileWidth = parseInt(document.getElementById("tile-width").value);
  var tileHeight = parseInt(document.getElementById("tile-height").value);
  var mapName = document.getElementById("map-name").value;

  var newLayer = new TiledLayer(0, "Layer1", mapWidth, mapHeight, mapName, tileWidth, tileHeight);
  var newMap = new Map(mapName, mapWidth, mapHeight, tileWidth, tileHeight, newLayer);

  save(newMap, newMap.LayerList);
  
  // loadAll(newMap.id);

  editor.loadMap(newMap);
  var grid = new Grid(newLayer);
  grid.updateCells();
  var layers = editor.currentMap.LayerList;
  showList(layers);

  // create map object and load 
  closeWindow(createMapWindow);
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
  //showList(layerType, layerName);
  createNewLayer(layerType, layerName);
  //console.log("!!");

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


function save(newMap, newLayers){
  var jsonMap = getMapJSON(newMap);
  var jsonLayers = getLayerJSON(newLayers);

  let saveMapResult = saveMap(jsonMap);
  let saveLayerResult = saveLayer(jsonLayers["layers"]);
  let saveLayerPropResult = saveLayerProp(jsonLayers["layerProps"]);

  $.when(saveMapResult, saveLayerResult, saveLayerPropResult).then(function(){
    loadAll(newMap.id)
    .then(data => {
      console.log("returned data : "+data);
    })
    .catch(error => {
      console.log(error);
    })
  });
}

function createCollectionTileSet(){
  var collectionName = document.getElementById("TilesetName").value;
  var newLayer = new TiledLayer(0, "Layer1", mapWidth, mapHeight, mapName, tileWidth, tileHeight);
  closeWindow(createTileSetWindow);
}

function PreviewImage() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("fileElem").files[0]);

  oFReader.onload = function (oFREvent) {
      document.getElementById("uploadPreview").src = oFREvent.target.result;
  };
};

const fileSelect = document.getElementById("fileSelect"),
fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function (e) {
if (fileElem) {
fileElem.click();
}
}, false);

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
      tablinks = document.getElementsByClassName("tab-header1");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }
    document.getElementById("defaultOpen").click();
    
    // function openTileSet(evt, tilesetName) {
    //   var i, tileSetcontent, tablinks;
    //   tileSetcontent = document.getElementsByClassName("tileSetcontent");
    //   for (i = 0; i < tileSetcontent.length; i++) {
    //     tileSetcontent[i].style.display = "none";
    //   }
    //   tablinks = document.getElementsByClassName("tab-header2");
    //   for (i = 0; i < tablinks.length; i++) {
    //     tablinks[i].className = tablinks[i].className.replace(" active", "");
    //   }
    //   document.getElementById(tilesetName).style.display = "block";
    //   evt.currentTarget.className += " active";
    //   closeWindow(createTileSetWindow);
    // }



function getMapJSON(mapData){
  return {
          "onwnedBy" : "jh",
          "name" : mapData.id,
          "width" : mapData.mapWidth,
          "height" : mapData.mapHeight,
          "tilewidth" : mapData.tileWidth,
          "tileheight" : mapData.tileHeight,
          "tilelayerformat" : "csv",
          "orientation" : "orthogonal",
          "tilerenderorder" : "right-down",
  }
}

function getLayerJSON(LayerData){
  let layers = [];
  let layerProps = [];
  
  LayerData.forEach(function(layer){
    console.log(layer);
    layers.push({
      "id" : layer.id,
      "name" : layer.name,
      "mapName" : layer.mapName,
      "orderInMap" : layer.order,
      "type" : layer.type
    });
    
    let layerPropData = layer.layerProp;
    console.log(layerPropData);
    layerProps.push({
      "id" : layerPropData.id,
      "layerId" : layer.id,
      "visible" : layerPropData.visible,
      "locked" : layerPropData.locked,
      "opacity" : layerPropData.opacity,
      "verticalOffset" : layerPropData.verticalOffset,
      "horizontalOffset" : layerPropData.horizontalOffset
    });
  });

  return {"layers" : layers, "layerProps" : layerProps};
}

  // var helper = new XMLSerializer();
  //helper.serializeToString(mapXML)

function saveMap(map){
  var save_endpoint = "save_map";
    return $.ajax({
      type : "POST",
      contentType: "application/json",
      url : "/fileController/" + save_endpoint,
      data : JSON.stringify(map),
      dataType : 'json',
      processData: false, 
      
      error : function(error){
        return error;
      },
      success : function(data) {
        console.log(data);
        return data;
      }
    });
}
function saveLayer(layer){
  var save_endpoint = "save_layer";
    return $.ajax({
      type : "POST",
      contentType: "application/json",
      url : "/fileController/" + save_endpoint,
      data : JSON.stringify(layer),
      dataType : 'json',
      processData: false,
    
      error : function(error){
        return error;
      },
      success : function(data) {
        console.log(data);
        return data;
      }
  });
}

function saveLayerProp(layerProp){
  var save_endpoint = "save_layerProp";
    return $.ajax({
      type : "POST",
      contentType: "application/json",
      url : "/fileController/" + save_endpoint,
      data : JSON.stringify(layerProp),
      dataType : 'json',
      processData: false, 
    
      error : function(error){
        return error;
      },
      success : function(data) {
        console.log(data);
        return data;
      }
});
}

function loadAll(mapName){
  var load_endpoint = "load_map";
  return new Promise((resolve, reject) => {
  // var helper = new XMLSerializer();s
    $.ajax({
        type : "POST",
        url : "/fileController/" + load_endpoint,
      data : JSON.stringify({"mapName" : mapName}),
      contentType: "application/json",
      dataType : 'json',
      processData: false, 
      
      error : function(error){
        alert("load error occurred");
        console.log("XML Loading Failed");
        reject(error);
      },

      success : function(data) {
        console.log(data);
        console.log("load success!");
        resolve(data);
      }
    });
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
