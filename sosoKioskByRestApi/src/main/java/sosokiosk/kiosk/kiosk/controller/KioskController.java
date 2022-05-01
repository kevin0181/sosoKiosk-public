package sosokiosk.kiosk.kiosk.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sosokiosk.kiosk.dto.menu.CategoryDTO;
import sosokiosk.kiosk.dto.menu.MenuDTO;
import sosokiosk.kiosk.dto.order.OrderDTO;
import sosokiosk.kiosk.dto.side.MenuSideDTO;
import sosokiosk.kiosk.dto.side.SideCategoryDTO;
import sosokiosk.kiosk.dto.side.SideDTO;
import sosokiosk.kiosk.entity.order.OrderEntity;
import sosokiosk.kiosk.service.menu.CategoryService;
import sosokiosk.kiosk.service.menu.MenuService;
import sosokiosk.kiosk.service.order.OrderService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Controller
public class KioskController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private MenuService menuService;

    @Autowired
    private OrderService orderService;


    @GetMapping("/")
    public String startUrlPage() {
        return "/kiosk/index";
    }


    //주문 페이지
    @PostMapping("/kiosk/CategoryList")
    @ResponseBody
    public Object orderMenuPage() {

        List<CategoryDTO> categoryDTO = categoryService.findAllCategory();

        return categoryDTO;
    }

    @GetMapping("/kiosk/card/pay")
    public String cardPage() {
        return "/kiosk/cardPay";
    }

    @Transactional
    @PostMapping("/kiosk/category/get/categorySq")
    @ResponseBody
    public List<MenuDTO> findCategorySq(@RequestParam(value = "categorySq") Long categorySq) {

        List<MenuDTO> menuDTOList;

        if (categorySq == 0) {
            menuDTOList = menuService.findAllMenu();
        } else {
            menuDTOList = menuService.findCategoryByMenu(categorySq);
        }

        return menuDTOList;
    }

    @Transactional
    @PostMapping("/kiosk/side/get/sideSq")
    @ResponseBody
    public SideDTO findSideSq(@RequestParam(value = "sideSq") Long sideSq) {

        SideDTO sideDTO = categoryService.findSideSq(sideSq);
        List<SideCategoryDTO> sideCategoryDTOList = sideDTO.getSideCategoryDTOList();
        List<MenuSideDTO> menuSideDTOList = sideCategoryDTOList.get(0).getMenuSideDTOList();

        for (int i = 0; i < menuSideDTOList.size(); i++) {
            menuSideDTOList.get(i).setSideCategoryDTO(null);
        }

        for (int i = 0; i < sideCategoryDTOList.size(); i++) {
            sideCategoryDTOList.get(i).setMenuSideDTOList(null);
        }

        sideCategoryDTOList.get(0).setMenuSideDTOList(menuSideDTOList);
        sideDTO.setSideCategoryDTOList(sideCategoryDTOList);

        return sideDTO;
    }

    @Transactional
    @PostMapping("/kiosk/side/get/sideCategorySq")
    @ResponseBody
    public SideCategoryDTO findSideCategorySq(@RequestParam(value = "sideCategorySq") Long sideCategorySq) {

        SideCategoryDTO sideCategoryDTO = categoryService.findSideCategory(sideCategorySq);

        return sideCategoryDTO;
    }

    @Transactional
    @PostMapping("/kiosk/menu/order/menu")
    @ResponseBody
    public OrderDTO orderMenu(@RequestBody Map<String, Object> data) { //주문 저장

        try {
            ObjectMapper mapper = new ObjectMapper();
            List<MenuDTO> menuDTOList = mapper.convertValue(data.get("orderMenu"), new TypeReference<List<MenuDTO>>() {
            });

            String totalPrice = (String) data.get("totalPrice");
            String placeStatus = (String) data.get("placeStatus");
            String payStatus = (String) data.get("payStatus");

            OrderDTO orderDTO = orderService.orderMenu(menuDTOList, totalPrice, placeStatus, payStatus);

            return orderDTO;

        } catch (Exception e) {
            return null;
        }

    }

    @Transactional
    @PostMapping("/kiosk/menu/order/saveMenu")
    @ResponseBody
    public OrderDTO cardPayAfterSaveOrder(@RequestBody OrderEntity orderEntity) { //주문 저장

        OrderDTO orderDTO = orderService.reSaveOrder(orderEntity);

        return orderDTO;
    }

    @Transactional
    @PostMapping("/kiosk/menu/cancel/saveMenu")
    @ResponseBody
    public OrderEntity cancelSaveOrderMenu(@RequestBody OrderEntity orderEntity) { //주문 취소

        orderService.cancelOrderMenu(orderEntity);

        return orderEntity;
    }


    @Transactional
    @PostMapping("/kiosk/card/fail/pay")
    @ResponseBody
    public OrderEntity failCardPay(@RequestBody OrderEntity orderEntity) { //카드 주문 실패

        orderService.failSave(orderEntity);

        return orderEntity;
    }

}
