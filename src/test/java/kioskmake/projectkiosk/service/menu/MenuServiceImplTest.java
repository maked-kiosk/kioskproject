//package kioskmake.projectkiosk.service.menu;
//
//import kioskmake.projectkiosk.domain.menu.Menu;
//import kioskmake.projectkiosk.domain.menu.MenuRepository;
//import kioskmake.projectkiosk.web.dto.admin.UpdateMenuDetailRequestDto;
//import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.mock.mockito.MockBean;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.BDDMockito.given;
//
//class MenuServiceImplTest {
//
////    @MockBean
//    private MenuRepository menuRepository;
//
//    private MenuService menuService;
//
//    MenuServiceImplTest(MenuService menuService, MenuRepository menuRepository) {
//        this.menuService = menuService;
//        this.menuRepository = menuRepository;
//    }
//
//    @Test
//    void updateMenuDetail() throws Exception {
//        UpdateMenuDetailRequestDto menu = null;
//
//        menu = UpdateMenuDetailRequestDto.builder()
//                .id(1)
//                .menuType("burger")
//                .menuName("불고기 수정")
//                .price(5000)
//                .kcal(5000)
//                .size("")
//                .hamburgerCategoryCode(-1)
//                .mcLunchFlag(true)
//                .build();
//
//        given(menuRepository.updateMenuDetail(menu.toMenuEntity(null))).willReturn(1);
//
//        boolean reuslt = menuService.updateMenuDetail(menu);
//
//        assertTrue(reuslt, "true");
//    }
//}