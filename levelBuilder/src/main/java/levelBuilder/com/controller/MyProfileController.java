package levelBuilder.com.controller;

import levelBuilder.com.MyUserDetails;
import levelBuilder.com.entities.MapEntity;
import levelBuilder.com.entities.MapSharedWithEntity;
import levelBuilder.com.entities.UserEntity;
import levelBuilder.com.repositories.MapRepository;
import levelBuilder.com.repositories.MapSharedWithRepository;
import levelBuilder.com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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

	@RequestMapping("/my-profile")
	public String viewProfile(Model model) {
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserEntity user = userRepository.findByUsername(myUserDetails.getUsername());
		model.addAttribute("user", user);

		return "myProfile.jsp";
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
}
