package sosokiosk.kiosk.repository.side;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sosokiosk.kiosk.entity.side.MenuSideEntity;

@Repository
public interface MenuSideRepository extends JpaRepository<MenuSideEntity, Long> {

}
