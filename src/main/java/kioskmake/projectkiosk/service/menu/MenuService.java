package kioskmake.projectkiosk.service.menu;

import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;

import java.util.List;

public interface MenuService {
    public List<ReadMenuResponseDto> getMenuListBySelectType(ReadMenuRequestDto readMenuRequestDto) throws Exception;
}