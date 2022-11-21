package kioskmake.projectkiosk.web.dto.admin;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GetMenuDetailRespDto {
	
	private int id;
	private String name;
	private int price;
	private int sales;
	private int kcal;
	private String img;
	private boolean mc_lunch_flag;
	private String size;
	private boolean set_menu_flag;
	private boolean only_mc_morning_flag;
}
