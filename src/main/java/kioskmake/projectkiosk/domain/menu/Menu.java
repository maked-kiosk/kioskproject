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
    private String size;

    private int id;
    private String set_size;
    private String menu_name;
    private int price;
    private int kcal;
    private String image;
    private String type;
    private int mc_lunch_flag;
    private int mc_morning_flag;

    public ReadMenuResponseDto toReadMenuResponseDto() {
        return ReadMenuResponseDto.builder()
                .id(id)
                .menuName(menu_name)
                .price(price)
                .kcal(kcal)
                .image(image)
                .mcLunchFlag(mc_lunch_flag == 1)
                .build();
    }
}