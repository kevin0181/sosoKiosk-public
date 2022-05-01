package sosokiosk.kiosk.repository.side;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sosokiosk.kiosk.entity.side.MenuSideImgEntity;

@Repository
public interface MenuSideImgRepository extends JpaRepository<MenuSideImgEntity, Long> {

    MenuSideImgEntity findByMenuSideSq(Long id);
}
