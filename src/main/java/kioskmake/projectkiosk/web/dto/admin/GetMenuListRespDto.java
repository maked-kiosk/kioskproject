package kioskmake.projectkiosk.web.dto.admin;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GetMenuListRespDto {

	private int id;
	private String menuCategoryName;
	private String name;
	private int price;
	private int kcal;
	private String size;
	private String img;
	private int totalCount;
}
