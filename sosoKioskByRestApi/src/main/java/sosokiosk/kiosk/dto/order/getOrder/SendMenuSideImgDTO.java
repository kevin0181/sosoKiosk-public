package sosokiosk.kiosk.dto.order.getOrder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendMenuSideImgDTO {

    private Long menuSideImgSq;

    private Long menuSideSq;

    private String menuSideImgName;

    private String menuSideImgPath;

    private String menuSideImgDate;

    private String menuSideImgExtension;
}
