package sosokiosk.kiosk.service.order;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sosokiosk.kiosk.dto.menu.MenuDTO;
import sosokiosk.kiosk.dto.order.OrderDTO;
import sosokiosk.kiosk.dto.order.getOrder.SendOrderDTO;
import sosokiosk.kiosk.entity.order.OrderDetailEntity;
import sosokiosk.kiosk.entity.order.OrderDetailSideEntity;
import sosokiosk.kiosk.entity.order.OrderEntity;
import sosokiosk.kiosk.repository.order.OrderRepository;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;

    private int orderN = 0;

    public OrderDTO orderMenu(List<MenuDTO> menuDTOList, String totalPrice, String placeStatus, String payStatus) {


        Date nowDate = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("HH:mm:ss");


        String orderDate = simpleDateFormat.format(nowDate);
        String orderDateTime = simpleTimeFormat.format(nowDate);

        String orderTelegramNo = randomOrderId();
        String orderId = randomOrderId() + nowDateFormat();

        OrderEntity orderEntity = new OrderEntity();

        orderEntity.setOrderTelegramNo(orderTelegramNo);
        orderEntity.setOrderDate(orderDate);
        orderEntity.setOrderDateTime(orderDateTime);
        orderEntity.setOrderPlace(placeStatus);
        orderEntity.setOrderTotalPrice(totalPrice); // -> 주문 생성
        orderEntity.setOrderPayStatus(payStatus);
        if (payStatus.equals("card")) { //카드 결제 일때만 주문 상태 저장
            orderEntity.setOrderStatus(false);
        } else {
            orderEntity.setOrderStatus(true);
        }

        orderEntity.setOrderId(orderId);

        List<OrderDetailEntity> orderDetailEntityList = new ArrayList<>(); // -> 주문 메뉴 생성

        for (int i = 0; i < menuDTOList.size(); i++) {

            OrderDetailEntity orderDetailEntity = new OrderDetailEntity();

            orderDetailEntity.setMenuSq(menuDTOList.get(i).getMenuSq()); //메뉴 넣음
            orderDetailEntity.setOrderDetailMenuSize(menuDTOList.get(i).getSize()); //메뉴 사이즈 넣음
            orderDetailEntity.setOrderMenuName(menuDTOList.get(i).getMenuName()); //메뉴 이름 넣음
            orderDetailEntity.setOrderDetailMenuPrice(menuDTOList.get(i).getMenuPrice());

            if (menuDTOList.get(i).getAddSide().size() != 0) { //사이드가 있으면 실행

                List<OrderDetailSideEntity> orderDetailSideEntityList = new ArrayList<>();

                for (int j = 0; j < menuDTOList.get(i).getAddSide().size(); j++) {


                    OrderDetailSideEntity orderDetailSideEntity = new OrderDetailSideEntity();

                    orderDetailSideEntity.setSideSq(menuDTOList.get(i).getAddSide().get(j).getSideSq()); //사이드 메뉴 넣음
                    orderDetailSideEntity.setOrderSideSize(menuDTOList.get(i).getAddSide().get(j).getSideSize()); //사이드 메뉴 사이즈 넣음
                    orderDetailSideEntity.setOrderSideName(menuDTOList.get(i).getAddSide().get(j).getSideName());
                    orderDetailSideEntity.setOrderSidePrice(menuDTOList.get(i).getAddSide().get(j).getSidePrice());

                    orderDetailSideEntityList.add(orderDetailSideEntity);

                }
                orderDetailEntity.setOrderDetailSideEntityList(orderDetailSideEntityList);
            }

            orderDetailEntityList.add(orderDetailEntity);

        }

        orderEntity.setOrderDetailEntityList(orderDetailEntityList);

        orderRepository.save(orderEntity);

//        orderEntity = null;

        OrderDTO orderDTO = modelMapper.map(orderEntity, OrderDTO.class);
        orderN++;
        orderDTO.setOrderNumber(orderN);

        return orderDTO;

    }


    public String nowDateFormat() { //현재시각 포멧
        Date nowDate = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyMMddHHmmss");
        String nowDateFormat = simpleDateFormat.format(nowDate);
        return nowDateFormat;
    }

    public String randomOrderId() { //주문 id 생성

        Random rnd = new Random();

        StringBuffer buf = new StringBuffer();

        for (int i = 0; i < 12; i++) {

            if (rnd.nextBoolean()) {

                buf.append((char) ((int) (rnd.nextInt(26)) + 97));

            } else {

                buf.append((rnd.nextInt(10)));

            }
        }

        return buf.toString();
    }

    public OrderDTO reSaveOrder(OrderEntity orderEntity) {

        OrderEntity getOrderEntity = orderRepository.findByOrderTelegramNo(orderEntity.getOrderTelegramNo());

        getOrderEntity.setOrderTradeTime(orderEntity.getOrderTradeTime());
        getOrderEntity.setOrderApprovalNo(orderEntity.getOrderApprovalNo());
        getOrderEntity.setOrderTradeUniqueNo(orderEntity.getOrderTradeUniqueNo());
        getOrderEntity.setCardKind(orderEntity.getCardKind()); //카드사 종류
        getOrderEntity.setCardNumber(orderEntity.getCardNumber()); //카드 번호
        getOrderEntity.setOrderStatus(true);

        orderRepository.save(getOrderEntity);

        OrderDTO orderDTO = modelMapper.map(getOrderEntity, OrderDTO.class);
        orderN++;
        orderDTO.setOrderNumber(orderN);

        return orderDTO;

    }

    @Transactional
    public void cancelOrderMenu(OrderEntity orderEntity) {
        orderRepository.deleteByOrOrderTelegramNo(orderEntity.getOrderTelegramNo());
    }

    public List<OrderEntity> getAllOrders() {
        List<OrderEntity> orderEntityList = orderRepository.findAll();
        orderEntityList.remove(new OrderDetailEntity());
        return orderEntityList;
    }

    public void failSave(OrderEntity orderEntity) {
        OrderEntity getOrderEntity = orderRepository.findByOrderTelegramNo(orderEntity.getOrderTelegramNo());
        getOrderEntity.setOrderStatus(false);
        orderRepository.save(getOrderEntity);
    }

    public void cancelMoneyOrderService(Long orderSq) {

        orderRepository.deleteById(orderSq);

    }

    public SendOrderDTO getOrderSqService(Long orderSq) {
        OrderEntity orderEntity = orderRepository.getById(orderSq);
        SendOrderDTO sendOrderDTO = modelMapper.map(orderEntity, SendOrderDTO.class);

        return sendOrderDTO;
    }


    public List<OrderEntity> getCardOrders() {
        List<OrderEntity> orderEntityList = orderRepository.findAllByOrderPayStatus("card");
        orderEntityList.remove(new OrderDetailEntity());
        return orderEntityList;
    }

    public List<OrderEntity> getMoneyOrders() {
        List<OrderEntity> orderEntityList = orderRepository.findAllByOrderPayStatus("money");
        orderEntityList.remove(new OrderDetailEntity());
        return orderEntityList;
    }

    public List<OrderEntity> getSalesStartData() {
        List<OrderEntity> orderEntityList = orderRepository.findAllByOrderStatus(true);
        orderEntityList.remove(new OrderDetailEntity());

        return orderEntityList;
    }

    public List<OrderDTO> getSalesJsonData() {
        List<OrderEntity> orderEntityList = orderRepository.findAllByOrderStatus(true);
        orderEntityList.remove(new OrderDetailEntity());
        List<OrderDTO> orderDTOList = orderEntityList.stream().map(orderEntity -> modelMapper.map(orderEntity, OrderDTO.class)).collect(Collectors.toList());

        return orderDTOList;
    }

    public List<OrderDTO> getCardDate(String startDate, String endDate) {
        List<OrderEntity> orderEntityList;
        List<OrderDTO> orderDTOList;
        if (startDate.equals("") && endDate.equals("")) { //전부 가져오기
            orderEntityList = orderRepository.findAllByOrderPayStatus("card");
            orderEntityList.remove(new OrderDetailEntity());
            orderDTOList = orderEntityList.stream().map(orderEntity -> modelMapper.map(orderEntity, OrderDTO.class)).collect(Collectors.toList());
        } else {
            orderEntityList = orderRepository.findAllByOrderPayStatusAndOrderDateBetween("card", startDate, endDate);
            orderEntityList.remove(new OrderDetailEntity());
            orderDTOList = orderEntityList.stream().map(orderEntity -> modelMapper.map(orderEntity, OrderDTO.class)).collect(Collectors.toList());
        }
        return orderDTOList;
    }

    public List<OrderDTO> getMoneyDate(String startDate, String endDate) {
        List<OrderEntity> orderEntityList;
        List<OrderDTO> orderDTOList;
        if (startDate.equals("") && endDate.equals("")) { //전부 가져오기
            orderEntityList = orderRepository.findAll();
            orderEntityList.remove(new OrderDetailEntity());
            orderDTOList = orderEntityList.stream().map(orderEntity -> modelMapper.map(orderEntity, OrderDTO.class)).collect(Collectors.toList());
        } else {
            orderEntityList = orderRepository.findAllByOrderPayStatusAndOrderDateBetween("money", startDate, endDate);
            orderEntityList.remove(new OrderDetailEntity());
            orderDTOList = orderEntityList.stream().map(orderEntity -> modelMapper.map(orderEntity, OrderDTO.class)).collect(Collectors.toList());
        }
        return orderDTOList;
    }

    public List<OrderDTO> getAllDate(String startDate, String endDate) {
        List<OrderEntity> orderEntityList;
        List<OrderDTO> orderDTOList;
        if (startDate.equals("") && endDate.equals("")) { //전부 가져오기
            orderEntityList = orderRepository.findAll();
            orderEntityList.remove(new OrderDetailEntity());
            orderDTOList = orderEntityList.stream().map(orderEntity -> modelMapper.map(orderEntity, OrderDTO.class)).collect(Collectors.toList());
        } else {
            orderEntityList = orderRepository.findAllByOrderDateBetween(startDate, endDate);
            orderEntityList.remove(new OrderDetailEntity());
            orderDTOList = orderEntityList.stream().map(orderEntity -> modelMapper.map(orderEntity, OrderDTO.class)).collect(Collectors.toList());
        }
        return orderDTOList;
    }

}
