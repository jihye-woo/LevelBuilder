package levelBuilder.com.controller;

import levelBuilder.com.EmailSenderService;
import levelBuilder.com.MyUserDetails;
import levelBuilder.com.entities.MapEntity;
import levelBuilder.com.entities.MapSharedWithEntity;
import levelBuilder.com.entities.TilesetEntity;
import levelBuilder.com.entities.TilesetSharedWithEntity;
import levelBuilder.com.entities.UserEntity;
import levelBuilder.com.repositories.MapRepository;
import levelBuilder.com.repositories.MapSharedWithRepository;
import levelBuilder.com.repositories.TilesetRepository;
import levelBuilder.com.repositories.TilesetSharedWithRepository;
import levelBuilder.com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;


@Controller
public class ShareController {
	@Autowired
	UserRepository userRepository;

	@Autowired
	MapRepository mapRepository;

	@Autowired
	MapSharedWithRepository mapSharedWithRepository;

	@Autowired
	TilesetRepository tilesetRepository;

	@Autowired
	TilesetSharedWithRepository tilesetSharedWithRepository;

	@Autowired
	EmailSenderService emailSenderService;

	@GetMapping("/share")
	public String showShareMap(@RequestParam("mapName") String mapName, Model model) {
		//make sure the user is allowed access to this map
		boolean hasAccess = false;
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		MapEntity map = mapRepository.findByName(mapName);

		if (map.getOwnedBy().equals(myUserDetails.getUsername())){ //if user is owner, they have access
			hasAccess = true;
		}

		ArrayList<MapSharedWithEntity> shares = (ArrayList<MapSharedWithEntity>) mapSharedWithRepository.findByMapName(mapName);
		for (MapSharedWithEntity share:shares) {
			if (share.getUserName().equals(myUserDetails.getUsername())) { //if map was shared with user, they have access
				hasAccess = true;
				break;
			}
		}

		if (!hasAccess){ //don't have access, send back to their page
			return "/my-projects";
		} else{
			model.addAttribute("userToShareWith", new UserEntity());
			return "share.jsp";
		}
	}

	//share a map with a user
	@PostMapping("/share")
	public String shareMap(@RequestParam("mapName") String mapName, @ModelAttribute("userToShareWith") UserEntity user, BindingResult bindingResult) {
		UserEntity existingUser = userRepository.findByEmail(user.getEmail());

		if (existingUser == null){ //email doesnt exist
			existingUser = userRepository.findByUsername(user.getUsername());
			if (existingUser == null){//both email and username don't exist
				bindingResult.rejectValue("email", "Not found", "Username or email not found");
				bindingResult.rejectValue("username", "Not found", "Username or email not found");
				return "share.jsp";
			}
		}

		//make sure the user doesnt already have access to the map
		//the user mustn't be the owner or already been shared
		boolean alreadyShared = false;
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		MapEntity map = mapRepository.findByName(mapName);

		if (map.getOwnedBy().equals(myUserDetails.getUsername())){ //if user is owner, they have access
			alreadyShared = true;
		}

		ArrayList<MapSharedWithEntity> shares = (ArrayList<MapSharedWithEntity>) mapSharedWithRepository.findByMapName(mapName);
		for (MapSharedWithEntity share:shares) {
			if (share.getUserName().equals(existingUser.getUsername())){ //already been shared so don't share again
				alreadyShared = true;
				break;
			}
		}

		if (alreadyShared){ //display error
			bindingResult.rejectValue("email", "Already shared with this user", "Already shared with this user");
			bindingResult.rejectValue("username", "Already shared with this user", "Already shared with this user");
			return "share.jsp";
		}

		//otherwise, share this map with the specified user
		MapSharedWithEntity share = new MapSharedWithEntity();
		share.setMapName(mapName);
		share.setUserName(existingUser.getUsername());
		share.setSharedByUsername(myUserDetails.getUsername()); //the person who shared is the one currently logged in!!

		mapSharedWithRepository.save(share);

		//send email notifying user
		SimpleMailMessage email = new SimpleMailMessage();
		email.setFrom("levelbuilder416@gmail.com");
		email.setTo(existingUser.getEmail()); //send to the user who it has been shared with
		email.setSubject(myUserDetails.getUsername() + " has shared a project with you");
		email.setText(myUserDetails.getUsername() + " has shared with you project titled: " + mapName  +
				"\nLog in to Level Builder to view: " + "http://levelbuilder.azurewebsites.net/my-projects");
		emailSenderService.sendEmail(email);

		return "shareSuccess.jsp";
	}

