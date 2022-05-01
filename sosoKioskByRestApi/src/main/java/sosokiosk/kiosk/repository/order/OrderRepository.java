package sosokiosk.kiosk.repository.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sosokiosk.kiosk.entity.order.OrderEntity;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    OrderEntity findByOrderTelegramNo(String id);

    String deleteByOrOrderTelegramNo(String id);

    String deleteByOrderTelegramNoAndOrderTradeTime(String telegram, String time);

    List<OrderEntity> findAllByOrderPayStatus(String pay);

    List<OrderEntity> findAllByOrderStatus(boolean payStatus);

    List<OrderEntity> findAllByOrderDate(String date);

    List<OrderEntity> findAllByOrderDateBetween(String startDate, String endDate);
}
