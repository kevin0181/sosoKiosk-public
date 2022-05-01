package sosokiosk.kiosk.dto.menu;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImgDTO {

    private Long imgSq;

    private Long menuSq;

    private String imgName;

    private String imgPath;

    private String imgDate;

    private String imgExtension;
}
