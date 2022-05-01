package sosokiosk.kiosk.repository.side;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sosokiosk.kiosk.entity.side.SideCategoryEntity;

import java.util.List;

@Repository
public interface SideCategoryRepository extends JpaRepository<SideCategoryEntity, Long> {

    List<SideCategoryEntity> findAllBySideSq(Long id);

}
