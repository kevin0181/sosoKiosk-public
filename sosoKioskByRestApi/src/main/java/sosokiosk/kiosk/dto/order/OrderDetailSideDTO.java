package sosokiosk.kiosk.dto.order;

import lombok.Getter;
import lombok.Setter;
import sosokiosk.kiosk.entity.order.OrderDetailEntity;

import javax.persistence.*;

@Getter
@Setter
public class OrderDetailSideDTO {
//    private Long orderDetailSideSq;

    private Long sideSq;

//    private Long orderDetailSq;

    private String orderSideName;

    private int orderSideSize;

    private String orderSidePrice;

}
