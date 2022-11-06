package kioskmake.projectkiosk.service.menu;

import kioskmake.projectkiosk.domain.menu.Menu;
import kioskmake.projectkiosk.domain.menu.MenuRepository;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuRequestDto;
import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

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
}