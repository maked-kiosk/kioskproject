package kioskmake.projectkiosk.web.controller.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kioskmake.projectkiosk.service.menu.MenuService;
import kioskmake.projectkiosk.web.dto.CustomResponseDto;
import kioskmake.projectkiosk.web.dto.admin.GetMenuListRespDto;
import kioskmake.projectkiosk.web.dto.admin.InsertMenuReqDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/menu")
@RequiredArgsConstructor
public class AdminMenuController {
	
	private final MenuService menuService;
	
	@PostMapping("/{productType}")
	public ResponseEntity<?> insertProduct(InsertMenuReqDto insertMenuReqDto) {
		
		boolean status = false;
		
		System.out.println(insertMenuReqDto);
		
		try {
			status = menuService.insertMenu(insertMenuReqDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "menu insert failed", status));
		}
		
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "menu insert success", status));
	}
	
	@GetMapping("/menuList")
	public ResponseEntity<?> getMenuList(int page, String menuType) {
		
		List<GetMenuListRespDto> menuList = null;
		
		try {
			menuList = menuService.getMenuList(page, menuType);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(1, "menu list load failed", menuList));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "menu list load success", menuList));
	}
}
