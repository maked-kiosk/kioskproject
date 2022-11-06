package kioskmake.projectkiosk.web.dto.menu;

import kioskmake.projectkiosk.domain.menu.Menu;
import lombok.Data;

@Data
public class ReadMenuRequestDto {
    private String menuType;
    private String setSize;

    public Menu toMenu() {
        return Menu.builder()
                .menu_type(menuType)
                .set_flag(!setSize.equals("none"))
                .size(setSize)
                .build();
    }
}