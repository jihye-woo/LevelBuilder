 
// function myCheck() {
//   var checkBox = document.getElementById("collectionOfImg");
//   var checkBox2 = document.getElementById("basedOnTileSetImg");
//   var text = document.getElementById("text");
//   var text2 = document.getElementById("txt");
//   if (checkBox.checked == true){
//     text.style.display = "block";
//   } else if (checkBox2.checked == true){
//      text2.style.display = "block";
//   } else {
//      text.style.display = "none";
//      text2.style.display = "none";
//   }
// }

// let createMapWindow = document.querySelector("#create-map-window");
// let createTileSetWindow = document.querySelector("#create-tileset-window");

// function newMap() {  
// showWindow(createMapWindow);
// }

// function newTileSet() {  
// showWindow(createTileSetWindow);
// }

// function cancelCreateMap() {  
//   closeWindow(createMapWindow);
// }

// function cancelCreateTileSet() {  
//   closeWindow(createTileSetWindow);
// }

// function saveAs() {  
// showWindow(saveas);
// }

// function cancelSaveAs() {  
//   closeWindow(saveas);
// }


// function createMap() {
//   let mapType = "top";

//   var mapWidth = document.getElementById("map-width").value;
//   var mapHeight = document.getElementById("map-height").value;
//   var tileWidth = document.getElementById("tile-width").value;
//   var tileHeight = document.getElementById("tile-height").value;
//   var mapName = "test.tmx";
//   //var mapName = document.getElementById("map-name").value;


//   // 1. create Map and Layer objects
//   var newLayer = new TiledLayer(1, "Tile Layer 1", mapWidth, mapHeight);
//   console.log(newLayer);
//   var newMap = new Map(mapName, mapWidth, mapHeight, tileWidth, tileHeight, newLayer);
//   console.log(newMap);
//   // 2. save data ( ajax request )
//   var mapXML = MapXML(newMap.mapWidth, newMap.mapHeight, newMap.tileWidth, newMap.tileheight, newLayer);
//   console.log(mapXML);
  
//   save(mapXML);

//   // 3. load map
//   load(newMap.name);
//   editor.

//   // 4. create XML File
//   //createMapXMLFile(mapXML, mapName);

//   // create map object and load 
//   closeWindow(createMapWindow);
//   for(let radio of document.getElementsByClassName("map-perspective")) {if (window.CP.shouldStopExecution(29)){break;}    
//     if (radio.checked) {
//       mapType = radio.value;
//       break;
//     }   
//     }
// }
// window.CP.exitedLoop(29);

// function createTileSet() {  
//   createTilesetXML("filename", "20", "20", "1", "1", "15", "3");
//  // createImageTilesetXML(name, tilewidth, tilehegiht, spacing, margin, imagesource)
//  // createCollectionTilesetXML(name)
// }

// function showWindow(hwnd) {
//       hwnd.style.display = "block";
//       windowBackgroundTint.style.display = "block";
//       isWindowOpen = true;
//     }

//     function closeWindow(hwnd) {
//       hwnd.style.display = "none";
//       windowBackgroundTint.style.display = "none";
//       isWindowOpen = false;
//     }

//   function myFunction() {
//   var x = document.getElementById("myFile");
//   x.disabled = true;
// }

// function mySelect() {
//   var tileSetType = document.forms[0];
//   var txt = "";
//   var i;
//   for (i = 0; i < tileSetType.length; i++) {
//     if (tileSetType[i].checked) {
//       txt = txt + tileSetType[i].value + " ";
//     }
//   }
//   document.getElementById("order").value = "You ordered a coffee with: " + txt;
// }

//     function openTab(evt, cityName) {
//       var i, tabcontent, tablinks;
//       tabcontent = document.getElementsByClassName("tabcontent");
//       for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//       }
//       tablinks = document.getElementsByClassName("tablinks");
//       for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//       }
//       document.getElementById(cityName).style.display = "block";
//       evt.currentTarget.className += " active";
//     }
//     document.getElementById("defaultOpen").click();
    
//     function createMapXMLFile(xmlFile, name) {
//         var xml = new XMLSerializer().serializeToString(xmlFile);
//         var blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
//         saveAs(blob, name+".tmx");
//   }


