package levelBuilder.com.controller;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fileController")
@Transactional
public class FileController {
	
	FileController(){
		
	}

//	
//	@RequestMapping(value="/save_map", method=RequestMethod.POST)
//	public ResponseEntity<String> saveMa(@RequestBody String mapXML) {
//		System.out.println(mapXML);
//		return new ResponseEntity<>(mapXML, HttpStatus.CREATED);
//	} 
	@RequestMapping(value="/save_map", method=RequestMethod.POST, produces = MediaType.APPLICATION_XML_VALUE)
	public ResponseEntity<String> saveMap(@RequestBody String mapXML) {
		System.out.println(mapXML);
		return new ResponseEntity<>(mapXML, HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/load_map", method=RequestMethod.POST, produces = MediaType.APPLICATION_XML_VALUE)
	public ResponseEntity<String> loadMap(@RequestBody String mapXMLfileName) {
		System.out.println(mapXMLfileName);
		// parsing the xml file and return
		return new ResponseEntity<>(mapXMLfileName, HttpStatus.CREATED);
	}
}

