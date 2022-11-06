package kioskmake.projectkiosk.domain.menu;

import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
        import java.util.Map;

@Mapper
public interface MenuRepository {
    public List<Menu> findMenuListBySelectType(Menu menu) throws Exception;
}