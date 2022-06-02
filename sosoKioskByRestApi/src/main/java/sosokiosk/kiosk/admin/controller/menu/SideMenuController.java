package sosokiosk.kiosk.admin.controller.menu;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import sosokiosk.kiosk.dto.side.MenuSideDTO;
import sosokiosk.kiosk.dto.side.SideCategoryDTO;
import sosokiosk.kiosk.dto.side.SideDTO;
import sosokiosk.kiosk.service.img.ImgService;
import sosokiosk.kiosk.service.menu.SideMenuService;
import sosokiosk.kiosk.subDto.AddSideMenuDTO;
import sosokiosk.kiosk.subDto.ChangeSideMenuDTO;
import sosokiosk.kiosk.subDto.MessageDTO;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Controller
public class SideMenuController {

    @Autowired
    private ImgService imgService;

    @Autowired
    private SideMenuService sideMenuService;

    @Transactional
    @PostMapping("/admin/menu/add/sideMenu")
    @ResponseBody
    public Object addMenu(AddSideMenuDTO addSideMenuDTO) {

        MessageDTO messageDTO = new MessageDTO();

        if (addSideMenuDTO != null) {
            //img 저장
            Map<String, String> result = imgService.saveImg(addSideMenuDTO.getMenuSideImg(), "side", messageDTO);
            messageDTO = sideMenuService.saveSideMenu(addSideMenuDTO, result);
            return messageDTO;
        }

        return messageDTO; //입력값 없음
    }

    @Transactional
    @PostMapping("/admin/menu/get/all/v1/side")
    @ResponseBody
    public List<MenuSideDTO> findAllSideMenu() {
        List<MenuSideDTO> sideDTOList = sideMenuService.findSideMenuAll();
        return sideDTOList;
    }

//    @Transactional
//    @GetMapping("/admin/menu/get/all/side")
//    @ResponseBody
//    public List<MenuSideDTO> findAllSideMenu2() {
//        List<MenuSideDTO> sideDTOList = sideMenuService.findSideMenuAll();
//        return sideDTOList;
//    }


    @Transactional
    @GetMapping("/admin/menu/get/find/side")
    @ResponseBody
    public List<SideCategoryDTO> findSideCategory(@RequestParam(value = "sideSq") Long sideSq) { //side 카테고리 가져옴
        return sideMenuService.findSideCategoryService(sideSq);
    }


    @Transactional
    @PostMapping("/admin/menu/delete/sideMenu")
    @ResponseBody
    public boolean deleteSideMenu(@RequestParam(value = "menuSideSq") Long menuSideSq) { //side 메뉴 삭제

        try {

            sideMenuService.deleteSideMenu(menuSideSq);
            return true;

        } catch (Exception e) {
            return false;
        }

    }


    @Transactional
    @PostMapping("/admin/menu/get/find/sideMenu")
    @ResponseBody
    public MenuSideDTO findSideMenu(@RequestParam(value = "menuSideSq") Long menuSideSq) { //side 메뉴 상세보기

        MenuSideDTO menuSideDTO = sideMenuService.findSideMenu(menuSideSq);

        return menuSideDTO;
    }

    @Transactional
    @PostMapping("/admin/menu/change/sideMenu")
    @ResponseBody
    public MessageDTO changeSideMenu(ChangeSideMenuDTO changeSideMenuDTO) { //side 메뉴 수정
        MessageDTO messageDTO = new MessageDTO();

        Map<String, String> result = imgService.saveImg(changeSideMenuDTO.getMenuSideImg(), "side", messageDTO);

        sideMenuService.changeSideMenuService(changeSideMenuDTO, result, messageDTO);

        return messageDTO;
    }


    @Transactional
    @PostMapping("/admin/side/get/side")
    @ResponseBody
    public SideDTO getSide(@RequestParam(value = "sideSq") Long sideSq) { //side 가져오기

        SideDTO sideDTO = sideMenuService.getSide(sideSq);

        return sideDTO;

    }

}