	@GetMapping("/share-tileset")
	public String showShareTileset(@RequestParam("tilesetName") String tilesetName, @RequestParam("ownedBy") String ownedBy, Model model) {
		//make sure the user is allowed access to this tileset
		boolean hasAccess = false;
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		TilesetEntity tileset = tilesetRepository.findByNameAndOwnedBy(tilesetName, ownedBy);

		if (tileset.getOwnedBy().equals(myUserDetails.getUsername())){ //if user is owner, they have access
			hasAccess = true;
		}

		ArrayList<TilesetSharedWithEntity> shares = (ArrayList<TilesetSharedWithEntity>) tilesetSharedWithRepository.findBySharedWithUsername(ownedBy);
		for (TilesetSharedWithEntity share:shares) {
			if (share.getSharedWithUsername().equals(myUserDetails.getUsername())) { //if tileset was shared with user, they have access
				hasAccess = true;
				break;
			}
		}

		if (!hasAccess){
			return "/my-tilesets";
		} else{
			model.addAttribute("userToShareWith", new UserEntity());
			return "shareTileset.jsp";
		}
	}

	//share a tileset with a user
	@PostMapping("/share-tileset")
	public String shareTileset(@RequestParam("tilesetName") String tilesetName, @RequestParam("ownedBy") String ownedBy, @ModelAttribute("userToShareWith") UserEntity user, BindingResult bindingResult) {
		UserEntity existingUser = userRepository.findByEmail(user.getEmail());

		if (existingUser == null){ //email doesnt exist
			existingUser = userRepository.findByUsername(user.getUsername());
			if (existingUser == null){//both email and username don't exist
				bindingResult.rejectValue("email", "Not found", "Username or email not found");
				bindingResult.rejectValue("username", "Not found", "Username or email not found");
				return "shareTileset.jsp";
			}
		}

		//make sure the user doesnt already have access to the tileset
		//the user mustn't be the owner or already been shared
		boolean alreadyShared = false;
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		TilesetEntity tileset = tilesetRepository.findByNameAndOwnedBy(tilesetName, ownedBy);

		if (tileset.getOwnedBy().equals(myUserDetails.getUsername())){ //if user is owner, they have access
			alreadyShared = true;
		}

		ArrayList<TilesetSharedWithEntity> shares = (ArrayList<TilesetSharedWithEntity>) tilesetSharedWithRepository.findBySharedWithUsername(ownedBy);
		for (TilesetSharedWithEntity share:shares) {
			if (share.getSharedWithUsername().equals(myUserDetails.getUsername())) { //if tileset was shared with user, they have access
				alreadyShared = true;
				break;
			}
		}

		if (alreadyShared){ //display error
			bindingResult.rejectValue("email", "Already shared with this user", "Already shared with this user");
			bindingResult.rejectValue("username", "Already shared with this user", "Already shared with this user");
			return "share.jsp";
		}

		//otherwise, share this tileset with the specified user
		TilesetSharedWithEntity share = new TilesetSharedWithEntity();
		share.setTilesetName(tilesetName);
		share.setTilesetOwnedBy(ownedBy);
		share.setSharedWithUsername(existingUser.getUsername());
		share.setSharedByUsername(myUserDetails.getUsername()); //the person who shared is the one currently logged in

		tilesetSharedWithRepository.save(share);

		//send email notifying user
		SimpleMailMessage email = new SimpleMailMessage();
		email.setFrom("levelbuilder416@gmail.com");
		email.setTo(existingUser.getEmail()); //send to the user who it has been shared with
		email.setSubject(myUserDetails.getUsername() + " has shared a tileset with you");
		email.setText(myUserDetails.getUsername() + " has shared with you tileset titled: " + tilesetName  +
				"\nLog in to Level Builder to view: " + "http://levelbuilder.azurewebsites.net/my-tilesets");
		emailSenderService.sendEmail(email);

		return "shareTilesetSuccess.jsp";
	}
}
