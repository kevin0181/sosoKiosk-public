package sosokiosk.kiosk.subDto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
public class ChangeMenuDTO {

    private Long menuSq;

    private Long sideSq;

    private Long categorySq;

    private String menuName;

    private String menuPrice;

    private boolean menuSoldOut = false;

    private boolean menuEnable = false;

    private boolean setStatus = false;

    private MultipartFile menuImg;
}
