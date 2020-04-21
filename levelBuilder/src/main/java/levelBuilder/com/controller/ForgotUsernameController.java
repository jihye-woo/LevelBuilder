package levelBuilder.com.controller;

import levelBuilder.com.EmailSenderService;
import levelBuilder.com.entities.UserEntity;
import levelBuilder.com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class ForgotUsernameController {

	@Autowired
    UserRepository userRepository;

	@Autowired
	private EmailSenderService emailSenderService;

	@GetMapping("/forgot-username")
	public String forgotUsernameForm(Model model) {
		model.addAttribute("retrieveForm", new UserEntity());
		return "forgotUsername.jsp";
	}

	@PostMapping("/forgot-username")
	public String retrieveUsername(@ModelAttribute("retrieveForm") UserEntity reset, BindingResult bindingResult) {

		UserEntity existingUser = userRepository.findByEmail(reset.getEmail());
		if (existingUser == null){
			bindingResult.rejectValue("email", "Email not associated with an account", "Email not associated with an account");
			return "forgotUsername.jsp";
		}

		// Create the email
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(existingUser.getEmail());
		mailMessage.setSubject("Level Builder: Retrieve Username Request");
		mailMessage.setFrom("levelbuilder416@gmail.com");
		mailMessage.setText("Your Level Builder username is: " + existingUser.getUsername()
				+ "\nClick the following link to log in: "
				+ "http://localhost:8080/login");

		// Send the email
		emailSenderService.sendEmail(mailMessage);

		return "forgotUsernameSuccess.jsp";
	}
}
