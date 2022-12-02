package kioskmake.projectkiosk.web.controller.api;

import kioskmake.projectkiosk.handler.aop.annotation.Log;
import kioskmake.projectkiosk.service.menu.MenuService;
import kioskmake.projectkiosk.web.dto.CustomResponseDto;
import kioskmake.projectkiosk.web.dto.admin.GetMenuDetailRespDto;
import kioskmake.projectkiosk.web.dto.admin.GetMenuListRespDto;
import kioskmake.projectkiosk.web.dto.admin.InsertMenuReqDto;
import kioskmake.projectkiosk.web.dto.admin.UpdateMenuDetailRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

	@Log
	@GetMapping("/menu/list")
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

	@Log
	@GetMapping("/detail")
	public ResponseEntity<?> getMenuDetails(String id, String menuType){

		GetMenuDetailRespDto menuDetail = null;
		
		try {
			menuDetail = menuService.getMenuDetail(id, menuType);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(1, "menu detail load fail", menuDetail));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "menu detail load success", menuDetail));
	}

	@Log
	@PutMapping("/detail/{id}")
	public ResponseEntity<?> updateMenuDetail(UpdateMenuDetailRequestDto updateMenuDetailRequestDto) {
		boolean status = false;

		try {
			menuService.updateMenuDetail(updateMenuDetailRequestDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "update failed", status));
		}

		return ResponseEntity.ok(new CustomResponseDto<>(1, "update success", status));
	}
}