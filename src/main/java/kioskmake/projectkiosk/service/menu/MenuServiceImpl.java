package kioskmake.projectkiosk.service.menu;

import kioskmake.projectkiosk.domain.menu.Menu;
import kioskmake.projectkiosk.domain.menu.MenuRepository;
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

    private final MenuRepository menuRepository;

    @Override
    public List<ReadMenuResponseDto> getBurgerList() throws Exception {
        return changeToReadMenuResponseDto(menuRepository.findBurgerList());
    }

    private List<ReadMenuResponseDto> changeToReadMenuResponseDto(List<Menu> menuEntityList) {
        return menuEntityList.isEmpty() ? null
                : menuEntityList.stream()
                .map(Menu::toReadMenuResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReadMenuResponseDto> getBurgerByBurgerCode(int id, boolean mcLunchFlag) throws Exception {
        Map<String, Object> configMap = new HashMap<>();
        configMap.put("id", id);
        configMap.put("mc_lunch_flag", mcLunchFlag);

        return changeToReadMenuResponseDto(menuRepository.findBurgerByBurgerCode(configMap));
    }
}