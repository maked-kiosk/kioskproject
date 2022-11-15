package kioskmake.projectkiosk.domain.menu;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuRepository {
    public List<Menu> findMenuListBySelectType(Menu menu) throws Exception;
    public boolean insertMenu(Menu menu) throws Exception;
}