class Tileset{
   constructor(id, name, mapWidth, mapHeight, tileWidth, tileHeight){
	   this.id = id;
	   this.name = name;
       this.mapWidth = mapWidth;
       this.mapHeight = mapHeight;
       this.tileWidth = tileWidth;
       this.tileHeight = tileHeight;
   }
}

class CollectionTileset extends Tileset{
	construtor(name, tileWidth, tileHeight){
		super();
		this.name = name;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.columns =0;
		this.tiles = new Array();
	}
	updateTileSize(image){
	// update tileWidth, tileHeight
	}
	addTile(){
	}
	removeTile(){
	}
}

class SingleImageTileset extends Tileset{
	construtor(image, margin, spacing, columns){
		super();
	    this.image = image;
		this.margin = margin;
		this.spacing = spacing;
		this.columns = columns;
		this.tiles = createSingleTiles(image, tileWidth, tileHeight);
	}
}

function createSingleTiles(image, tileWidth, tileHeight){
	// image size
	//
	return new Array();
	}
	// function showTileset(){
	 
	// }

	function removeFile() {

		var d = document.getElementById('tilesetplace');
		var olddiv = document.getElementById("uploadPreview");
		d.removeChild(olddiv);
		}
	  
	  function PreviewImage() {
		var d = document.getElementById('tilesetplace');
		var olddiv = document.getElementById("uploadPreview");
		var oFReader = new FileReader();
		oFReader.readAsDataURL(document.getElementById("fileElem").files[0]);
	  
		oFReader.onload = function (oFREvent) {
			//document.getElementById("uploadPreview").src = oFREvent.target.result;
		  olddiv.src =  oFREvent.target.result;
		  d.removeChild(olddiv);
		  };
	  };
	  
	  const fileSelect = document.getElementById("fileSelect"),
	  fileElem = document.getElementById("fileElem");
	  
	  fileSelect.addEventListener("click", function (e) {
	  if (fileElem) {
	  fileElem.click();
	  }
	  }, false);


	//   document.getElementById("myUL").addEventListener("click", function(e) {
	// 	if (e.target && e.target.matches("li.layerlist")) {
	// 	  e.target.className = "foo"; // new class name here
	// 	  //alert("clicked " + e.target.innerText);
	// 	  selectedLayerName = e.target.innerText;
	// 	  console.log("clicked  "+e.target.innerText);
	// 	}
	//   });