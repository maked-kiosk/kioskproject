package kioskmake.projectkiosk.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminPageController {

	@GetMapping("/admin/product-insert")
	public String admin() {
		return "admin";
	}
	
}
