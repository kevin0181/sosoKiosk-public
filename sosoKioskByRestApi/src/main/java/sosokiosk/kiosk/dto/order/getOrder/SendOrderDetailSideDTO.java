package sosokiosk.kiosk.dto.order.getOrder;

import lombok.Getter;
import lombok.Setter;
import sosokiosk.kiosk.dto.side.MenuSideDTO;

@Getter
@Setter
public class SendOrderDetailSideDTO {
    private Long orderDetailSideSq;

    private Long sideSq;

    private Long orderDetailSq;

    private String orderSideName;

    private int orderSideSize;

    private String orderSidePrice;

    private SendMenuSideDTO menuSideEntity;

}
