/* References I used:
   - https://stackabuse.com/spring-security-forgot-password-functionality/
*/

package levelBuilder.com.controller;

import levelBuilder.com.entities.ConfirmationTokenEntity;
import levelBuilder.com.entities.UserEntity;
import levelBuilder.com.repositories.ConfirmationTokenRepository;
import levelBuilder.com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ResetPasswordController {

	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

	@Autowired
	UserRepository userRepository;

	@Autowired
	ConfirmationTokenRepository confirmationTokenRepository;

	//Confirm the token is a valid one in the db
	@GetMapping("/confirm-reset")
	public String validateToken(@RequestParam("token") String confirmationToken, Model model) {
		ConfirmationTokenEntity token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

		if (token == null) {
			return "redirect:/login";
		}

		model.addAttribute("resetForm", new UserEntity());
		return "resetPassword.jsp";
	}

	//Update a user's password. Get the associated email from the token
	@PostMapping("/confirm-reset")
	public String resetPassword(@RequestParam("token") String confirmationToken, @ModelAttribute("resetForm") UserEntity user) {
		ConfirmationTokenEntity token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);
		UserEntity existingUser = userRepository.findByEmail(token.getUserEmail());

		if (existingUser == null){
			return "redirect:/login";
		}

		existingUser.setPassword(encoder.encode(user.getPassword()));
		userRepository.save(existingUser);

		//delete the token so it cant be reused
		confirmationTokenRepository.delete(token);

		return "resetPasswordSuccess.jsp";
	}
}