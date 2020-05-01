
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
let saveasWindow = document.querySelector("#saveas");
let loadWindow = document.querySelector("#loadFile");

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
function openSaveAs() {  
showWindow(saveasWindow);
}

function cancelSaveAs() {  
  closeWindow(saveasWindow);
}

function createload() {  
  showWindow(loadWindow);
}

function cancelload() {  
  closeWindow(loadWindow);
}

function aboutLB() {  
  console.log("about");
  showWindow(aboutWindow);
  }
  
function cancelAbout() {  
  closeWindow(aboutWindow);
}


function loadMap(map){
    editor.grid= new Grid(map.mapWidth, map.mapHeight, map.tileWidth, map.tileHeight);
    editor.grid.showOrHide();
    if(editor.currentMap){// if currentMap is existed
      editor.clearWorkspace();
    }
    editor.currentMap = map;
    editor.loadedMapList.push(map);
    showList(editor.currentMap.LayerList);
}

function showHideGird(){
  editor.grid.showOrHide();
}

function createMap() {
  let mapType = "top";

  var mapWidth = parseInt(document.getElementById("map-width").value);
  var mapHeight = parseInt(document.getElementById("map-height").value);
  var tileWidth = parseInt(document.getElementById("tile-width").value);
  var tileHeight = parseInt(document.getElementById("tile-height").value);
  var mapName = document.getElementById("map-name").value;

  var newLayer = new TiledLayer(0, "Layer1", mapWidth, mapHeight, mapName, tileWidth, tileHeight);
  var newMap = new TiledMap(mapName, mapWidth, mapHeight, tileWidth, tileHeight);
  newMap.LayerList.set(0, newLayer);

  saveAll(newMap, newMap.LayerList, mapName);
  
  // loadAll(newMap.id);

  loadMap(newMap);
  document.getElementById("map-name").value = "";
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
    document.getElementById("input-layer").value = "";
    // console.log(layerType);
    // console.log(layerName);

  closeWindow(createLayerWindow);
  //showList(layerType, layerName);
  createNewLayer(layerType, layerName);
  
}

var currentTileSetName;
function newTabBtn() {
  var tilesetName = document.getElementById("TilesetName").value;
  var btn = document.createElement("BUTTON");
  btn.setAttribute('class', 'tab-header2');
  btn.innerHTML = tilesetName;
  //document.body.appendChild(btn);
  document.getElementById("newTab").appendChild(btn);

  var workspace = document.createElement("div");
  workspace.setAttribute('class', 'tilesetContent');
  workspace.setAttribute('id', tilesetName);
  document.getElementById("tilesetWorkspace").appendChild(workspace);

  currentTileSetName = tilesetName;
  document.getElementById("TilesetName").value = "";
  closeWindow(createTileSetWindow);
  // createCollectionTileset();
  }

  function newTabBtn2() {
    var tilesetName = document.getElementById("TilesetName").value;
    var imageFile = document.getElementById("myFile").value;
    var tilesetH = document.getElementById("tileSet-height").value;
    var tilesetW = document.getElementById("tileSet-width").value;
    var margin = document.getElementById("margin").value;
    var spacing = document.getElementById("spacing").value;
    var btn = document.createElement("BUTTON");
    btn.setAttribute('class', 'tab-header2');
    btn.innerHTML = tilesetName;
    //document.body.appendChild(btn);
    document.getElementById("newTab").appendChild(btn);
  
    var workspace = document.createElement("div");
    workspace.setAttribute('class', 'tilesetContent');
    workspace.setAttribute('id', tilesetName);
    document.getElementById("tilesetWorkspace").appendChild(workspace);
  
    currentTileSetName = tilesetName;
    document.getElementById("TilesetName").value = "";
    closeWindow(createTileSetWindow);
   createSingleTileset()
   document.getElementById("myFile").value = "";
   document.getElementById("tileSet-height").value = "";
   document.getElementById("tileSet-width").value = "";
   document.getElementById("margin").value = "";
   document.getElementById("spacing").value = "";
    }

  document.getElementById("newTab").addEventListener("click", function(e) {
    currentTileSetName = e.target.innerHTML;
    openTilesetTab(e, e.target.innerHTML);
    //console.log("click tab "+currentTileSetName);
    
  });

  var single =1;
const PUZZLE_DIFFICULTY =5;
const PUZZLE_HOVER_TINT = '#009900';
 
var _canvas;
var _stage;
 
var _img;
var _tiles;
var _puzzleWidth;
var _puzzleHeight;
var __tilesWidth;
var __tilesHeight;
var _currentTile;
var _currentDropTile;
 
