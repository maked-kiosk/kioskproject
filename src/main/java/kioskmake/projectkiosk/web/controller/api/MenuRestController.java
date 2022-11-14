package kioskmake.projectkiosk.web.controller.api;

import kioskmake.projectkiosk.handler.aop.annotation.Log;
import kioskmake.projectkiosk.service.menu.MenuService;
import kioskmake.projectkiosk.web.dto.CustomResponseDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/menu")
public class MenuRestController {

    private final MenuService menuService;

    @Log
    @GetMapping("/burger/list")
    public ResponseEntity<?> getBurgerList() {
        List<ReadMenuResponseDto> readMenuRequestDtoList = null;

        try {
            readMenuRequestDtoList = menuService.getBurgerList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to load hamburger list", readMenuRequestDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Successfully loaded hamburger list", readMenuRequestDtoList));
    }

    @Log
    @GetMapping("/burger/{id}")
    public ResponseEntity<?> getBurgerByBurgerCode(@PathVariable int id, @RequestParam boolean mcLunch) {
        List<ReadMenuResponseDto> readMenuRequestDtoList = null;

        try {
            readMenuRequestDtoList = menuService.getBurgerByBurgerCode(id, mcLunch);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to load hamburger by code", readMenuRequestDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Successfully loaded hamburger by code", readMenuRequestDtoList));
    }
}