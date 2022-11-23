package kioskmake.projectkiosk.web.controller.api;

import kioskmake.projectkiosk.handler.aop.annotation.Log;
import kioskmake.projectkiosk.service.timeCheck.TimeCheckService;
import kioskmake.projectkiosk.web.dto.CustomResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/check")
public class TimeCheckRestController {
    private final TimeCheckService timeCheckService;

    @Log
    @GetMapping("/{eventType}")
    public ResponseEntity<?> getChangeMenuInSet(@PathVariable String eventType) {
       boolean status = false;

        try {
            status = timeCheckService.timeCheckByEventType(eventType);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "Event time check failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto(1, "Event time check successful", status));
    }
}