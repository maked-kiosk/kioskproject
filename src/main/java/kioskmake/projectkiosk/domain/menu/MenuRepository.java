package kioskmake.projectkiosk.domain.menu;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuRepository {
    public List<Menu> findMenuListBySelectType(Menu menu) throws Exception;
    public boolean insertMenu(Menu menu) throws Exception;
    public List<Menu> getAdminMenuList(Map<String, Object> map) throws Exception;
}