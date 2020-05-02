/* References I used:
   - https://hellokoding.com/registration-and-login-example-with-spring-security-spring-boot-spring-data-jpa-hsql-jsp/
*/

package levelBuilder.com.controller;

import levelBuilder.com.SecurityConfiguration;
import levelBuilder.com.UserValidator;
import levelBuilder.com.entities.UserEntity;
import levelBuilder.com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class RegistrationController {

	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

	@Autowired
	UserRepository userRepository;

	@Autowired
	private UserValidator userValidator;

	@GetMapping("/registration")
	public String getRegistration(Model model) {
		model.addAttribute("userForm", new UserEntity());
		return "registration.jsp";
	}

	@PostMapping("/registration")
	public String registration(@ModelAttribute("userForm") UserEntity userForm, BindingResult bindingResult) {
		userForm.setRoles("ROLE_USER");
		userValidator.validate(userForm, bindingResult);

		if (bindingResult.hasErrors()) {
			return "registration.jsp";
		}

		userForm.setPassword(encoder.encode(userForm.getPassword()));
		userRepository.save(userForm);

		return "registrationSuccess.jsp";
	}
}
