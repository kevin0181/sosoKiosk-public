package sosokiosk.kiosk.admin.controller.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sosokiosk.kiosk.dto.menu.CategoryDTO;
import sosokiosk.kiosk.dto.side.SideCategoryDTO;
import sosokiosk.kiosk.dto.side.SideDTO;
import sosokiosk.kiosk.entity.side.SideEntity;
import sosokiosk.kiosk.service.menu.CategoryService;

import javax.transaction.Transactional;
import java.util.List;

@Controller
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/admin/menu/add/category")
    @ResponseBody
    public boolean addCategory(@RequestParam(value = "categoryName") String categoryName) { //메뉴 카테고리 추가
        categoryService.addMenuCategory(categoryName);
        return true;
    }

    @PostMapping("/admin/menu/add/side")
    @ResponseBody
    public boolean addSide(@RequestParam(value = "sideName") String sideName) { //사이드 추가
        categoryService.addSide(sideName);
        return true;
    }

    @PostMapping("/admin/menu/add/sideCategory")
    @ResponseBody
    public boolean addSideCategory(@RequestParam(value = "sideSq") Long sideSq, @RequestParam(value = "sideCategoryName") String sideCategoryName) { //사이드 카테고리 추가
        categoryService.addSideCategory(sideSq, sideCategoryName);
        return true;
    }

    @Transactional
    @GetMapping("/admin/menu/get/side")
    @ResponseBody
    public List<SideDTO> getSide() { //side 가져옴
        return categoryService.getSide();
    }


    @Transactional
    @GetMapping("/admin/menu/get/list")
    @ResponseBody
    public List<?> getList(@RequestParam(value = "status") String status) { //list

        if (status.equals("category")) {

            return categoryService.getCategory();

        } else if (status.equals("side")) {

            return categoryService.getSide();

        } else if (status.equals("sideCategory")) {

            return categoryService.getSideCategory();

        }
        return null;
    }

    @Transactional
    @PostMapping("/admin/menu/delete/category")
    @ResponseBody
    public boolean deleteCategory(@RequestParam(value = "status") Long categorySq) { //카테고리 삭제
        categoryService.deleteCategory(categorySq);
        return true;
    }

    @Transactional
    @PostMapping("/admin/menu/delete/side")
    @ResponseBody
    public boolean deleteSide(@RequestParam(value = "status") Long sideSq) { //사이드 삭제
        categoryService.deleteSide(sideSq);
        return true;
    }

    @Transactional
    @PostMapping("/admin/menu/delete/sideCategory")
    @ResponseBody
    public boolean deleteSideCategory(@RequestParam(value = "status") Long sideCategorySq) { //사이드 카테고리 삭제
        categoryService.deleteSideCategory(sideCategorySq);
        return true;
    }


    @Transactional
    @PostMapping("/admin/category/change/side")
    @ResponseBody
    public boolean changeSide(@RequestParam(value = "sq") Long sq, @RequestParam(value = "changeName") String changeName) { //사이드 수정
        categoryService.changeSide(sq, changeName);
        return true;
    }

    @Transactional
    @PostMapping("/admin/category/change/category")
    @ResponseBody
    public boolean changeCategory(@RequestParam(value = "sq") Long sq, @RequestParam(value = "changeName") String changeName) { // 카테고리 수정
        categoryService.changeCategory(sq, changeName);
        return true;
    }

    @Transactional
    @PostMapping("/admin/category/get/category")
    @ResponseBody
    public CategoryDTO getCategoryDetail(@RequestParam(value = "categorySq") Long categorySq) { // 카테고리 가져오기
        CategoryDTO categoryDTO = categoryService.getCategoryDetailService(categorySq);
        return categoryDTO;
    }

    @Transactional
    @PostMapping("/admin/category/get/side")
    @ResponseBody
    public SideDTO getSideDetail(@RequestParam(value = "sideSq") Long sideSq) { // 사이드 가져오기

        SideDTO sideDTO = categoryService.getSideDetailService(sideSq);

        return sideDTO;
    }

    @Transactional
    @PostMapping("/admin/category/find/sideCategorySq")
    @ResponseBody
    public SideCategoryDTO findSideCategorySq(@RequestParam(value = "sideCategorySq") Long sideCategorySq) { // 사이드 카테고리 메뉴 가져오기

        SideCategoryDTO sideCategoryDTO = categoryService.findSideCategory(sideCategorySq);

        return sideCategoryDTO;
    }

}
