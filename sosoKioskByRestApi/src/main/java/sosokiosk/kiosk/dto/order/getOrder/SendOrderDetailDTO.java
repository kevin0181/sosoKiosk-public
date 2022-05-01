package sosokiosk.kiosk.dto.order.getOrder;

import lombok.Getter;
import lombok.Setter;
import sosokiosk.kiosk.dto.menu.MenuDTO;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SendOrderDetailDTO {
    private Long orderDetailSq;

    private Long orderSq;

    private Long menuSq;

    private String orderMenuName;

    private int orderDetailMenuSize;

    private String orderDetailMenuPrice;

    private SendMenuDTO menuEntity;

    private List<SendOrderDetailSideDTO> orderDetailSideEntityList = new ArrayList<>();
}
