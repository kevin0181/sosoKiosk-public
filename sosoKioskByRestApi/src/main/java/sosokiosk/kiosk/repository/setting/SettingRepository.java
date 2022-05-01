package sosokiosk.kiosk.repository.setting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sosokiosk.kiosk.entity.setting.SettingEntity;

@Repository
public interface SettingRepository extends JpaRepository<SettingEntity, Long> {


    SettingEntity findBySettingName(String id);

}
