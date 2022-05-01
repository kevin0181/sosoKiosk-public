package sosokiosk.kiosk.repository.side;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sosokiosk.kiosk.entity.side.SideEntity;

@Repository
public interface SideRepository extends JpaRepository<SideEntity, Long> {
}
