package kioskmake.projectkiosk.service.user;

import kioskmake.projectkiosk.domain.user.User;
import kioskmake.projectkiosk.web.dto.UserReqDto;
import kioskmake.projectkiosk.web.dto.UserRespDto;

public interface UserService {
	
	public UserRespDto insertUser(UserReqDto insertUserReqDto) throws Exception;
	public User userCheck(String userName, String userPhoneNumber) throws Exception;
	public boolean updateUserPoint(int id, int point, int point2) throws Exception;
}
