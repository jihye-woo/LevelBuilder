package levelBuilder.com;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping("/")
	public String start(){
		return "startPage.html";
	}

	@GetMapping("home")
	public String home(Model model) {
//		System.out.println("hi");
		MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//		System.out.println(myUserDetails.getUsername());
		model.addAttribute("username", myUserDetails.getUsername());
		
		return "home.jsp";
	}
}
