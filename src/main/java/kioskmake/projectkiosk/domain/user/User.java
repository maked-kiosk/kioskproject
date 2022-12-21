package kioskmake.projectkiosk.domain.user;

import kioskmake.projectkiosk.web.dto.UserRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
	private int id;
	private String user_name;
	private String user_phone_number;
	private int point;
	private int point2;
	private String point_status;
	
	public UserRespDto toUserDto() {
		return UserRespDto.builder()
				.id(id)
				.userName(user_name)
				.userPhoneNumber(user_phone_number)
				.point(point)
				.build();
	}
}
