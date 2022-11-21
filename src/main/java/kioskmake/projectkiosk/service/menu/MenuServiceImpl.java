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

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

	@Value("${file.path}")
	private String filePath;
	
    private final MenuRepository menuRepository;

    @Override
    public List<ReadMenuResponseDto> getMenuListBySelectType(ReadMenuRequestDto readMenuRequestDto) throws Exception {
        Menu menuEntity = null;
        List<Menu> menuEntityList = null;
        List<ReadMenuResponseDto> menuDtoList = null;

        menuEntity = readMenuRequestDto.toMenu();

        menuEntityList = menuRepository.findMenuListBySelectType(menuEntity);

        if(!menuEntityList.isEmpty()) {
            menuDtoList = changeToReadMenuResponseDto(menuEntityList);

        }
        return menuDtoList;
    }

    private List<ReadMenuResponseDto> changeToReadMenuResponseDto(List<Menu> menuEntityList) {
        return menuEntityList.stream()
                .map(Menu::toReadMenuResponseDto)
                .collect(Collectors.toList());
    }

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
		
		int index = (page - 1)  * 10;
		
		map.put("index", index);
		map.put("menu_type", menuType);
		
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