package sosokiosk.kiosk.admin.controller.sales;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import sosokiosk.kiosk.dto.order.OrderDTO;
import sosokiosk.kiosk.service.order.OrderService;
import sosokiosk.kiosk.service.sales.SalesService;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Controller
public class SalesController {

    @Autowired
    private SalesService salesService;

    @Autowired
    private OrderService orderService;

    @Transactional
    @ResponseBody
    @PostMapping("/admin/sales/searchDate")
    public List<OrderDTO> adminSales(@RequestParam(value = "startDate", required = false) String startDate,
                                     @RequestParam(value = "endDate", required = false) String endDate) {


        List<OrderDTO> orderDTOList;

        if (endDate.equals("") && startDate.equals("")) {

            orderDTOList = orderService.getSalesJsonData();

            Collections.reverse(orderDTOList);

        } else if (endDate.equals("") && !startDate.equals("")) {

            orderDTOList = salesService.findSingleDate(startDate);
            Collections.reverse(orderDTOList);

        } else {

            orderDTOList = salesService.findDoubleDate(startDate, endDate);
            Collections.reverse(orderDTOList);

        }


        return orderDTOList;
    }

    static String sendDate;

    @ResponseBody
    @GetMapping("/admin/get/startDate")
    public HashMap<String, String> getStartTime() {
        HashMap<String, String> map = new HashMap<>();
        map.put("date", sendDate);
        return map;
    }

    public static void nowDateFormat() { //현재시각 포멧
        Date nowDate = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String nowDateFormat = simpleDateFormat.format(nowDate);
        sendDate = nowDateFormat;
    }

}
