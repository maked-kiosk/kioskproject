package kioskmake.projectkiosk.web.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kioskmake.projectkiosk.service.menu.MenuService;
import kioskmake.projectkiosk.web.dto.CustomResponseDto;
import kioskmake.projectkiosk.web.dto.admin.InsertMenuReqDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/menu")
@RequiredArgsConstructor
public class InsertProductController {
	
	private final MenuService menuService;
	
	@PostMapping("/{productType}")
	public ResponseEntity<?> insertProduct(InsertMenuReqDto insertMenuReqDto) {
		
		boolean status = false;
		
		try {
			status = menuService.insertMenu(insertMenuReqDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "menu insert failed", status));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "menu insert success", status));
	}
}
