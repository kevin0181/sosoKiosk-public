package sosokiosk.kiosk.dto.order.getOrder;

import lombok.Getter;
import lombok.Setter;
import sosokiosk.kiosk.dto.side.SideDTO;
import sosokiosk.kiosk.subDto.OrderSide;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class SendMenuDTO {

    private Long menuSq;

    private Long categorySq;

    private String menuName;

    private String menuPrice;

    private boolean menuSoldOut;

    private boolean menuEnable;

    private List<SendImgDTO> imgDTOList = new ArrayList<>();

}
