package sosokiosk.kiosk.dto.menu;

import lombok.Getter;
import lombok.Setter;
import sosokiosk.kiosk.dto.side.SideDTO;
import sosokiosk.kiosk.subDto.OrderSide;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class MenuDTO {

    private Long menuSq;

    private Long categorySq;

    private String menuName;

    private String menuPrice;

    private boolean menuSoldOut;

    private boolean menuEnable;

    private boolean setStatus;

    private CategoryDTO categoryDTO;

    private List<ImgDTO> imgDTOList = new ArrayList<>();

    private Set<SideDTO> side = new HashSet<>();

    private List<OrderSide> addSide = new ArrayList<>();

    private int size;
}
