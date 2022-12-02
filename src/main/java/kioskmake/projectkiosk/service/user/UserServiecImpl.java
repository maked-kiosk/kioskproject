package kioskmake.projectkiosk.service.user;

import org.springframework.stereotype.Service;

import kioskmake.projectkiosk.domain.user.User;
import kioskmake.projectkiosk.domain.user.UserRepository;
import kioskmake.projectkiosk.web.dto.InsertUserReqDto;
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
	public User insertUser(InsertUserReqDto insertUserReqDto) throws Exception {
		
		User user = null;
		
		user = userRepository.insertUser(insertUserReqDto.toUserEntity());
				
		return user;
	}

}
