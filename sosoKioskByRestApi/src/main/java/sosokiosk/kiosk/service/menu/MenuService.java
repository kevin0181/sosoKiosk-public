package sosokiosk.kiosk.service.menu;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import sosokiosk.kiosk.dto.menu.MenuDTO;
import sosokiosk.kiosk.dto.side.SideDTO;
import sosokiosk.kiosk.entity.menu.ImgEntity;
import sosokiosk.kiosk.entity.menu.MenuEntity;
import sosokiosk.kiosk.entity.order.OrderDetailEntity;
import sosokiosk.kiosk.entity.side.SideEntity;
import sosokiosk.kiosk.repository.menu.ImgRepository;
import sosokiosk.kiosk.repository.menu.MenuRepository;
import sosokiosk.kiosk.repository.order.OrderDetailRepository;
import sosokiosk.kiosk.repository.side.SideRepository;
import sosokiosk.kiosk.subDto.AddMenuDTO;
import sosokiosk.kiosk.subDto.ChangeMenuDTO;
import sosokiosk.kiosk.subDto.MessageDTO;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MenuService {

    @Autowired
    private SideRepository sideRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private ImgRepository imgRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ModelMapper modelMapper;


    public MessageDTO saveMenu(AddMenuDTO addMenuDTO, Map<String, String> result, Model model) {

        MessageDTO messageDTO = new MessageDTO();

        MenuEntity menuEntity = new MenuEntity();
        ImgEntity imgEntity = new ImgEntity();
        List<ImgEntity> imgEntityList = new ArrayList<>();
        Optional<SideEntity> sideEntityOptional = null;
        SideEntity sideEntity;

        if (addMenuDTO.getSideSq() != 0) {
            sideEntityOptional = sideRepository.findById(addMenuDTO.getSideSq());
        }

        if (sideEntityOptional != null && addMenuDTO.getSideSq() != 0) {
            sideEntity = sideEntityOptional.get();
            menuEntity.getSide().add(sideEntity);
        }


        if (result == null) { //이미지 없을때 에러
            messageDTO.setStatus(true);
            messageDTO.setMessageStatus("error");
            messageDTO.setMessage("이미지를 추가해주세요.");
            return messageDTO;
        } else {
            imgEntity.setImgName(result.get("imgName"));
            imgEntity.setImgPath(result.get("imgPath"));
            imgEntity.setImgDate(result.get("imgDate"));
            imgEntity.setImgExtension(result.get("imgExtension"));

            imgEntityList.add(imgEntity);
        }

        menuEntity.setCategorySq(addMenuDTO.getCategorySq());
        menuEntity.setMenuName(addMenuDTO.getMenuName());
        menuEntity.setMenuPrice(addMenuDTO.getMenuPrice());
        menuEntity.setMenuSoldOut(false);
        menuEntity.setMenuEnable(false);

        menuEntity.setImgDTOList(imgEntityList);

        menuRepository.save(menuEntity); //이미지 저장후 db에 메뉴, 이미지 정보, 사이드 저장

        return messageDTO;
    }

    @Transactional
    public List<MenuDTO> findAllMenu() { //전체메뉴찾기

        List<MenuEntity> menuEntityList = menuRepository.findAll();
        List<MenuDTO> menuDTOS = menuEntityList.stream().map(menuEntity -> modelMapper.map(menuEntity, MenuDTO.class)).collect(Collectors.toList());


        for (int i = 0; i < menuDTOS.size(); i++) {
            menuDTOS.get(i).getCategoryDTO().getMenuDTOList().removeAll(menuDTOS.get(i).getCategoryDTO().getMenuDTOList());
            for (SideDTO j : menuDTOS.get(i).getSide()) {
                for (int n = 0; n < j.getSideCategoryDTOList().size(); n++) {
                    j.getSideCategoryDTOList().removeAll(j.getSideCategoryDTOList());
                }
                menuDTOS.get(i).getSide().add(j);
            }
        }

        return menuDTOS;

    }

    public MenuDTO findMenu(Long menuSq) {

        MenuEntity menuEntity = menuRepository.findById(menuSq).get();
        MenuDTO menuDTO = modelMapper.map(menuEntity, MenuDTO.class);

        for (SideDTO i : menuDTO.getSide()) {  //사이드에서 무한 루프 도는 부분 없애기.
            for (int j = 0; j < i.getSideCategoryDTOList().size(); j++) {
                i.getSideCategoryDTOList().get(j).setMenuSideDTOList(null);
                i.getSideCategoryDTOList().get(j).setSideDTO(null);
            }
        }
//        menuDTO.setSide(null);

        menuDTO.getCategoryDTO().setMenuDTOList(null); //카테고리 무한 루프 막기.

        return menuDTO;
    }


    //메뉴 수정
    public void changeMenuService(ChangeMenuDTO changeMenuDTO, Map<String, String> result, MessageDTO messageDTO) {


        MenuEntity menuEntity = modelMapper.map(changeMenuDTO, MenuEntity.class);


        ImgEntity imgEntity = new ImgEntity();


        if (result != null) {

            imgEntity.setMenuSq(changeMenuDTO.getMenuSq());
            imgEntity.setImgName(result.get("imgName"));
            imgEntity.setImgPath(result.get("imgPath"));
            imgEntity.setImgDate(result.get("imgDate"));
            imgEntity.setImgExtension(result.get("imgExtension"));

            menuEntity.getImgDTOList().add(imgEntity);
        } else {
            imgEntity = imgRepository.findByMenuSq(changeMenuDTO.getMenuSq());
            menuEntity.getImgDTOList().add(imgEntity);
        }

        if (changeMenuDTO.getSideSq() != 0) {
            SideEntity sideEntity = sideRepository.findById(changeMenuDTO.getSideSq()).get();
            menuEntity.getSide().add(sideEntity);
        }

        menuRepository.save(menuEntity);

    }

    public boolean deleteMenu(Long menuSq) {
        try {

            MenuEntity menuEntity = menuRepository.findById(menuSq).get();

            menuEntity.setSide(null);
            if (menuEntity.getSide() != null) {
                menuRepository.delete(menuEntity); //사이드 삭제
            }

            List<OrderDetailEntity> orderDetailEntityList = orderDetailRepository.findAllByMenuSq(menuSq);

            for (int i = 0; i < orderDetailEntityList.size(); i++) {
                orderDetailEntityList.get(i).setMenuSq(null);
            }

            menuRepository.deleteById(menuSq); //메뉴 삭제

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<MenuDTO> findCategoryByMenu(Long categorySq) {

        List<MenuEntity> menuEntityList = menuRepository.findAllByCategorySq(categorySq);
        List<MenuDTO> menuDTOList = menuEntityList.stream().map(menuEntity -> modelMapper.map(menuEntity, MenuDTO.class)).collect(Collectors.toList());

        for (int i = 0; i < menuDTOList.size(); i++) {
            menuDTOList.get(i).setCategoryDTO(null);
            for (SideDTO j : menuDTOList.get(i).getSide()) {
                j.setSideCategoryDTOList(null);
                menuDTOList.get(i).getSide().add(j);
            }
        }

        return menuDTOList;

    }
}
