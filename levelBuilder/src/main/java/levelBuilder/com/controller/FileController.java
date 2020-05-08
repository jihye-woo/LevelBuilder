package levelBuilder.com.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import levelBuilder.com.entities.ImagesAddedToTilesetEntity;
import levelBuilder.com.entities.LayerEntity;
import levelBuilder.com.entities.LayerPropertiesEntity;
import levelBuilder.com.entities.MapEntity;
import levelBuilder.com.entities.TilesetEntity;
import levelBuilder.com.repositories.ImagesAddedToTilesetRepository;
import levelBuilder.com.repositories.LayerPropertiesRepository;
import levelBuilder.com.repositories.LayerRepository;
import levelBuilder.com.repositories.MapRepository;
import levelBuilder.com.repositories.TilesetRepository;
import levelBuilder.com.repositories.UserRepository;

@RestController
@RequestMapping("/fileController")
@Transactional
public class FileController {
	
	ObjectMapper mapper = new ObjectMapper();
	JSONObject object = new JSONObject();
	
	@Autowired
    UserRepository userRepository;
	
	@Autowired
	MapRepository mapRepository;
	
	@Autowired
	LayerRepository layerRepository;
	
	@Autowired
	LayerPropertiesRepository layerPropRepository;
	
	@Autowired
	TilesetRepository tilesetRepository;
	
	@Autowired
	ImagesAddedToTilesetRepository imagesAddedToTilesetRepository;
	
