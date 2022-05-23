package sosokiosk.kiosk.service.menu;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sosokiosk.kiosk.dto.side.MenuSideDTO;
import sosokiosk.kiosk.dto.side.SideCategoryDTO;
import sosokiosk.kiosk.dto.side.SideDTO;
import sosokiosk.kiosk.entity.order.OrderDetailSideEntity;
import sosokiosk.kiosk.entity.side.MenuSideEntity;
import sosokiosk.kiosk.entity.side.MenuSideImgEntity;
import sosokiosk.kiosk.entity.side.SideCategoryEntity;
import sosokiosk.kiosk.entity.side.SideEntity;
import sosokiosk.kiosk.repository.order.OrderDetailSideRepository;
import sosokiosk.kiosk.repository.side.MenuSideImgRepository;
import sosokiosk.kiosk.repository.side.MenuSideRepository;
import sosokiosk.kiosk.repository.side.SideCategoryRepository;
import sosokiosk.kiosk.repository.side.SideRepository;
import sosokiosk.kiosk.subDto.AddSideMenuDTO;
import sosokiosk.kiosk.subDto.ChangeSideMenuDTO;
import sosokiosk.kiosk.subDto.MessageDTO;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SideMenuService {

    @Autowired
    private SideCategoryRepository sideCategoryRepository;

    @Autowired
    private MenuSideRepository menuSideRepository;

    @Autowired
    private MenuSideImgRepository menuSideImgRepository;

    @Autowired
    private SideRepository sideRepository;

    @Autowired
    private OrderDetailSideRepository orderDetailSideRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<SideCategoryDTO> findSideCategoryService(Long sideSq) {

        List<SideCategoryEntity> sideCategoryEntityList = sideCategoryRepository.findAllBySideSq(sideSq);
        List<SideCategoryDTO> sideCategoryDTOList = sideCategoryEntityList.stream().map(sideCategoryEntity -> modelMapper.map(sideCategoryEntity, SideCategoryDTO.class)).collect(Collectors.toList());

        for (int i = 0; i < sideCategoryDTOList.size(); i++) {
            sideCategoryDTOList.get(i).setSideDTO(null);
            sideCategoryDTOList.get(i).setMenuSideDTOList(null);
        }

        return sideCategoryDTOList;
    }

    //사이드 메뉴 저장
    public MessageDTO saveSideMenu(AddSideMenuDTO addSideMenuDTO, Map<String, String> result) {

        MessageDTO messageDTO = new MessageDTO();

        MenuSideImgEntity menuSideImgEntity = new MenuSideImgEntity();
        List<MenuSideImgEntity> menuSideImgEntityList = new ArrayList<>();

        if (result == null) { //이미지 없을때 에러
            messageDTO.setStatus(true);
            messageDTO.setMessageStatus("error");
            messageDTO.setMessage("이미지를 추가해주세요.");
            return messageDTO;
        } else {
            menuSideImgEntity.setMenuSideImgName(result.get("imgName"));
            menuSideImgEntity.setMenuSideImgPath(result.get("imgPath"));
            menuSideImgEntity.setMenuSideImgDate(result.get("imgDate"));
            menuSideImgEntity.setMenuSideImgExtension(result.get("imgExtension"));

            menuSideImgEntityList.add(menuSideImgEntity);
        }

        if (addSideMenuDTO.getSideSq() == 0) {
            messageDTO.setStatus(true);
            messageDTO.setMessageStatus("error");
            messageDTO.setMessage("사이드를 추가해주세요.");
            return messageDTO;
        }

        if (addSideMenuDTO.getSideCategorySq() == 0) {
            messageDTO.setStatus(true);
            messageDTO.setMessageStatus("error");
            messageDTO.setMessage("사이드 카테고리를 추가해주세요.");
            return messageDTO;
        }


        MenuSideEntity menuSideEntity = modelMapper.map(addSideMenuDTO, MenuSideEntity.class);

        menuSideEntity.setMenuSideImgDTOList(menuSideImgEntityList);

        menuSideRepository.save(menuSideEntity);

        return messageDTO;
    }

    @Transactional
    public List<MenuSideDTO> findSideMenuAll() {
        List<MenuSideEntity> menuSideEntityList = menuSideRepository.findAll();
        List<MenuSideDTO> menuSideDTOList = menuSideEntityList.stream().map(menuSideEntity -> modelMapper.map(menuSideEntity, MenuSideDTO.class)).collect(Collectors.toList());

        for (int i = 0; i < menuSideDTOList.size(); i++) {
            menuSideDTOList.get(i).getSideCategoryDTO().setMenuSideDTOList(null);
            menuSideDTOList.get(i).getSideCategoryDTO().getSideDTO().setSideCategoryDTOList(null);
        }

        return menuSideDTOList;
    }


    //사이드메뉴 삭제
    public void deleteSideMenu(Long menuSideSq) {

        List<OrderDetailSideEntity> orderDetailSideEntityList = orderDetailSideRepository.findAllBySideSq(menuSideSq);

        for (int i = 0; i < orderDetailSideEntityList.size(); i++) {
            orderDetailSideEntityList.get(i).setSideSq(null);
        }

        menuSideRepository.deleteById(menuSideSq);


    }


    //사이드 메뉴 상세
    public MenuSideDTO findSideMenu(Long menuSideSq) {

        MenuSideEntity menuSideEntity = menuSideRepository.findById(menuSideSq).get();
        MenuSideDTO menuSideDTO = modelMapper.map(menuSideEntity, MenuSideDTO.class);

        menuSideDTO.getSideCategoryDTO().setMenuSideDTOList(null);
        menuSideDTO.getSideCategoryDTO().getSideDTO().setSideCategoryDTOList(null);

        return menuSideDTO;
    }


    //사이드 메뉴 수정
    public void changeSideMenuService(ChangeSideMenuDTO changeSideMenuDTO, Map<String, String> result, MessageDTO messageDTO) {

        MenuSideEntity menuSideEntity = modelMapper.map(changeSideMenuDTO, MenuSideEntity.class);


        MenuSideImgEntity menuSideImgEntity = new MenuSideImgEntity();


        if (result != null) {

            menuSideImgEntity.setMenuSideSq(changeSideMenuDTO.getMenuSideSq());
            menuSideImgEntity.setMenuSideImgName(result.get("imgName"));
            menuSideImgEntity.setMenuSideImgPath(result.get("imgPath"));
            menuSideImgEntity.setMenuSideImgDate(result.get("imgDate"));
            menuSideImgEntity.setMenuSideImgExtension(result.get("imgExtension"));

            menuSideEntity.getMenuSideImgDTOList().add(menuSideImgEntity);
        } else {
            menuSideImgEntity = menuSideImgRepository.findByMenuSideSq(menuSideEntity.getMenuSideSq());
            menuSideEntity.getMenuSideImgDTOList().add(menuSideImgEntity);
        }

        if (changeSideMenuDTO.getSideCategorySq() != 0) {

            menuSideRepository.save(menuSideEntity);

        } else {
            messageDTO.setStatus(true);
            messageDTO.setMessageStatus("error");
            messageDTO.setMessage("사이드 카테고리를 선택해주세요.");
            throw new NullPointerException();
        }

    }

    public SideDTO getSide(Long sideSq) {

        SideEntity sideEntity = sideRepository.getById(sideSq);
        SideDTO sideDTO = modelMapper.map(sideEntity, SideDTO.class);


        for (int i = 0; i < sideDTO.getSideCategoryDTOList().size(); i++) {

            sideDTO.getSideCategoryDTOList().get(i).setSideDTO(null);

            for (int j = 0; j < sideDTO.getSideCategoryDTOList().get(i).getMenuSideDTOList().size(); j++) {

                sideDTO.getSideCategoryDTOList().get(i).getMenuSideDTOList().get(j).setSideCategoryDTO(null);

            }

        }


        return sideDTO;
    }
}
