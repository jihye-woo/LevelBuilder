package levelBuilder.com.controller;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import levelBuilder.com.repositories.MapRepository;
import levelBuilder.com.repositories.TilesetRepository;

@RestController
@RequestMapping("/fileController")
@Transactional
public class ValidationController {

	@Autowired
	MapRepository mapRepository;
	
	@Autowired
	TilesetRepository tilesetRepository;
	
	@RequestMapping(value="/mapname_validate", method=RequestMethod.POST)
	public  ResponseEntity<String> mapNameValidate(@RequestParam(value="mapName") String mapName, 
													@RequestParam(value="userName") String userName) {
		
		String validationResult = "true";
		
		if(mapRepository.findByName(mapName)==null) {
			validationResult = "false";
		};
		
		return new ResponseEntity<>("{'valid' : "+validationResult+"}", HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/tilesetname_validate", method=RequestMethod.POST)
	public  ResponseEntity<String> tilesetNameValidate(@RequestParam(value="tilesetName") String tilesetName,
														@RequestParam(value="userName") String userName) {
		String validationResult = "true";
		if(tilesetRepository.findByNameAndOwnedBy(tilesetName, userName) == null) {
			validationResult = "false";
		};
		// save tileset data
		
		return new ResponseEntity<>("{'valid' : "+validationResult+"}", HttpStatus.CREATED);
	}
	
}
