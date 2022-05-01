package sosokiosk.kiosk.dto.side;


import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SideCategoryDTO {

    private Long sideCategorySq;

    private Long sideSq;

    private String sideCategoryName;

    private SideDTO sideDTO;

    private List<MenuSideDTO> menuSideDTOList = new ArrayList<>();

}
