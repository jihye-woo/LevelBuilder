<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>spring
<!-- <script src="//code.jquery.com/jquery-1.11.1.min.js"></script> -->
<link href="css/workSpace.css" rel="stylesheet">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="js/bootstrap.min.js" rel="text/javascript">

<script src="https://cdn.rawgit.com/eligrey/FileSaver.js/5ed507ef8aa53d8ecfea96d96bc7214cd2476fd2/FileSaver.min.js"></script>


<!------ Include the above in your HEAD tag ---------->

<html lang='en' class=''>

<head>
<meta charset="EUC-KR">
<title>LevelBuilder map editor</title>
</head>

<body>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
  <div class="whole_workspace">
    <section id="side-bar">
      <a id="toggle-home">
        <img src="img/home.svg" tooltip = "toggle-home" flow = "right">
      </a>
      <div class ="vertical-align">
        <ul id="tool-menu">
          <li data ="view" id="tool-view">
            <img src="img/tool/view.png">
            <!-- <span class="tooltiptext">Control view</span> -->
          </li>
          <li data ="history" id="tool-history">
            <img src="img/tool/history.png">
          </li>
        </ul>
      </div>
    </section>
    <section class="side-helper">

    </section>
    <section class="app">
      <div class="menu">
          <div class="dropdown">
              <button class="dropbtn">File</button>
              <div class="dropdown-content">
                <a href="#" onclick="newMap()">New Map</a>
                <a href="#" onclick="newTileSet()">New TileSet</a>
                <a href="#">Share Map</a>
                <a href="#">Open</a>
                <a href="#">Save</a>
                <a href="#">Save As</a>
                <a href="#">Export</a>
                <a href="#">Export As</a>
                <a href="#">Export As Image</a>
                <a href="#">Delete</a>
                <a href="#">Recent Files</a>
                <a href="#">Close All</a>
              </div>
            </div>
            <div class="dropdown">
                <button class="dropbtn">Edit</button>
                <div class="dropdown-content">
                  <a href="#">Undo</a>
                  <a href="#">Redo</a>
                  <a href="#">Cut</a>
                  <a href="#">Copy</a>
                  <a href="#">Paste</a>
                  <a href="#">Select All</a>
                  <a href="#">Delete</a>
                </div>
              </div>
              <div class="dropdown">
                  <button class="dropbtn">Layers</button>
                  <div class="dropdown-content">
                    <a href="#">New</a>
                    <a href="#">Group</a>
                    <a href="#">Duplicate Layers</a>
                    <a href="#">Remove Layers</a>
                    <a href="#">Raise Layers</a>
                    <a href="#">Lower Layers</a>
                    <a href="#">Show/Hide Layers</a>
                    <a href="#">Lock/Unlock Layers</a>
                  </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">TileSet</button>
                    <div class="dropdown-content">
                      <a href="#">Add Tile</a>
                      <a href="#">Remove Tile</a>
                    </div>
                  </div>
        <div class="surface btn" id="btn-info" title="Totally about this tool!" onclick="showAbout()"><i
            class="fa fa-info"></i><span>About</span></div>
      </div>
      <div class="workspace">
        <div class="scene">
          <div class="tab-header">Map editor</div>
          <div class="surface tab">
            <div class="editor-container">
              <div class="editor-tools">
                <div class="surface btn active" id="btn-editor-cursor"
                  title="Selector tool - select objects to edit their properties" onclick="selectEditorTool('cursor')">
                  <i class="fa fa-mouse-pointer"></i></div>
                <div class="surface btn" id="btn-editor-brush" title="(1) Brush tool - paint tiles"
                  onclick="selectEditorTool('brush')"><i class="fa fa-paint-brush"></i></div>
                <div class="surface btn" id="btn-editor-eraser" title="(2) Eraser tool - erase tile data"
                  onclick="selectEditorTool('eraser')"><i class="fa fa-eraser"></i></div>
                <div class="surface btn" id="btn-editor-move"
                  title="(3) Drag tool - pan around the map editor, you can also hold down (alt)"
                  onclick="selectEditorTool('move')"><i class="fa fa-arrows"></i></div>
                <div class="surface btn" id="btn-editor-zout" title="(-) Zoom out" onclick="zoomOut()"><i
                    class="fa fa-search-minus"></i></div>
                <div class="surface btn" id="btn-editor-zin" title="(+) Zoom in" onclick="zoomIn()"><i
                    class="fa fa-search-plus"></i></div>
              </div>
              <div class="surface editor-border">
                <canvas class="editor"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="project">
          <!-- <div class="tab-header"> -->
                <button class="tab-header1" onclick="openCity(event, 'MapLayers')" id="defaultOpen">Map Layers</button>
                <button class="tab-header1" onclick="openCity(event, 'TileSets')">Tile Sets</button>

          <div id="MapLayers" class="tabcontent">
              <div class="project-tools">
                <div class="surface btn" id="btn-layer-group" title="Create a new group" onclick="createLayerGroup()"><i
                    class="fa fa-folder"></i></div>
                <div class="surface btn" id="btn-layer-add" title="Create a layer" onclick="createLayer()"><i
                    class="fa fa-file-o"> </i></div>
                <div class="surface btn req-layer" id="btn-layer-duplicate" title="Duplicate layer"
                  onclick="duplicateLayer(this)" disabled="disabled"><i class="fa fa-files-o"></i></div>
                <div class="surface btn req-layer" id="btn-layer-up" title="Move group or layer upwards"
                  onclick="moveLayerUp(this)" disabled="disabled"><i class="fa fa-arrow-up"></i></div>
                <div class="surface btn req-layer" id="btn-layer-down" title="Move group or layer downwards"
                  onclick="moveLayerDown(this)" disabled="disabled"><i class="fa fa-arrow-down"> </i></div>
                <div class="surface btn req-layer" id="btn-layer-remove" title="Remove group or layer"
                  onclick="removeLayerOrGroup(this)" disabled="disabled"><i class="fa fa-trash-o"> </i></div>
              </div>
              <div class="project-item-list" id="style-4">
                <ul class="project-item-tree"></ul>
              </div>
            </div>

            <div id="TileSets" class="tabcontent">
                <div class="project-tools">
                  <div class="surface btn" id="btn-layer-group" title="Create a new group" onclick="createLayerGroup()"><i
                      class="fa fa-folder"></i></div>
                  <div class="surface btn" id="btn-layer-add" title="Create a layer" onclick="createLayer()"><i
                      class="fa fa-file-o"> </i></div>

                  <div class="surface btn req-layer" id="btn-layer-remove" title="Remove group or layer"
                    onclick="removeLayerOrGroup(this)" disabled="disabled"><i class="fa fa-trash-o"> </i></div>
                </div>
                <div class="project-item-list" id="style-4">
                  <ul class="project-item-tree"></ul>
                </div>
              </div>
        </div>

      </div>
    </section>
  </div>

  <div class="window-tint">       </div>
  <div class="window surface" id="create-map-window">
      <div class="window-title-bar">
        <h4>New map</h4>
        <div class="surface btn" onclick="cancelCreateMap()"><i class="fa fa-close"></i></div>
      </div>
      <div class="window-body">
         <p>Oriententaion: orthogonal</p>
         <p>Tile layer format: Base64 (uncompressed)</p>
         <p>Tile render order: Right Up</p>
        <!-- <select id="oriententaion">
            <option value="orthogonal">Orthogonal</option>
         </select>
          <div class="input-header">Tile layer format: </div>
          <select id="tileLayerFormat">
              <option value="base64">Base64(uncompressed)</option>
            </select>
            <div class="input-header">Tile render order</div>
            <select id="tileRenderOrder">
                <option value="rightUP">Right Up</option>
              </select>  -->
        
        <div class="newline"></div>
        <div class="input-header">Map size</div>
        <div class="input-row">
          <label for="map-width">Width :</label>
          <input type="text" placeholder="eg. 32" id="map-width"/>

          <label for="map-height">Height:</label>
          <input type="text" placeholder="eg. 32" id="map-height"/>
        </div>
        <div class="input-header">Tile size</div>
        <div class="input-row">
          <label for="tile-width">Width :</label>
          <input type="text" placeholder="eg. 32" id="tile-width"/>

          <label for="tile-height">Height:</label>
          <input type="text" placeholder="eg. 32" id="tile-height"/>
        </div>
      </div>
      <div class="window-actions">
        <div class="surface btn" onclick="cancelCreateMap()">Cancel</div>
        <div class="surface btn" onclick="createMap()">OK</div>
      </div>
    </div>

    <div class="window surface" id="create-tileset-window">
        <div class="window-title-bar">
          <h4>New TileSet</h4>
          <div class="surface btn" onclick="cancelCreateTileSet()"><i class="fa fa-close"></i></div>
        </div>
        <div class="window-body">
            <div class="input-header">TileSet </div>
            <label for="fname">File name:</label>
            <input type="text" id="fname" name="fname"><br><br> 
          <div class="input-header">Type</div>
          based On TileSet Img: <input type="checkbox" id="basedOnTileSetImg"  onclick="myCheck()">
          collection Of Img: <input type="checkbox" id="collectionOfImg"  onclick="myCheck()">
          <!-- <div class="input-row">
            <input class="map-perspective" id="basedOnTileSetImg" name="tileSetType" type="radio" value="basedOnTileSetImg" checked="checked"/>
            <label for="basedOnTileSetImg">Based on TileSet Image </label>
            <input class="map-perspective" id="collectionOfImg" name="tileSetType" value="collectionOfImg" type="radio"/>
            <label for="collectionOfImg"> Collection of Images</label>
            <input type="button" onclick="mySelect()" value="Select">
          </div> -->
          <div class="input-row" id="txt" style="display:none">
          <div class="newline"></div>
          <div class="input-header">Image </div> 
          <!-- <label for="fname">Source:</label>
          <input type="text" id="fname" name="fname"> -->
          <input type="file" id="myFile"> 

          <div class="input-row">
            <label for="tileSet-width">Width :</label>
            <input type="text" placeholder="eg. 32" id="tileSet-width"/>
            <label for="tileSet-height">Height:</label>
            <input type="text" placeholder="eg. 32" id="tileSet-height"/>
          </div>
          <div class="input-row">
            <label for="margin">Margin :</label>
            <input type="text" placeholder="eg. 32" id="margin"/>
            <label for="spacing">Spacing:</label>
            <input type="text" placeholder="eg. 32" id="spacing"/>
          </div>
          <div class="window-actions">
              <div class="surface btn" onclick="cancelCreateTileSet()">Cancel</div>
              <div class="surface btn" onclick="createTileSet()">OK</div>
            </div>
          </div>
        </div>
        <div class="window-actions" id="text" style="display:none">
          <div class="surface btn" onclick="cancelCreateTileSet()">Cancel</div>
          <div class="surface btn" onclick="createTileSet()">OK</div>
        </div>
      </div>
