package kioskmake.projectkiosk.service.user;

import org.springframework.stereotype.Service;

import kioskmake.projectkiosk.domain.user.User;
import kioskmake.projectkiosk.domain.user.UserRepository;
import kioskmake.projectkiosk.web.dto.UserReqDto;
import kioskmake.projectkiosk.web.dto.UserRespDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiecImpl implements UserService {
	
	private final UserRepository userRepository;
	
	@Override
	public User userCheck(String userName, String userPhoneNumber) throws Exception {
		User user = null;
		
		user = userRepository.userCheck(userName, userPhoneNumber);
		
	return user;
	}

	@Override
	public UserRespDto insertUser(UserReqDto insertUserReqDto) throws Exception {
		User user = insertUserReqDto.toUserEntity();
		UserRespDto userDto = null;
		boolean status = false;
		
		status = userRepository.insertUser(user) > 0;
		
		userDto = status ? user.toUserDto() : null;
				
		return userDto;
	}

	@Override
	public boolean updateUserPoint(int id, int point, String pointStatus) throws Exception {
		
		boolean status = false;
		
		status = userRepository.updateUserPoint(id, point, pointStatus);
		
		return false;
	}

}
