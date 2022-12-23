package kioskmake.projectkiosk.web.dto.menu;

import kioskmake.projectkiosk.domain.menu.MenuIdentity;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class UpdateMenuSalesRequestDto {
    private List<MenuIdentityDto> menuIdentityDtoList = null;

    public List<MenuIdentity> toMenuIdentityEntityList() {
        return menuIdentityDtoList.stream()
                .map(MenuIdentityDto::toMenuIdentityEntity)
                .collect(Collectors.toList());
    }
}