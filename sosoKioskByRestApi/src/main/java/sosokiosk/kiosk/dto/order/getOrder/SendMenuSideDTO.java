package sosokiosk.kiosk.dto.order.getOrder;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SendMenuSideDTO {
    private Long menuSideSq;

//    private Long sideSq;

    private Long sideCategorySq;

    private String menuSideName;

    private String menuSidePrice;

    private boolean menuSideSoldOut = false;

    private boolean menuSideEnable = false;

    private List<SendMenuSideImgDTO> menuSideImgDTOList;

}
