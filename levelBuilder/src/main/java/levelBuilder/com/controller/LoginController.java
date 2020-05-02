/* References I used:
   - https://hellokoding.com/registration-and-login-example-with-spring-security-spring-boot-spring-data-jpa-hsql-jsp/
*/

package levelBuilder.com.controller;

import levelBuilder.com.entities.UserEntity;
import levelBuilder.com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class LoginController {
	@Autowired
	UserRepository userRepository;

	@GetMapping("/login")
	public String getLogin(Model model) {
		model.addAttribute("userForm", new UserEntity());
		return "login.jsp";
	}
}
