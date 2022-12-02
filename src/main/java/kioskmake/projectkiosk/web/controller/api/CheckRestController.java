package kioskmake.projectkiosk.web.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kioskmake.projectkiosk.domain.user.User;
import kioskmake.projectkiosk.handler.aop.annotation.Log;
import kioskmake.projectkiosk.service.timeCheck.TimeCheckService;
import kioskmake.projectkiosk.service.user.UserService;
import kioskmake.projectkiosk.web.dto.CustomResponseDto;
import kioskmake.projectkiosk.web.dto.InsertUserReqDto;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/check")
public class CheckRestController {
    private final TimeCheckService timeCheckService;
    private final UserService userService;

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
    
    @GetMapping("/user")
    public ResponseEntity<?> checkUser(String userName, String userPhoneNumber) {
    	User user = null;
    	
    	try {
    		user = userService.userCheck(userName, userPhoneNumber);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "user check failed", user));
		}
    	
    	return ResponseEntity.ok(new CustomResponseDto<>(1, "user check successful", user));
    }
    
    @PostMapping("/insert-user")
    public ResponseEntity<?> insertUser(InsertUserReqDto insertUSerReqDto) {
    	
    	boolean status = false;
    	
    	try {
    		status = userService.insertUser(insertUSerReqDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto(-1, "user insert failed", status));
		}
    	
    	return ResponseEntity.ok(new CustomResponseDto<>(1, "user insert successful", status));
    }
}