</body>


</html>

<script>

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

let createMapWindow = document.querySelector("#create-map-window");
let createTileSetWindow = document.querySelector("#create-tileset-window");

function newMap() {  
showWindow(createMapWindow);
}

function newTileSet() {  
showWindow(createTileSetWindow);
}

function cancelCreateMap() {  
  closeWindow(createMapWindow);
}

function cancelCreateTileSet() {  
  closeWindow(createTileSetWindow);
}

function createMap() {
  let mapType = "top";

  var mapWidth = document.getElementById("map-width").value;
  var mapHeight = document.getElementById("map-height").value;
  var tileWidth = document.getElementById("tile-width").value;
  var tileHeight = document.getElementById("tile-height").value;

  createMapXML(mapWidth, mapHeight, tileWidth, tileHeight);
  // create map object and load 
  closeWindow(createMapWindow);
  for(let radio of document.getElementsByClassName("map-perspective")) {if (window.CP.shouldStopExecution(29)){break;}    
    if (radio.checked) {
      mapType = radio.value;
      break;
    }	
    }
}
window.CP.exitedLoop(29);

function createTileSet() {  
  createTilesetXML("filename", "20", "20", "1", "1", "15", "3");
 // createImageTilesetXML(name, tilewidth, tilehegiht, spacing, margin, imagesource)
 // createCollectionTilesetXML(name)
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

    function openCity(evt, cityName) {
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
    
    function createMapXML(width, height, tilewidth, tileheight) {
        var xml = new XMLSerializer().serializeToString(MapXML(width, height, tilewidth, tileheight));
        var blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
        saveAs(blob, "newmap.tmx");
  }


  function MapXML(width, height, tilewidth, tileheight)
  {
      var doc = document.implementation.createDocument(null, null);
      var mapElem = doc.createElement("map");
      mapElem.setAttribute("version", "1.2");
      mapElem.setAttribute("tiledversion", "1.3.2");
      mapElem.setAttribute("orientation", "isometric");
      mapElem.setAttribute("renderoreder", "left-down");
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

function getImage(imagesrc){
  var newImage = new Image();
  newImage.src = imagesrc;
  return newImage;
}

   
</script>