//   function MapXML(width, height, tilewidth, tileheight, layer)
//   {
//       var doc = document.implementation.createDocument(null, null);
//       var mapElem = doc.createElement("map");
//       mapElem.setAttribute("version", "1.2");
//       mapElem.setAttribute("tiledversion", "1.3.2");
//       mapElem.setAttribute("orientation", "isometric");
//       mapElem.setAttribute("renderoreder", "left-down");
//       mapElem.setAttribute("compressionlevel", "-1");
//       mapElem.setAttribute("width", width);
//       mapElem.setAttribute("height", height);
//       mapElem.setAttribute("tilewidth", width);
//       mapElem.setAttribute("tileheight", height);
//       mapElem.setAttribute("infinite", "0");
//       mapElem.setAttribute("nextlayerid", "2");
//       mapElem.setAttribute("nextobjectid", "1");  

//       var layerElem = doc.createElement("layer");
//       layerElem.setAttribute("id", "1");
//       layerElem.setAttribute("name", "Tile Layer 1");
//       layerElem.setAttribute("width", width);
//       layerElem.setAttribute("height", height);
      
//       var dataElem = doc.createElement("data");
//       dataElem.setAttribute("encoding", "csv");
//       var csvArr = Array(width*height).fill(0);
//       var csv = csvArr.join(",");
//       var node = doc.createTextNode(csv);

//       mapElem.appendChild(layerElem);
//       layerElem.appendChild(dataElem);
//       dataElem.appendChild(node);
//       doc.appendChild(mapElem);
//       return doc;
//   }

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

// function getImage(imagesrc){
//   var newImage = new Image();
//   newImage.src = imagesrc;
//   return newImage;
// }

// function save(mapXML){
//   var save_endpoint = "save_map";
//   var helper = new XMLSerializer();
//     $.ajax({
//         type : "POST",
//         contentType: "application/xml",
//         url : "/fileController/" + save_endpoint,
//     data : helper.serializeToString(mapXML),
//     contentType: "application/xml",
//     dataType : 'xml',
//     processData: false, 
    
//     error : function(e){
//       alert("save error occurred");
//       console.log("XML Saving Failed");
//     },

//         success : function(data) {
//       console.log(data);
//             console.log("save success!");
//         }
//   });
// }

// function load(fileName){
//   var load_endpoint = "load_file";
//   var helper = new XMLSerializer();
//    $.ajax({
//       type : "POST",
//       url : "/fileController/" + load_endpoint,
//     data : JSON.stringify({"filename" : fileName}),
//     contentType: "application/json",
//     dataType : 'xml',
//     processData: false, 
    
//     error : function(e){
//       alert("save error occurred");
//       console.log("XML Saving Failed");
//     },

//         success : function(data) {
//       console.log(data);
//             console.log("load success!");
//     }
//   });
// }


// // function save(mapXML){
// // $.ajax({
// //       type : "POST",
// //       contentType: "application/xml",
// //       url : "/fileController/save_map",
// //       data : JSON.stringify({
// //             "type" : "FeatureCollection",
// //             "features" : []
// //          }),
// //       dataType : 'json',
   
// //       success : function(data) {

// //       console.log("success load");
// //       }

// //    });
// // }

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

// // function createTileGroup() {
// //   var lis = document.createElement("li");
// //   //var inputValue = document.getElementById("myInput").value;
// //   var inputValue ="Group";
// //   var t = document.createTextNode(inputValue);
// //   lis.appendChild(t);
// //   if (inputValue === '') {
// //     alert("You must write something!");
// //   } else {
// //     document.getElementById("myUL").appendChild(lis);
// //   }
// //    document.getElementById("myInput").value = "";

// //   var span = document.createElement("SPAN");

// //   lis.appendChild(span);

// //   for (i = 0; i < close.length; i++) {
// //     close[i].onclick = function() {
// //       var div = this.parentElement;
// //       div.style.display = "none";
// //     }
// //   }
// // } 
// // function createTile() {
// //   var lis = document.createElement("li");
// //   //var inputValue = document.getElementById("myInput").value;
// //   var inputValue ="Layer";
// //  // <i class="fa fa-files-o"></i>
// //   var t = document.createTextNode(inputValue);
// //   lis.appendChild(t);
// //   if (inputValue === '') {
// //     alert("You must write something!");
// //   } else {
// //     document.getElementById("myUL").appendChild(lis);
// //   }
// //    document.getElementById("myInput").value = "";

// //   var span = document.createElement("SPAN");
// //   var txt = document.createTextNode("\u00D7");

