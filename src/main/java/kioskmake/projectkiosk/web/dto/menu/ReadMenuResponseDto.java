package kioskmake.projectkiosk.web.dto.menu;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadMenuResponseDto {
    private String menuName;
    private int price;
    private int kcal;
}