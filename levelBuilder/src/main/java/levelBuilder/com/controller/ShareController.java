package levelBuilder.com.controller;

import levelBuilder.com.MyUserDetails;
import levelBuilder.com.entities.MapSharedWithEntity;
import levelBuilder.com.entities.TilesetSharedWithEntity;
import levelBuilder.com.entities.UserEntity;
import levelBuilder.com.repositories.MapSharedWithRepository;
import levelBuilder.com.repositories.TilesetSharedWithRepository;
import levelBuilder.com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class ShareController {
	@Autowired
    UserRepository userRepository;

	@Autowired
    MapSharedWithRepository mapSharedWithRepository;

	@Autowired
	TilesetSharedWithRepository tilesetSharedWithRepository;

	@GetMapping("/share")
	public String validateToken(@RequestParam("mapName") String mapName, Model model) {

		model.addAttribute("userToShareWith", new UserEntity());
		return "share.jsp";
	}

	//share a map with a user
	@PostMapping("/share")
	public String resetPassword(@RequestParam("mapName") String mapName, @ModelAttribute("userToShareWith") UserEntity user, BindingResult bindingResult) {
		UserEntity existingUser = userRepository.findByEmail(user.getEmail());

		if (existingUser == null){ //email doesnt exist
			existingUser = userRepository.findByUsername(user.getUsername());
			if (existingUser == null){//both email and username don't exist
				bindingResult.rejectValue("email", "Not found", "Username or email not found");
				bindingResult.rejectValue("username", "Not found", "Username or email not found");
				return "share.jsp";
			}
		}

		MapSharedWithEntity share = new MapSharedWithEntity();
		share.setMapName(mapName);
		share.setUserName(existingUser.getUsername());

		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		share.setSharedByUsername(myUserDetails.getUsername()); //the person who shared is the one currently logged in!!

		mapSharedWithRepository.save(share);

		return "shareSuccess.jsp";
	}

	@GetMapping("/share-tileset")
	public String shareTileset(@RequestParam("tilesetName") String tilesetName, @RequestParam("ownedBy") String ownedBy, Model model) {

		model.addAttribute("userToShareWith", new UserEntity());
		return "shareTileset.jsp";
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

		TilesetSharedWithEntity share = new TilesetSharedWithEntity();
		share.setTilesetName(tilesetName);
		share.setTilesetOwnedBy(ownedBy);
		share.setSharedWithUsername(existingUser.getUsername());

		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		share.setSharedByUsername(myUserDetails.getUsername()); //the person who shared is the one currently logged in

		tilesetSharedWithRepository.save(share);

		return "shareTilesetSuccess.jsp";
	}
}
