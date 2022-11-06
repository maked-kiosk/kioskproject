package kioskmake.projectkiosk.web.controller.api;

import kioskmake.projectkiosk.service.menu.MenuService;
import kioskmake.projectkiosk.web.dto.CustomResponseDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/menu")
public class MenuRestController {

    private final MenuService menuService;

    @GetMapping("/list")
    public ResponseEntity<?> getMenuListBySelectMenu(ReadMenuRequestDto readMenuRequestDto) {
        List<ReadMenuResponseDto> readMenuRequestDtoList = null;

        try {
            readMenuRequestDtoList = menuService.getMenuListBySelectType(readMenuRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to load menu list", readMenuRequestDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Load menu list successful", readMenuRequestDtoList));
    }
}