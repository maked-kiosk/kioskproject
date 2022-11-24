package kioskmake.projectkiosk.domain.menu;

import kioskmake.projectkiosk.web.dto.admin.GetMenuDetailRespDto;
import kioskmake.projectkiosk.web.dto.admin.GetMenuListRespDto;
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
    private int id;
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
	private int mc_lunch_flag;
	private int set_menu_flag;
	private int only_mc_morning_flag;
	private int hamburger_category_code;
	private int total_count;
	
	private String image;

    public ReadMenuResponseDto toReadMenuResponseDto() {
        return ReadMenuResponseDto.builder()
                .menuName(name)
                .price(price)
                .kcal(kcal)
                .build();
    }
    
    public GetMenuListRespDto toMenuList() {
    	return GetMenuListRespDto.builder()
    			.id(id)
    			.menuCategoryName(menu_type)
    			.name(name)
    			.price(price)
    			.kcal(kcal)
    			.size(size)
    			.img(image)
    			.mcLunchFlag(mc_lunch_flag == 1)
    			.setMenuFlag(set_menu_flag == 1)
    			.onlyMcMorningFlag(only_mc_morning_flag == 1)
    			.hamburgerMcMorningFlag(hamburger_category_code == -1)
    			.totalCount(total_count)
    			.build();
    }
    
    public GetMenuDetailRespDto toDetailDto() {
    	return GetMenuDetailRespDto.builder()
    			.id(id)
    			.name(name)
    			.price(price)
    			.sales(sales)
    			.kcal(kcal)
    			.img(image)
    			.size(size)
    			.build();
    }
}