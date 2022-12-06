package kioskmake.projectkiosk.service.menu;

import java.util.List;

import kioskmake.projectkiosk.web.dto.admin.GetMenuDetailRespDto;
import kioskmake.projectkiosk.web.dto.admin.GetMenuListRespDto;
import kioskmake.projectkiosk.web.dto.admin.InsertMenuReqDto;
import kioskmake.projectkiosk.web.dto.admin.UpdateMenuDetailRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;

public interface MenuService {
    
	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Not ADMIN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    
    public List<ReadMenuResponseDto> getBurgerList() throws Exception;
    public List<ReadMenuResponseDto> getBurgerByBurgerCode(int id) throws Exception;
    public List<ReadMenuResponseDto> getMenuListByMenuType(ReadMenuRequestDto readMenuRequestDto) throws Exception;
    public ReadMenuResponseDto getMcMorningBurgerByBurgerCode(int id) throws Exception;
    public List<ReadMenuResponseDto> getMcMorningBurgerList() throws Exception;

    public List<ReadMenuResponseDto> getChangeMenuInSet(ReadMenuRequestDto readMenuRequestDto) throws Exception;

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ADMIN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    public boolean insertMenu(InsertMenuReqDto insertMenuReqDto) throws Exception;
//    public List<ReadMenuResponseDto> getMenuListBySelectType(ReadMenuRequestDto readMenuRequestDto) throws Exception;
    public List<GetMenuListRespDto> getMenuList(int page, String menuType) throws Exception;
    public GetMenuDetailRespDto getMenuDetail(String id, String menuType) throws Exception;
    public boolean updateMenuDetail(UpdateMenuDetailRequestDto updateMenuDetailRequestDto) throws Exception;
}