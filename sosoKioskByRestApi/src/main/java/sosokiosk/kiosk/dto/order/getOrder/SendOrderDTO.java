package sosokiosk.kiosk.dto.order.getOrder;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SendOrderDTO {
    private Long order_sq;

    private String orderId;

    private String orderTotalPrice;

    private String orderDate;
    
    private String orderDateTime;

    private String orderPlace;

    private String orderPayStatus;

    private String orderTelegramNo;

    private String orderTradeTime;

    private String orderApprovalNo;

    private String orderTradeUniqueNo;

    private int orderNumber;

    private List<SendOrderDetailDTO> orderDetailEntityList = new ArrayList<>();
}
