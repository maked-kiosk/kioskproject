package kioskmake.projectkiosk.web.dto;

import kioskmake.projectkiosk.domain.user.User;
import lombok.Data;

@Data
public class InsertUserReqDto {
	private int id;
	private String userName;
	private String userPhoneNumber;
	private int point;
	
	public User toUserEntity() {
		return User.builder()
				.id(id)
				.user_name(userName)
				.user_phone_number(userPhoneNumber)
				.point(point)
				.build();
	}
}
