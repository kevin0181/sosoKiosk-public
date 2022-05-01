package sosokiosk.kiosk.repository.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sosokiosk.kiosk.entity.order.OrderDetailSideEntity;

import java.util.List;

@Repository
public interface OrderDetailSideRepository extends JpaRepository<OrderDetailSideEntity, Long> {

    List<OrderDetailSideEntity> findAllBySideSq(Long id);

}
