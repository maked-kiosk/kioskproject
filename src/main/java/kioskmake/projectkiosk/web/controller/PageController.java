package kioskmake.projectkiosk.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

	@GetMapping("/main")
	public String mainpage() {
		return "insert";
	}
	
	@GetMapping("/kioskmain")
	public String kioskmain() {
		return "kiosk-main";
	}
	
	@GetMapping("/order")
	public String order() {
		return "order";
	}
	
	@GetMapping("/payment")
	public String payment() {
		return "payment";
	}
	
	@GetMapping("/set-select-view")
	public String setselectview() {
		return "set-select-view";
	}
	
	@GetMapping("/set-size-select-view")
	public String sizeselectview() {
		return "set-size-select-view";
	}
	
	@GetMapping("/basket")
	public String basket() {
		return "basket";
	}
	
	@GetMapping("/table-service")
	public String tableservice() {
		return "table-service";
	}
}