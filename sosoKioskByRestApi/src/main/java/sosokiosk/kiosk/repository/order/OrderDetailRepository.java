package sosokiosk.kiosk.repository.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sosokiosk.kiosk.entity.order.OrderDetailEntity;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Long> {

    List<OrderDetailEntity> findAllByMenuSq(Long id);

}
