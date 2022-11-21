package kioskmake.projectkiosk.web.dto.menu;

import kioskmake.projectkiosk.domain.menu.Menu;
import lombok.Data;

@Data
public class ReadMenuRequestDto {
    private String menuType;
    private String setSize;
    private boolean mcMorning;

    public Menu toMenu() {
        return Menu.builder()
                .menu_type(menuType)
                .set_flag(!setSize.equals("none"))
                .size(setSize)
                .mc_morning_flag(mcMorning ? 1 : 0)
                .build();
    }
}