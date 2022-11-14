package kioskmake.projectkiosk.domain.menu;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MenuRepository {
    public List<Menu> findBurgerList() throws Exception;
    public List<Menu> findBurgerByBurgerCode(Map<String, Object> config_map) throws Exception;
}