package sosokiosk.kiosk.subDto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class AddMenuDTO {

    private Long categorySq;

    private String menuName;

    private String menuPrice;

    private Long sideSq;

    private MultipartFile menuImg;

}
