package kioskmake.projectkiosk.service.menu;

import java.util.List;

import kioskmake.projectkiosk.web.dto.admin.GetMenuDetailRespDto;
import kioskmake.projectkiosk.web.dto.admin.GetMenuListRespDto;
import kioskmake.projectkiosk.web.dto.admin.InsertMenuReqDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;

public interface MenuService {
    public List<ReadMenuResponseDto> getMenuListBySelectType(ReadMenuRequestDto readMenuRequestDto) throws Exception;
    public boolean insertMenu(InsertMenuReqDto insertMenuReqDto) throws Exception;
    public List<GetMenuListRespDto> getMenuList(int page, String menuType) throws Exception;
    public List<GetMenuDetailRespDto> getMenuDetails(String id, String menuType) throws Exception;
    
}