	FileController(){
		object.put("sending", 0);
	}

	
//	@RequestMapping(value="/save_userName", method=RequestMethod.POST)
//	public ResponseEntity<String> saveUserName(@RequestBody String request) {
//		System.out.println(userName);
//		return new ResponseEntity<>(userName, HttpStatus.CREATED);
//	} 
//	
	@RequestMapping(value="/save_map", method=RequestMethod.POST)
	public ResponseEntity<String> saveMap(@RequestBody MapEntity map) {
		// save map data
		mapRepository.save(map);
		return new ResponseEntity<>(object.toString(), HttpStatus.CREATED);
	}
	@RequestMapping(value="/save_layer", method=RequestMethod.POST)
	public ResponseEntity<String> saveLayer(@RequestBody List<LayerEntity> layers) {
		// save Layer data
		for(LayerEntity layer : layers)
			layerRepository.save(layer);
		return new ResponseEntity<>(object.toString(), HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/save_layerProp", method=RequestMethod.POST)
	ResponseEntity<String> saveLayerProp(@RequestBody List<LayerPropertiesEntity> layerProps) {
		// save Layer data
		for(LayerPropertiesEntity layerProp : layerProps)
			layerPropRepository.save(layerProp);
		
		return new ResponseEntity<>(object.toString(), HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/load_map", method=RequestMethod.POST)
	public ResponseEntity<String> loadMap(@RequestBody String jsonFileName) {
		System.out.println(jsonFileName);
		JSONObject jsonObject = new JSONObject(jsonFileName);
		String mapName = jsonObject.getString("mapName");
		JSONObject result = new JSONObject();
		JSONArray layerArray = new JSONArray();
		JSONArray layerPropArray = new JSONArray();
		
		// 1. load map
		MapEntity map = mapRepository.findByName(mapName);
		List<LayerEntity> layers = layerRepository.findByMapName(mapName);
		try {
			String mapJson = mapper.writeValueAsString(map);
			System.out.println(mapJson);
			result.put("map", new JSONObject(mapJson));
			for(LayerEntity layer : layers) {
				String LayerJson = mapper.writeValueAsString(layer);
				System.out.println(LayerJson);
				layerArray.put(new JSONObject(LayerJson));
				LayerPropertiesEntity layerProp = layerPropRepository.findByLayerIdAndMapName(layer.getId(), mapName);
				String layerPropJson = mapper.writeValueAsString(layerProp);
				System.out.println(layerPropJson);
				JSONObject layerPropOb = new JSONObject(new JSONObject(layerPropJson));
				layerPropArray.put(new JSONObject(layerPropOb));
			}
			result.put("layers", layerArray);
			result.put("layerProps", layerPropArray);
		} catch (JsonProcessingException e1) {
			e1.printStackTrace();
		}
		
		System.out.println(result.toString());
		
		return new ResponseEntity<>(result.toString(), HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/save_tileset", method=RequestMethod.POST)
	public ResponseEntity<String> saveTileset(@RequestBody TilesetEntity tileset) {
		// save map data
		tilesetRepository.save(tileset);
		return new ResponseEntity<>(object.toString(), HttpStatus.CREATED);
	}
	
	
	@RequestMapping(value="/save_image", method=RequestMethod.POST)
	public ResponseEntity<String> saveImage(@RequestBody ImagesAddedToTilesetEntity imageData) {
//		System.out.println(imageData);
		// save map data
		imagesAddedToTilesetRepository.save(imageData);
		return new ResponseEntity<>(object.toString(), HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/load_tileset", method=RequestMethod.POST)
	public ResponseEntity<String> loadTileset(@RequestBody String jsonFileName) {
		JSONObject jsonObject = new JSONObject(jsonFileName);
		String name = jsonObject.getString("name");
		String username = jsonObject.getString("username");
		JSONObject result = new JSONObject();
		
		// 1. load tileset
		TilesetEntity tileset = tilesetRepository.findByNameAndOwnedBy(name, username);
		
		// 2. load image
		List<ImagesAddedToTilesetEntity> images 
		= imagesAddedToTilesetRepository.findByTilesetNameAndTilesetOwnedBy(name, username);
		
		try {
			
			// 3. convert to json and put into the jsonobject
			
			// 3-1. tileset
			String tilesetJson = mapper.writeValueAsString(tileset);
			System.out.println(tilesetJson);
			result.put("tileset", new JSONObject(tilesetJson));
			
			// 3-2 image
			// image should be one (because for now we only consider single image tileset)
			String imageJson = mapper.writeValueAsString(images.get(0));
			System.out.println(imageJson);
			result.put("image", new JSONObject(imageJson));
			
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		
//		for(ImagesAddedToTilesetEntity img : images) {
//			
//		}
		System.out.println(result.toString());
		
		return new ResponseEntity<>(result.toString(), HttpStatus.CREATED);
	}
//	@RequestMapping(value="/load_layer", method=RequestMethod.POST)
//	public ResponseEntity<String> loadLayer(@RequestBody String jsonFileName) {
//		JSONObject jsonObject = new JSONObject(jsonFileName);
//		String mapName = jsonObject.getString("mapName");
//		JSONObject result = new JSONObject();
//		
//		// 2. load layers and layerProperties
//		List<LayerEntity> layers = layerRepository.findByMapName(mapName);
//		JSONArray layerArray = new JSONArray();
////		JSONArray layerPropArray = new JSONArray();
//		try {
//			for(LayerEntity layer : layers) {
//				String LayerJson = mapper.writeValueAsString(layer);
//				System.out.println(LayerJson);
//				layerArray.put(new JSONObject(LayerJson));
////						LayerPropertiesEntity layerProp = layerPropRepository.findByLayerId(layer.getId());
////						String layerPropJson = mapper.writeValueAsString(layerProp);
////						JSONObject layerPropOb = new JSONObject(layerPropJson);
////						layerPropArray.put(layerPropOb);
//			}
//		} catch (JsonProcessingException e) {
//					e.printStackTrace();
//		}
//		result.put("layers", layerArray);
////		result.put("layerProps", layerPropArray);
//		System.out.println(result.toString());
//		
//		return new ResponseEntity<>(result.toString(), HttpStatus.CREATED);
//	}
	
	
	
//	@RequestMapping(value="/load_file", method=RequestMethod.POST)
//	public ResponseEntity<String> loadMap(@RequestBody String jsonFileName) {
//		JSONObject jsonObject = new JSONObject(jsonFileName);
//		String fileName = jsonObject.getString("filename");
//		System.out.println(fileName);
//		
//		String xmlString = "<map version=\"1.2\" tiledversion=\"1.3.2\" orientation=\"isometric\" renderoreder=\"left-down\" compressionlevel=\"-1\" width=\"30\" height=\"30\" tilewidth=\"30\" tileheight=\"30\" infinite=\"0\" nextlayerid=\"2\" nextobjectid=\"1\"><layer id=\"1\" name=\"Tile Layer 1\" width=\"30\" height=\"30\"><data encoding=\"csv\">0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0</data></layer></map>";
//		// parsing the xml file and return
//		return new ResponseEntity<>(xmlString, HttpStatus.CREATED);
//	}
}

