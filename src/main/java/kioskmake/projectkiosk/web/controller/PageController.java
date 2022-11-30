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
		return "kioskmain";
	}
	
	@GetMapping("/order")
	public String order() {
		return "order";
	}
	
	@GetMapping("/payment")
	public String payment() {
		return "payment";
	}
	
	@GetMapping("/set/select/view")
	public String setselectview() {
		return "setselectview";
	}
	
	@GetMapping("/size/select/view")
	public String sizeselectview() {
		return "sizeselectview";
	}
	
	@GetMapping("/basket")
	public String basket() {
		return "basket";
	}
	
	@GetMapping("/tableservice")
	public String tableservice() {
		return "tableservice";
	}
	
}