// //   lis.appendChild(span);

// //   for (i = 0; i < close.length; i++) {
// //     close[i].onclick = function() {
// //       var div = this.parentElement;
// //       div.style.display = "none";
// //     }
// //   }
// // } 
var EPSILON = 0.000001;
let canvas  = undefined;
let ctx     = undefined;
let gl      = undefined;
let isWebGl = false;

var mouse = { x: 0, y: 0, leftButton: false, rightButton: false, middleButton: false };
var Time = { timeScale: 1, deltaTime: 0, deltaTimeUnscaled: 0, time: 0, frameCount: 0 };
var onDraw   = undefined;
var onUpdate = undefined;
let ctxScaleY = 1.0;
let ctxScaleX = 1.0;


function setup(canvasSelector, onDrawCallback, onUpdateCallback, onResizeCallback) {  
  canvas = document.querySelector(canvasSelector);
  ctx    = canvas.getContext("2d");
  onDraw = onDrawCallback;
  onUpdate = onUpdateCallback;
  window.addEventListener("resize", onResizeCallback, false);
  canvas.addEventListener("mousemove", mouseMove, false);
  canvas.addEventListener("touchmove", touchMove, false);
  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    mouse.leftButton = true;
  }, false);
  
  canvas.addEventListener("touchend", e => {
    e.preventDefault();
    mouse.leftButton = false;
  }, false);
  
  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mouseup", mouseUp, false);
  if(onResizeCallback) onResizeCallback();
  run(0);
}


