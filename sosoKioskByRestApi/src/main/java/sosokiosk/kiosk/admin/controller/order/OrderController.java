package sosokiosk.kiosk.admin.controller.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import sosokiosk.kiosk.dto.order.OrderDTO;
import sosokiosk.kiosk.dto.order.getOrder.SendOrderDTO;
import sosokiosk.kiosk.entity.order.OrderEntity;
import sosokiosk.kiosk.service.order.OrderService;

import javax.transaction.Transactional;

@Controller
public class OrderController {

    @Autowired
    private OrderService orderService;


    @PostMapping("/admin/order/cancel/money")
    @ResponseBody
    public boolean cancelMoneyOrder(@RequestParam(name = "orderSq") Long orderSq) { //현금 결제 취소
        try {
            orderService.cancelMoneyOrderService(orderSq);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @PostMapping("/admin/order/cancel/card")
    @ResponseBody
    public boolean cancelCardOrder(@RequestParam(name = "orderSq") Long orderSq) { //카드 결제 취소
        try {
            orderService.cancelMoneyOrderService(orderSq);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    @Transactional
    @PostMapping("/admin/order/get/orderSq")
    @ResponseBody
    public Object getOrderSq(@RequestParam(name = "orderSq") Long orderSq) { //주문 상세보기 가져오기
        try {

            SendOrderDTO sendOrderDTO = orderService.getOrderSqService(orderSq);

            return sendOrderDTO;
        } catch (Exception e) {
            return false;
        }
    }


}