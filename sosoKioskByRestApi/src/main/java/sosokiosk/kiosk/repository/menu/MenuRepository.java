package sosokiosk.kiosk.repository.menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sosokiosk.kiosk.dto.menu.MenuDTO;
import sosokiosk.kiosk.entity.menu.MenuEntity;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<MenuEntity, Long> {

    List<MenuEntity> findAllByCategorySq(Long id);
}
