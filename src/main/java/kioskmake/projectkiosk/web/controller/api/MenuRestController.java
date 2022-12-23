package kioskmake.projectkiosk.web.controller.api;

import kioskmake.projectkiosk.handler.aop.annotation.Log;
import kioskmake.projectkiosk.service.menu.MenuService;
import kioskmake.projectkiosk.web.dto.CustomResponseDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;
import kioskmake.projectkiosk.web.dto.menu.UpdateMenuSalesRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/menu")
public class MenuRestController {

    private final MenuService menuService;

    @Log
    @GetMapping("/burger/list")
    public ResponseEntity<?> getBurgerList(@RequestParam String burgerType) {
        List<ReadMenuResponseDto> readMenuRequestDtoList = null;

        try {
            readMenuRequestDtoList = menuService.getBurgerList(burgerType);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to load hamburger list", readMenuRequestDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Successfully loaded hamburger list", readMenuRequestDtoList));
    }

    @Log
    @GetMapping("/burger/{id}")
    public ResponseEntity<?> getBurgerByBurgerCode(@PathVariable int id) {
        List<ReadMenuResponseDto> readMenuRequestDtoList = null;

        try {
            readMenuRequestDtoList = menuService.getBurgerByBurgerCode(id);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to load hamburger by code", readMenuRequestDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Successfully loaded hamburger by code", readMenuRequestDtoList));
    }

    @Log
    @GetMapping("/{menuType}/list")
    public ResponseEntity<?> getMenuListByMenuType(ReadMenuRequestDto readMenuRequestDto) {
        List<ReadMenuResponseDto> readMenuRequestDtoList = null;

        try {
            readMenuRequestDtoList = menuService.getMenuListByMenuType(readMenuRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to load menu list", readMenuRequestDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Load menu list successful", readMenuRequestDtoList));
    }

    @Log
    @GetMapping("/mc-morning/{id}")
    public ResponseEntity<?> getMcMorningBurgerByBurgerCode(@PathVariable int id) {
        ReadMenuResponseDto readMenuRequestDto = null;

        try {
            readMenuRequestDto = menuService.getMcMorningBurgerByBurgerCode(id);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to load mc morning burger", readMenuRequestDto));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Load mc morning burger successful", readMenuRequestDto));
    }

    @Log
    @GetMapping("/mc-morning/list")
    public ResponseEntity<?> getMcMorningBurgerList() {
        List<ReadMenuResponseDto> readMenuRequestDtoList = null;

        try {
            readMenuRequestDtoList = menuService.getMcMorningBurgerList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to load mc morning burger list", readMenuRequestDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Load mc morning burger list successful", readMenuRequestDtoList));
    }


    @Log
    @GetMapping("/{menuType}/change/list")
    public ResponseEntity<?> getChangeMenuInSet(ReadMenuRequestDto readMenuRequestDto) {
        List<ReadMenuResponseDto> readMenuRequestDtoList = null;

        try {
            readMenuRequestDtoList = menuService.getChangeMenuInSet(readMenuRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to load change menu in set list", readMenuRequestDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Load change menu in set list successful", readMenuRequestDtoList));
    }


    @Log
    @GetMapping("/top-ranking/list")
    public ResponseEntity<?> getTopRankingMenuList() {
        List<ReadMenuResponseDto> readMenuRequestDtoList = null;

        try {
            readMenuRequestDtoList = menuService.getTopRankingMenuList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to load top ranking menu list", readMenuRequestDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Load top ranking menu list successful", readMenuRequestDtoList));
    }


    @Log
    @PutMapping("/sales")
    public ResponseEntity<?> updateMenuSales(@RequestBody UpdateMenuSalesRequestDto updateMenuSalesRequestDto) {
        boolean status = false;

        try {
            status = menuService.updateMenuSales(updateMenuSalesRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Failed to update menu sales", status));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Update menu sales successful", status));
    }
}