var _mouse;
var singlecount ="single" +single;
  function createSingleTileset(){
  
      console.log("1@ ");
      //PUZZLE_DIFFICULTY = document.getElementById();
  
    var canvas = document.createElement("canvas");
    canvas.setAttribute('id', singlecount); //
   // img.setAttribute('onload', 'resize(this)');
    document.getElementById(currentTileSetName).appendChild(canvas);

       _img = new Image();
    //_img.addEventListener('load',onImage,false);
    //_img.src = "apple.png";
  
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("myFile").files[0]);
    
    oFReader.onload = function (oFREvent) {
      var src;
      src = oFREvent.target.result;
      init(src);
      };

  }
  function init(src){
    _img = new Image();
    _img.addEventListener('load',onImage,false);
    _img.src = src;
}

function onImage(e){
  _tileWidth = Math.floor(_img.width / PUZZLE_DIFFICULTY)
  _tileHeight = Math.floor(_img.height / PUZZLE_DIFFICULTY)
  _puzzleWidth = _tileWidth * PUZZLE_DIFFICULTY;
  _puzzleHeight = _tileHeight * PUZZLE_DIFFICULTY;
  setCanvas();
  initPuzzle();
}

  function setCanvas(){
    _canvas = document.getElementById(singlecount);
    _stage = _canvas.getContext('2d');
    _canvas.width = _puzzleWidth;
    _canvas.height = _puzzleHeight;
    _canvas.style.border = "1px solid black";
    single = single +1;
}

function initPuzzle(){
    _tiles = [];
    _mouse = {x:0,y:0};
    _currentTile = null;
    _currentDropTile = null;
    _stage.drawImage(_img, 0, 0, _puzzleWidth, _puzzleHeight, 0, 0, _puzzleWidth, _puzzleHeight);
    buildTiles();
}

function buildTiles(){
  var i;
  var tile;
  var xPos = 0;
  var yPos = 0;
  //xPos, yPos : current position in the puzzle where the tile should be drawn
  //sx, sy : point in out image where we will begin to dray from.
  for(i = 0;i < PUZZLE_DIFFICULTY * PUZZLE_DIFFICULTY;i++){
      tile = {};
      tile.sx = xPos;
      tile.sy = yPos;
      _tiles.push(tile);
      xPos += _tileWidth;
      if(xPos >= _puzzleWidth){
          xPos = 0;
          yPos += _tileHeight;
      }
  }
  drawPuzzle();
}


function drawPuzzle(){
  _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
  var i;
  var tile;
  var xPos = 0;
  var yPos = 0;
  for(i = 0;i < _tiles.length;i++){
      tile = _tiles[i];
      tile.xPos = xPos;
      tile.yPos = yPos;
      _stage.drawImage(_img, tile.sx, tile.sy, _tileWidth, _tileHeight, xPos, yPos, _tileWidth, _tileHeight);
      _stage.strokeRect(xPos, yPos, _tileWidth,_tileHeight);
      xPos += _tileWidth;
      if(xPos >= _puzzleWidth){
          xPos = 0;
          yPos += _tileHeight;
      }
  }
  document.onmousedown = onPuzzleClick;
}


function onPuzzleClick(e){
  if(e.layerX || e.layerX == 0){
      _mouse.x = e.layerX - _canvas.offsetLeft;
      _mouse.y = e.layerY - _canvas.offsetTop;
  }
  else if(e.offsetX || e.offsetX == 0){
      _mouse.x = e.offsetX - _canvas.offsetLeft;
      _mouse.y = e.offsetY - _canvas.offsetTop;
  }
  _currentTile = checkTileClicked();
  console.log("clickedT: "+_currentTile);
}

function checkTileClicked(){
  var i;
  var tile;
  for(i = 0;i < _tiles.length;i++){
      tile = _tiles[i];
      if(_mouse.x < tile.xPos || _mouse.x > (tile.xPos + _tileWidth) || _mouse.y < tile.yPos || _mouse.y > (tile.yPos + _tileHeight)){
          //tile NOT HIT
      }
      else{
          console.log("@ "+ i);
          return tile;
      }
  }
  return null;
}

  function openTilesetTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tilesetContent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-header2");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
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


function saveAll(newMap, newLayers, mapName){
  var jsonMap = getMapJSON(newMap, mapName);
  var jsonLayers = getLayerJSON(newLayers);
  console.log(jsonMap);

  let saveMapResult = saveMap(jsonMap);
  let saveLayerResult = saveLayer(jsonLayers["layers"]);
  let saveLayerPropResult = saveLayerProp(jsonLayers["layerProps"]);

  //$.when(saveMapResult, saveLayerResult, saveLayerPropResult).then(function(){
    // loadAll(newMap.id)
    // .then(data => {
    //   console.log("returned data : " + data);
    // });
    // .catch(error => {
    //   console.log(error);
    // })
  //});
}

