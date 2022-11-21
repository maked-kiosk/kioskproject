package kioskmake.projectkiosk.web.dto.menu;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadMenuResponseDto {
    private int id;
    private String menuName;
    private int price;
    private int kcal;
    private String image;
    private String type;
    private boolean mcMorningFlag;
    private boolean mcLunchFlag;
}