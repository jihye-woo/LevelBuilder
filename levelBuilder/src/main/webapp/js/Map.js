
class Map{
    constructor(id, mapWidth, mapHeight, tileWidth, tileHeight, layer){
        this.id = id;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.Layer = new Array(layer);
    }
}

class Layer{
    constructor(id, name, width, height){
        this.id = id;
        this.name = name;
        this.width = width;
        this.hegiht = height;
    }
}

class TiledLayer extends Layer{
    constructor(id, name, width, height){
        super(id, name, width, height);
    }
}

class ObjectLayer extends Layer{
    constructor(id, name, width, height){
        super(id, name, width, height);
        this.objects = new Array(); // insert the MapObject later
    }
}

class MapObject{
    constructor(id, xcoordinate, ycoordinate, height, width, image, properties){
        this.id = id;
        this.xcoordinate = xcoordinate;
        this.ycoordinate = ycoordinate;
        this.visibility = true;
        this.height = height;
        this.width = width;
        this.image = image;
        this.properties = properties;
    }
}