package kioskmake.projectkiosk.domain.menu;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MenuIdentity {
    private int menu_code;
    private int menu_category_code;
}