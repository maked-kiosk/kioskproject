package kioskmake.projectkiosk.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

	@GetMapping("/buger")
	public String loadBugerPage() {
		return "kiosk-main";
	}
}