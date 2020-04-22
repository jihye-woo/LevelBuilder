<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>spring
<!-- <script src="//code.jquery.com/jquery-1.11.1.min.js"></script> -->
<link href="css/workSpace.css" rel="stylesheet">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="js/bootstrap.min.js" rel="text/javascript">
<!-- <link href="js/Map.js" rel="text/javascript"> -->

<script src="https://cdn.rawgit.com/eligrey/FileSaver.js/5ed507ef8aa53d8ecfea96d96bc7214cd2476fd2/FileSaver.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

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
                <a href="#" onclick="saveAs()">Save As </a>
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
                    <a href="#" onclick="newLayer()">New</a>
                    <a href="#" onclick="newLayerGroup()">Group</a>
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
                  <div class="dropdown">
                      <button class="dropbtn">About</button>
                      <div class="dropdown-content">
                        <a href="#">User Manual</a>
                        <a href="#">About Level Builder</a>
                      </div>
                    </div>
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
                <div class = "Layer1">
                  <script type="text/javascript" src="js/tilemap.js"></script>
                  <script>
                      var grid = new Grid(300, 300, 30, 20);
                      // << Later >>
                      // + new Grid(300, 300, 30, 20) <= these values can be brought from the map object
                      // + "Layer" object should be added
                      // So, final version should be Grid(mapObject, layerObject);
                      // for now, this is just hard coded
                      grid.updateCells();
                    </script>
                </div>
                <div class = "Layer2">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="project">
          <!-- <div class="tab-header"> -->
                <button class="tab-header1" onclick="openTab(event, 'MapLayers')" id="defaultOpen">Map Layers</button>
                <button class="tab-header1" onclick="openTab(event, 'TileSets')">Tile Sets</button>

          <div id="MapLayers" class="tabcontent">
              <div class="project-tools">
                <div class="surface btn" id="btn-layer-group" title="Create a new group" onclick="createLayerGroup()"><i
                    class="fa fa-folder"></i></div>
                <div class="surface btn" id="btn-layer-add" title="Create a layer" onclick="newLayer()"><i
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
                <!-- <ul class="project-item-tree" id="myUL"> -->
                <ul id="myUL"> 
                </ul>
              </div>
            </div>

            <div id="TileSets" class="tabcontent">
                <div class="project-tools">
                  <div class="surface btn" id="btn-layer-group" title="Create a new group" onclick="createTileGroup()"><i
                      class="fa fa-folder"></i></div>
                  <div class="surface btn" id="btn-layer-add" title="Create a layer" onclick="createTile()"><i
                      class="fa fa-file-o"> </i></div>

                  <div class="surface btn req-layer" id="btn-layer-remove" title="Remove group or layer"
                    onclick="removeLayerOrGroup(this)" disabled="disabled"><i class="fa fa-trash-o"> </i></div>
                </div>
                <div class="project-item-list" id="style-4">
                  <ul class="project-item-tree" id="tileUL"></ul>
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

              <label for="fname">Name:</label>
              <input type="text" id="map-name" name="fname">
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

      <div class="window surface" id="saveas">
          <div class="window-title-bar">
            <h4>Save As</h4>
            <label for="fname">File name:</label>
            <input type="text" id="fname" name="fname"><br><br> 
          </div>
          <div class="window-actions">
            <div class="surface btn" onclick="cancelSaveAs()">Cancel</div>
            <div class="surface btn" onclick="SaveAs()">OK</div>
          </div>
      </div>

      <div class="window surface" id="create-layer-window">
          <div class="window-title-bar">
            <h4>New Layer</h4>
            <div class="surface btn" onclick="cancelCreateLayer()"><i class="fa fa-close"></i></div>
          </div>
          <div class="window-body">
            <!-- <p>Warning: Creating a new layer will discard your current progress!</p> -->
            <div class="input-header">Select</div>
            <div class="input-row">
              <input class="map-perspective" id="tile-layer" name="layer-obj" type="radio" value="tile-layer" checked="checked"/>
              <label for="tile-layer">Tile Layer</label>
            </div>
            <div class="input-row">
              <input class="map-perspective" id="object-layer" name="layer-obj" value="object-layer" type="radio"/>
              <label for="object-layer">Object Layer</label>
            </div>
            <div class="input-row">
              <label for="input-layer">Layer Name :</label>
              <input type="text" placeholder="Layer1" id="input-layer"/>
            </div>
          </div>
          <div class="window-actions">
            <div class="surface btn" onclick="cancelCreateLayer()">Cancel</div>
            <div class="surface btn" onclick="createLayer()">OK</div>
          </div>
        </div>
<script>
var editor;

class Editor{
	constructor(){
		this.currentMap;
		this.currentTileset;
		this.loadedMapList = new Array();
		this.loadedTilesetList = new Array();
	}
	
	loadMap(map){
		this.currentMap = map;
		this.loadedMapList.push(map);
	}
	loadTileset(tileset){
		this.loadedTilesetList.push(tileset);
		this.currentTileset = tileset;
	}
	closeMap(){
		
	}
	loadTileset(){
		
	}
}

window.onload = (event) => {
	editor = new Editor();
	console.log("create editor class");
	};

</script>

<script type="text/javascript" src="js/Map.js"></script>
<script type="text/javascript" src="js/file.js"></script>
<script type="text/javascript" src="js/npm.js"></script>
<script type="text/javascript" src="js/tilemap.js"></script>
<script type="text/javascript" src="js/Tileset.js"></script>
<script type="text/javascript" src="js/FileSaver.js"></script>

</body>
</html>