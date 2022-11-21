package kioskmake.projectkiosk.service.menu;

import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;

import java.util.List;

public interface MenuService {
    public List<ReadMenuResponseDto> getBurgerList() throws Exception;
    public List<ReadMenuResponseDto> getBurgerByBurgerCode(int id, boolean mcLunchFlag) throws Exception;
    public List<ReadMenuResponseDto> getMenuListByMenuType(ReadMenuRequestDto readMenuRequestDto) throws Exception;
    public ReadMenuResponseDto getMcMorningBurgerByBurgerCode(int id) throws Exception;
    public List<ReadMenuResponseDto> getMcMorningBurgerList() throws Exception;
}