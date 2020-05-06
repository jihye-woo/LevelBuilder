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

class Tile{
	constructor(src, startX, startY, tileWidth, tileHeight){
		this.src = src;
		this.startX = startX;
		this.startY = startY;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
	}
}

class SingleImageTileset extends Tileset{
	constructor(id, name, mapWidth, mapHeight, tileWidth, tileHeight, image, margin, spacing){
		super(id, name, mapWidth, mapHeight, tileWidth, tileHeight);
	    this.image = image;
		this.margin = margin;
		this.spacing = spacing;
		//this.columns = columns;
		//this.tiles = createSingleTiles(image, tileWidth, tileHeight, margin, spacing);
		this.tiles= new Array()
	}

	addTile(startX, startY, tw, th){
		var newTile;
		var id;
		newTile = new Tile(this.image, startX, startY, tw, th);
		this.tiles.push(newTile);
	}
}

function createSingleTiles(image, tileWidth, tileHeight, margin, spacing){
  var tile;
  var xPos =0;
  var yPos =0;
  var limit;
  var tileList =[];
  var plus = tileWidth+ spacing;
  var plusH = tileHeight +spacing;
  var singleTileset = new SingleImageTileset(image, margin, spacing);
  
  for(var i = 0;i < colT * rowT; i++){
		tile = {};
		tile.xPos = xPos;
		tile.yPos = yPos;
		tile.tw = tileWidth;
		tile.th = tileHeight;
		singleTileset.addTile(tile.xPos, tile.yPos, tile.tw, tile.th);
		tileList.push(tile);
		xPos += plus;
		limit = loadImg.width-tile.tw;

		if(totalWidth !=loadImg.width){
		  if(xPos >= limit){
			xPos = 0;
			yPos += plusH;
		  }
		}
		else{
		  if(xPos >= loadImg.width){
			xPos = 0;
			yPos += plusH;
		  }
		}
  }
    editor.loadTileset(singleTileset);
	return tileList;
  }

class CollectionTileset extends Tileset{
	constructor(name, tileWidth, tileHeight){
		super(id, name, mapWidth, mapHeight, tileWidth, tileHeight);
		this.name = name;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.columns =0;
		this.tileList= new Array(tile);
	}

	updateTileSize(Theight, Twidth){
		var maxWidth = this.tileWidth;   
		var maxHeight = this.tileHeight;  
		 
		if(Twidth > maxWidth || Theight > maxHeight){
		   if(Twidth > maxWidth){
			  maxWidth = Twidth;
		   }
		   if(Theight > maxHeight){
			  maxHeight = Theight;
		   }
		}
			this.tileWidth = maxWidth;
			this.tileHeight = maxHeight;
			console.log("update "+ this.tileHeight + this.tileWidth);
	}

	addCollectionTile(src, imgW, imgH){
		var tile;
		tile = new Tile(src, imgW, imgH);
		this.tileList.push(tile);
	}

	removeCollectionTile(){
		// this.tileList.push(newLayer);
	}
}

function createCollectionTileSet(){
  var collectionName = document.getElementById("TilesetName").value;
  //var newLayer = new TiledLayer(0, "Layer1", mapWidth, mapHeight, mapName, tileWidth, tileHeight);
  closeWindow(createTileSetWindow);
}
