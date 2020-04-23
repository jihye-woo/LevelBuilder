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


