package kioskmake.projectkiosk.service.user;

import kioskmake.projectkiosk.domain.user.User;
import kioskmake.projectkiosk.web.dto.InsertUserReqDto;

public interface UserService {
	
	public boolean insertUser(InsertUserReqDto insertUserReqDto) throws Exception;
	public User userCheck(String userName, String userPhoneNumber) throws Exception;
}
