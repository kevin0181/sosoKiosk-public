package sosokiosk.kiosk.dto.order;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderDTO {
//    private Long order_sq;

    private String orderId;

    private String orderTotalPrice;

    private String orderDate;

    private String orderDateTime;

    private String orderPlace;

    private String orderPayStatus;

    private boolean orderStatus;

    private String orderTelegramNo;

    private String orderTradeTime;

    private String orderApprovalNo;

    private String orderTradeUniqueNo;

    private int orderNumber;

    private List<OrderDetailDTO> orderDetailEntityList = new ArrayList<>();
}