function resetScale() {
  ctxScaleX = 1;
  ctxScaleY = 1;
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function rgb(r, g, b) {
  return new Color(r, g, b);
}

function rgba(r, g, b, a) {
  return new Color(r,g,b,a);
}


function getMousePos(element, evt) {
  var rect = element.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function getTouchPos(canvas, evt) {
  var rect = element.getBoundingClientRect();
  return {
    x: evt.touches[0].clientX - rect.left,
    y: evt.touches[0].clientY - rect.top
  };  
}

function run(time) {  
  Time.deltaTime = (time - Time.time) * Time.timeScale;
  Time.deltaTimeUnscaled = time - Time.time;  
  Time.time = time;
  Physics.update();
  if(onUpdate) onUpdate();
  if(onDraw) onDraw();  
  Time.frameCount++;
  window.requestAnimationFrame(run);  
}

function clear(clearStyle) {
  if (isWebGl) {
    ctx.clearColor(0,0,0.8,1);
    ctx.clear(gl.COLOR_BUFFER_BIT);
    return;
  }   
  if (clearStyle) {
    ctx.fillStyle = clearStyle;  
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function mouseMove(evt) {
  let pos = getMousePos(canvas, evt);
  mouse.x = pos.x;
  mouse.y = pos.y;
}

function touchMove(evt) {
  evt.preventDefault();
  let pos = getTouchPos(canvas, evt);
  mouse.x = pos.x;
  mouse.y = pos.y;
}

function mouseDown(evt) {
  if (evt.button === 0) mouse.leftButton = true;  
  if (evt.button === 1) mouse.rightButton = true;  
  if (evt.button === 3) mouse.middleButton = true;
}

function mouseUp(evt) {
  if (evt.button === 0) mouse.leftButton = false;  
  if (evt.button === 1) mouse.rightButton = false;  
  if (evt.button === 3) mouse.middleButton = false;  
}

let selectedTreeElement = undefined;
let selectedTreeItem    = undefined;

let inspectorPanel  = document.querySelector(".selector");
let inspectorLayerTools = inspectorPanel.querySelector(".layer-tools");
let inspectorGroupTools = inspectorPanel.querySelector(".group-tools");
let inspectorTileSelector = inspectorPanel.querySelector(".tile-selector");
let inspectorBrushSize = inspectorLayerTools.querySelector(".brush-size");
let inputBrushSize = inspectorBrushSize.querySelector("#brush-size");
let tileListElement = inspectorPanel.querySelector(".tile-list");

let itemDetailElement = inspectorPanel.querySelector(".item-details");
let itemDetailTypeIconElement  = itemDetailElement.querySelector(".item-type-icon");
let itemDetailNameInputElement = itemDetailElement.querySelector(".item-name");

let mapTreeElement   = document.querySelector(".project-item-tree");
let container = document.querySelector(".editor-container");

let windowBackgroundTint = document.querySelector(".window-tint");
let createMapWindow = document.querySelector("#create-map-window");
let loadMapWindow = document.querySelector("#load-map-window");
let loadTilesetWindow = document.querySelector("#load-tilesets-window");
let loadTilesetWindowProgressBarValue = loadTilesetWindow.querySelector(".progress-bar-value");

let backToolName = undefined;
let activeTool = undefined;
let activeToolName = "cursor";
let tools = ["cursor", "brush", "eraser", "move", "fill"];
let isWindowOpen = false;
let isRenamingTreeItem = false;
let zoomIntensity = 0.1;
let brushSize = 1;
let maxBrushSize = 8;
let selectedTilePage = 0;
let selectedTileElement = undefined;
let selectedTile = undefined;
let tilePageCount = 1; // should be the same as tilesets.length
let tilesets = [];
let isLoadingTilesets = true;
let tilesetLoadCount = 0;
let tilesetLoadCompleteCount = 0;
let toastyPlayed  = false;
let tilesetPagingForIsoEnabled = false;



function getTilesetById(id, type) {
  for(let i = 0; i < tilesets.length; ++i) {if (window.CP.shouldStopExecution(28)){break;}
    if (tilesets[i].id == id && tilesets[i].type == type) return tilesets[i];
  }
window.CP.exitedLoop(28);

  return undefined;
}

const resize = () => {  
  canvas.style.left = "1px";
  canvas.style.top = "33px";
  canvas.width = container.clientWidth-2;
  canvas.height = container.clientHeight-34;  
};      
let toasty = new Audio("https://www.dropbox.com/s/cql3setstbtz9r2/TOASTY%21.mp3?raw=1");
canvas = document.querySelector(".editor"); // needed in the createIso function. Otherwise its not necessary to assign it here
resize();

// let map = Map.create(8, 8);
let map = Map.createIso(8, 8);
createLayer(true);

window.addEventListener('mousewheel', evt => {
  if (activeToolName !== "move") {
    return;
  }      
  let camera = Camera.getMainCamera();
  let scaleChange = evt.wheelDelta/120;  
  var zoom = Math.exp(scaleChange*zoomIntensity);
  ctxScaleX *= zoom;
  ctxScaleY *= zoom;     
});

itemDetailNameInputElement.addEventListener("input", e => {
  if (selectedTreeItem && selectedTreeElement) {
    selectedTreeItem.name = itemDetailNameInputElement.value;    
    selectedTreeElement.innerHTML = itemDetailNameInputElement.value;
  }
}, false);

window.addEventListener("keydown", evt => {
  if (isWindowOpen
      ||isRenamingTreeItem
      ||document.activeElement === itemDetailNameInputElement
      ||document.activeElement === inputBrushSize) return;   
  evt.stopPropagation();
  evt.preventDefault();
  if (evt.which === 0x31) selectEditorTool(tools[0]);  
  if (evt.which === 0x32) selectEditorTool(tools[1]);
  if (evt.which === 0x33) selectEditorTool(tools[2]);
  if (evt.which === 0x34) selectEditorTool(tools[3]);
  if (evt.which === 0x6B || evt.which === 0xAB) zoomIn();
  if (evt.which === 0x6D || evt.which === 0xAD) zoomOut();
  if (evt.altKey) {    
    if (activeToolName !== "move") {
      backToolName = activeToolName;
      selectEditorTool("move");
    }
  }
}, false);

window.addEventListener("keyup", evt => {
  if (isWindowOpen
      ||isRenamingTreeItem
      ||document.activeElement === itemDetailNameInputElement
      ||document.activeElement === inputBrushSize) return;  
  if (!evt.altKey && backToolName !== undefined) {
    selectEditorTool(backToolName);
    backToolName = undefined;    
  }
}, false);

const draw = () => { 
  // ctx.fillRect(...)
  let hoverTile = {x:0, y:0};
  clear("black");   
  ctx.scale(ctxScaleX, ctxScaleY);  
  if (map) {
    map.hoverVisible = activeToolName !== undefined 
          && (activeToolName === "eraser" || activeToolName === "brush");      
    map.draw(); 
    hoverTile = map.getHoverTile();
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);  
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText(`${mouse.x}, ${mouse.y}`, 5, 17);
  ctx.fillText(`${hoverTile.x}, ${hoverTile.y}`, 5, 30);
};

const update = () => { 
  // logic here, called just before draw is called  
  if (activeTool) {
    activeTool.update();
  }
    
};

loadTileSets();

setup(".editor", draw, update, resize);

/*
  App and map io functions
*/
function newMap() {  
  showWindow(createMapWindow);
}

function loadMap() {
  showWindow(loadMapWindow);
}
function saveMap() {}
function showSettings() {}
function showAbout() {
  displayToasty();
}

function cancelCreateMap() {  
  closeWindow(createMapWindow);
}
function cancelLoadMap() {
  closeWindow(loadMapWindow);
}
function openMap() {
  closeWindow(loadMapWindow);  
}
function createMap() {
  closeWindow(createMapWindow);  
  let mapType = "top";
  let mapWidth  = parseInt(document.querySelector("#input-map-width").value  || 32)
  let mapHeight = parseInt(document.querySelector("#input-map-height").value || 32);
  for(let radio of document.getElementsByClassName("map-perspective")) {if (window.CP.shouldStopExecution(29)){break;}    
    if (radio.checked) {
      mapType = radio.value;
      break;
    }
  }
window.CP.exitedLoop(29);

  if (mapType === "iso") {
    map = Map.createIso(mapWidth, mapHeight);
  } else {
    map = Map.create(mapWidth, mapHeight);
  }
  clearTreeItems();
  createLayer(true);
  buildTileSelectorPage(0);
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

/*
  Map layer functions
*/
function createLayerGroup() {
  return createTreeItem("group", x => map.createGroup(x)) ;
}

function createLayer(skipRename) {
	// var currentMap = editor.currentMap;
	// var layers = currentMap.layerlist;
	// add new layers in the current layerlist
	// show the layerlist
	
  return createTreeItem("layer", x => map.createLayer(x),skipRename) ;
}

function createLayerFromItem(item) {
  let l = createLayer(true);
  l.item.name = item.name;
  l.item.visible = item.visible;  
  l.item.properties = item.properties;  
  l.item.tileData   = JSON.parse(JSON.stringify(item.tileData));
  l.node.innerHTML = item.name;  
}

function clearTreeItems() {  
  if (mapTreeElement) {
    mapTreeElement.innerHTML = "";
  }
}

function createTreeItem(type, factory, skipRename) {
  if (!map) return;
  if (isRenamingTreeItem) acceptRenameTreeItem();
  var group;
  var parent = mapTreeElement;
  if (isGroupSelected()) {        
      group = factory(selectedTreeItem);    
      parent = selectedTreeElement.parentElement.querySelector(".children");         
  }
  else { 
    group = factory(); 
  }    
  
  let layerElementWrapper = document.createElement("li");
  layerElementWrapper.classList.add(type);
  layerElementWrapper.setAttribute("data-id", group.id);
  
  let itemNameElement = document.createElement("div");
  itemNameElement.classList.add("item-name");
  itemNameElement.classList.add(type);
  itemNameElement.innerHTML = group.name;
  layerElementWrapper.appendChild(itemNameElement);
  
  let itemVisibilityElement = document.createElement("i");
  itemVisibilityElement.classList.add("item-visibility");
  itemVisibilityElement.classList.add("visible");
  itemVisibilityElement.addEventListener("click", e => {        
    group.visible = !group.visible;    
    if (group.visible) {
      itemVisibilityElement.classList.remove("not-visible");
      itemVisibilityElement.classList.add("visible");
    } else {
      itemVisibilityElement.classList.remove("visible");
      itemVisibilityElement.classList.add("not-visible");      
    }
  }, false);
  layerElementWrapper.appendChild(itemVisibilityElement);
  
  if (type === "group") {
    let childlist = document.createElement("ul");
    childlist.classList.add("children");
    layerElementWrapper.appendChild(childlist);
  }  
 
  itemNameElement.addEventListener("click", e => {     
    e.stopPropagation(); 
    selectTreeItem(group, itemNameElement); 
  }, false);
  
  itemNameElement.addEventListener("dblclick", e => {     
    e.stopPropagation(); 
    showRenameTreeItem(group, itemNameElement); 
  }, false);
  
  parent.appendChild(layerElementWrapper);  
  if (skipRename)
    selectTreeItem(group, itemNameElement);  
  else showRenameTreeItem(group, itemNameElement);
  return {
    item: group,
    node: itemNameElement
  };
}

function showDeleteTreeItemAndChildren(item, elm) {
  if (elm.classList.contains("group")) {
    if (!confirm("Are you sure you want to delete this group and all its children?")) {
        return;
    }    
  }
  else if (!confirm("Are you sure you want to delete this layer?")) {
    return;
  }  
  let index = item.parent.children.indexOf(item);
  if (index === -1) {
    alert("Error removing item!!");
    return;
  }  
  elm.parentElement.parentElement.removeChild(elm.parentElement);  
  item.parent.children.remove(index);  
  setLayerButtonState(false);
  clearSelectionDetails();  
  hideInspector();  
  
  selectedTreeItem = undefined;
  selectedTreeElement = undefined;
}

function selectTreeItem(item, elm) {  
  if (selectedTreeElement === elm) {
    return;
  }
  if (selectedTreeElement !== undefined) {    
    acceptRenameTreeItem();  
    selectedTreeElement.classList.remove("selected");  
  }  
  elm.classList.add("selected");
  selectedTreeElement = elm;
  selectedTreeItem = item; 
  setLayerButtonState(true);
  updateSelectionDetails();
  showInspector();
}

function acceptRenameTreeItem() {
  if (isRenamingTreeItem) {
    isRenamingTreeItem=false;
    let input = selectedTreeElement.querySelector("input");
    if (input) {
      selectedTreeItem.name = input.value;
      selectedTreeElement.innerHTML = input.value;
    }
  }    
}

function showRenameTreeItem(item, elm) {
  if (isRenamingTreeItem && selectedTreeItem === elm) {
    return;
  } else if (isRenamingTreeItem) {
    acceptRenameTreeItem();
  }
  selectTreeItem(item, elm);
  isRenamingTreeItem = true;
  let input = document.createElement("input");
  input.classList.add("name-editor");
  elm.innerHTML = "";      
  input.addEventListener("keydown", evt => {
    if (evt.keyCode === 27) {
      // cancel
      isRenamingTreeItem=false;
      elm.innerHTML = item.name;
      return;
    }
  }, false);
  input.addEventListener("keypress", evt=> {
    if (evt.which === 13) {
      // accept
      isRenamingTreeItem=false;
      item.name = input.value;
      elm.innerHTML = item.name;
      updateSelectionDetails();
      return;
    }
  }, false);
  input.value = item.name;    
  elm.appendChild(input);  
  input.select();
}

function isGroupSelected() {
  return selectedTreeItem && selectedTreeElement.classList.contains("group");
}


function clearSelectionDetails() {
  itemDetailTypeIconElement.className = "";
  itemDetailNameInputElement.value = "";
  hideInspectorTools();
}

function updateSelectionDetails() {
  itemDetailNameInputElement.value = selectedTreeItem.name;
  itemDetailTypeIconElement.className = "";
  itemDetailTypeIconElement.classList.add("item-type-icon");
  itemDetailTypeIconElement.classList.add("fa");
  hideInspectorTools();
  
  if (isGroupSelected()) { 
    itemDetailTypeIconElement.classList.add("fa-folder");    
    showGroupInspectorTools();
  }
  else {
    itemDetailTypeIconElement.classList.add("fa-file");
    updateLayerInspectorTools();
  }
}

function hideInspectorTools() {
  inspectorLayerTools.style.display = "none";
  inspectorGroupTools.style.display = "none";
}

function showGroupInspectorTools() {
  inspectorGroupTools.style.display = "block";
  inspectorLayerTools.style.display = "none";
}

function updateLayerInspectorTools() {
  inspectorGroupTools.style.display = "none";
  inspectorLayerTools.style.display = "block";
  if (activeToolName === "brush") {
    inspectorTileSelector.style.display = "block";
  } else {
    inspectorTileSelector.style.display = "none";
  }
  if (activeToolName === "brush" || activeToolName === "eraser") {
    inspectorBrushSize.style.display = "block";
  } else {
    inspectorBrushSize.style.display = "none";
  }
}

function hideInspector() {
  inspectorPanel.style.display = "none";
  resize();
}

function showInspector() {
  if (inspectorPanel.style.display !== "block") {
    inspectorPanel.style.display = "block";  
    resize();
  }  
}

function setLayerButtonState(enabled) {
  let elms = document.getElementsByClassName("req-layer");
  for(let elm of elms) {if (window.CP.shouldStopExecution(30)){break;}
    if (enabled) {
      elm.removeAttribute("disabled");
    } else {
      elm.setAttribute("disabled","disabled");
    }
  }
window.CP.exitedLoop(30);

}

/*
  Map editor functions
*/
function selectEditorTool(tool) {
  document.querySelector("#btn-editor-" + activeToolName).classList.remove("active");
  document.querySelector("#btn-editor-" + tool).classList.add("active");  
  activeToolName = tool;
  switch(tool) {
    case "cursor": 
      activeTool = undefined;
      break;
    case "brush": 
      activeTool = new BrushTool();      
      break;
    case "eraser": 
      activeTool = new EraserTool();
      break;
    case "move": 
      activeTool = new MoveTool();
      break;
    case "fill":
      activeTool = new FillTool();
      break;
  }
  updateLayerInspectorTools();
}

function zoomOut() {
  ctxScaleX-=zoomIntensity;
  ctxScaleY-=zoomIntensity;
}
function zoomIn() {
  ctxScaleX+=zoomIntensity;
  ctxScaleY+=zoomIntensity;  
}

// function brushSizeChanged() {
//   if (!inputBrushSize) return;  
//   brushSize = parseInt(inputBrushSize.value||"1");
//   if (brushSize > maxBrushSize) {
//     brushSize = maxBrushSize;
//     inputBrushSize.value = brushSize;
//   }
//   if (brushSize <= 0) {
//     brushSize = 1;
//     inputBrushSize.value = brushSize;
//   }
// }

/*
  Tile selector functions
*/
// function previousTilePage() {
//   if (!tilesetPagingForIsoEnabled && map.type == "iso") return; // for now
//   selectedTilePage--;
//   if (selectedTilePage < 0) selectedTilePage = 0;
//   else {
//     buildTileSelectorPage(selectedTilePage);
//   }
// }
// function nextTilePage() {
//   if (!tilesetPagingForIsoEnabled && map.type == "iso") return; // for now
//   selectedTilePage++;
//   if (selectedTilePage >= tilePageCount) {
//     selectedTilePage = tilePageCount-1;
//   } else {
//     buildTileSelectorPage(selectedTilePage);
//   }
// }

// function buildTileSelectorPage(page) {
//   tileListElement.innerHTML = "";
//   if (map.type === "iso") {
//     // todo: fix me if we need "proper" isometric tilesets
//     //       right now all our tilesets are 1 tile per image, so we will
//     //       just iterate all iso-typed tilesets and grab those "one" tiles
//     //       and create our tile-selector items
//     for(let ts of tilesets) {if (window.CP.shouldStopExecution(31)){break;}      
//       if (ts.type === map.type) {
//         let tileData = ts.tiles[0];       
//         tileData.src.setAttribute("data-tileset", ts.id);
//         tileData.src.setAttribute("data-type", ts.type);
//         tileData.src.setAttribute("data-tile-id", tileData.id);   
//         tileData.src.classList.add("selectable-tile");
//         tileData.src.classList.add(map.type);
//         tileData.src.addEventListener("click", e=>tileClicked(e, ts, tileData, tileData.src), false);
//         tileListElement.appendChild(tileData.src);
//       }
//     }
// window.CP.exitedLoop(31);

//   } else {    
//     let tilesetIteration = 0;
//     for(let ts of tilesets) {if (window.CP.shouldStopExecution(33)){break;}      
//       if (ts.type === map.type) {             
//         if (tilesetIteration != page) {
//           tilesetIteration++;
//           continue;
//         }
//         for(let tileData of ts.tiles) {if (window.CP.shouldStopExecution(32)){break;}          
//           let tile = document.createElement("div");
//           tile.setAttribute("data-tileset", ts.id);
//           tile.setAttribute("data-type", ts.type);
//           tile.setAttribute("data-tile-id", tileData.id);   
//           tile.classList.add("selectable-tile");
//           tile.classList.add(map.type);
          
//           tile.addEventListener("click", e=>tileClicked(e, ts, tileData, tile), false);
//           tile.style.background =`url('${ts.src.src}') left -${tileData.x}px top -${tileData.y}px`;
//           tile.style.width = `${tileData.width}px`;
//           tile.style.height = `${tileData.height}px`;
//           tileListElement.appendChild(tile);
//         }
// window.CP.exitedLoop(32);

//         return;
//       }
//     }
// window.CP.exitedLoop(33);
    
//   }
// }

function tileClicked(clickEvent, tileset, tiledata, elm) {
  if (selectedTileElement) {
    selectedTileElement.classList.remove("selected");
  }
  selectedTile = {tileset: tileset.id, id: tiledata.id};
  elm.classList.add("selected");
  selectedTileElement = elm;
}

// function displayToasty() {
//   // play it once only, I'm pretty sure it wont be funny next time :P  
//   if (toastyPlayed) return; 
//   let toastyImg = document.querySelector(".toasty");  
//   toastyPlayed = true;
//   toasty.play();
//   setTimeout(() => { 
//     toastyImg.style.display ="block";
//     setTimeout(() => { 
//       toastyImg.style.display = 'none'; 
//     }, 1500);
//   }, 150);
// }

function showTilesetLoader() {
  showWindow(loadTilesetWindow);
}

function hideTilesetLoader() {
  closeWindow(loadTilesetWindow);
}

function updateTilesetLoader(current, total) {
  loadTilesetWindowProgressBarValue.style.width = ((current/total) * 370) + "px";
}

function loadTileSets() {
  isLoadingTilesets = true;
  let queue = [];  
    
  tilePageCount = 5;
  for (let i = 0; i < tilePageCount; ++i) {if (window.CP.shouldStopExecution(34)){break;}
    queue.push({id:i,type:"top",w:32,h:32});   
  }
window.CP.exitedLoop(34);

  
  for (let i = 0; i < 88; ++i) {if (window.CP.shouldStopExecution(35)){break;} // 88
    queue.push({id:i,type:"iso",w:96,h:48});
  }
window.CP.exitedLoop(35);
  
  
  tilesetLoadCount = queue.length;    
  showTilesetLoader(); 
  
  tilesetLoadCompleteCount = 0;
  for (let i = 0; i < queue.length; ++i) {if (window.CP.shouldStopExecution(36)){break;}
    loadTileSet(queue[i].id,queue[i].type,queue[i].w,queue[i].h, res => { 
      ++tilesetLoadCompleteCount; 
      updateTilesetLoader(tilesetLoadCompleteCount, tilesetLoadCount);
      if(tilesetLoadCompleteCount == queue.length) { 
        isLoadingTilesets = false;
        hideTilesetLoader();
        buildTileSelectorPage(0);        
      }
    });
  }
window.CP.exitedLoop(36);

  
  if (queue.length == 0) {
    isLoadingTilesets = false;
    hideTilesetLoader();
  }
}

function loadTileSet(i, type, tileWidth, tileHeight, completed) {  
  let baseUri = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/163870/";
  let tilesetSource = new Image();
  tilesetSource.src = baseUri + `2d-${type}-${i}.png`;
  if (tilesetSource.complete) {
    let res = addTileSet(i, type, tilesetSource, tileWidth, tileHeight);
    completed(res);
  } else {
    tilesetSource.addEventListener("load", e => {
      let res = addTileSet(i, type, tilesetSource, tileWidth, tileHeight);
      completed(res);
    }, false);
  }  
}

function addTileSet(id, type, src, tileWidth, tileHeight) {
  let isSingleTile = src.width/tileWidth<1.99&&src.height/tileHeight<1.99;
  if(isSingleTile) {
    // (id, x, y, width, height, src)
    let tSrc = new TilesetSource(0, 0, 0, tileWidth, tileHeight, src);
    let tSet = new Tileset(id, type, 1, 1, tileWidth, tileHeight);
    tSet.tiles.push(tSrc);
    tilesets.push(tSet);
    return  tSet;
  } else {    
    let width = src.width/tileWidth;
    let height = src.height/tileHeight;    
    // constructor(id, type, width, height, tileWidth, tileHeight, src)    
    let tSet = new Tileset(id, type, width, height, tileWidth, tileHeight, src);
    for (let y = 0; y < height; ++y)
    {if (window.CP.shouldStopExecution(38)){break;}for (let x = 0; x < width; ++x)
      {if (window.CP.shouldStopExecution(37)){break;}tSet.tiles.push(new TilesetSource(y*tileWidth+x, x*tileWidth, y*tileHeight, tileWidth, tileHeight));}
window.CP.exitedLoop(37);
}
window.CP.exitedLoop(38);

    tilesets.push(tSet);    
    return  tSet;
  }  
}