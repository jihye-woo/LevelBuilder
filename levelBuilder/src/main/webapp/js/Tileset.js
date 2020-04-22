class Tileset{
   constructor(id, name, mapWidth, mapHeight, tileWidth, tileHeight, columns){
       this.id = id;
       this.mapWidth = mapWidth;
       this.mapHeight = mapHeight;
       this.tileWidth = tileWidth;
       this.tileHeight = tileHeight;
       this.columns = columns;
   }
}

class CollectionTileset extends Tileset{
	construtor(){
		super();
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
	construtor(image, margin, spacing){
		super();
	    this.image = image;
		this.margin = margin;
		this.spacing = spacing;
		this.tiles = createSingleTiles(image, tileWidth, tileHeight);
	}
}
function createSingleTiles(image, tileWidth, tileHeight){
	// image size
	//
	return new Array();
	}
	Function showTileset(){
	 
	}

