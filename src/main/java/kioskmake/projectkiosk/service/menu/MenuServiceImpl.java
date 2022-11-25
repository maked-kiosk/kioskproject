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
        log.info("Check: {}", readMenuRequestDto);
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
}