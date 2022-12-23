package kioskmake.projectkiosk.web.dto.menu;

import kioskmake.projectkiosk.domain.menu.MenuIdentity;
import lombok.Data;

@Data
public class MenuIdentityDto {
    private int menuCode;
    private int menuCategoryCode;

    public MenuIdentity toMenuIdentityEntity() {
        return MenuIdentity.builder()
                .menu_code(menuCode)
                .menu_category_code(menuCategoryCode)
                .build();
    }
}
