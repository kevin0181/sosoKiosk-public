package sosokiosk.kiosk.service.menu;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sosokiosk.kiosk.dto.menu.CategoryDTO;
import sosokiosk.kiosk.dto.side.SideCategoryDTO;
import sosokiosk.kiosk.dto.side.SideDTO;
import sosokiosk.kiosk.entity.menu.CategoryEntity;
import sosokiosk.kiosk.entity.side.SideCategoryEntity;
import sosokiosk.kiosk.entity.side.SideEntity;
import sosokiosk.kiosk.repository.menu.CategoryRepository;
import sosokiosk.kiosk.repository.side.SideCategoryRepository;
import sosokiosk.kiosk.repository.side.SideRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SideRepository sideRepository;

    @Autowired
    private SideCategoryRepository sideCategoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<CategoryDTO> getCategory() { //카테고리 얻기
        List<CategoryEntity> categoryEntityList = categoryRepository.findAllByOrderByCategoryIndex();
        List<CategoryDTO> categoryDTOList = categoryEntityList.stream().map(categoryEntity -> modelMapper.map(categoryEntity, CategoryDTO.class)).collect(Collectors.toList());

        for (int i = 0; i < categoryDTOList.size(); i++) {
            for (int j = 0; j < categoryDTOList.get(i).getMenuDTOList().size(); j++) {
                categoryDTOList.get(i).getMenuDTOList().get(j).setCategoryDTO(null);
                categoryDTOList.get(i).getMenuDTOList().get(j).setSide(null);
            }
        }

        return categoryDTOList;
    }

    public void addMenuCategory(String categoryName) {  //menu category save

        CategoryEntity categoryDTO = new CategoryEntity();

        categoryDTO.setCategoryName(categoryName);
        categoryRepository.save(categoryDTO);
    }

    public void addSide(String sideName) { //사이드 추가

        SideEntity sideDTO = new SideEntity();

        sideDTO.setSideName(sideName);
        sideRepository.save(sideDTO);
    }

    public List<SideDTO> getSide() { //사이드 리스트 얻기

        List<SideEntity> sideEntityList = sideRepository.findAll();
        List<SideDTO> sideDTOList = sideEntityList.stream().map(sideEntity -> modelMapper.map(sideEntity, SideDTO.class)).collect(Collectors.toList());

        for (int i = 0; i < sideDTOList.size(); i++) {
//            for (int j = 0; j < sideDTOList.get(i).getSideCategoryDTOList().size(); j++) {
//                sideDTOList.get(i).getSideCategoryDTOList().get(j).setSideDTO(null);
//                sideDTOList.get(i).getSideCategoryDTOList().get(i).setMenuSideDTOList(null);
            sideDTOList.get(i).setSideCategoryDTOList(null);

//            }
        }
        return sideDTOList;
    }

    public void addSideCategory(Long sideSq, String sideCategoryName) { //사이드 카테고리 추가

        SideCategoryEntity sideCategoryEntity = new SideCategoryEntity();
        sideCategoryEntity.setSideSq(sideSq);
        sideCategoryEntity.setSideCategoryName(sideCategoryName);

        sideCategoryRepository.save(sideCategoryEntity);

    }

    public List<SideCategoryDTO> getSideCategory() { //사이드 카테고리 리스트 얻기

        List<SideCategoryEntity> sideCategoryEntityList = sideCategoryRepository.findAll();

        List<SideCategoryDTO> sideCategoryDTOList = sideCategoryEntityList.stream().map(sideCategoryEntity -> modelMapper.map(sideCategoryEntity, SideCategoryDTO.class)).collect(Collectors.toList());

        for (int i = 0; i < sideCategoryDTOList.size(); i++) {
            sideCategoryDTOList.get(i).getSideDTO().getSideCategoryDTOList().removeAll(sideCategoryDTOList.get(i).getSideDTO().getSideCategoryDTOList());
            sideCategoryDTOList.get(i).setMenuSideDTOList(null);
        }

        return sideCategoryDTOList;
    }

    public void deleteCategory(Long categorySq) { //카테고리 삭제
        CategoryEntity categoryEntity = categoryRepository.findById(categorySq).get();
        categoryRepository.delete(categoryEntity);
    }

    public void deleteSide(Long sideSq) { //사이드 삭제
//        SideEntity sideEntity = sideRepository.getById(sideSq);

        sideRepository.deleteById(sideSq);
//        sideRepository.delete(sideEntity);
    }

    public void deleteSideCategory(Long sideCategorySq) { //사이드 카테고리 삭제
        sideCategoryRepository.deleteById(sideCategorySq);
    }


    @Transactional
    public List<CategoryDTO> findCategoryName() {
        List<CategoryEntity> categoryEntityList = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOList = categoryEntityList.stream().map(categoryEntity -> modelMapper.map(categoryEntity, CategoryDTO.class)).collect(Collectors.toList());

        for (int i = 0; i < categoryDTOList.size(); i++) {
            categoryDTOList.get(i).setMenuDTOList(null);
        }

        return categoryDTOList;
    }


    @Transactional
    public List<SideDTO> findSideName() {
        List<SideEntity> sideEntityList = sideRepository.findAll();
        List<SideDTO> sideDTOList = sideEntityList.stream().map(sideEntity -> modelMapper.map(sideEntity, SideDTO.class)).collect(Collectors.toList());

        for (int i = 0; i < sideDTOList.size(); i++) {
            sideDTOList.get(i).setSideCategoryDTOList(null);
        }

        return sideDTOList;
    }

    public void changeSide(Long sq, String changeName) {
        SideEntity sideEntity = sideRepository.findById(sq).get();
        sideEntity.setSideName(changeName);

        sideRepository.save(sideEntity);

    }

    public void changeCategory(Long sq, String changeName) {
        CategoryEntity categoryEntity = categoryRepository.findById(sq).get();
        categoryEntity.setCategoryName(changeName);

        categoryRepository.save(categoryEntity);
    }

    public CategoryDTO getCategoryDetailService(Long categorySq) {

        CategoryEntity categoryEntity = categoryRepository.findById(categorySq).get();
        CategoryDTO categoryDTO = modelMapper.map(categoryEntity, CategoryDTO.class);

        for (int i = 0; i < categoryDTO.getMenuDTOList().size(); i++) {
            categoryDTO.getMenuDTOList().get(i).setCategoryDTO(null);
            categoryDTO.getMenuDTOList().get(i).setSide(null);
        }

        return categoryDTO;
    }

    public SideDTO getSideDetailService(Long sideSq) {
        SideEntity sideEntity = sideRepository.findById(sideSq).get();
        SideDTO sideDTO = modelMapper.map(sideEntity, SideDTO.class);

        for (int i = 0; i < sideDTO.getSideCategoryDTOList().size(); i++) {
            sideDTO.getSideCategoryDTOList().get(i).setSideDTO(null);
            sideDTO.getSideCategoryDTOList().get(i).setMenuSideDTOList(null);
        }

        return sideDTO;
    }

    public SideDTO getSideCategoryMenu(Long sideSq) {
        SideEntity sideEntity = sideRepository.findById(sideSq).get();
        SideDTO sideDTO = modelMapper.map(sideEntity, SideDTO.class);

        for (int i = 0; i < sideDTO.getSideCategoryDTOList().size(); i++) {
            sideDTO.getSideCategoryDTOList().get(i).setSideDTO(null);

            for (int j = 0; j < sideDTO.getSideCategoryDTOList().get(i).getMenuSideDTOList().size(); j++) {
                sideDTO.getSideCategoryDTOList().get(i).getMenuSideDTOList().get(j).setSideCategoryDTO(null);
            }

        }


        return sideDTO;
    }

    public SideCategoryDTO findSideCategory(Long sideCategorySq) {
        SideCategoryEntity sideCategoryEntity = sideCategoryRepository.findById(sideCategorySq).get();
        SideCategoryDTO sideCategoryDTO = modelMapper.map(sideCategoryEntity, SideCategoryDTO.class);

        sideCategoryDTO.setSideDTO(null);

        for (int i = 0; i < sideCategoryDTO.getMenuSideDTOList().size(); i++) {
            sideCategoryDTO.getMenuSideDTOList().get(i).setSideCategoryDTO(null);
        }

        return sideCategoryDTO;
    }


    @Transactional
    public List<CategoryDTO> findAllCategory() {

        List<CategoryEntity> categoryEntityList = categoryRepository.findAllByOrderByCategoryIndex();
        List<CategoryDTO> categoryDTOList = categoryEntityList.stream().map(categoryEntity -> modelMapper.map(categoryEntity, CategoryDTO.class)).collect(Collectors.toList());

        for (int i = 0; i < categoryDTOList.size(); i++) {
            categoryDTOList.get(i).setMenuDTOList(null);
        }
        return categoryDTOList;
    }

    public SideDTO findSideSq(Long sideSq) {
        SideEntity sideEntity = sideRepository.findById(sideSq).get();
        SideDTO sideDTO = modelMapper.map(sideEntity, SideDTO.class);

        for (int i = 0; i < sideDTO.getSideCategoryDTOList().size(); i++) {
            sideDTO.getSideCategoryDTOList().get(i).setSideDTO(null);
        }
        return sideDTO;
    }
}
