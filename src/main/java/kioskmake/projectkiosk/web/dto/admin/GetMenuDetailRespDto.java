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
	private String size;
	
}
