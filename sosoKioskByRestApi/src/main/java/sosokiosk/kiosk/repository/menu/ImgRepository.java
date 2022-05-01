package sosokiosk.kiosk.repository.menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sosokiosk.kiosk.entity.menu.ImgEntity;

@Repository
public interface ImgRepository extends JpaRepository<ImgEntity, Long> {

    ImgEntity findByImgName(String name);

    ImgEntity findByMenuSq(Long id);

}
