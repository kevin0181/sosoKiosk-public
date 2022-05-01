package sosokiosk.kiosk.subDto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ChangeSideMenuDTO {

    private Long menuSideSq;

    private Long sideSq;

    private Long sideCategorySq;

    private String menuSideName;

    private String menuSidePrice;

    private boolean menuSideSoldOut = false;

    private boolean menuSideEnable = false;

    private MultipartFile menuSideImg;
}