function saveAsMap(){
  var map = editor.currentMap;
  if (map == null){
    alert("There is no map to save");
  } else{
    var saveAsName = document.getElementById("saveAsName").value;
    saveAll(map, map.LayerList, saveAsName);
  }
  closeWindow(saveasWindow);
}

function save(){
  var map = editor.currentMap;
  if (map == null){
    alert("There is no map to save");
  } else{
    saveAll(map, map.LayerList, map.id);
  }
}

function loadFile(){
  var fileName = document.getElementById('loadFileName').value;
  console.log(fileName);
  // let loadResult = loadAll(fileName);

  loadAll(fileName)
  .then(jsonData => {
    var newMap = parseMapJson(jsonData.map);
    console.log(newMap);
    var layers = parseLayerJson(jsonData.layers, newMap);
    // var layerProps = parseLayerPropJson(jsonData.layerProps, layers);
    newMap.LayerList = layers;
    console.log(newMap);
    loadMap(newMap);
  });

  // $.when(loadResult).then(function(){
  //   var jsonData = loadResult;
  //   console.log(jsonData);
  //     var map = parseMapJson(jsonData.map);
  //     console.log(map);
  //     var layers = parseLayerJson(jsonData.layers, map.mapWidth, map.mapHeight, map.tileWidth, map.tileHeight);
  //     console.log(layers);
  //     map.LayerList = layers;
  //     // var layerProps = parseLayerPropJson(jsonData.layerProps, layers);
  //     editor.loadMap(map);
  // });
  closeWindow(loadWindow);
}

var currentTileID;

function removeFile() {
  var d = document.getElementById(currentTileSetName);
  var olddiv = document.getElementById(currentTileID);
  d.removeChild(olddiv);
  }

  var count =1;

  function loadTile() {
    var location ="pre" +count;

  var img = document.createElement("img");
  img.setAttribute('id', location);
  // img.setAttribute('style', 'width: 180px; height: 120px;');
  img.setAttribute('onload', 'resize(this)');
  document.getElementById(currentTileSetName).appendChild(img);

  document.getElementById(currentTileSetName).addEventListener('click', function (e) {
    console.log("clickedIMG "+ e.target.id);
    console.log("clicked-src "+ e.target.src);
    currentTileID = e.target.id;
  });

  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("fileElem").files[0]);
  
  oFReader.onload = function (oFREvent) {
    document.getElementById(location).src = oFREvent.target.result;
      var myImg = document.getElementById(location);
    };

  count = count +1;
  };	  

  const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");
  
  fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
  fileElem.click();
  }
  }, false);

function resize(img){
  var width = img.width;
  var height = img.height;
  var maxWidth = 180;   
  var maxHeight = 120;  
     
  if(width > maxWidth || height > maxHeight){
       if(width > height){
          resizeWidth = maxWidth;
          resizeHeight = Math.round((height * resizeWidth) / width);
       }else{
          resizeHeight = maxHeight;
          resizeWidth = Math.round((width * resizeHeight) / height);
       }
    }else{
        resizeWidth = width;
        resizeHeight = height;
    }
    img.width = resizeWidth;
    img.height = resizeHeight;
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

    function parseMapJson(map){
      return new TiledMap(map.name, map.width, map.height, map.tilewidth, map.tileheight);
    }
    
    function parseLayerJson(layers, map){
      var layerList = new Map();
      layers.forEach(function(layer){
        var layerData = layer;
        var newLayer;
        if (layerData.type === "TiledLayer"){ 
          newLayer = new TiledLayer(layerData.id, layerData.name, map.mapWidth, map.mapHeight, map.id, map.tileWidth, map.tileHeight);
        } else {
          newLayer = new ObjectLayer(layerData.id, layerData.name, map.mapWidth, map.mapHeight);
        }
        newLayer.order = layerData.orderInMap;
        layerList.set(layerList.size, newLayer);
      });
      return layerList;
    }

function getMapJSON(mapData, mapName){
  console.log(editor.userName);
  return {
          "ownedBy" : editor.userName,
          "name" : mapName,
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
      "horizontalOffset" : layerPropData.horizontalOffset,
      "mapName" : layer.mapName
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

// function loadAll(mapName){
//   var load_endpoint = "load_map";
//   // var helper = new XMLSerializer();
//     return $.ajax({
//       type : "POST",
//       url : "/fileController/" + load_endpoint,
//       data : JSON.stringify({"mapName" : mapName}),
//       contentType: "application/json",
//       dataType : 'json',
//       processData: false, 
      
//       error : function(error){
//         alert("load error occurred");
//         console.log("XML Loading Failed");
//       },

//       success : function(data) {
//         console.log(data);
//         console.log("load success!");
//       }
// });
function loadAll(mapName){
  var load_endpoint = "load_map";
  return new Promise((resolve, reject) => {
  // var helper = new XMLSerializer();
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
