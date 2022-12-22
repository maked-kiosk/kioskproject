package kioskmake.projectkiosk.web.dto;

import kioskmake.projectkiosk.domain.user.User;
import lombok.Data;

@Data
public class UserReqDto {
	private int id;
	private String userName;
	private String userPhoneNumber;
	private int point;
	private int point2;
	private String status;
	
	public User toUserEntity() {
		return User.builder()
				.user_name(userName)
				.user_phone_number(userPhoneNumber)
				.point(point)
				.build();
	}
	
	public User updatePoint() {
		return User.builder()
				.id(id)
				.point(point)
				.point2(point2)
				.build();
	}
}
