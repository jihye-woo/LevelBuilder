package levelBuilder.com.controller;

import levelBuilder.com.EmailSenderService;
import levelBuilder.com.entities.ConfirmationTokenEntity;
import levelBuilder.com.entities.UserEntity;
import levelBuilder.com.repositories.ConfirmationTokenRepository;
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
public class ForgotPasswordController {

	@Autowired
    UserRepository userRepository;

	@Autowired
	private ConfirmationTokenRepository confirmationTokenRepository;

	@Autowired
	private EmailSenderService emailSenderService;

	@GetMapping("/forgot-password")
	public String forgotPasswordForm(Model model) {
		model.addAttribute("resetForm", new UserEntity());
		return "forgotPassword.jsp";
	}

	@PostMapping("/forgot-password")
	public String resetPassword(@ModelAttribute("resetForm") UserEntity reset, BindingResult bindingResult) {

		UserEntity existingUser = userRepository.findByEmail(reset.getEmail());
		if (existingUser == null){
			bindingResult.rejectValue("email", "Email not associated with an account");
			return "forgotPassword.jsp";
		}
		// Create token
		ConfirmationTokenEntity confirmationToken = new ConfirmationTokenEntity();
		confirmationToken.setUserEmail(reset.getEmail()); //associate with a user email

		// Save it
		confirmationTokenRepository.save(confirmationToken);

		// Create the email
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(existingUser.getEmail());
		mailMessage.setSubject("Level Builder: Password Reset Request");
		mailMessage.setFrom("levelbuilder416@gmail.com");
		mailMessage.setText("Please follow the link to complete your password reset: "
				+ "http://localhost:8080/confirm-reset?token="+confirmationToken.getConfirmationToken());

		// Send the email
		emailSenderService.sendEmail(mailMessage);

		return "forgotPasswordSuccess.jsp";
	}
}
