package kioskmake.projectkiosk.service.menu;

import java.util.List;

import kioskmake.projectkiosk.web.dto.admin.InsertMenuReqDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;

public interface MenuService {
    public List<ReadMenuResponseDto> getMenuListBySelectType(ReadMenuRequestDto readMenuRequestDto) throws Exception;
    public boolean insertMenu(InsertMenuReqDto insertMenuReqDto) throws Exception;
}