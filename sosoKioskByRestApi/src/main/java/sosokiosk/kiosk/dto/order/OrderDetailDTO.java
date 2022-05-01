package sosokiosk.kiosk.dto.order;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderDetailDTO {
//    private Long orderDetailSq;

//    private Long orderSq;

    private Long menuSq;

    private String orderMenuName;

    private int orderDetailMenuSize;

    private String orderDetailMenuPrice;

    private List<OrderDetailSideDTO> orderDetailSideEntityList = new ArrayList<>();
}
