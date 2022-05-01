package sosokiosk.kiosk.dto.setting;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
public class SettingDTO {
    private Long setting_sq;

    private String settingName;

    private String settingValue;
}
