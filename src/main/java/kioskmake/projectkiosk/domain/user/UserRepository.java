package kioskmake.projectkiosk.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {
	public int insertUser(User user) throws Exception;
	public User userCheck(String user_name, String user_phone_number) throws Exception;
	
}
