package kioskmake.projectkiosk.domain.menu;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Mapper
public interface MenuRepository {

    
	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Not ADMIN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


    public List<Menu> findBurgerList() throws Exception;
    public List<Menu> findBurgerByBurgerCode(Map<String, Object> config_map) throws Exception;

    public List<Menu> findMenuListByMenuType(Menu menu) throws Exception;

    public Optional<Menu> findMcMorningBurgerByBurgerCode(int id) throws Exception;
    public List<Menu> findMcMorningBurgerList() throws Exception;

    public List<Menu> findMcMorningSideMenuList(Menu menu) throws Exception;

    public List<Menu> findChangeMenuInSet(Menu menu) throws Exception;
    


	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ADMIN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    public boolean insertMenu(Menu menu) throws Exception;

//    public List<Menu> findMenuListBySelectType(Menu menu) throws Exception;
    public List<Menu> getAdminMenuList(Map<String, Object> map) throws Exception;
    public List<Menu> getDetails(String id, String menu_type) throws Exception;

}