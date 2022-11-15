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
    private int menu_code;
    private boolean set_flag;
    private String menu_type;
	private boolean mc_morning_flag;
	private String burger_type;
	private String size;
	private String drink_type;
	private String name;
	private int sales;
	private int price;
	private int kcal;
	
	private String img;

    public ReadMenuResponseDto toReadMenuResponseDto() {
        return ReadMenuResponseDto.builder()
                .menuName(name)
                .price(price)
                .kcal(kcal)
                .build();
    }
}