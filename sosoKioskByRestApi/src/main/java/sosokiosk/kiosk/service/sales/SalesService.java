package sosokiosk.kiosk.service.sales;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sosokiosk.kiosk.dto.order.OrderDTO;
import sosokiosk.kiosk.entity.order.OrderDetailEntity;
import sosokiosk.kiosk.entity.order.OrderEntity;
import sosokiosk.kiosk.repository.order.OrderRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalesService {


    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderDTO> findSingleDate(String startDate) {
        List<OrderEntity> orderEntityList = orderRepository.findAllByOrderDate(startDate);
        orderEntityList.remove(new OrderDetailEntity());
        List<OrderDTO> orderDTOList = orderEntityList.stream().map(orderEntity -> modelMapper.map(orderEntity, OrderDTO.class)).collect(Collectors.toList());

        return orderDTOList;
    }

    public List<OrderDTO> findDoubleDate(String startDate, String endDate) {
        List<OrderEntity> orderEntityList = orderRepository.findAllByOrderDateBetween(startDate, endDate);
        orderEntityList.remove(new OrderDetailEntity());
        List<OrderDTO> orderDTOList = orderEntityList.stream().map(orderEntity -> modelMapper.map(orderEntity, OrderDTO.class)).collect(Collectors.toList());

        return orderDTOList;
    }
}
