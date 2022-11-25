package kioskmake.projectkiosk.service.menu;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kioskmake.projectkiosk.domain.menu.Menu;
import kioskmake.projectkiosk.domain.menu.MenuRepository;
import kioskmake.projectkiosk.web.dto.admin.GetMenuDetailRespDto;
import kioskmake.projectkiosk.web.dto.admin.GetMenuListRespDto;
import kioskmake.projectkiosk.web.dto.admin.InsertMenuReqDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

	@Value("${file.path}")
	private String filePath;
	
    private final MenuRepository menuRepository;


	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Not ADMIN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    @Override
    public List<ReadMenuResponseDto> getBurgerList() throws Exception {
        return changeToReadMenuResponseDtoList(menuRepository.findBurgerList());
    }

    @Override
    public List<ReadMenuResponseDto> getBurgerByBurgerCode(int id, boolean mcLunchFlag) throws Exception {
        Map<String, Object> configMap = new HashMap<>();
        configMap.put("id", id);
        configMap.put("mc_lunch_flag", mcLunchFlag);

        return changeToReadMenuResponseDtoList(menuRepository.findBurgerByBurgerCode(configMap));
    }

    @Override
    public ReadMenuResponseDto getMcMorningBurgerByBurgerCode(int id) throws Exception {
        return menuRepository.findMcMorningBurgerByBurgerCode(id)
                .map(Menu::toReadMenuResponseDto)
                .orElse(null);
    }

    @Override
    public List<ReadMenuResponseDto> getMcMorningBurgerList() throws Exception {
        return changeToReadMenuResponseDtoList(menuRepository.findMcMorningBurgerList());
    }

    @Override
    public List<ReadMenuResponseDto> getMenuListByMenuType(ReadMenuRequestDto readMenuRequestDto) throws Exception {
        return readMenuRequestDto.isMcMorning()
        ? changeToReadMenuResponseDtoList(menuRepository.findMcMorningSideMenuList(readMenuRequestDto.toMenu()))
        : changeToReadMenuResponseDtoList(menuRepository.findMenuListByMenuType(readMenuRequestDto.toMenu()));
    }


    @Override
    public List<ReadMenuResponseDto> getChangeMenuInSet(ReadMenuRequestDto readMenuRequestDto) throws Exception {
        return changeToReadMenuResponseDtoList(menuRepository.findChangeMenuInSet(readMenuRequestDto.toMenu()));
    }

    private List<ReadMenuResponseDto> changeToReadMenuResponseDtoList(List<Menu> menuEntityList) {
        return menuEntityList.isEmpty() ? null
                : menuEntityList.stream()
                .map(Menu::toReadMenuResponseDto)
                .collect(Collectors.toList());
    }



	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ADMIN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

	@Override
	public boolean insertMenu(InsertMenuReqDto insertMenuReqDto) throws Exception {
		
		boolean count = false;
		
		MultipartFile img = insertMenuReqDto.getImg();
		
		String originName = img.getOriginalFilename();
        String temp_name = UUID.randomUUID().toString().replaceAll("-", "") + "_" + originName;
        
		Menu menu = insertMenuReqDto.menuEntity(temp_name);
		count = menuRepository.insertMenu(menu);
	
		Path uploadPath = Paths.get(filePath + insertMenuReqDto.getMenuType() + "/" + temp_name);
	
	    File f = new File(filePath + "/product");
	    if(!f.exists()) {
	        f.mkdirs();
	    }
	
	    try {
	        Files.write(uploadPath, img.getBytes());
	    } catch (IOException e) {
	        throw new RuntimeException(e);
	    }
	    
	    return true;
    
	}

	@Override
	public List<GetMenuListRespDto> getMenuList(int page, String menuType) throws Exception {
		List<GetMenuListRespDto> menuList = new ArrayList<GetMenuListRespDto>();
		Map<String, Object> map = new HashMap<String, Object>();
		menuType = menuType.toLowerCase();
		
		int index = (page - 1)  * 10;
		
		map.put("index", index);
		map.put("menu_type", menuType.equals("all") ? "ALL" : menuType.equals("burger") ? "1" : menuType.equals("side") ? "2" : menuType.equals("drink") ? "3" : "4");
		
		menuRepository.getAdminMenuList(map).forEach(menu -> {
			menuList.add(menu.toMenuList());
		});
		log.error("{}", menuList);
		
		return isNotData(menuList) ? null : menuList;
	}
	
	private boolean isNotData(List<GetMenuListRespDto> menuList) {
		 return menuList.size() == 1;
	}

	@Override
	public List<GetMenuDetailRespDto> getMenuDetails(String id, String menuType) throws Exception {
		List<GetMenuDetailRespDto> detailList = new ArrayList<GetMenuDetailRespDto>();
		
		menuRepository.getDetails(id, menuType).forEach(menu -> {
			detailList.add(menu.toDetailDto());
		});
			
		return detailList;
	}

	
    
}