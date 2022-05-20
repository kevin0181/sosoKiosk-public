package sosokiosk.kiosk.admin.controller.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import sosokiosk.kiosk.dto.menu.MenuDTO;
import sosokiosk.kiosk.service.img.ImgService;
import sosokiosk.kiosk.service.menu.MenuService;
import sosokiosk.kiosk.subDto.AddMenuDTO;
import sosokiosk.kiosk.subDto.ChangeMenuDTO;
import sosokiosk.kiosk.subDto.MessageDTO;

import javax.swing.filechooser.FileSystemView;
import javax.transaction.Transactional;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Controller
public class MenuController {

    @Autowired
    private ImgService imgService;

    @Autowired
    private MenuService menuService;


    @Transactional
    @PostMapping("/admin/menu/add/menu")
    @ResponseBody
    public Object addMenu(AddMenuDTO addMenuDTO, Model model) {
        MessageDTO messageDTO = new MessageDTO();

        //img 저장
        Map<String, String> result = imgService.saveImg(addMenuDTO.getMenuImg(), "menu", messageDTO);
        messageDTO = menuService.saveMenu(addMenuDTO, result, model);

        return messageDTO; //입력값 없음
    }

    @Transactional
    @PostMapping("/admin/menu/get/find/menu")
    @ResponseBody
    public MenuDTO findMenu(@RequestParam(value = "menuSq") Long menuSq) {
        return menuService.findMenu(menuSq);
    }


    @Transactional
    @PostMapping("/admin/menu/change/menu")
    @ResponseBody
    public MessageDTO changeMenu(ChangeMenuDTO changeMenuDTO) { //메뉴 수정

        MessageDTO messageDTO = new MessageDTO();

        Map<String, String> result = imgService.saveImg(changeMenuDTO.getMenuImg(), "menu", messageDTO);

        menuService.changeMenuService(changeMenuDTO, result, messageDTO);

        return messageDTO;
    }

    @Transactional
    @PostMapping("/admin/menu/delete/menu")
    @ResponseBody
    public boolean deleteMenu(@RequestParam(value = "menuSq") Long menuSq) { //메뉴 삭제

        boolean result;

        result = menuService.deleteMenu(menuSq);

        return result;
    }
}
