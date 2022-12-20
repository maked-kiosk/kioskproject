package kioskmake.projectkiosk.web.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRespDto {
	private int id;
	private String userName;
	private String userPhoneNumber;
	private int point;

}
