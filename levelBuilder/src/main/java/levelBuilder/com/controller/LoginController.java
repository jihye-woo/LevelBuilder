package levelBuilder.com.controller;

import levelBuilder.com.entities.UserEntity;
import levelBuilder.com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class LoginController {

	@Autowired
	UserRepository userRepository;

	@GetMapping("/login")
	public String getLogin(Model model) {
		model.addAttribute("userForm", new UserEntity());
		return "login.jsp";
	}

	@PostMapping("/login")
	public String login(@ModelAttribute("userForm") UserEntity userForm, BindingResult bindingResult) {
		userForm.setRoles("ROLE_USER");
		UserEntity existingUser = userRepository.findByUsername(userForm.getUsername());
		if (existingUser==null){
			bindingResult.rejectValue("username", "Bad credentials", "Bad credentials");
			bindingResult.rejectValue("password", "Bad credentials", "Bad credentials");
			return "login.jsp";
		}

		return "redirect:/home";
	}
}
