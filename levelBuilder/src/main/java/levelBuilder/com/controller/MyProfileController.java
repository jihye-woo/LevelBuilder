package levelBuilder.com.controller;

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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;


@Controller
public class MyProfileController {
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

	@RequestMapping("/my-profile")
	public String viewProfile(Model model) {
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserEntity user = userRepository.findByUsername(myUserDetails.getUsername());
		model.addAttribute("user", user);

		return "myProfile.jsp";
	}

	@GetMapping("/my-profile-edit")
	public String showEditProfile(Model model) {
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserEntity user = userRepository.findByUsername(myUserDetails.getUsername());
		model.addAttribute("user", user);

		return "myProfileEdit.jsp";
	}

	@PostMapping("/my-profile-edit")
	public String editProfile(@ModelAttribute("user") UserEntity updatedUser, BindingResult bindingResult) {
		boolean errors = false;
		if (updatedUser.getName().equals("")){
			errors = true;
			bindingResult.rejectValue("name", "Cannot be blank", "Cannot be blank");
		}if (updatedUser.getUsername().equals("")){
			errors = true;
			bindingResult.rejectValue("username", "Cannot be blank", "Cannot be blank");
		}if (updatedUser.getEmail().equals("")){
			errors = true;
			bindingResult.rejectValue("email", "Cannot be blank", "Cannot be blank");
		}if (updatedUser.getBirthdate()==null){
			errors = true;
			bindingResult.rejectValue("birthdate", "Cannot be blank", "Cannot be blank");
		}if (updatedUser.getPhonenumber()==null){
			errors = true;
			bindingResult.rejectValue("phonenumber", "Cannot be blank", "Cannot be blank");
		}

		//If username/email changed (not the same as logged in user), check if available
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserEntity oldUser = userRepository.findByUsername(myUserDetails.getUsername());
		if(!updatedUser.getUsername().equals(oldUser.getUsername())){
			UserEntity existing = userRepository.findByUsername(updatedUser.getUsername());
			if(existing!=null){//someone already uses this username
				errors = true;
				bindingResult.rejectValue("username", "Username Already Exists", "Username Already Exists");
			}
		}

		if(!updatedUser.getEmail().equals(oldUser.getEmail())){
			UserEntity existing = userRepository.findByUsername(updatedUser.getEmail());
			if(existing!=null){//someone already uses this email
				errors = true;
				bindingResult.rejectValue("email", "Email Already Associated With an Account", "Email Already Associated With an Account");
			}
		}

		if (errors){ //show any errors
			return "myProfileEdit.jsp";
		}

		//save changes
		oldUser.setName(updatedUser.getName());
		oldUser.setUsername(updatedUser.getUsername());
		oldUser.setEmail(updatedUser.getEmail());
		oldUser.setBirthdate(updatedUser.getBirthdate());
		oldUser.setPhonenumber(updatedUser.getPhonenumber());
		userRepository.save(oldUser);

		//make user log out and log back in to update changes
		return "redirect:/logout";
	}

	@GetMapping("/my-projects")
	public String viewProjects(Model model) {
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		//get maps this user owns
		List<MapEntity> userMaps = mapRepository.findByOwnedBy(myUserDetails.getUsername());
		model.addAttribute("userMaps", userMaps);

		//get all maps shared with this user
		List<MapSharedWithEntity> shares = mapSharedWithRepository.findByUserName(myUserDetails.getUsername());
		ArrayList<MapEntity> sharedMaps = new ArrayList<>();
		for (MapSharedWithEntity share : shares) {
			//add to the list of maps
			sharedMaps.add(mapRepository.findByName(share.getMapName()));
		}
		model.addAttribute("sharedMaps", sharedMaps);

		return "myProjects.jsp";
	}

	@GetMapping("/my-tilesets")
	public String viewTilesets(Model model) {
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		//get tilesets this user owns
		List<TilesetEntity> userTilesets = tilesetRepository.findByOwnedBy(myUserDetails.getUsername());
		model.addAttribute("userTilesets", userTilesets);

		//get all tilesets shared with the user
		List<TilesetSharedWithEntity> shares = tilesetSharedWithRepository.findBySharedWithUsername(myUserDetails.getUsername());

		ArrayList<TilesetEntity> sharedTilesets = new ArrayList<>();
		for (TilesetSharedWithEntity share : shares) {
			//add to the list of tilesets
			sharedTilesets.add(tilesetRepository.findByNameAndOwnedBy(share.getTilesetName(), share.getTilesetOwnedBy()));
		}
		model.addAttribute("sharedTilesets", sharedTilesets);

		return "myTilesets.jsp";
	}
}
