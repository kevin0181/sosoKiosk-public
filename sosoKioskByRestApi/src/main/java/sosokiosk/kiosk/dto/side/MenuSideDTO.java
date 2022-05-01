package sosokiosk.kiosk.dto.side;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MenuSideDTO {
    private Long menuSideSq;

//    private Long sideSq;

    private Long sideCategorySq;

    private String menuSideName;

    private String menuSidePrice;

    private boolean menuSideSoldOut = false;

    private boolean menuSideEnable = false;

    private SideCategoryDTO sideCategoryDTO;

    private List<MenuSideImgDTO> menuSideImgDTOList;

}
