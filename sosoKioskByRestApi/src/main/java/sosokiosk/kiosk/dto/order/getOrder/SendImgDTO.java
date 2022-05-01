package sosokiosk.kiosk.dto.order.getOrder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendImgDTO {

    private Long imgSq;

    private Long menuSq;

    private String imgName;

    private String imgPath;

    private String imgDate;

    private String imgExtension;
}
