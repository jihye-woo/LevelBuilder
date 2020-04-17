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
  closeWindow(createMapWindow);
  let mapType = "top";
  let mapWidth  = parseInt(document.querySelector("#input-map-width").value  || 32)
  let mapHeight = parseInt(document.querySelector("#input-map-height").value || 32);

  createMapXML(mapWidth, mapHeight, mapWidth, mapHeight);

  for(let radio of document.getElementsByClassName("map-perspective")) {if (window.CP.shouldStopExecution(29)){break;}    
    if (radio.checked) {
      mapType = radio.value;
      break;
    }
    }
}
window.CP.exitedLoop(29);

function createTileSet() {  
  
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
      var xml = new XMLSerializer().serializeToString(MapXMLCreate(width, height, tilewidth, tileheight));
      var blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
      saveAs(blob, "newmap.tmx");
}


function MapXMLCreate(width, height, tilewidth, tileheight)
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

    doc.innerHTML = '<?xml version="1.0" encoding="UTF-8"?>';
    mapElem.appendChild(layerElem);
    layerElem.appendChild(dataElem);
    doc.appendChild(mapElem);
    return doc;
}