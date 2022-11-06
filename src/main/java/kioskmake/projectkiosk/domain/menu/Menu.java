package kioskmake.projectkiosk.domain.menu;

import kioskmake.projectkiosk.web.dto.menu.ReadMenuResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Menu {
    private String menu_type;
    private boolean set_flag;

    private String menu_name;
    private int price;
    private int kcal;
    private String size;

    public ReadMenuResponseDto toReadMenuResponseDto() {
        return ReadMenuResponseDto.builder()
                .menuName(menu_name)
                .price(price)
                .kcal(kcal)
                .build();
    }
}