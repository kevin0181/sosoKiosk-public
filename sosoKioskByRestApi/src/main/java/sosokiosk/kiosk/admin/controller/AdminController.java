package sosokiosk.kiosk.admin.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import sosokiosk.kiosk.dto.menu.CategoryDTO;
import sosokiosk.kiosk.dto.menu.MenuDTO;
import sosokiosk.kiosk.dto.order.OrderDTO;
import sosokiosk.kiosk.dto.side.MenuSideDTO;
import sosokiosk.kiosk.dto.side.SideDTO;
import sosokiosk.kiosk.entity.order.OrderEntity;
import sosokiosk.kiosk.service.menu.CategoryService;
import sosokiosk.kiosk.service.menu.MenuService;
import sosokiosk.kiosk.service.menu.SideMenuService;
import sosokiosk.kiosk.service.order.OrderService;
import sosokiosk.kiosk.service.setting.SettingService;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class AdminController {

    @Autowired
    private MenuService menuService;

    @Autowired
    private SideMenuService sideMenuService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private SettingService settingService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/admin/get/all/menu/list")
    @ResponseBody
    public List<MenuDTO> getAllMenu() {
        return menuService.findAllMenu();
    }

    @GetMapping("/admin/menu")
    public String adminMenu(Model model, @RequestParam(value = "status", required = false) String status) {

        model.addAttribute("arrowStatus", "menu");
        model.addAttribute("status", status);

        if (status.equals("all")) { // 전체 메뉴

            List<MenuDTO> menuEntityList = menuService.findAllMenu();

            model.addAttribute("menuEntityList", menuEntityList);

        } else if (status.equals("addMenu")) { // 메뉴 추가

        } else if (status.equals("deleteMenu")) { // 메뉴 삭제

        } else if (status.equals("sideAll")) { //사이드 메뉴 리스트

            List<MenuSideDTO> sideDTOList = sideMenuService.findSideMenuAll();

            model.addAttribute("sideDTOList", sideDTOList);

        } else if (status.equals("category")) {
            List<CategoryDTO> categoryDTOList = categoryService.findCategoryName();
            List<SideDTO> sideDTOList = categoryService.findSideName();

            model.addAttribute("categoryDTOList", categoryDTOList);
            model.addAttribute("sideDTOList", sideDTOList);
        }

        return "/admin/index";
    }

    @Transactional
    @GetMapping("/admin/sales")
    public String adminSales(Model model, @RequestParam(value = "status", required = false) String status) {

        model.addAttribute("arrowStatus", "sales");
        model.addAttribute("status", status);

        if (status.equals("sales")) {
            List<OrderEntity> orderEntityList = orderService.getSalesStartData();

            int totalPrice = 0;

            for (int i = 0; i < orderEntityList.size(); i++) {
                totalPrice += Integer.parseInt(orderEntityList.get(i).getOrderTotalPrice());
            }

            model.addAttribute("orderTotalPrice", totalPrice);

            Collections.reverse(orderEntityList);
            model.addAttribute("orderEntityList", orderEntityList);
        }

        return "/admin/index";
    }

    @Transactional
    @GetMapping("/admin/order")
    @ResponseBody
    public List<OrderDTO> adminOrder(@RequestParam(value = "status", required = false) String status) {

        List<OrderEntity> orderEntityList = null;

        if (status.equals("AllOrder")) {
            orderEntityList = orderService.getAllOrders();
            Collections.reverse(orderEntityList);
        } else if (status.equals("cardOrder")) {

            orderEntityList = orderService.getCardOrders();
            Collections.reverse(orderEntityList);

        } else if (status.equals("moneyOrder")) {
            orderEntityList = orderService.getMoneyOrders();
            Collections.reverse(orderEntityList);
        }

        List<OrderDTO> orderDTOList = orderEntityList.stream().map(orderEntity -> modelMapper.map(orderEntity, OrderDTO.class)).collect(Collectors.toList());

        return orderDTOList;


    }

}
